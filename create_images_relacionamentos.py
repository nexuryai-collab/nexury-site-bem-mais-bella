#!/usr/bin/env python3
"""Generate WebP images for relacionamentos conscientes 2026 article."""

import os
from PIL import Image, ImageDraw, ImageFont

img_dir = '/opt/data/nexury-site-bem-mais-bella/public/artigos/relacionamentos-conscientes/artigos/relacionamentos-conscientes-2026'
os.makedirs(img_dir, exist_ok=True)

W, H = 1200, 600

def make_image(filename, bg1, bg2, title, subtitle=None):
    img = Image.new('RGB', (W, H), bg1)
    draw = ImageDraw.Draw(img)
    # gradient background
    for y in range(H):
        t = y / H
        r = int(bg1[0] * (1 - t) + bg2[0] * t)
        g = int(bg1[1] * (1 - t) + bg2[1] * t)
        b = int(bg1[2] * (1 - t) + bg2[2] * t)
        draw.line((0, y, W, y), fill=(r, g, b))
    # decorative circles
    for x, y, r, c in [(1050, 90, 150, (255, 255, 255, 40)), (1120, 480, 190, (255, 255, 255, 30)), (80, 520, 120, (255, 255, 255, 35))]:
        draw.ellipse((x-r, y-r, x+r, y+r), outline=c, width=8)
    # accent bars
    draw.rectangle((80, 110, 150, 420), fill=(247, 37, 133))
    draw.rectangle((180, 140, 195, 420), fill=(255, 255, 255))
    # title text
    font_path = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
    font = ImageFont.truetype(font_path, 52)
    small = ImageFont.truetype(font_path, 28)
    draw.text((220, 140), title, fill=(255, 255, 255), font=font)
    if subtitle:
        draw.text((220, 230), subtitle, fill=(255, 255, 255), font=small)
    # footer line
    draw.line((220, 330, 1000, 330), fill=(255, 255, 255), width=4)
    draw.text((220, 370), 'BEM MAIS BELLA', fill=(255, 255, 255), font=small)
    path = os.path.join(img_dir, filename)
    img.save(path, 'WEBP', quality=92)
    print(path)

make_image('hero.webp', (36, 0, 70), (84, 89, 95), 'RELACIONAMENTOS CONSCIENTES 2026', 'Vida em conexão com propósito')
make_image('sec1.webp', (247, 37, 133), (36, 0, 70), 'CONEXÃO CONSCIENTE', 'Fundamentos da conexão autêntica')
make_image('sec2.webp', (84, 89, 95), (240, 240, 245), 'CRESCIMENTO MÚTUO', 'Evolução conjunta de casais')
make_image('sec3.webp', (240, 245, 230), (36, 0, 70), 'COMUNICAÇÃO TRANSPARENTE', 'Diálogo sem filtros')
make_image('sec4.webp', (250, 240, 255), (247, 37, 133), 'LINDITH NOGAH VISÃO', 'Opinião pessoal - amor compassivo')
make_image('sec5.webp', (245, 255, 245), (36, 0, 70), 'PRÁTICAS SAUDÁVEIS', 'Construindo relacionamentos saudáveis')

print('Imagens criadas com sucesso!')
