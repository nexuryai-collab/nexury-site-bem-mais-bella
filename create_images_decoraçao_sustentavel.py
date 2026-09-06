import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/decoração-sustentavel-2026'
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

# Paleta Bem Mais Bella: verde suave, bege
make('hero',    (245, 248, 240), (30, 60, 40), 'DECORAÇÃO SUSTENTÁVEL', 'Casa que Reflete Quem Você É em 2026')
make('secao-1', (245, 248, 252), (30, 60, 40), 'MATERIAIS SUSTENTÁVEIS', 'Tecidos, madeiras e acessórios naturais')
make('secao-2', (250, 245, 250), (100, 30, 80), 'ENERGIA LIMPA', 'Painéis solares e iluminação natural')
make('secao-4', (250, 245, 252), (30, 20, 20), 'REDUÇÃO DE RESÍDUOS', 'Compostagem e reciclagem inteligente')
make('secao-4', (252, 248, 250), (100, 20, 20), 'VIVER COM MENOS', 'Minimalismo consciente e intencional')
make('secao-5', (245, 252, 250), (100, 60, 20), 'COZINHA SUSTENTÁVEL', 'Cozinha com reaproveitamento e produtos locais')
make('secao-6', (250, 248, 240), (40, 60, 20), 'VIVER EM HARMONIA', 'Conexão com a natureza e a si mesmo')

print("Imagens de decoração-sustentavel-2026 criadas!")