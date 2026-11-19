#!/usr/bin/env python3
"""Render the Open Graph card for every locale.

The site spans seven scripts and each font file holds only its own subset,
so a single string routinely needs several files: the Turkish headline
mixes Latin with latin-ext, and every non-Latin card keeps "iPhone",
"iPad", "Mac" and the SimpleTime wordmark in Latin.

Which file covers which character is read from the `unicode-range`
declarations Fontsource ships rather than guessed. Guessing got it wrong
once already — the Turkish dotless ı looks like a latin-ext character but
lives in the Latin subset, and rendering it from the wrong file produced
a NO GLYPH box in the middle of the headline.

Arabic additionally needs shaping and bidi reordering, which this Pillow
build cannot do (no Raqm). arabic_reshaper and python-bidi do it in pure
Python; without them the Arabic card is skipped rather than written with
disconnected letters in the wrong order:

    pip install arabic-reshaper python-bidi

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
]

def copy_for(lang: str) -> tuple[str, str, str, str]:
    """Headline (two lines), subtitle and the promises line, as on the page."""
    hero = json.loads((CONTENT / f"{lang}.json").read_text(encoding="utf-8"))["home"]["hero"]
    lines = hero["titleLead"], hero["titleAccent"], hero["eyebrow"], " · ".join(hero["proof"])
    return tuple(drawable(line) for line in lines)


def drawable(text: str) -> str:
    """What the page gets right through font fallback, a single font file cannot:
    the Hebrew copy binds prefixes to Latin names with a non-breaking hyphen
    (ל‑iPhone), which none of the subsets carry – it drew a NO GLYPH box. The
    direction marks are invisible on the page and only in the way here."""
    return text.replace("\u2011", "-").replace("\u200e", "").replace("\u200f", "")


# Every site language, in the order of the language menu.
LANGS = ["en", "de", "nl", "sv", "fr", "it", "es", "pt", "ru", "uk", "el", "tr", "hy", "ar", "he", "hi", "zh", "ja"]

RTL = {"ar", "he"}

# Both are right-to-left, but only Arabic joins its letters — running Hebrew
# through the reshaper would be a no-op at best, so it only gets the bidi pass.
RESHAPE = {"ar"}

# Devanagari reorders matras and forms conjuncts, so it cannot be drawn
# codepoint by codepoint. Those runs go through HarfBuzz and are filled
# from the glyph outlines; see draw_shaped below.
SHAPED = {"devanagari"}


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
    """Right-to-left copy needs bidi reordering — and Arabic contextual
    shaping on top — before Pillow can draw it; this build has no Raqm, so
    it is done in Python."""
    if lang not in RTL:
        return text
    try:
        from bidi.algorithm import get_display
    except ImportError:
        raise SystemExit("RTL copy needs bidi: pip install python-bidi")
    if lang in RESHAPE:
        try:
            import arabic_reshaper
        except ImportError:
            raise SystemExit("Arabic needs shaping: pip install arabic-reshaper")
        text = arabic_reshaper.reshape(text)
    return get_display(text)


# Japanese and Chinese share most Han codepoints but draw them differently,
# so the card's locale decides which CJK family may match.
CJK_PREFIX = {"ja": "jp-", "zh": "sc-"}
_locale = "en"


def subset_for(ch: str) -> str:
    allowed = CJK_PREFIX.get(_locale)
    for name, _, points in RANGES:
        if name.startswith(("jp-", "sc-")) and (allowed is None or not name.startswith(allowed)):
            continue
        if ord(ch) in points:
            return name
    return "latin"  # spaces, digits and punctuation the ranges do not list


def runs(text: str) -> list[tuple[str, str]]:
    """Split into stretches that share one font file."""
    out: list[tuple[str, str]] = []
    current, buffer = None, ""
    for ch in text:
        sub = subset_for(ch)
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
    without that every character shapes to .notdef.
    """
    key = f"{subset}-{weight}"
    if key not in _shapers:
        import io as _io

        import uharfbuzz as hb
        from fontTools.ttLib import TTFont

        path = str(next(t for n, t, _ in RANGES if n == subset)).format(w=weight)
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
    buf = hb.Buffer()
    buf.add_str(text)
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
    meta_width = measure(draw, meta, 500, meta_size)
    if rtl:
        draw.ellipse([right_edge + 8, 489, right_edge + 20, 501], fill="#8ea9e3")
        draw_text(draw, right_edge - meta_width, 481 + (23 - meta_size) // 2, meta, 500, meta_size, "#9fb3de")
    else:
        draw.ellipse([82, 489, 94, 501], fill="#8ea9e3")
        draw_text(draw, 108, 481 + (23 - meta_size) // 2, meta, 500, meta_size, "#9fb3de")

    base.save(out, optimize=True)
    used = sorted({sub for sub, _ in runs(line1 + line2 + subtitle + meta)})
    print(f"{out.name:14} headline {size}px, subtitle {sub_size}px, subsets: {', '.join(used)}")


def main() -> None:
    for lang in LANGS:
        build(lang, PUBLIC / ("og.png" if lang == "en" else f"og-{lang}.png"))


if __name__ == "__main__":
    main()
