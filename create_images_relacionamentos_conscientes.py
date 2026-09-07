import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/relacionamentos-conscientes-2026'
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

# Paleta Bem Mais Bella: rosa suave, roxo
make('hero',    (245, 240, 252), (100, 80, 120), 'RELACIONAMENTOS CONSCIENTES', 'Amor com Propósito 2026')
make('conexao', (250, 245, 250), (100, 30, 80), 'CONEXÃO AUTÊNTICA', 'Presença e respeito')
make('manifestacao', (248, 245, 252), (30, 20, 100), 'MANIFESTAÇÃO CONSCIENTE', 'Amor com propósito')
make('ambiente', (245, 248, 240), (30, 60, 40), 'AMBIENTE CONSCIENTE', 'Espaço para amor')
make('secao-5', (250, 245, 252), (30, 20, 20), 'CUIDADO MÚTUO', 'Respeito aos limites')
make('secao-6', (245, 252, 250), (100, 60, 20), 'CRESCIMENTO CONJUNTO', 'Construir juntos')

print("Imagens de relacionamentos-conscientes-2026 criadas!")
print("Arquivos:", sorted(os.listdir(out)))
