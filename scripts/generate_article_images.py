#!/usr/bin/env python3
import sys, os, hashlib, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def generate(slug):
    random.seed(hash(slug) & 0xffffffff)
    out_dir = Path(f"/opt/data/nexury-site-bem-mais-bella/public/artigos/{slug}")
    out_dir.mkdir(parents=True, exist_ok=True)

    palettes = [
        ['#240046', '#54595F', '#9AA4AF', '#F72585'],
        ['#0A1128', '#1B3A4B', '#2E8BC0', '#A9D0F5'],
        ['#1B1A17', '#3D3B3A', '#7E7B78', '#D4A843'],
        ['#0D3B66', '#1D6B8E', '#419D78', '#FAE45C'],
        ['#4A0D67', '#7B1FA2', '#AB47BC', '#F48FB1'],
        ['#002B5C', '#005F8A', '#008F9B', '#00C9A7'],
        ['#5D0E41', '#8B1A5C', '#C41E3A', '#F94C10'],
        ['#1A1A2E', '#16213E', '#0F3460', '#E94560'],
    ]
    idx = hash(slug) % len(palettes)
    base, mid, light, accent = [hex_to_rgb(c) for c in palettes[idx]]
    palette = [base, mid, light]
    accent_rgb = accent

    def make(path, is_hero=False):
        w, h = 1600, 900
        img = Image.new('RGB', (w, h), palette[0])
        px = img.load()
        for y in range(h):
            t = y / h
            for x in range(w):
                sx = x / w
                r = int(palette[1][0] * (1 - t) + palette[2][0] * t + accent_rgb[0] * sx * (1 - sx) * 12)
                g = int(palette[1][1] * (1 - t) + palette[2][1] * t + accent_rgb[1] * sx * (1 - sx) * 12)
                b = int(palette[1][2] * (1 - t) + palette[2][2] * t + accent_rgb[2] * sx * (1 - sx) * 12)
                px[x, y] = (min(255, max(0, r)), min(255, max(0, g)), min(255, max(0, b)))
        draw = ImageDraw.Draw(img, 'RGBA')
        for i in range(5):
            x = 80 + i * 280
            y = 100 + (i % 2) * 120
            draw.ellipse((x, y, x + 300, y + 200), fill=accent_rgb + (70,), outline=palette[2] + (120,), width=6)
        draw.rectangle((500, 580, 1100, 740), fill=accent_rgb + (80,), outline=palette[1] + (120,), width=6)
        img = img.filter(ImageFilter.GaussianBlur(0.2))
        img.save(path, 'WEBP', quality=88, method=6)
        size = os.path.getsize(path)
        print(f"  {path.name}: {size} bytes")

    make(out_dir / "hero.webp", is_hero=True)
    for i in range(1, 6):
        make(out_dir / f"sec{i}.webp")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: generate_article_images.py <slug>")
        sys.exit(1)
    generate(sys.argv[1])