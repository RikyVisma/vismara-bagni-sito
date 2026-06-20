"""One-shot script: crop/enhance team photos to 600x600 round-avatar JPEGs."""
from PIL import Image, ImageEnhance, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\ricca\Downloads\Vismara bagni\Team")
DST = Path(__file__).resolve().parent.parent / "img" / "team"
DST.mkdir(parents=True, exist_ok=True)


def process(out_name: str, src_name: str, focus_y: float = 0.4, pre_crop_top: float | None = None):
    """If pre_crop_top is set (0..1), crop source to a square starting at that fraction of
    the height first — useful for full-body shots where the face is in the top portion."""
    img = Image.open(SRC / src_name)
    img = ImageOps.exif_transpose(img)
    if pre_crop_top is not None:
        w, h = img.size
        # Take a smaller square to zoom in on head/shoulders
        square = min(w, int(h * 0.32))
        top = int(h * pre_crop_top)
        left = max(0, (w - square) // 2)
        img = img.crop((left, top, left + square, top + square))
    img = ImageOps.fit(img, (600, 600), method=Image.LANCZOS, centering=(0.5, focus_y))
    img = ImageEnhance.Color(img).enhance(1.06)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = ImageEnhance.Sharpness(img).enhance(1.1)
    img.save(DST / out_name, "JPEG", quality=86, optimize=True)
    print(f"  -> {out_name}: {img.size}")


if __name__ == "__main__":
    print("Processing team photos…")
    # Walter: chest-up selfie, face roughly upper third — bias slight upward
    process("walter.jpg", "Foto walter.jpeg", focus_y=0.30)
    # Fabrizio: full-body shot — pre-crop a square around the head/shoulders area
    process("fabrizio.jpg", "foto fabrizio.jpeg", focus_y=0.5, pre_crop_top=0.04)
    print("Done.")
