#!/usr/bin/env python3
"""Generate src/styles/fonts.css from the Fontsource stylesheets.

The site spans six scripts. Declaring every @font-face by hand stopped
being reasonable at Japanese, which Fontsource splits into 124 subsets,
and it was already error-prone before that: several packages claim
codepoints outside their own script — Armenian claims the hyphen,
Arabic claims general punctuation, and some Japanese subsets claim Latin.
Any one of those pulls a whole extra font onto every page on the site.

So ranges are not copied verbatim. Each subset keeps only what no
higher-priority subset already covers, in the SOURCES order below. Latin
wins ties, Japanese loses them, and an overlap can no longer cost every
visitor a download.

All faces are declared under the family name 'Inter' so components never
switch font-family; the browser picks the file by unicode-range.

Japanese and Chinese go to files of their own, fonts-ja.css and
fonts-zh.css, imported only by the /ja/ and /zh/ pages. Their 217 faces
were 81 % of the render-blocking stylesheet on every page of the site,
although only two languages of eighteen ever use them.

Run after adding a locale that needs a new script:

    python3 scripts/generate-fonts-css.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = ROOT / "node_modules"
OUT = ROOT / "src/styles/fonts.css"
# The CJK families, each in a stylesheet only its own pages import.
OWN_FILE = {
    "japanese": ROOT / "src/styles/fonts-ja.css",
    "chinese": ROOT / "src/styles/fonts-zh.css",
}

WEIGHTS = (400, 500, 600, 700, 800)

# (label, package, subset, css file, file template, family, variable?, shared?)
#
# `shared` entries form one de-overlapping chain under the 'Inter' family:
# each keeps only what no earlier entry claimed, so a script's font is
# never pulled onto a page that lacks that script.
#
# The CJK fonts sit outside that chain, for two separate reasons.
#
# They cannot share the 'Inter' family: their faces declare a variable
# weight range (100 900) while every other face declares a discrete
# weight, and Chrome then never selects them — it matches a discrete face
# by weight, finds no glyph and falls straight out of the family to a
# system font. Measured: /ja/ requested no Japanese file at all.
#
# And they cannot de-overlap against each other: Japanese and Chinese
# share 11,245 codepoints, 72% of the smaller set. Subtracting would hand
# most Han characters to whichever came first and render the other
# language in the wrong regional glyph forms. Each keeps its full
# coverage under its own family, selected per locale in global.css.
SOURCES = [
    ("latin", "@fontsource/inter", "latin", "400.css", "inter-latin-{w}-normal.woff2", "Inter", False, True),
    ("latin-ext", "@fontsource/inter", "latin-ext", "400.css", "inter-latin-ext-{w}-normal.woff2", "Inter", False, True),
    ("cyrillic", "@fontsource/inter", "cyrillic", "400.css", "inter-cyrillic-{w}-normal.woff2", "Inter", False, True),
    ("armenian", "@fontsource/noto-sans-armenian", "armenian", "400.css", "noto-sans-armenian-armenian-{w}-normal.woff2", "Inter", False, True),
    ("arabic", "@fontsource/noto-sans-arabic", "arabic", "400.css", "noto-sans-arabic-arabic-{w}-normal.woff2", "Inter", False, True),
    ("greek", "@fontsource/inter", "greek", "400.css", "inter-greek-{w}-normal.woff2", "Inter", False, True),
    ("devanagari", "@fontsource/noto-sans-devanagari", "devanagari", "400.css", "noto-sans-devanagari-devanagari-{w}-normal.woff2", "Inter", False, True),
    ("hebrew", "@fontsource/noto-sans-hebrew", "hebrew", "400.css", "noto-sans-hebrew-hebrew-{w}-normal.woff2", "Inter", False, True),
    ("japanese", "@fontsource-variable/noto-sans-jp", None, "index.css", None, "Noto Sans JP", True, False),
    ("chinese", "@fontsource-variable/noto-sans-sc", None, "index.css", None, "Noto Sans SC", True, False),
]


def parse_points(spec: str) -> set[int]:
    points: set[int] = set()
    for part in spec.split(","):
        part = part.strip().removeprefix("U+")
        if not part:
            continue
        if "-" in part:
            lo, hi = part.split("-")
            points.update(range(int(lo, 16), int(hi, 16) + 1))
        else:
            points.add(int(part, 16))
    return points


def to_spec(points: set[int]) -> str:
    """Compact a codepoint set back into unicode-range syntax."""
    out: list[str] = []
    for point in sorted(points):
        if out:
            lo, hi = out[-1]
            if point == hi + 1:
                out[-1] = (lo, point)
                continue
        out.append((point, point))
    return ",".join(f"U+{lo:X}" if lo == hi else f"U+{lo:X}-{hi:X}" for lo, hi in out)


def read_faces(pkg: str, css_name: str, subset: str | None) -> list[tuple[str, set[int]]]:
    """Return [(file stem, codepoints)] for one package."""
    css = (NODE / pkg / css_name).read_text(encoding="utf-8")
    faces = []
    for match in re.finditer(r"@font-face \{(.*?)\}", css, re.S):
        body = match.group(1)
        src = re.search(r"url\(\./files/([^)]+?\.woff2)\)", body)
        rng = re.search(r"unicode-range:\s*([^;]+);", body)
        if not src or not rng:
            continue
        name = src.group(1)
        if subset is not None and f"-{subset}-400-normal" not in name:
            continue
        faces.append((name, parse_points(rng.group(1))))
    return faces


lines = [
    "/* GENERATED by scripts/generate-fonts-css.py — do not edit by hand.",
    " *",
    " * Every face is declared as 'Inter' so components never switch family;",
    " * the browser picks the file by unicode-range. Ranges are de-overlapped",
    " * in priority order, so no script's font is pulled onto a page that does",
    " * not contain that script.",
    " */",
    "",
]

claimed: set[int] = set()
summary: list[tuple[str, int, int]] = []

own: dict[str, list[str]] = {}

for label, pkg, subset, css_name, template, family, variable, shared in SOURCES:
    faces = read_faces(pkg, css_name, subset)
    out = own.setdefault(label, []) if label in OWN_FILE else lines
    if not faces:
        raise SystemExit(f"no faces found for {label} in {pkg}/{css_name}")

    emitted = 0
    dropped = 0
    for filename, points in faces:
        trimmed = points - claimed
        dropped += len(points) - len(trimmed)
        if not trimmed:
            continue
        # Only the shared chain claims codepoints; the CJK families are
        # trimmed against it but never against each other.
        if shared:
            claimed |= trimmed
        spec = to_spec(trimmed)

        if variable:
            out += [
                "@font-face {",
                f"  font-family: '{family}';",
                "  font-style: normal;",
                "  font-weight: 100 900;",
                "  font-display: swap;",
                # Fontsource writes format('woff2-variations'), a proposed syntax
                # browsers never settled on — Chrome treats it as unknown and
                # skips the source, so no Japanese font loads at all. woff2 is
                # the container format either way.
                f"  src: url('../../node_modules/{pkg}/files/{filename}') format('woff2');",
                f"  unicode-range: {spec};",
                "}",
                "",
            ]
            emitted += 1
        else:
            for weight in WEIGHTS:
                out += [
                    "@font-face {",
                    f"  font-family: '{family}';",
                    "  font-style: normal;",
                    f"  font-weight: {weight};",
                    "  font-display: swap;",
                    f"  src: url('../../node_modules/{pkg}/files/{template.format(w=weight)}') format('woff2');",
                    f"  unicode-range: {spec};",
                    "}",
                    "",
                ]
                emitted += 1
    summary.append((label, emitted, dropped))

OUT.write_text("\n".join(lines), encoding="utf-8")
for label, path in OWN_FILE.items():
    header = [
        "/* GENERATED by scripts/generate-fonts-css.py — do not edit by hand.",
        " *",
        f" * The {label.capitalize()} faces, kept out of fonts.css: only the pages in",
        " * that language import this file, so no other page pays for its rules.",
        " */",
        "",
    ]
    path.write_text("\n".join(header + own[label]), encoding="utf-8")

print(f"{OUT.relative_to(ROOT)} + {', '.join(p.name for p in OWN_FILE.values())}: {sum(n for _, n, _ in summary)} faces")
for label, emitted, dropped in summary:
    note = f", {dropped} codepoints already claimed" if dropped else ""
    print(f"  {label:10} {emitted:4} faces{note}")
