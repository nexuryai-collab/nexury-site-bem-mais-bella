from PIL import Image, ImageDraw, ImageFont
import os

def create_image(width, height, bg_color, text, text_color):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 36)
    except:
        font = ImageFont.load_default()
    y_pos = height // 3
    lines = text.split(' | ')
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        text_width = bbox[2] - bbox[0]
        x_pos = (width - text_width) // 2
        draw.text((x_pos, y_pos), line, fill=text_color, font=font)
        y_pos += 60
    return img

base = '/opt/data/nexury-site-bem-mais-bella/src/app/artigos'

# Article 1 images
path1 = f'{base}/moda-consciente-2026-hype-brasil/images'
os.makedirs(path1, exist_ok=True)
hero = create_image(1200, 600, (35, 40, 60), 'MODA CONSCIENTE 2026 | A REVOLUCAO SUSTENTAVEL', (240, 245, 250))
hero.save(f'{path1}/hero.webp', 'WEBP')
texts = [
    'TECIDOS SUSTENTAVEIS | E RECICLADOS TENDENCIAS 2026',
    'MODA INCLUSIVA | ESTILO PARA TODOS OS CORPOS',
    'MODA CIRCULAR | TROCA E ALUGUEL',
    'ACESSORIOS ETICOS | CONSCIENCIA E BELEZA',
    'DADOS E IMPACTO | A REVOLUCAO DO BRASIL'
]
for i, t in enumerate(texts, 1):
    img = create_image(1200, 600, (240, 245, 250), t.replace(' | ', '\n'), (35, 40, 60))
    img.save(f'{path1}/sec{i}.webp', 'WEBP')

# Article 2 images
path2 = f'{base}/resiliencia-feminina-2026-hype/images'
os.makedirs(path2, exist_ok=True)
hero2 = create_image(1200, 600, (60, 35, 60), 'RESILIENCIA FEMININA 2026 | O HYPE DO BRASIL', (240, 245, 250))
hero2.save(f'{path2}/hero.webp', 'WEBP')
texts2 = [
    'O HYPE DA RESILIENCIA | POR QUE 2026 E DIFERENTE',
    'ESTRATEGIAS DE RESILIENCIA | MINDFULNESS E JORNALING',
    'CONEXAO COM OUTRAS MULHERES | SUPORTE REAL',
    'OBSERVACAO DA LILLITH | ACOLHIMENTO E FORCA',
    'DADOS E IMPACTO | A TENDENCIA NACIONAL'
]
for i, t in enumerate(texts2, 1):
    img2 = create_image(1200, 600, (240, 245, 250), t.replace(' | ', '\n'), (60, 35, 60))
    img2.save(f'{path2}/sec{i}.webp', 'WEBP')

print('OK', os.listdir(path1), os.listdir(path2))