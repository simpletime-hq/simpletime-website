#!/usr/bin/env python3
"""Render the Open Graph card for every locale.

The site spans a dozen scripts and each font file holds only its own subset,
so a single string routinely needs several files: the Turkish headline
mixes Latin with latin-ext, and every non-Latin card keeps "iPhone",
"iPad", "Mac" and the SimpleTime wordmark in Latin.

Which file covers which character is read from the `unicode-range`
declarations Fontsource ships rather than guessed. Guessing got it wrong
once already — the Turkish dotless ı looks like a latin-ext character but
lives in the Latin subset, and rendering it from the wrong file produced
a NO GLYPH box in the middle of the headline.

Pillow here has no Raqm, so it cannot shape. Scripts that join letters,
reorder vowel signs or stack marks – Arabic, Persian, Pashto and Urdu,
Devanagari, Bengali, Gurmukhi, Telugu, Tamil and Thai – go through HarfBuzz
and are filled from the glyph outlines (draw_shaped below). Right-to-left
lines are put in display order by python-bidi first. A reshaper is not enough
for Pashto: ټ, ښ, ګ and ڼ have no presentation forms to swap in.

    pip install uharfbuzz fonttools python-bidi

fontTools reads the .woff files next to the .woff2 ones, so it needs no
Brotli.

The copy is the home page's hero in each language – headline, eyebrow and
the three promises under the buttons – read from src/i18n/content/<lang>.json,
so the card says what the page says. The phone shows that language's
Tracking screen.

Run after changing any hero copy or the screenshots:

    python3 scripts/og-images.py
"""

import json
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
INTER = ROOT / "node_modules/@fontsource/inter"
ARMENIAN = ROOT / "node_modules/@fontsource/noto-sans-armenian"
ARABIC = ROOT / "node_modules/@fontsource/noto-sans-arabic"
DEVANAGARI = ROOT / "node_modules/@fontsource/noto-sans-devanagari"
HEBREW = ROOT / "node_modules/@fontsource/noto-sans-hebrew"
JAPANESE = ROOT / "node_modules/@fontsource-variable/noto-sans-jp"
CHINESE = ROOT / "node_modules/@fontsource-variable/noto-sans-sc"
# Only for these cards (devDependencies): the site itself uses the system fonts
# for Korean, Traditional Chinese and the scripts below.
KOREAN = ROOT / "node_modules/@fontsource-variable/noto-sans-kr"
CHINESE_TRAD = ROOT / "node_modules/@fontsource-variable/noto-sans-tc"
THAI = ROOT / "node_modules/@fontsource/noto-sans-thai"
BENGALI = ROOT / "node_modules/@fontsource/noto-sans-bengali"
GURMUKHI = ROOT / "node_modules/@fontsource/noto-sans-gurmukhi"
TELUGU = ROOT / "node_modules/@fontsource/noto-sans-telugu"
TAMIL = ROOT / "node_modules/@fontsource/noto-sans-tamil"
ETHIOPIC = ROOT / "node_modules/@fontsource/noto-sans-ethiopic"
PUBLIC = ROOT / "public"
SCREENS = ROOT / "src/assets/screens"
CONTENT = ROOT / "src/i18n/content"

W, H = 1200, 630

# Subset name -> file template. Order matters: the first subset whose range
# contains a character wins, so Latin is checked before latin-ext.
SUBSETS = [
    ("latin", INTER / "files/inter-latin-{w}-normal.woff2", INTER / "400.css", "latin"),
    ("latin-ext", INTER / "files/inter-latin-ext-{w}-normal.woff2", INTER / "400.css", "latin-ext"),
    ("cyrillic", INTER / "files/inter-cyrillic-{w}-normal.woff2", INTER / "400.css", "cyrillic"),
    (
        "armenian",
        ARMENIAN / "files/noto-sans-armenian-armenian-{w}-normal.woff2",
        ARMENIAN / "400.css",
        "armenian",
    ),
    ("arabic", ARABIC / "files/noto-sans-arabic-arabic-{w}-normal.woff2", ARABIC / "400.css", "arabic"),
    ("greek", INTER / "files/inter-greek-{w}-normal.woff2", INTER / "400.css", "greek"),
    (
        "hebrew",
        HEBREW / "files/noto-sans-hebrew-hebrew-{w}-normal.woff2",
        HEBREW / "400.css",
        "hebrew",
    ),
    (
        "devanagari",
        DEVANAGARI / "files/noto-sans-devanagari-devanagari-{w}-normal.woff2",
        DEVANAGARI / "400.css",
        "devanagari",
    ),
    # After latin-ext: it repeats a few of its letters (Ă, Đ …) and adds the
    # stacked Vietnamese ones (ế, ộ …).
    ("vietnamese", INTER / "files/inter-vietnamese-{w}-normal.woff2", INTER / "400.css", "vietnamese"),
    ("bengali", BENGALI / "files/noto-sans-bengali-bengali-{w}-normal.woff2", BENGALI / "400.css", "bengali"),
    ("gurmukhi", GURMUKHI / "files/noto-sans-gurmukhi-gurmukhi-{w}-normal.woff2", GURMUKHI / "400.css", "gurmukhi"),
    ("telugu", TELUGU / "files/noto-sans-telugu-telugu-{w}-normal.woff2", TELUGU / "400.css", "telugu"),
    ("tamil", TAMIL / "files/noto-sans-tamil-tamil-{w}-normal.woff2", TAMIL / "400.css", "tamil"),
    ("thai", THAI / "files/noto-sans-thai-thai-{w}-normal.woff2", THAI / "400.css", "thai"),
    ("ethiopic", ETHIOPIC / "files/noto-sans-ethiopic-ethiopic-{w}-normal.woff2", ETHIOPIC / "400.css", "ethiopic"),
]

def copy_for(lang: str) -> tuple[str, str, str, str]:
    """Headline (two lines), subtitle and the promises line, as on the page."""
    hero = json.loads((CONTENT / f"{lang}.json").read_text(encoding="utf-8"))["home"]["hero"]
    lines = hero["titleLead"], hero["titleAccent"], hero["eyebrow"], " · ".join(hero["proof"])
    return tuple(drawable(line) for line in lines)


def proof_for(lang: str) -> list[str]:
    """The promises under the buttons, one by one – for when they need two lines."""
    hero = json.loads((CONTENT / f"{lang}.json").read_text(encoding="utf-8"))["home"]["hero"]
    return [drawable(item) for item in hero["proof"]]


def drawable(text: str) -> str:
    """What the page gets right through font fallback, a single font file cannot:
    the Hebrew copy binds prefixes to Latin names with a non-breaking hyphen
    (ל‑iPhone), which none of the subsets carry – it drew a NO GLYPH box. The
    direction marks stay until python-bidi has ordered the line (shape): the
    Persian copy needs the one after "iPhone،" to keep the comma on the right
    side of the name."""
    return text.replace("\u2011", "-")


def unmarked(text: str) -> str:
    """Direction marks are invisible on the page and only in the way here."""
    return text.replace("\u200e", "").replace("\u200f", "")


# Every site language, in the order of the language menu.
LANGS = [
    "en", "de", "fr", "it", "es", "pt", "pt-br", "nl", "sv", "da", "nb", "fi", "ro", "pl", "cs", "sk", "hu", "bg",
    "sr", "hr", "bs", "sq", "uk", "ru", "el", "tr", "ar", "he", "fa", "ku", "hy", "ps", "hi", "ur", "bn", "pa", "mr",
    "te", "ta", "zh", "zh-hant", "ja", "ko", "vi", "th", "id", "ms", "fil", "sw", "am", "so",
]

RTL = {"ar", "he", "fa", "ps", "ur"}

# These scripts join letters, reorder vowel signs, form conjuncts or stack
# marks, so they cannot be drawn codepoint by codepoint. Their runs go through
# HarfBuzz and are filled from the glyph outlines; see draw_shaped below.
# Hebrew needs only the bidi pass.
SHAPED = {"arabic", "devanagari", "bengali", "gurmukhi", "telugu", "tamil", "thai"}

# Joiners belong to the letters around them: split off into a run of their own
# they would break the shaping they are there to steer (Persian می‌افتد,
# Telugu ట్యాప్‌తో). The danda ends sentences in Hindi, Bengali and Punjabi
# alike; it comes from the font of the sentence, not the first one that has it.
STAY = {"\u200c", "\u200d", "\u0964", "\u0965"}


def parse_range(css_path: Path, subset: str) -> set[int]:
    """The codepoints Fontsource declares for one subset."""
    css = css_path.read_text(encoding="utf-8")
    stem = css_path.parent.name
    pattern = rf"/\* {re.escape(stem)}-{re.escape(subset)}-400-normal \*/\s*@font-face \{{(.*?)\}}"
    match = re.search(pattern, css, re.S)
    if not match:
        raise SystemExit(f"no @font-face for {subset} in {css_path}")
    declared = re.search(r"unicode-range:\s*([^;]+);", match.group(1))
    if not declared:
        raise SystemExit(f"{subset} in {css_path} has no unicode-range")

    points: set[int] = set()
    for part in declared.group(1).split(","):
        part = part.strip().removeprefix("U+")
        if "-" in part:
            lo, hi = part.split("-")
            points.update(range(int(lo, 16), int(hi, 16) + 1))
        else:
            points.add(int(part, 16))
    return points


def cjk_subsets(pkg: Path, prefix: str) -> list[tuple[str, Path, set[int]]]:
    """The CJK fonts ship dozens of subsets in one stylesheet; each needs its
    own entry so a character can be traced back to the file that holds it."""
    css = (pkg / "index.css").read_text(encoding="utf-8")
    out = []
    for i, match in enumerate(re.finditer(r"@font-face \{(.*?)\}", css, re.S)):
        body = match.group(1)
        src = re.search(r"url\(\./files/([^)]+?\.woff2)\)", body)
        declared = re.search(r"unicode-range:\s*([^;]+);", body)
        if not src or not declared:
            continue
        points: set[int] = set()
        for part in declared.group(1).split(","):
            part = part.strip().removeprefix("U+")
            if "-" in part:
                lo, hi = part.split("-")
                points.update(range(int(lo, 16), int(hi, 16) + 1))
            else:
                points.add(int(part, 16))
        out.append((f"{prefix}-{i}", pkg / "files" / src.group(1), points))
    return out


RANGES: list[tuple[str, Path, set[int]]] = [
    (name, tmpl, parse_range(css, subset)) for name, tmpl, css, subset in SUBSETS
]
RANGES += cjk_subsets(JAPANESE, "jp")
RANGES += cjk_subsets(CHINESE, "sc")
RANGES += cjk_subsets(KOREAN, "kr")
RANGES += cjk_subsets(CHINESE_TRAD, "tc")

_fonts: dict[tuple[str, int, int], ImageFont.FreeTypeFont] = {}


def font(subset: str, weight: int, size: int) -> ImageFont.FreeTypeFont:
    key = (subset, weight, size)
    if key not in _fonts:
        path = str(next(t for n, t, _ in RANGES if n == subset))
        if "{w}" in path:
            face = ImageFont.truetype(path.format(w=weight), size)
        else:
            # Variable file, one per subset. Pillow loads the default
            # instance, so the weight axis has to be set explicitly —
            # otherwise the Japanese headline renders light next to a
            # bold Latin wordmark.
            face = ImageFont.truetype(path, size)
            face.set_variation_by_axes([weight])
        _fonts[key] = face
    return _fonts[key]


def shape(text: str, lang: str) -> str:
    """Right-to-left copy is put in display order here; joining the Arabic
    letters is left to HarfBuzz (shaped_run), which turns each run back into
    reading order first."""
    if lang not in RTL:
        return unmarked(text)
    try:
        from bidi import get_display
    except ImportError:
        raise SystemExit("RTL copy needs bidi: pip install python-bidi")
    return unmarked(get_display(text))


# Japanese and Chinese share most Han codepoints but draw them differently,
# so the card's locale decides which CJK family may match.
CJK_PREFIX = {"ja": "jp-", "zh": "sc-", "ko": "kr-", "zh-hant": "tc-"}
_locale = "en"


def subset_for(ch: str) -> str:
    allowed = CJK_PREFIX.get(_locale)
    for name, _, points in RANGES:
        if name.startswith(("jp-", "sc-", "kr-", "tc-")) and (allowed is None or not name.startswith(allowed)):
            continue
        if ord(ch) in points:
            return name
    return "latin"  # spaces, digits and punctuation the ranges do not list


def runs(text: str) -> list[tuple[str, str]]:
    """Split into stretches that share one font file."""
    out: list[tuple[str, str]] = []
    current, buffer = None, ""
    for ch in text:
        stays = ch in STAY and current is not None and ord(ch) in next(r for n, _, r in RANGES if n == current)
        sub = current if stays else subset_for(ch)
        if sub != current:
            if buffer:
                out.append((current, buffer))
            current, buffer = sub, ch
        else:
            buffer += ch
    if buffer:
        out.append((current, buffer))
    return out


def measure(draw, text, weight, size) -> float:
    total = 0.0
    for sub, seg in runs(text):
        if sub in SHAPED:
            total += shaped_run(sub, seg, weight, size)[1]
        else:
            total += draw.textlength(seg, font=font(sub, weight, size))
    return total


def draw_text(draw, x, y, text, weight, size, fill) -> None:
    """`y` is the ascender line of the tallest font in the line; all runs share
    its baseline.

    Each run used to hang from its own font's ascender, so a line mixing scripts
    had as many baselines as fonts – "iPhone · iPad · Mac" sat about 10px above
    the Arabic beside it (audit 19.11.2026). A line in one script sits where it
    always did.
    """
    parts = runs(text)
    baseline = y + max(font(sub, weight, size).getmetrics()[0] for sub, _ in parts)
    for sub, seg in parts:
        face = font(sub, weight, size)
        if sub in SHAPED:
            mask, advance, mask_baseline = shaped_run(sub, seg, weight, size)
            draw._image.paste(fill, (int(x), int(baseline - mask_baseline)), mask)
            x += advance
        else:
            draw.text((x, baseline), seg, font=face, fill=fill, anchor="ls")
            x += draw.textlength(seg, font=face)


_shapers: dict[str, tuple] = {}


def shaper(subset: str, weight: int):
    """HarfBuzz font plus the fontTools glyph set for one subset.

    HarfBuzz cannot read woff2, so the file is decompressed first —
    without that every character shapes to .notdef. fontTools takes the .woff
    beside it: same glyphs, zlib instead of Brotli.
    """
    key = f"{subset}-{weight}"
    if key not in _shapers:
        import io as _io

        import uharfbuzz as hb
        from fontTools.ttLib import TTFont

        path = str(next(t for n, t, _ in RANGES if n == subset)).format(w=weight).removesuffix("2")
        tt = TTFont(path)
        tt.flavor = None
        raw = _io.BytesIO()
        tt.save(raw)
        _shapers[key] = (hb, hb.Font(hb.Face(raw.getvalue())), tt)
    return _shapers[key]


def _contours(pen, scale, ox, oy):
    """Flatten a glyph's outline into polygons."""
    out, cur, last = [], [], None

    def pt(p):
        return (ox + p[0] * scale, oy - p[1] * scale)

    for op, args in pen.value:
        if op == "moveTo":
            cur, last = [pt(args[0])], args[0]
        elif op == "lineTo":
            cur.append(pt(args[0]))
            last = args[0]
        elif op == "qCurveTo":
            pts = list(args)
            on = pts[-1] if pts[-1] is not None else pts[0]
            ctrl, prev = pts[:-1], last
            for i, c in enumerate(ctrl):
                end = on if i == len(ctrl) - 1 else ((c[0] + ctrl[i + 1][0]) / 2, (c[1] + ctrl[i + 1][1]) / 2)
                for t in (j / 8 for j in range(1, 9)):
                    cur.append(pt((
                        (1 - t) ** 2 * prev[0] + 2 * (1 - t) * t * c[0] + t * t * end[0],
                        (1 - t) ** 2 * prev[1] + 2 * (1 - t) * t * c[1] + t * t * end[1],
                    )))
                prev = end
            last = on
        elif op == "curveTo":
            c1, c2, end = args
            prev = last
            for t in (j / 10 for j in range(1, 11)):
                cur.append(pt((
                    (1 - t) ** 3 * prev[0] + 3 * (1 - t) ** 2 * t * c1[0] + 3 * (1 - t) * t * t * c2[0] + t**3 * end[0],
                    (1 - t) ** 3 * prev[1] + 3 * (1 - t) ** 2 * t * c1[1] + 3 * (1 - t) * t * t * c2[1] + t**3 * end[1],
                )))
            last = end
        elif op == "closePath":
            if len(cur) > 2:
                out.append(cur)
            cur = []
    if len(cur) > 2:
        out.append(cur)
    return out


SS = 3  # supersampling for the shaped path, which has no antialiasing of its own


def shaped_run(subset, text, weight, size):
    """Return (mask, advance) for a run that needs shaping."""
    # Decomposing, not plain RecordingPen: composite glyphs — आ among them —
    # record only component references, which flatten to nothing and drop the
    # letter silently.
    from fontTools.pens.recordingPen import DecomposingRecordingPen

    hb, hbfont, tt = shaper(subset, weight)
    if subset == "arabic":
        # python-bidi has already reversed the run for display; HarfBuzz joins
        # in reading order and returns the glyphs left to right itself.
        text = text[::-1]
    buf = hb.Buffer()
    buf.add_str(text)
    # Local forms: Marathi ल and श, Urdu digits.
    buf.language = _locale.split("-")[0]
    buf.guess_segment_properties()
    hb.shape(hbfont, buf)

    upem = tt["head"].unitsPerEm
    glyphs, order = tt.getGlyphSet(), tt.getGlyphOrder()
    scale = size * SS / upem

    advance = sum(p.x_advance for p in buf.glyph_positions) * size / upem
    width = max(1, int(advance * SS) + size * SS)
    height = size * SS * 3
    baseline = size * SS * 2

    acc = Image.new("1", (width, height), 0)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        pen = DecomposingRecordingPen(glyphs)
        glyphs[order[info.codepoint]].draw(pen)

        # Even-odd within one glyph, so its counters stay open — but OR
        # between glyphs. XOR across glyphs cancels wherever two of them
        # overlap, and in Devanagari they routinely do: it silently ate the
        # first letter of every run.
        glyph = Image.new("1", (width, height), 0)
        for contour in _contours(pen, scale, x + pos.x_offset * scale, baseline - pos.y_offset * scale):
            layer = Image.new("1", (width, height), 0)
            ImageDraw.Draw(layer).polygon(contour, fill=1)
            glyph = ImageChops.logical_xor(glyph, layer)
        acc = ImageChops.logical_or(acc, glyph)
        x += pos.x_advance * scale

    mask = acc.convert("L").resize((width // SS, height // SS), Image.LANCZOS)
    return mask, advance, size * 2


def rounded(size, radius) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return mask


def build(lang: str, out: Path) -> None:
    global _locale
    _locale = lang

    gradient = Image.new("RGB", (W, H))
    px = gradient.load()
    for y in range(H):
        for x in range(0, W, 4):
            t = x / W * 0.65 + y / H * 0.35
            colour = (
                int(0x0A + (0x2A - 0x0A) * t),
                int(0x19 + (0x4F - 0x19) * t),
                int(0x43 + (0xA8 - 0x43) * t),
            )
            for dx in range(4):
                if x + dx < W:
                    px[x + dx, y] = colour

    glow = Image.new("RGB", (W, H), "#000000")
    ImageDraw.Draw(glow).ellipse([620, -220, 1320, 380], fill="#4f76d8")
    base = Image.blend(gradient, Image.blend(gradient, glow.filter(ImageFilter.GaussianBlur(150)), 0.55), 0.55)

    own = SCREENS / lang / "tracking.webp"
    screen = Image.open(own if own.exists() else SCREENS / "en" / "tracking.webp").convert("RGB")
    dev_w = 330
    sc_w = int(dev_w * 0.93)
    sc_h = int(screen.height * sc_w / screen.width)
    screen = screen.resize((sc_w, sc_h), Image.LANCZOS)
    dev_h = sc_h + int(dev_w * 0.07)
    device = Image.new("RGB", (dev_w, dev_h), "#0b0b0d")
    device.paste(screen, ((dev_w - sc_w) // 2, (dev_w - sc_w) // 2), rounded((sc_w, sc_h), int(sc_w * 0.10)))
    mask = rounded((dev_w, dev_h), int(dev_w * 0.115))

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 150), (770, 120), mask)
    base = Image.alpha_composite(base.convert("RGBA"), shadow.filter(ImageFilter.GaussianBlur(28))).convert("RGB")
    base.paste(device, (762, 104), mask)

    draw = ImageDraw.Draw(base)
    logo = Image.open(PUBLIC / "logo.png").convert("RGBA").resize((60, 60), Image.LANCZOS)
    base.paste(logo, (80, 74), rounded((60, 60), 16))
    draw.text((156, 88), "SimpleTime", font=font("latin", 600, 30), fill="#ffffff")

    line1, line2, subtitle, meta = (shape(t, lang) for t in copy_for(lang))
    rtl = lang in RTL

    # In RTL the text block is mirrored: it starts at the right edge of the
    # column and grows leftwards, matching how the site itself lays out.
    right_edge = 728

    def place(text, weight, size, y, fill, left=78):
        x = right_edge - measure(draw, text, weight, size) if rtl else left
        draw_text(draw, x, y, text, weight, size, fill)

    # Shrink until the longest line clears the device.
    size = 74
    while size > 40 and max(measure(draw, line1, 800, size), measure(draw, line2, 800, size)) > 650:
        size -= 2
    place(line1, 800, size, 196 + (74 - size) // 2, "#ffffff")
    place(line2, 800, size, 286 + (74 - size) // 2, "#a9c0f0")

    sub_size = 27
    while sub_size > 16 and measure(draw, subtitle, 400, sub_size) > 650:
        sub_size -= 1
    place(subtitle, 400, sub_size, 410, "#d3ddf5", left=80)

    meta_size = 23
    while meta_size > 14 and measure(draw, meta, 500, meta_size) > 600:
        meta_size -= 1
    meta_lines = [meta]
    proof = proof_for(lang)
    if meta_size < 18 and len(proof) > 1:
        # Too long for one readable line – Tamil ran into the phone even at
        # 14px. Two lines instead, split where both come out largest.
        best = (0, meta_lines)
        for k in range(1, len(proof)):
            parts = [shape(" · ".join(proof[:k]), lang), shape(" · ".join(proof[k:]), lang)]
            size2 = 23
            while size2 > 14 and max(measure(draw, t, 500, size2) for t in parts) > 600:
                size2 -= 1
            if size2 > best[0]:
                best = (size2, parts)
        meta_size, meta_lines = best
    if rtl:
        draw.ellipse([right_edge + 8, 489, right_edge + 20, 501], fill="#8ea9e3")
    else:
        draw.ellipse([82, 489, 94, 501], fill="#8ea9e3")
    y = 481 + (23 - meta_size) // 2
    for line in meta_lines:
        width = measure(draw, line, 500, meta_size)
        draw_text(draw, right_edge - width if rtl else 108, y, line, 500, meta_size, "#9fb3de")
        y += round(meta_size * 1.5)

    base.save(out, optimize=True)
    used = sorted({sub for sub, _ in runs(line1 + line2 + subtitle + meta)})
    lines = f" in {len(meta_lines)} lines" if len(meta_lines) > 1 else ""
    print(f"{out.name:14} headline {size}px, subtitle {sub_size}px, promises {meta_size}px{lines}, subsets: {', '.join(used)}")


def main() -> None:
    for lang in LANGS:
        build(lang, PUBLIC / ("og.png" if lang == "en" else f"og-{lang}.png"))


if __name__ == "__main__":
    main()
