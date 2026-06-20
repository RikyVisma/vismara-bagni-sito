"""Select & process 12 lavori photos to img/lavori/{01..12}.jpg + thumb/.

Selection criteria: variety (vanity/shower/full views, light/dark, classic/bold),
no construction-site artifacts, no people, no near-duplicates.
"""
from PIL import Image, ImageEnhance, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\ricca\Downloads\Vismara bagni\Foto")
OUT_FULL = Path(__file__).resolve().parent.parent / "img" / "lavori"
OUT_THUMB = OUT_FULL / "thumb"
OUT_FULL.mkdir(parents=True, exist_ok=True)
OUT_THUMB.mkdir(parents=True, exist_ok=True)

# Final 12 — order matters: #01 is used as hero background (must be high-res, bright, broad view).
SOURCES = [
    # 01: hero — bagno marmo bianco con finestra (overview luminoso, alta risoluzione)
    "WhatsApp Image 2026-06-19 at 20.16.41.jpeg",
    # 02: lavandino ovale su mensola legno + specchio rotondo + colonna nera
    "WhatsApp Image 2026-06-19 at 20.15.22 (2).jpeg",
    # 03: doccia walk-in marmo bianco + soffione nero
    "WhatsApp Image 2026-06-19 at 20.17.26 (2).jpeg",
    # 04: bagno scuro con specchio LED + pampas (pezzo forte ma a bassa risoluzione)
    "WhatsApp Image 2026-06-19 at 20.16.12.jpeg",
    # 05: lavandino su top nero marmorizzato
    "WhatsApp Image 2026-06-19 at 20.15.22 (4).jpeg",
    # 06: bagno con specchio LED rotondo + mensola legno + colonna + pianta
    "WhatsApp Image 2026-06-19 at 20.18.09 (1).jpeg",
    # 07: bagno beige + mobile cassettato + specchio LED
    "WhatsApp Image 2026-06-19 at 20.17.26.jpeg",
    # 08: mobili lucidi grigi + lavandino integrato marmo
    "WhatsApp Image 2026-06-19 at 20.18.09 (2).jpeg",
    # 09: bagno rosso lucido + specchio LED (singolarità cromatica)
    "WhatsApp Image 2026-06-19 at 20.17.49 (3).jpeg",
    # 10: box doccia angolare cristalli (servizio box doccia)
    "WhatsApp Image 2026-06-19 at 20.15.23.jpeg",
    # 11: doccia walk-in carta da parati tropicale + sanitari
    "WhatsApp Image 2026-06-19 at 20.17.26 (1).jpeg",
    # 12: bagno/lavanderia con lavandino bianco + mobile chiaro venature
    "WhatsApp Image 2026-06-19 at 20.15.22.jpeg",
]
assert len(SOURCES) == 12


def process_full(src: Path, dst: Path):
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    img.thumbnail((1600, 1600), Image.LANCZOS)
    img = ImageEnhance.Color(img).enhance(1.04)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = ImageEnhance.Sharpness(img).enhance(1.08)
    img.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    return img.size


def process_thumb(src: Path, dst: Path):
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    # Crop to 4:3 centered, then resize to 800x600
    img = ImageOps.fit(img, (800, 600), method=Image.LANCZOS, centering=(0.5, 0.5))
    img = ImageEnhance.Color(img).enhance(1.04)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = ImageEnhance.Sharpness(img).enhance(1.08)
    img.save(dst, "JPEG", quality=80, optimize=True, progressive=True)
    return img.size


if __name__ == "__main__":
    print(f"Processing {len(SOURCES)} lavori photos…")
    for i, name in enumerate(SOURCES, start=1):
        idx = f"{i:02d}"
        src = SRC / name
        full_sz = process_full(src, OUT_FULL / f"{idx}.jpg")
        thumb_sz = process_thumb(src, OUT_THUMB / f"{idx}.jpg")
        print(f"  {idx}: full={full_sz} thumb={thumb_sz}  <-  {name}")
    print("Done.")
