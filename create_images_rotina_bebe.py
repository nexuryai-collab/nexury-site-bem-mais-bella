import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/rotina-bebe-2026'
os.makedirs(out, exist_ok=True)

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 42)
    font_sub = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)
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

# Paleta Bem Mais Bella: rosa suave, verde água
make('hero',    (250, 245, 255), (120, 60, 100), 'ROTINA COM BEBÊ', 'Planejamento Prático 2026')
make('secao-1', (245, 250, 248), (15, 60, 40), 'SÔNES E DESCANSO', 'Rotina do sono do bebê')
make('secao-2', (248, 245, 250), (60, 40, 20), 'ALIMENTAÇÃO SAUDÁVEL', 'Leite, papinhas e transições')
make('secao-3', (252, 248, 245), (100, 30, 80), 'ATIVIDADES DESENVOLVIMENTO', 'Brincadeiras que ajudam a crescer')
make('secao-4', (240, 248, 245), (15, 60, 40), 'ROTINA DOS PAIS', 'Equilibrando cuidado e vida pessoal')
make('secao-5', (248, 245, 252), (30, 20, 60), 'DOCUMENTAÇÃO E ORGANIZAÇÃO', 'Caderno de rotinas e comunicados')
make('secao-6', (250, 245, 240), (100, 60, 20), 'DICAS PRÁTICAS', 'Para dias mais tranquilos')

print("Imagens rotina-bebe-2026 criadas!")