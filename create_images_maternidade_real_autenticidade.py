import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/maternidade-real-autenticidade-cuidado-bebe-2026'
os.makedirs(out, exist_ok=True)

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 42)
    font_sub = ImageFont.load_default()
except:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()

def make(name, bg, fg, t1, t2=''):
    img = Image.new('RGB', (1200, 630), bg)
    d = ImageDraw.Draw(img)
    d.text((60, 200), t1, fill=fg, font=font_title)
    if t2:
        d.text((60, 290), t2, fill=fg, font=font_sub)
    img.save(f'{out}/{name}.webp', 'WEBP')

# Paleta Bem Mais Bella: rosa suave, verde suave
make('hero',    (245, 240, 252), (100, 80, 120), 'MATERNIDADE REAL', 'Cuidando do Bebê e de Si Mesma em 2026')
make('secao-1', (240, 245, 250), (15, 60, 40), 'BONDAGEM COM BEBÊ', 'O Amor que Transforma')
make('secao-2', (250, 245, 250), (60, 40, 20), 'CUIDADO COM O CORPO', 'Além da Rotina do Bebê')
make('secao-3', (248, 245, 252), (100, 30, 80), 'AUTOCARE PARA MÃES', 'Priorizar Você é Priorizar o Bebê')
make('secao-4', (252, 248, 250), (30, 20, 60), 'RELAÇÕES E SUPOORTES', 'Comunidade que Acolhe')
make('secao-5', (250, 245, 240), (100, 60, 20), 'AUTOESTIMA E IDENTIDADE', 'Você é Mais que Mãe')
make('secao-6', (250, 248, 240), (40, 60, 20), 'DICAS PRÁTICAS', 'Rotinas que Fazem Sentido')

print("Imagens de maternidade-real-autenticidade-cuidado-bebe-2026 criadas!")