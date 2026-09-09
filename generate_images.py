#!/usr/bin/env python3
import os
import sys
from pathlib import Path
try:
    from PIL import Image, ImageDraw
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print('PIL not available; will not generate images', file=sys.stderr)

def generate_gradient_webp(size, color1, color2, filename):
    if not HAS_PIL:
        return False
    img = Image.new('RGB', size, color1)
    draw = ImageDraw.Draw(img)
    # create horizontal gradient
    for x in range(size[0]):
        ratio = x / size[0]
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(x, 0), (x, size[1])], fill=(r, g, b))
    # ensure file exists
    Path(filename).parent.mkdir(parents=True, exist_ok=True)
    try:
        img.save(filename, 'WEBP')
        return True
    except Exception as e:
        print(f'Failed to save WEBP {filename}: {e}', file=sys.stderr)
        return False

def main():
    if len(sys.argv) < 2:
        print('Usage: generate_images.py <slug>', file=sys.stderr)
        sys.exit(1)
    slug = sys.argv[1]
    base = Path('/workspace/nexury-site-bem-mais-bella/public/artigos') / slug
    # hero
    hero_path = base / 'hero.webp'
    generate_gradient_webp((1200, 630), (30, 30, 100), (70, 130, 180), hero_path)
    # sections
    for i in range(1, 6):
        sec_path = base / f'sec{i}.webp'
        # vary colors
        c1 = (random.randint(50,200), random.randint(50,200), random.randint(50,200))
        c2 = (random.randint(50,200), random.randint(50,200), random.randint(50,200))
        generate_gradient_webp((800, 600), c1, c2, sec_path)
    print(f'Generated images for {slug}')

if __name__ == '__main__':
    import random
    main()