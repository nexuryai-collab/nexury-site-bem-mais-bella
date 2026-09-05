import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Create images directory
os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026', exist_ok=True)

def create_image(width, height, background_color, text, text_color, font_size=40):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', font_size)
    except:
        font = ImageFont.load_default()
    
    y_pos = height // 3
    lines = text.split('\n')
    line_height = font_size + 20
    
    for line in lines:
        draw.text((50, y_pos), line, fill=text_color, font=font)
        y_pos += line_height
    
    return img

# Hero image
hero_img = create_image(1200, 600, (255, 245, 250), "CASAMENTOS COM PROPÓSITO\nAmor, Essência e Propósito", (120, 40, 80), 45)
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/hero.webp', 'WEBP')

# Section 1 - Novo Paradigma
secao1_img = create_image(1200, 600, (250, 255, 245), "DO PADRÃO AO PROPÓSITO\nO Novo Paradigma", (50, 100, 70), 45)
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/sec1.webp', 'WEBP')

# Section 2 - Planejar
secao2_img = create_image(1200, 600, (245, 250, 255), "5 PILARES DO PLANEJAMENTO\nCom Propósito", (40, 80, 120), 45)
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/sec1.webp', 'WEBP')

# Section 3 - Autenticidade
secao3_img = create_image(1200, 600, (255, 248, 240), "COMUNICAÇÃO E\nAUTENTICIDADE", (120, 80, 50), 45)
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/sec3.webp', 'WEBP')

# Section 4 - Tendências
secao4_img = create_image(1200, 600, (248, 245, 255), "TENDÊNCIAS 2026\nCasamentos ao Ar Livre", (80, 50, 120), 45)
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/sec4.webp', 'WEBP')

# Section 5 - Como Começar
secao5_img = create_image(1200, 600, (255, 255, 240), "PLANO DE 6 MESES\nComo Começar", (100, 100, 50), 45)
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/casamentos-proposito-essencia-amor-2026/sec5.webp', 'WEBP')

print("Imagens de Casamentos com Propósito 2026 criadas com sucesso!")
