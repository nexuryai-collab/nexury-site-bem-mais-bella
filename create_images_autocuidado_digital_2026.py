from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026', exist_ok=True)
os.makedirs('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026', exist_ok=True)

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
hero = create_image(1200, 600, (100, 60, 140), "AUTOCUIDADO DIGITAL 2026\nTecnologia que Cuida de Voce", (255, 255, 255))
hero.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/hero.webp', 'WEBP')
hero.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/hero.webp', 'WEBP')

# Section 1 - Mindfulness
sec1 = create_image(1200, 600, (80, 130, 170), "Mindfulness e Meditacao\n8 Minutos por Dia", (255, 255, 255))
sec1.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-1.webp', 'WEBP')
sec1.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-1.webp', 'WEBP')

# Section 2 - Wearables
sec2 = create_image(1200, 600, (170, 90, 110), "Wearables: O Corpo Fala\nTecnologia Escuta", (255, 255, 255))
sec2.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-2.webp', 'WEBP')
sec2.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-2.webp', 'WEBP')

# Section 3 - Terapia Online
sec3 = create_image(1200, 600, (60, 160, 130), "Terapia Online\nPsicologia no Seu Celular", (255, 255, 255))
sec3.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-3.webp', 'WEBP')
sec3.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-3.webp', 'WEBP')

# Section 4 - Journaling
sec4 = create_image(1200, 600, (200, 150, 80), "Journaling Digital\nEscrevendo Para se Conhecer", (255, 255, 255))
sec4.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-4.webp', 'WEBP')
sec4.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-4.webp', 'WEBP')

# Section 5 - Limites
sec5 = create_image(1200, 600, (130, 70, 150), "Limites Digitais\nAutocuidado da Atencao", (255, 255, 255))
sec5.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-5.webp', 'WEBP')
sec5.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-5.webp', 'WEBP')

# Section 6 - Futuro
sec6 = create_image(1200, 600, (90, 100, 170), "Futuro do Autocuidado\nTendencia 2027", (255, 255, 255))
sec6.save('/opt/data/nexury-site-bem-mais-bella/src/app/artigos/autocuidado-digital-2026/images/autocuidado-digital-2026/section-6.webp', 'WEBP')
sec6.save('/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-digital-2026/section-6.webp', 'WEBP')

print("Imagens autocuidado-digital-2026 criadas com sucesso!")