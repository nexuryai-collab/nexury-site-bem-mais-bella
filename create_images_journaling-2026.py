#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

OUT = "/opt/data/nexury-site-bem-mais-bella/nexury-site-bem-mais-bella/src/app/artigos/journaling-terapeutico-2026/images"
os.makedirs(OUT, exist_ok=True)

DARK_BG = (36, 0, 70)
MID_BG = (84, 89, 95)
LIGHT_BG = (154, 164, 175)
PINK = (242, 37, 133)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

def make_image(bg, text, text_color, path):
    img = Image.new('RGB', (1200, 600), bg)
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    lines = textwrap.wrap(text, width=22)
    line_height = 60
    total_h = len(lines) * line_height
    start_y = (600 - total_h) // 2
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        x = (1200 - tw) // 2
        y = start_y + i * line_height
        draw.text((x, y), line, fill=text_color, font=font)
    draw.rectangle([0, 0, 1199, 599], outline=WHITE, width=3)
    img.save(os.path.join(OUT, path), 'WEBP', quality=90)
    print(f"Saved: {path}")

make_image(DARK_BG, "JOURNALING TERAPÊUTICO 2026 – Escreva para Curar", WHITE, "hero.webp")
make_image(MID_BG, "Gratidão: O poder das palavras", WHITE, "sec1.webp")
make_image(LIGHT_BG, "Reflexão: Entenda suas emoções", BLACK, "sec2.webp")
make_image(DARK_BG, "Criatividade: Desbloqueie sua expressão", WHITE, "sec3.webp")
make_image(MID_BG, "Planejamento: Trace seu caminho", WHITE, "sec4.webp")
make_image(PINK, "Cada página é um novo recomeço", BLACK, "sec5.webp")
print("Done!")