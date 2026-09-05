import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Create images directory
os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026', exist_ok=True)

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
hero_img = create_image(1200, 600, (240, 255, 240), "NUTRIÇÃO E FITNESS\nAlimentação Consciente 2026", (30, 100, 50), 45)
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/hero.webp', 'WEBP')

# Section 1 - Nutrição Consciente
secao1_img = create_image(1200, 600, (255, 250, 240), "ALIMENTAÇÃO CONSCIENTE\nComa Bem, Sem Culpa", (150, 80, 30), 45)
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/sec1.webp', 'WEBP')

# Section 2 - Fitness Inclusivo
secao2_img = create_image(1200, 600, (240, 245, 255), "FITNESS INCLUSIVO\nMovimento para Todos", (50, 50, 120), 45)
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/sec2.webp', 'WEBP')

# Section 3 - Saúde Mental
secao3_img = create_image(1200, 600, (250, 245, 240), "SAÚDE MENTAL\nConexão Corpo-Mente", (100, 80, 50), 45)
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/sec3.webp', 'WEBP')

# Section 4 - Receitas
secao4_img = create_image(1200, 600, (255, 248, 245), "RECEITAS BRASILEIRAS\nAdaptadas e Nutritivas", (150, 60, 60), 45)
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/sec4.webp', 'WEBP')

# Section 5 - Plano Prático
secao5_img = create_image(1200, 600, (245, 255, 250), "PLANO DE 7 DIAS\nComo Começar Hoje", (40, 100, 80), 45)
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/saude-bem-estar-nutricao-fitness-2026/sec5.webp', 'WEBP')

print("Imagens de Nutrição e Fitness 2026 criadas com sucesso!")
