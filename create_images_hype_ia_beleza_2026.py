from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026', exist_ok=True)

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

# Hero image - Mulher com maquiagem IA
hero = create_image(1200, 600, (120, 80, 160), "HYPE IA BELEZA 2026\nA Revolução da Beleza Inclusiva", (255, 255, 255))
hero.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/hero.webp', 'WEBP')

# Section 1 - Diversidade
sec1 = create_image(1200, 600, (100, 150, 200), "Diversidade em Cada Tom de Pele\nBeleza para Todos os Corpos", (255, 255, 255))
sec1.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec1.webp', 'WEBP')

# Section 2 - App de IA
sec2 = create_image(1200, 600, (80, 180, 120), "Apps de Beleza com IA\nRecomendações Personalizadas", (255, 255, 255))
sec2.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec2.webp', 'WEBP')

# Section 3 - Sustentabilidade
sec3 = create_image(1200, 600, (200, 160, 80), "Beleza Sustentável\nIA para Produtos Eco-Friendly", (255, 255, 255))
sec3.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec3.webp', 'WEBP')

# Section 4 - Influenciadora
sec4 = create_image(1200, 600, (180, 80, 120), "Influenciadoras de Autenticidade\nFiltros de IA que Celebram a Realidade", (255, 255, 255))
sec4.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec4.webp', 'WEBP')

# Section 5 - Análise de pele
sec5 = create_image(1200, 600, (60, 120, 180), "Análise de Pele com IA\nTecnologia para Cuidado Personalizado", (255, 255, 255))
sec5.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec5.webp', 'WEBP')

# Section 6 - Confiança
sec6 = create_image(1200, 600, (160, 60, 100), "Confiança e Autenticidade\nA Nova Beleza Brasileira", (255, 255, 255))
sec6.save('/workspace/nexury-site-bem-mais-bella/public/images/hype-ia-beleza-2026/sec6.webp', 'WEBP')

print("Imagens hype-ia-beleza-2026 criadas com sucesso!")