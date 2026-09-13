#!/usr/bin/env python3
"""Generate 6 WebP images per article for new 2026 articles."""
import os
from PIL import Image, ImageDraw, ImageFont

def create_img(w, h, c, label, fn, sub=None):
    img = Image.new('RGB', (w, h), c)
    d = ImageDraw.Draw(img)
    # Decorative grid
    for i in range(0, w, 50):
        d.line([(i, 0), (i, h)], fill=(255, 255, 255), width=3)
    for i in range(0, h, 50):
        d.line([(0, i), (w, i)], fill=(255, 255, 255), width=3)
    # Decorative circles
    for i in range(8):
        cx = w * (0.2 + i * 0.1)
        cy = h * (0.3 + i * 0.06)
        r = 100 + i * 25
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255), width=4)
    try:
        ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 80)
        fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 40)
    except Exception:
        ft = ImageFont.load_default()
        fs = ImageFont.load_default()
    tc = (36, 0, 70) if c[0] >= 128 else (255, 255, 255)
    d.text((w // 2, h // 2 - 60), label, fill=tc, font=ft, anchor='mm')
    if sub:
        d.text((w // 2, h // 2 + 50), sub, fill=tc, font=fs, anchor='mm')
    img.save(fn, 'WEBP', quality=92)
    return fn, os.path.getsize(fn) / 1024


def gen_artigo_imgs(base, colors, labels):
    os.makedirs(base, exist_ok=True)
    names = ['hero'] + [f'sec{j}' for j in range(1, 6)]
    for color, (label, sub), fn_name in zip(colors, labels, names):
        fn = f'{base}/{fn_name}.webp'
        path, size = create_img(1600, 800, color, label, fn, sub)
        print(f'OK: {path} ({size:.0f}KB)')


# Article 1: hype-moda-sustentavel-2026
gen_artigo_imgs(
    '/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-moda-sustentavel-2026',
    [(36, 0, 70), (106, 90, 205), (245, 245, 250), (84, 89, 95), (247, 37, 133), (50, 150, 100)],
    [
        ('MODA SUSTENTAVEL 2026', 'O HYPE DO BRASIL QUE RESPEITA O PLANETA'),
        ('TELAS RECICLADAS', 'DO PLASTICO AO ESTILO'),
        ('MODA INCLUSIVA', 'TODOS OS CORPOS, TODOS OS TAMANHOS'),
        ('UPCYCLING BRASILEIRO', 'ROUPA VELHA VIRA NOVIDADE'),
        ('CORES DA NATUREZA', 'TERRA, MUSGO E OCEANO'),
        ('GUARDA-ROUPA CONSCIENTE', 'MENOS EH MAIS'),
    ]
)

# Article 2: hype-bem-estar-emocoes-2026
gen_artigo_imgs(
    '/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-bem-estar-emocoes-2026',
    [(36, 0, 70), (247, 37, 133), (245, 245, 250), (235, 230, 220), (84, 89, 95), (50, 150, 100)],
    [
        ('BEM-ESTAR E EMOCOES 2026', 'CUIDAR DE SI E A NOVA REVOLUCAO'),
        ('MINDFULNESS BRASILEIRO', '10 MINUTOS QUE MUDAM O DIA'),
        ('AUTOCUIDADO REAL', 'FORA DA ESTETICA, DENTRO DA VERDADE'),
        ('TERAPIAS INTEGRATIVAS', 'CURA QUE RESPEITA A CULTURA'),
        ('ESPIRITUALIDADE SEM DOGMAS', 'A CONEXAO QUE NINGUEM PODE TIRAR'),
        ('ROTINA DE AUTOCUIDADO', 'PASSOS PEQUENOS, MUDANCAS REAIS'),
    ]
)

print('\nAll images created!')
