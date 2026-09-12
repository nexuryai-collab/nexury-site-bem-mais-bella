"""Cria 6 imagens WebP para o artigo: Relacionamentos Conscientes 2026"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = '/opt/data/nexury-site-bem-mais-bella/public/artigos/relacionamentos-conscientes-2026-conexao'
os.makedirs(OUT, exist_ok=True)

PURPLE = (36, 0, 70)
PINK = (247, 37, 133)
GREY = (84, 89, 95)
LIGHT = (154, 164, 175)
WHITE = (245, 245, 250)
CREAM = (235, 230, 220)
GREEN = (46, 139, 87)
BLUE = (70, 130, 180)
GOLD = (218, 165, 32)

def make(w, h, bg, fg, title, subtitle=None, accent=None):
    img = Image.new('RGB', (w, h), bg)
    d = ImageDraw.Draw(img)
    for i in range(0, w, 60):
        d.line([(i, 0), (i, h)], fill=(255,255,255), width=1)
    for i in range(0, h, 60):
        d.line([(0, i), (w, i)], fill=(255,255,255), width=1)
    for i in range(5):
        cx = w*(0.15+i*0.18)
        cy = h*(0.2+i*0.12)
        r = 60+i*20
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=accent if accent else fg, width=3)
    try:
        ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 72)
        fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
    except:
        ft = ImageFont.load_default()
        fs = ImageFont.load_default()
    d.text((w//2, h//2-40), title, fill=fg, font=ft, anchor='mm')
    if subtitle:
        d.text((w//2, h//2+60), subtitle, fill=fg, font=fs, anchor='mm')
    return img

images = [
    ('hero', make(1600, 800, PURPLE, WHITE, 'CONEXÃO AUTÊNTICA', 'Relacionamentos 2026', PINK)),
    ('sec1', make(1600, 800, GREEN, WHITE, 'VULNERABILIDADE', 'A chave da conexão', LIGHT)),
    ('sec2', make(1600, 800, BLUE, WHITE, 'COMUNICAÇÃO', 'Que transforma', CREAM)),
    ('sec3', make(1600, 800, GOLD, PURPLE, 'MULHERES', 'Redefinindo conexões', PINK)),
    ('sec4', make(1600, 800, GREY, WHITE, 'PRÁTICAS', 'Diárias de conexão', LIGHT)),
    ('sec5', make(1600, 800, PINK, PURPLE, 'AMOR', 'Que evolui', GOLD)),
]

for name, img in images:
    fn = os.path.join(OUT, f'{name}.webp')
    img.save(fn, 'WEBP', quality=92)
    size = os.path.getsize(fn)/1024
    print(f'OK: {fn} ({size:.0f}KB)')

print('\nAll images created!')