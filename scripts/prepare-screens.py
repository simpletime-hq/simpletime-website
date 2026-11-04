#!/usr/bin/env python3
"""Copy the app's own screenshots into the site, one set per language.

The website shows the same screens as the App Store: the raw simulator
screenshots the App Store images are composed from (StoreShots in the app
repository), in the visitor's language. They are already at the iPhone's
true 1320:2868 ratio, so they only need to be scaled down and converted.

  src/assets/screens/<lang>/<name>.webp   iPhone, 1080 px wide
  src/assets/ipad/<lang>/<name>.webp      iPad, 1032 px wide
  src/assets/mac/<lang>/<name>.webp       Mac, 1600 x 1000
  src/assets/watch/<lang>/<name>.webp     Apple Watch, 416 x 496
  src/assets/pro/                         the Pro mark and the app icons

Armenian has no App Store page and therefore no screenshots; the pages fall
back to English (see src/i18n/screens.ts).

Run after new App Store screenshots were taken:

    python3 scripts/prepare-screens.py [path/to/SimpleTime-app-folder]
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
APP = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "XcodeProjects/SimpleTime"
PHONE_SRC = APP / "Screenshots-4.0"
MAC_SRC = APP / "Screenshots-mac"
WATCH_SRC = APP / "SimpleTime/StoreShots/fertig/uhr"
ASSETS_SRC = APP / "SimpleTime/SimpleTime/Assets.xcassets"

OUT = ROOT / "src/assets"

# Website language -> folder name in the app repository.
LANGS = {
    "en": "en", "de": "de", "nl": "nl", "sv": "sv", "fr": "fr", "it": "it", "es": "es",
    "pt": "pt", "ru": "ru", "uk": "uk", "el": "el", "tr": "tr", "ar": "ar", "he": "he",
    "hi": "hi", "zh": "zh-Hans", "ja": "ja",
}

# The seven App Store images, in App Store order, plus the second report page.
PHONE = {
    "tracking": "01-tracking.png",
    "day": "02-day-list.png",
    "timeline": "03-day-timeline.png",
    "chart": "04-chart-week.png",
    "statistics": "05-statistics.png",
    "report": "10-report-1.png",
    "report-2": "11-report-2.png",
    "pro": "08-pro.png",
}
# One screen each for the other devices – the same in every language.
IPAD = {"timeline": "03-day-timeline.png"}
MAC = {"chart": "04-chart-week.png"}
WATCH = {"running": "1-laeuft.png", "start": "2-starten.png", "today": "3-heute.png", "goals": "5-ziele.png"}
# Large enough for a phone 360 px wide on a 3x screen; Astro scales down from here.
PHONE_WIDTH = 1080
IPAD_WIDTH = 1032
MAC_SIZE = (1600, 1000)

# The eight colourways, each shown with the Pro star.
ICONS = ["Standard", "Petrol", "Violet", "Slate", "Forest", "Burgundy", "Graphite", "Espresso"]


def save_webp(img: Image.Image, target: Path, quality: int = 84) -> int:
    target.parent.mkdir(parents=True, exist_ok=True)
    img.save(target, "WEBP", quality=quality, method=6)
    return target.stat().st_size


def main() -> None:
    total = 0
    for lang, folder in LANGS.items():
        for name, file in PHONE.items():
            src = PHONE_SRC / folder / file
            img = Image.open(src).convert("RGB")
            if img.size != (1320, 2868):
                raise SystemExit(f"{src}: {img.size}, expected 1320 x 2868")
            height = round(PHONE_WIDTH * img.height / img.width)
            total += save_webp(img.resize((PHONE_WIDTH, height), Image.LANCZOS), OUT / f"screens/{lang}/{name}.webp", quality=82)
        for name, file in IPAD.items():
            src = PHONE_SRC / f"ipad-{folder}" / file
            img = Image.open(src).convert("RGB")
            height = round(IPAD_WIDTH * img.height / img.width)
            total += save_webp(img.resize((IPAD_WIDTH, height), Image.LANCZOS), OUT / f"ipad/{lang}/{name}.webp", quality=82)
        for name, file in MAC.items():
            src = MAC_SRC / folder / file
            img = Image.open(src).convert("RGB")
            if img.size != (2560, 1600):
                raise SystemExit(f"{src}: {img.size}, expected 2560 x 1600")
            total += save_webp(img.resize(MAC_SIZE, Image.LANCZOS), OUT / f"mac/{lang}/{name}.webp", quality=82)
        for name, file in WATCH.items():
            src = WATCH_SRC / folder / file
            total += save_webp(Image.open(src).convert("RGB"), OUT / f"watch/{lang}/{name}.webp", quality=88)

    mark = Image.open(ASSETS_SRC / "ProMark.imageset/ProMark.png").convert("RGB")
    total += save_webp(mark, OUT / "pro/mark.webp", quality=90)
    for icon in ICONS:
        src = ASSETS_SRC / f"IconPreviewStar{icon}.imageset/IconPreviewStar{icon}.png"
        img = Image.open(src).convert("RGB").resize((160, 160), Image.LANCZOS)
        total += save_webp(img, OUT / f"pro/icon-{icon.lower()}.webp", quality=90)

    print(f"{len(LANGS)} languages, {total / 1_000_000:.1f} MB written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
