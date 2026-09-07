from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images', exist_ok=True)
os.makedirs('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026', exist_ok=True)

def create_image(width, height, background_color, text, text_color):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
    except:
        font = ImageFont.load_default()
    y_pos = 10
    lines = text.split('\n')
    line_height = 50
    for line in lines:
        draw.text((10, y_pos), line, fill=text_color, font=font)
        y_pos += line_height
    return img

# Hero
hero = create_image(1200, 600, (140, 60, 100), "MULHER RESILIENCIA 2026\nA Arte de Recomeçar", (255, 255, 255))
hero.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/hero.webp', 'WEBP')
hero.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/hero.webp', 'WEBP')

# Section 1 - Força
sec1 = create_image(1200, 600, (160, 80, 120), "A Forca Silenciosa\nQue Define uma Geracao", (255, 255, 255))
sec1.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-1.webp', 'WEBP')
sec1.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-1.webp', 'WEBP')

# Section 2 - Histórias
sec2 = create_image(1200, 600, (80, 130, 130), "Historias que Inspiram\nMulheres Brasileiras", (255, 255, 255))
sec2.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-2.webp', 'WEBP')
sec2.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-2.webp', 'WEBP')

# Section 3 - 5 Chaves
sec3 = create_image(1200, 600, (200, 150, 80), "As 5 Chaves da Resiliencia\nFeminina em 2026", (255, 255, 255))
sec3.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-3.webp', 'WEBP')
sec3.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-3.webp', 'WEBP')

# Section 4 - Autoconhecimento
sec4 = create_image(1200, 600, (90, 140, 130), "Autoconhecimento\nProfundo e Honesto", (255, 255, 255))
sec4.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-4.webp', 'WEBP')
sec4.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-4.webp', 'WEBP')

# Section 5 - Recomeçar
sec5 = create_image(1200, 600, (110, 70, 160), "Recomecar e Courage\nNao Fraqueza", (255, 255, 255))
sec5.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-5.webp', 'WEBP')
sec5.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-5.webp', 'WEBP')

# Section 6 - Comunidade
sec6 = create_image(1200, 600, (160, 100, 80), "Comunidade de Apoio\nJuntas Somos Mais Fortes", (255, 255, 255))
sec6.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/hype-mulher-resiliencia-2026/images/section-6.webp', 'WEBP')
sec6.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-mulher-resiliencia-2026/section-6.webp', 'WEBP')

print("Imagens hype-mulher-resiliencia-2026 criadas com sucesso!")