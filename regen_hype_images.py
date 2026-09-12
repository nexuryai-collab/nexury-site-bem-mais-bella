from PIL import Image, ImageFilter, ImageDraw
import os
slug = 'hype-moda-consciente-2026'
d = f'/opt/data/nexury-site-bem-mais-bella/public/artigos/{slug}'
os.makedirs(d, exist_ok=True)
# Define colors for each image: hero, sec1..sec5
colors = [(30,0,60), (40,0,80), (200,180,210), (180,200,220), (210,190,200), (190,210,200)]
names = ['hero','sec1','sec2','sec3','sec4','sec5']
for name, color in zip(names, colors):
    img = Image.new('RGB', (1600,900), color)
    # Add subtle pattern
    draw = ImageDraw.Draw(img)
    for i in range(0,1600,20):
        for j in range(0,900,20):
            if (i//20 + j//20) % 2 == 0:
                draw.rectangle([i,j,i+10,j+10], fill=(0,0,0,20))
    img = img.filter(ImageFilter.GaussianBlur(0.5))
    path = f'{d}/{name}.webp'
    img.save(path, 'WEBP', quality=88, method=6)
    sz = os.path.getsize(path)
    print(f'{name}: {sz} bytes')