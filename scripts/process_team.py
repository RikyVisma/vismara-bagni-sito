"""Process the professional team portraits into 4:5 portrait JPEGs.

Source: new studio shots (arms crossed, neutral background).
Fabrizio's source has a decorative sparkle bottom-right — the 4:5 center crop excludes it.
"""
from PIL import Image, ImageEnhance, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\ricca\Downloads\Vismara bagni\Team")
DST = Path(__file__).resolve().parent.parent / "img" / "team"
DST.mkdir(parents=True, exist_ok=True)

TARGET = (720, 900)  # 4:5 portrait


def process(out_name: str, src_name: str, focus_y: float):
    img = Image.open(SRC / src_name)
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")
    # Fit to 4:5 portrait, biasing vertically with focus_y (0=top .. 1=bottom)
    img = ImageOps.fit(img, TARGET, method=Image.LANCZOS, centering=(0.5, focus_y))
    img = ImageEnhance.Color(img).enhance(1.03)
    img = ImageEnhance.Contrast(img).enhance(1.03)
    img = ImageEnhance.Sharpness(img).enhance(1.06)
    img.save(DST / out_name, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"  -> {out_name}: {img.size}")


if __name__ == "__main__":
    print("Processing NEW professional team portraits...")
    # Walter: tall portrait, head near top -> bias upward to frame head-to-waist
    process("walter.jpg", "Foto Walter nuova.png", focus_y=0.18)
    # Fabrizio: landscape source, person centered; center crop drops the bottom-right sparkle
    process("fabrizio.jpg", "Foto fabrizio nuova.jpg", focus_y=0.42)
    print("Done.")
