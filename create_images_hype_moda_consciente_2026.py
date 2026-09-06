#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

OUT = "/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-moda-consciente-2026"
os.makedirs(OUT, exist_ok=True)

DARK_BG = (36, 0, 70)
MID_BG = (84, 89, 95)
LIGHT_BG = (154, 164, 175)
PINK = (242, 37, 133)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

def make_image(bg, text, text_color, path, width=1200, height=600):
    img = Image.new('RGB', (width, height), bg)
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    lines = textwrap.wrap(text, width=22)
    line_height = 60
    total_h = len(lines) * line_height
    start_y = (height - total_h) // 2
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        x = (width - tw) // 2
        y = start_y + i * line_height
        draw.text((x, y), line, fill=text_color, font=font)
    draw.rectangle([0, 0, width-1, height-1], outline=WHITE, width=3)
    img.save(path, 'WEBP', quality=90)
    print(f"Saved: {path}")

make_image(DARK_BG, "HYPE MODA CONSCIENTE 2026 - A Revolucao da Moda Sustentavel", WHITE, f"{OUT}/hero.webp")
make_image(MID_BG, "MATERIAIS REGENERATIVOS - Tecidos que regeneram o planeta", WHITE, f"{OUT}/sec1.webp")
make_image(LIGHT_BG, "UPCYCLING DIGITAL - Moda com identidade unica", BLACK, f"{OUT}/sec2.webp")
make_image(DARK_BG, "CIRCUITO DE MODA CIRCULAR - Economia do compartilhamento", WHITE, f"{OUT}/sec3.webp")
make_image(MID_BG, "TECNOLOGIA DE PERSONALIZACAO - Moda feita para voce", WHITE, f"{OUT}/sec4.webp")
make_image(PINK, "FUTURO DA MODA - Sustentavel, bela e consciente", BLACK, f"{OUT}/sec5.webp")
print("Done!")
