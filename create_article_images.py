#!/usr/bin/env python3
"""
Gera 6 imagens WebP para um artigo (1 hero + 5 sections).
Uso: python create_article_images.py <slug> <categoria> <titulos_secoes>
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Paleta BEM MAIS BELLA
PALETA = {
    "roxo_profundo": (36, 0, 70),      # #240046
    "cinza_medio": (84, 89, 95),       # #54595F
    "cinza_claro": (154, 164, 175),    # #9AA4AF
    "rosa_vibrante": (247, 37, 133),   # #F72585
    "branco": (255, 255, 255),
    "rosa_claro": (255, 240, 245),
    "roxo_claro": (245, 240, 255),
    "verde_claro": (240, 255, 240),
    "amarelo_claro": (255, 255, 240),
    "azul_claro": (240, 245, 255),
}

def get_font(size=40):
    """Tenta carregar fonte, fallback para default."""
    font_paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    ]
    for fp in font_paths:
        try:
            return ImageFont.truetype(fp, size)
        except:
            pass
    return ImageFont.load_default()

def create_image(width, height, bg_color, title, subtitle="", accent_color=None):
    """Cria imagem com título e subtítulo centralizados."""
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    font_title = get_font(52)
    font_sub = get_font(28)
    
    # Cor do texto baseada no bg
    text_color = PALETA["roxo_profundo"] if bg_color != PALETA["roxo_profundo"] else PALETA["branco"]
    
    # Desenhar faixa de accent se fornecida
    if accent_color:
        draw.rectangle([0, 0, width, 8], fill=accent_color)
    
    # Centralizar título
    title_lines = textwrap.wrap(title, width=35)
    total_title_height = len(title_lines) * 60
    y_start = (height - total_title_height - (30 if subtitle else 0)) // 2
    
    for line in title_lines:
        bbox = draw.textbbox((0, 0), line, font=font_title)
        text_w = bbox[2] - bbox[0]
        draw.text(((width - text_w) // 2, y_start), line, fill=text_color, font=font_title)
        y_start += 60
    
    if subtitle:
        bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
        text_w = bbox[2] - bbox[0]
        draw.text(((width - text_w) // 2, y_start + 20), subtitle, fill=PALETA["cinza_medio"], font=font_sub)
    
    return img

def generate_article_images(slug, category, section_titles, hero_title):
    """Gera as 6 imagens para um artigo."""
    # Diretório: public/artigos/<slug>/
    img_dir = f"public/artigos/{slug}"
    os.makedirs(img_dir, exist_ok=True)
    
    # 1. Hero
    hero_img = create_image(
        1200, 600,
        PALETA["roxo_profundo"],
        hero_title,
        f"Bem Mais Bella • {category}",
        PALETA["rosa_vibrante"]
    )
    hero_img.save(f"{img_dir}/hero.webp", "WEBP", quality=85)
    print(f"✓ hero.webp")
    
    # 2-6. Sections
    section_colors = [
        PALETA["rosa_claro"],
        PALETA["roxo_claro"], 
        PALETA["verde_claro"],
        PALETA["amarelo_claro"],
        PALETA["azul_claro"],
    ]
    
    for i, (title, color) in enumerate(zip(section_titles, section_colors), 1):
        sec_img = create_image(
            1200, 600,
            color,
            title,
            f"Seção {i} • {category}",
            PALETA["rosa_vibrante"]
        )
        sec_img.save(f"{img_dir}/section{i}.webp", "WEBP", quality=85)
        print(f"✓ section{i}.webp")
    
    print(f"\n✅ Imagens salvas em: {img_dir}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python create_article_images.py <slug> <categoria> 'título hero' 'sec1' 'sec2' 'sec3' 'sec4' 'sec5'")
        print("Exemplo: python create_article_images.py saude-mental-materna-2026 'Maternidade e Família' 'Saúde Mental Materna 2026' 'Realidade do Pós-Parto' 'Sinais de Alerta' 'Rede de Apoio' 'Autocuidado Possível' 'Buscar Ajuda Profissional'")
        sys.exit(1)
    
    slug = sys.argv[1]
    category = sys.argv[2]
    hero_title = sys.argv[3]
    section_titles = sys.argv[4:9] if len(sys.argv) >= 9 else [
        "Entendendo o Contexto",
        "Sinais e Sintomas",
        "Como se Cuidar",
        "Rede de Apoio",
        "Quando Buscar Ajuda"
    ]
    
    generate_article_images(slug, category, section_titles, hero_title)