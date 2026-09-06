import os
from PIL import Image, ImageDraw, ImageFont

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 42)
except:
    font_title = ImageFont.load_default()

def make(out, name, bg, fg, text):
    img = Image.new('RGB', (1200, 630), bg)
    d = ImageDraw.Draw(img)
    d.text((60, 200), text, fill=fg, font=font_title)
    img.save(f'{out}/{name}.webp', 'WEBP')

# Artigo 1 - secao-6
out1 = '/workspace/nexury-site-bem-mais-bella/public/images/autoconhecimento-pratico-2026'
make(out1, 'secao-6', (245, 240, 252), (36, 0, 70), 'SUA JORNADA DE AUTOCONHECIMENTO')

# Artigo 2 - secao-7
out2 = '/workspace/nexury-site-bem-mais-bella/public/images/maternidade-real-autenticidade-cuidado-bebe-2026'
make(out2, 'secao-7', (240, 248, 245), (15, 60, 40), 'HISTORIAS REAIS DE MAES')

print("OK")
print("Artigo 1:", sorted(os.listdir(out1)))
print("Artigo 2:", sorted(os.listdir(out2)))
