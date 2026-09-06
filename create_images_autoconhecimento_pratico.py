import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/autoconhecimento-pratico-2026'
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

# Paleta Bem Mais Bella: roxo escuro, rosa vibrante
make('hero',    (36, 0, 70), (247, 37, 133), 'AUTOCONHECIMENTO PRÁTICO', 'Mulheres Brasileiras em 2026')
make('secao-1', (245, 240, 252), (36, 0, 70), 'JORNALING TERAPÊUTICO', 'Escrita que transforma')
make('secao-2', (252, 245, 250), (100, 30, 80), 'MEDITACAO MINDFULNESS', 'Presente em cada respiro')
make('secao-3', (240, 248, 245), (15, 60, 40), 'IDENTIDADE E VALORES', 'Quem voce realmente e')
make('secao-4', (248, 245, 252), (30, 20, 100), 'LIMITES SAUDÁVEIS', 'Aprenda a dizer nao com amor')
make('secao-5', (250, 245, 240), (100, 60, 20), 'CRENÇAS LIMITANTES', 'Desconstrua para reconstruir')

print("Imagens autoconhecimento-pratico-2026 criadas!")
