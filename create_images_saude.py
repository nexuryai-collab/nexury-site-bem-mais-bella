import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026', exist_ok=True)

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
hero_img = create_image(1200, 600, (245, 245, 220), "SAÚDE INTEGRATIVA 2026\nBRASIL UNINDO TRADIÇÃO E CIÊNCIA", (60, 70, 40))
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/hero.webp', 'WEBP')

# Section 1
secao1_img = create_image(1200, 600, (230, 245, 230), "AYURVEDA BRASILEIRA\nTRATAMENTOS MILENARES", (50, 80, 50))
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-1.webp', 'WEBP')

# Section 2
secao2_img = create_image(1200, 600, (245, 245, 255), "ANTIGRIDES DE PLANTAS\nAMAZÔNICAS", (70, 70, 120))
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-2.webp', 'WEBP')

# Section 3
secao3_img = create_image(1200, 600, (240, 250, 245), "BIOSISTEMAS DE AUTOCUIDADO", (90, 60, 90))
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-3.webp', 'WEBP')

# Section 4
secao4_img = create_image(1200, 600, (255, 245, 240), "MINDFULNESS BRASILEIRA\nRAIZES AFRO-ÍNDIGENAS", (120, 80, 40))
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-4.webp', 'WEBP')

# Section 5
secao5_img = create_image(1200, 600, (245, 250, 230), "CIRURGIAS NUTRICIONAIS\nBIO-HACKING", (100, 60, 60))
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-5.webp', 'WEBP')

# Section 6
secao6_img = create_image(1200, 600, (250, 245, 240), "FITNESS FUNCIONAL\nBASILEIRO", (80, 70, 50))
secao6_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-integrativa-2026/secao-6.webp', 'WEBP')

print("Imagens de Saúde Integrativa 2026 criadas com sucesso!")
