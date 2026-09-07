import type { MetadataRoute } from 'next';
import { getTodos } from '@/lib/artigos';
import { EDITORIAIS, TRANSVERSAIS, INSTITUCIONAIS } from '@/lib/taxonomia';
import { paraISO } from '@/lib/data';

/**
 * Sitemap.
 *
 * O site nao tinha nenhum, o que para um projeto que pretende viver de busca e
 * de Discover e um buraco na fundacao: sem sitemap, cada pagina depende de ser
 * descoberta por link.
 *
 * Duas decisoes deliberadas aqui:
 *
 * - **Area editorial sem artigo fica de fora.** Enviar para o Google uma pagina
 *   que ainda nao tem conteudo e pedir para ser avaliado pelo pior que existe
 *   no site.
 * - **`lastModified` vem da data do artigo**, nao da data do build. Se saisse do
 *   build, o sitemap inteiro mudaria toda vez que alguem rodasse `npm run
 *   build`, e a informacao deixaria de significar qualquer coisa.
 */

export const dynamic = 'force-static';

const BASE = 'https://bemmaisbella.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const artigos = getTodos();

  const totalPorArea: Record<string, number> = {};
  for (const a of artigos) {
    if (a.categorySlug) totalPorArea[a.categorySlug] = (totalPorArea[a.categorySlug] || 0) + 1;
  }

  const maisRecenteDaArea: Record<string, string> = {};
  for (const a of artigos) {
    const d = paraISO(a.publishedAt);
    if (!d || !a.categorySlug) continue;
    if (!maisRecenteDaArea[a.categorySlug] || d > maisRecenteDaArea[a.categorySlug]) {
      maisRecenteDaArea[a.categorySlug] = d;
    }
  }

  const maisRecenteGeral =
    Object.values(maisRecenteDaArea).sort().pop() || new Date().toISOString().slice(0, 10);

  const paginas: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: maisRecenteGeral, changeFrequency: 'daily', priority: 1 },
  ];

  for (const a of EDITORIAIS) {
    if (!(totalPorArea[a.slug] > 0)) continue;
    paginas.push({
      url: BASE + '/' + a.slug,
      lastModified: maisRecenteDaArea[a.slug] || maisRecenteGeral,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  for (const a of TRANSVERSAIS) {
    paginas.push({
      url: BASE + '/' + a.slug,
      lastModified: maisRecenteGeral,
      changeFrequency: a.slug === 'em-alta' ? 'daily' : 'monthly',
      priority: a.slug === 'em-alta' ? 0.9 : 0.6,
    });
  }

  paginas.push({
    url: BASE + '/ferramentas/diagnostico',
    lastModified: maisRecenteGeral,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  for (const a of INSTITUCIONAIS) {
    paginas.push({
      url: BASE + '/' + a.slug,
      lastModified: maisRecenteGeral,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  for (const a of artigos) {
    paginas.push({
      url: BASE + '/artigos/' + a.slug,
      lastModified: paraISO(a.publishedAt) || maisRecenteGeral,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return paginas;
}
