#!/usr/bin/env python3
"""Gera imagens WebP para artigo mindfulness-feminino-hype-2026."""
import os
from PIL import Image, ImageDraw, ImageFont

PALETA = {
    "roxo_profundo": (36, 0, 70),
    "cinza_medio": (84, 89, 95),
    "cinza_claro": (154, 164, 175),
    "rosa_vibrante": (247, 37, 133),
    "branco": (255, 255, 255),
    "rosa_claro": (255, 240, 245),
    "roxo_claro": (245, 240, 255),
    "verde_claro": (240, 255, 240),
    "amarelo_claro": (255, 255, 240),
    "azul_claro": (240, 245, 255),
}

def get_font(size):
    paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except:
            pass
    return ImageFont.load_default()

def create_image(width, height, bg_color, title, subtitle="", accent_color=None, filename=""):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    font_title = get_font(52)
    font_sub = get_font(28)
    text_color = PALETA["roxo_profundo"] if bg_color != PALETA["roxo_profundo"] else PALETA["branco"]
    if accent_color:
        draw.rectangle([0, 0, width, 8], fill=accent_color)
    bbox = draw.textbbox((0, 0), title, font=font_title)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, 80), title, fill=text_color, font=font_title)
    if subtitle:
        bbox_sub = draw.textbbox((0, 0), subtitle, font=font_sub)
        sub_width = bbox_sub[2] - bbox_sub[0]
        draw.text(((width - sub_width) // 2, 140), subtitle, fill=PALETA["cinza_medio"], font=font_sub)
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, "WEBP", quality=85)
    print(f"✓ Created {filename}")

img_dir = "public/artigos/mindfulness-feminino-hype-2026"
os.makedirs(img_dir, exist_ok=True)

create_image(1200, 600, PALETA["roxo_profundo"],
    "Mindfulness Feminino: Cuidando de Si",
    "Bem Mais Bella • Saúde e Bem-Estar",
    PALETA["rosa_vibrante"], f"{img_dir}/hero.webp")

section_colors = [
    PALETA["rosa_claro"], PALETA["roxo_claro"], PALETA["verde_claro"],
    PALETA["amarelo_claro"], PALETA["azul_claro"],
]
section_titles = [
    "Respiração Consciente e Ansiedade",
    "Check-in Emocional Diário",
    "Ritual do Café da Manhã",
    "Diário de Gratidão",
    "Minha Jornada de Autocuidado"
]
for i, (title, color) in enumerate(zip(section_titles, section_colors), 1):
    create_image(1200, 600, color, title, f"Seção {i} • Saúde e Bem-Estar",
        PALETA["rosa_vibrante"], f"{img_dir}/section{i}.webp")

print(f"\n✅ All images created for mindfulness-feminino-hype-2026")