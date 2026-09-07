#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

OUT = "/opt/data/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images"
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
    img.save(os.path.join(OUT, path), 'WEBP', quality=90)
    print(f"Saved: {path}")

make_image(DARK_BG, "GIRL MATH 2026 – A Matemática que Empodera Mulheres", WHITE, f"hero.webp")
make_image(MID_BG, "Consciência: Observe seus gastos", WHITE, f"sec1.webp")
make_image(LIGHT_BG, "Priorização: O que realmente importa", BLACK, f"sec2.webp")
make_image(DARK_BG, "Planejamento: Pequenos passos, grandes resultados", WHITE, f"sec3.webp")
make_image(MID_BG, "Investimento: Comece com o que você tem", WHITE, f"sec4.webp")
make_image(PINK, "Celebração: Reconheça cada conquista", BLACK, f"sec5.webp")
print("Done!")