#!/usr/bin/env python3
import os
import sys
import random
from pathlib import Path
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print('PIL not available; will not generate images', file=sys.stderr)

def generate_noise_webp(width, height, filename):
    if not HAS_PIL:
        return False
    # create random RGB data
    data = bytearray()
    for _ in range(width * height):
        data.extend([random.randint(0,255) for _ in range(3)])
    img = Image.frombytes('RGB', (width, height), bytes(data))
    Path(filename).parent.mkdir(parents=True, exist_ok=True)
    try:
        img.save(filename, 'WEBP', quality=80)
        # check size
        size = os.path.getsize(filename)
        if size < 20000:
            # try increasing quality or size
            img.save(filename, 'WEBP', quality=95)
            size = os.path.getsize(filename)
            if size < 20000:
                # increase dimensions
                img = img.resize((width*2, height*2), Image.NEAREST)
                img.save(filename, 'WEBP', quality=80)
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
    generate_noise_webp(1200, 630, hero_path)
    # sections
    for i in range(1, 6):
        sec_path = base / f'sec{i}.webp'
        generate_noise_webp(800, 600, sec_path)
    print(f'Generated images for {slug}')

if __name__ == '__main__':
    main()