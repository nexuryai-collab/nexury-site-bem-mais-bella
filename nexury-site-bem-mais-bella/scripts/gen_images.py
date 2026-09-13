import os
from PIL import Image

base = "/opt/data/nexury-site-bem-mais-bella/nexury-site-bem-mais-bella/public/artigos"

def make_image(path, width, height, primary_color, secondary_color, pattern_type="solid"):
    img = Image.new('RGB', (width, height), primary_color)
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            nx = x / width
            ny = y / height
            if pattern_type == "gradient":
                ratio = ny
                r = int(primary_color[0] * (1 - ratio) + secondary_color[0] * ratio)
                g = int(primary_color[1] * (1 - ratio) + secondary_color[1] * ratio)
                b = int(primary_color[2] * (1 - ratio) + secondary_color[2] * ratio)
                pixels[x, y] = (r, g, b)
            elif pattern_type == "soft":
                angle = nx * 6 + ny * 4
                factor = 0.85 + 0.15 * (angle * 10) % 1
                r = int(primary_color[0] * factor)
                g = int(primary_color[1] * factor)
                b = int(primary_color[2] * factor)
                pixels[x, y] = (r, g, b)
            elif pattern_type == "wave":
                angle = nx * 8 + ny * 6
                factor = 0.9 + 0.1 * (angle * 10) % 1
                r = int(primary_color[0] * factor)
                g = int(primary_color[1] * factor)
                b = int(primary_color[2] * factor)
                pixels[x, y] = (r, g, b)
            else:
                pixels[x, y] = primary_color
    img.save(path, 'WEBP', quality=85)
    return os.path.getsize(path)

# Brazilcore 2026 images (golden yellow, white)
make_image(f"{base}/brazilcore-2026/hero.webp", 1600, 900, (255, 215, 0), (255, 255, 255), "gradient")
make_image(f"{base}/brazilcore-2026/sec1.webp", 1200, 800, (255, 215, 0), (255, 255, 255), "soft")
make_image(f"{base}/brazilcore-2026/sec2.webp", 1200, 800, (255, 255, 255), (255, 215, 0), "gradient")
make_image(f"{base}/brazilcore-2026/sec3.webp", 1200, 800, (255, 215, 0), (255, 255, 255), "soft")
make_image(f"{base}/brazilcore-2026/sec4.webp", 1200, 800, (255, 255, 255), (255, 215, 0), "wave")
make_image(f"{base}/brazilcore-2026/sec5.webp", 1200, 800, (255, 255, 255), (255, 215, 0), "soft")

# Maternidade Consciente images (pink, white)
make_image(f"{base}/maternidade-consciente-2026/hero.webp", 1600, 900, (255, 182, 193), (255, 255, 255), "gradient")
make_image(f"{base}/maternidade-consciente-2026/sec1.webp", 1200, 800, (255, 255, 255), (255, 182, 193), "soft")
make_image(f"{base}/maternidade-consciente-2026/sec2.webp", 1200, 800, (255, 182, 193), (255, 255, 255), "gradient")
make_image(f"{base}/maternidade-consciente-2026/sec3.webp", 1200, 800, (255, 255, 255), (255, 182, 193), "soft")
make_image(f"{base}/maternidade-consciente-2026/sec4.webp", 1200, 800, (255, 182, 193), (255, 255, 255), "wave")
make_image(f"{base}/maternidade-consciente-2026/sec5.webp", 1200, 800, (255, 255, 255), (255, 182, 193), "soft")

# Saúde Mental Feminina images (light blue, white)
make_image(f"{base}/saude-mental-feminina-2026/hero.webp", 1600, 900, (173, 216, 230), (255, 255, 255), "gradient")
make_image(f"{base}/saude-mental-feminina-2026/sec1.webp", 1200, 800, (255, 255, 255), (173, 216, 230), "soft")
make_image(f"{base}/saude-mental-feminina-2026/sec2.webp", 1200, 800, (173, 216, 230), (255, 255, 255), "gradient")
make_image(f"{base}/saude-mental-feminina-2026/sec3.webp", 1200, 800, (255, 255, 255), (173, 216, 230), "soft")
make_image(f"{base}/saude-mental-feminina-2026/sec4.webp", 1200, 800, (173, 216, 230), (255, 255, 255), "wave")
make_image(f"{base}/saude-mental-feminina-2026/sec5.webp", 1200, 800, (255, 255, 255), (173, 216, 230), "soft")

print("All images generated successfully.")
for root, dirs, files in os.walk(base):
    for f in sorted(files):
        if f.endswith('.webp'):
            path = os.path.join(root, f)
            size = os.path.getsize(path)
            print(f"  {path}: {size} bytes")
