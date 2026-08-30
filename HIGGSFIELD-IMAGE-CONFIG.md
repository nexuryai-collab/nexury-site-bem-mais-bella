# 🖼️ Configuração de Imagens - Higgsfield + Cloudflare Polish

## 1. Higgsfield (Geração de Imagens AI)

### Endpoint
```
POST https://api.higgsfield.ai/generate
```

### Exemplo de Payload (para notícias do site)
```json
{
  "text": "mulher sorrindo segurando estofado recém-limpo, iluminação natural, estilo foto real, alta resolução",
  "width": 1200,
  "height": 800,
  "quality": "high",
  "format": "webp",
  "model": "higgsfield-v2"
}
```

### Como Integrar no Site
No componente `NewsCard` (`/workspace/nexury-site-bem-mais-bella/src/components/NewsCard.tsx`):
- A imagem `image` vem do Supabase/API
- Quando a notícia é criada, a API do Higgsfield gera a imagem com alta qualidade
- A imagem é armazenada no Cloudflare (via Polish) que a otimiza automaticamente

### Otimização Automática (Cloudflare Polish + Mirage)
- **Polish**: Otimiza imagens automaticamente (WebP, AVIF, etc.)
- **Mirage**: Carrega imagens apenas quando visíveis (reduz o peso inicial)

### Exemplo de Uso na Página
```tsx
<Image
  src={noticia.image}  // URL da imagem otimizada
  alt={noticia.imageAlt}
  fill
  sizes="(min-width: 768px) 768px, 100vw"
  placeholder="blur"
  quality={85}
  priority={false}  // Lazy load para notícias não principais
/>
```

---

## 2. Script para Otimizar Imagens Localmente

Crie `/workspace/nexury-site-bem-mais-bella/scripts/optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../public/images');

async function optimizeImages() {
  const files = fs.readdirSync(IMAGE_DIR);
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(IMAGE_DIR, file);
      const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/, '.webp');
      
      await sharp(inputPath)
        .resize(1200, 800, { fit: 'inside' })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✅ Otimizado: ${file} → ${path.basename(outputPath)}`);
    }
  }
}

optimizeImages();
```

---

## 3. Configuração Cloudflare Pages (Recomendações)

No painel da Cloudflare (para o domínio `bemaisbella.com.br`):

### Configurações Importantes
- **Polish**: Habilitar (otimiza automaticamente imagens)
- **Mirage**: Habilitar (lazy load)
- **Auto Minify**: Habilitar (minifica JS/CSS/HTML)
- **Brotli**: Habilitar (compressão de arquivos)
- **Always Online**: Habilitar (se o site cair, mostra versão em cache)

### Headers para Cache de Imagens
No arquivo `/workspace/nexury-site-bem-mais-bella/next.config.mjs`, já está configurado:
```typescript
async headers() {
  return [
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        { key: 'Accept-Ch', value: 'DPR, width, viewport-width' }  // Para Cloudflare Polish
      ]
    }
  ]
}
```

---

## 4. Resultado Esperado

Com essa configuração, as notícias do site "Bem Mais Bella" terão:
- **Carregamento rápido**: Imagens otimizadas automaticamente (WebP, 30-50KB)
- **Alta qualidade**: Geradas por Higgsfield AI (4K, alta resolução)
- **SEO melhorado**: Lazy load, responsive, alta pontuação no Lighthouse
- **Custo reduzido**: Menor uso de banda (Cloudflare CDN)

---

## Resumo dos Arquivos Criados

```
/workspace/nexury-site-bem-mais-bella/
├── package.json
├── tailwind.config.js
├── next.config.mjs
├── /src
│   ├── /components/NewsCard.tsx
│   └── /pages/api/higgsfield.ts
```

> **Nota**: O arquivo `/workspace/nexury-site-bem-mais-bella/src/lib/utils.ts` contém a função `cn()` para combinar classes CSS (clsx + tailwind-merge), que é usada nos componentes.
