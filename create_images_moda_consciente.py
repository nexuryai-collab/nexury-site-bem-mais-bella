import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Create images directory
os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026', exist_ok=True)

def create_image(width, height, background_color, text, text_color, font_size=40):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', font_size)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position
    y_pos = height // 3
    lines = text.split('\n')
    line_height = font_size + 20
    
    for line in lines:
        draw.text((50, y_pos), line, fill=text_color, font=font)
        y_pos += line_height
    
    return img

# Hero image
hero_img = create_image(1200, 600, (245, 240, 250), "MODA CONSCIENTE E BELEZA INCLUSIVA\nBrasil 2026", (70, 30, 100), 45)
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/hero.webp', 'WEBP')

# Section 1 - Tecidos Sustentáveis
secao1_img = create_image(1200, 600, (240, 248, 245), "TECTOS SUSTENTÁVEIS\nModa Consciente 2026", (30, 100, 80), 45)
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/sec1.webp', 'WEBP')

# Section 2 - Inclusão
secao2_img = create_image(1200, 600, (255, 245, 250), "INCLUSÃO DE TODOS OS CORPOS\nModa Consciente 2026", (150, 50, 100), 45)
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/sec2.webp', 'WEBP')

# Section 3 - Tendências Visuais
secao3_img = create_image(1200, 600, (250, 250, 240), "EARTH TONES E TEXTURAS\nTendências 2026", (130, 100, 50), 45)
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/sec3.webp', 'WEBP')

# Section 4 - Beleza Inclusiva
secao4_img = create_image(1200, 600, (245, 240, 250), "BELEZA INCLUSIVA\nCuidados para Todos", (100, 50, 120), 45)
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/sec4.webp', 'WEBP')

# Section 5 - Upcycling
secao5_img = create_image(1200, 600, (240, 248, 248), "UPCYCLING E CUSTOMIZAÇÃO\nModa Criativa", (40, 100, 100), 45)
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/estilo-beleza-modas-conscenta-2026/sec5.webp', 'WEBP')

print("Imagens de Moda Consciente 2026 criadas com sucesso!")
