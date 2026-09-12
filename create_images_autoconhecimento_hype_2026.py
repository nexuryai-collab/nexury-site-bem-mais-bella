import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

out = '/workspace/nexury-site-bem-mais-bella/public/artigos/autoconhecimento-hype-brasil-2026'
os.makedirs(out, exist_ok=True)

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 56)
    font_sub = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 36)
    font_tag = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)
    font_small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
except:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_tag = ImageFont.load_default()
    font_small = ImageFont.load_default()

def gradient_bg(w, h, c1, c2):
    """Create gradient background"""
    img = Image.new('RGB', (w, h))
    for y in range(h):
        r = int(c1[0] + (c2[0] - c1[0]) * y / h)
        g = int(c1[1] + (c2[1] - c1[1]) * y / h)
        b = int(c1[2] + (c2[2] - c1[2]) * y / h)
        for x in range(w):
            img.putpixel((x, y), (r, g, b))
    return img

def make(name, bg1, bg2, fg, t1, t2='', tag='', w=1280, h=720):
    img = gradient_bg(w, h, bg1, bg2)
    d = ImageDraw.Draw(img)
    
    # Decorative circles
    for cx, cy, r, alpha in [(100, 100, 150, 40), (1100, 500, 200, 30), (600, 600, 180, 25)]:
        for i in range(r, 0, -10):
            color = (fg[0], fg[1], fg[2])
            d.ellipse([cx-i, cy-i, cx+i, cy+i], outline=color, width=2)
    
    # Tag at top
    if tag:
        d.text((60, 60), tag.upper(), fill=fg, font=font_tag)
    
    # Title
    d.text((60, 250), t1, fill=fg, font=font_title)
    if t2:
        d.text((60, 380), t2, fill=fg, font=font_sub)
    
    # Decorative line
    d.line([(60, 340), (600, 340)], fill=fg, width=4)
    
    img.save(f'{out}/{name}.webp', 'WEBP', quality=95)
    size = os.path.getsize(f'{out}/{name}.webp')
    print(f'Created {name}.webp - {size} bytes')

# Paleta Bem Mais Bella: roxo escuro, rosa vibrante
make('hero',    (36, 0, 70), (80, 0, 120), (247, 37, 133), 'AUTOCONHECIMENTO HYPE 2026', 'O Movimento que Está Transformando o Brasil', 'Bem Mais Bella')
make('sec1',    (30, 0, 60), (90, 20, 130), (255, 200, 220), 'POR QUE O AUTOCONHECIMENTO ESTÁ EM ALTA', 'Mulheres brasileiras cansadas de viver vidas que não refletem quem são', 'Bem Mais Bella')
make('sec2',    (50, 10, 80), (100, 30, 140), (247, 37, 133), 'OS 5 PILARES DO AUTOCONHECIMENTO', 'Journaling, meditação, terapia, criatividade e comunidade', 'Bem Mais Bella')
make('sec3',    (20, 30, 70), (80, 50, 120), (200, 180, 255), 'EXERCÍCIOS PRÁTICOS PARA COMEÇAR', 'Cartografia de valores, linha do tempo e meditação de 5 minutos', 'Bem Mais Bella')
make('sec4',    (60, 10, 90), (110, 40, 150), (180, 140, 255), 'DESAFIOS E COMO SUPERÁ-LOS', 'Medo do julgamento, pressa por resultados e comparação', 'Bem Mais Bella')
make('sec5',    (40, 20, 100), (120, 60, 160), (255, 220, 180), 'VOCÊ JÁ É SUficiente', 'A jornada de autoconhecimento é um abraço, não um chicote', 'Bem Mais Bella')

print("\nTodas as imagens criadas!")