import type { MetadataRoute } from 'next';

/**
 * robots.txt.
 *
 * Nao havia nenhum. O papel dele aqui e apontar o sitemap — que tambem nao
 * existia — e manter fora do indice o que nao e conteudo: o JSON da busca e as
 * paginas que so fazem sentido para quem ja esta navegando.
 */

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/busca.json', '/busca?', '/para-voce'],
      },
    ],
    sitemap: 'https://bemmaisbella.com.br/sitemap.xml',
    host: 'https://bemmaisbella.com.br',
  };
}
