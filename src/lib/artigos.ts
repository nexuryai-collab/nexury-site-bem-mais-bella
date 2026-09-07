import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { EDITORIAIS } from './taxonomia';

function safeMatter(raw: string) {
  try { return matter(raw); } catch { return null; }
}

const FALLBACK = '/images/placeholder.webp';
const ROOT = path.join(process.cwd(), 'src/app');

export type Artigo = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  hero: string;
  content: string;
  images: {
    hero: string;
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    totalSections: number;
  };
};

const PUB = path.join(process.cwd(), 'public');

/**
 * Byte minimo para considerar uma imagem utilizavel.
 * O acervo tem 25 arquivos de 0 byte e 250 abaixo de 15 KB — os de 0 byte
 * renderizam como icone de imagem quebrada na tela do leitor. Arquivo que
 * existe mas nao tem conteudo e pior que arquivo ausente: o ausente cai no
 * fallback, o vazio vira defeito visivel.
 */
const MIN_BYTES = 8000;

function exists(p: string) {
  if (!p) return false;
  const abs = path.join(PUB, String(p).split('?')[0]);
  try {
    return fs.statSync(abs).size >= MIN_BYTES;
  } catch {
    return false;
  }
}

/** Primeira imagem util de uma pasta de public/ — descarta vazias e minusculas. */
function primeiraImagem(dir: string): string {
  const abs = path.join(PUB, dir);
  if (!fs.existsSync(abs)) return '';
  const f = fs
    .readdirSync(abs)
    .filter(x => /\.(webp|jpg|jpeg|png|avif)$/i.test(x))
    .filter(x => {
      try { return fs.statSync(path.join(abs, x)).size >= MIN_BYTES; } catch { return false; }
    })
    .sort();
  return f.length ? dir + '/' + f[0] : '';
}

/**
 * As capas vivem em duas arvores paralelas (public/artigos/<slug>/hero.webp e
 * public/images/<slug>/), e boa parte do frontmatter aponta para caminhos que
 * nunca existiram. Em vez de confiar so no frontmatter, resolve por convencao.
 */
function resolveHero(slug: string, candidato: string): string {
  // A convencao vem antes do frontmatter de proposito: as capas geradas ficam
  // todas em /artigos/<slug>/hero.webp, e muito frontmatter antigo ainda
  // aponta para arquivos de 11 KB do acervo velho, que na tela viram risco
  // fino sobre roxo. Se a capa canonica existe, ela ganha.
  const porConvencao = [
    '/artigos/' + slug + '/hero.webp',
    '/artigos/' + slug + '/hero.jpg',
    '/images/' + slug + '/hero.webp',
  ];
  for (const c of porConvencao) if (exists(c)) return c;
  if (exists(candidato)) return candidato;
  return primeiraImagem('/images/' + slug) || primeiraImagem('/artigos/' + slug) || FALLBACK;
}

/**
 * Imagens de secao do artigo, em ordem.
 *
 * Procura em public/artigos/<slug>/ (onde ficam as geradas, nomeadas sec1..secN)
 * e em public/images/<slug>/ (acervo antigo). A capa nunca se repete no corpo.
 */
function secoesDe(slug: string, hero: string): string[] {
  const out: string[] = [];
  const ordem = (n: string) => {
    const m = n.match(/sec(\d+)/i);
    return m ? parseInt(m[1], 10) : 999;
  };
  for (const dir of ['/artigos/' + slug, '/images/' + slug]) {
    const abs = path.join(PUB, dir);
    if (!fs.existsSync(abs)) continue;
    const arquivos = fs
      .readdirSync(abs)
      .filter(x => /\.(webp|jpg|jpeg|png|avif)$/i.test(x))
      .filter(x => !/^hero\./i.test(x))
      .sort((a, b) => ordem(a) - ordem(b) || a.localeCompare(b));
    for (const a of arquivos) {
      const cam = dir + '/' + a;
      if (cam !== hero && exists(cam) && !out.includes(cam)) out.push(cam);
    }
  }
  return out;
}

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full));
    else if (e.name === 'artigo.md') out.push(full);
  }
  return out;
}

/** Normaliza texto para slug: sem acento, minusculo, hifenizado. */
export function slugify(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Nivel 1: as 9 categorias canonicas. O slug e a rota.
 *
 * `voz` e `slogan` vem do briefing editorial da casa: cada categoria tem um
 * arquetipo de voz proprio, com o qual a Lillith Nogah escreve. Estava definido
 * e nao aparecia em lugar nenhum do site.
 */
export const CATEGORIAS: {
  slug: string; nome: string; sub: string[]; voz: string; slogan: string;
}[] = EDITORIAIS.map(a => ({
  slug: a.slug,
  nome: a.nome,
  sub: a.sub,
  voz: a.voz || '',
  slogan: a.slogan || '',
}));

/** Voz e slogan de uma categoria, para a pagina dela. */
export function vozDe(slug: string): { voz: string; slogan: string } | null {
  const c = CATEGORIAS.find(x => x.slug === slug);
  return c ? { voz: c.voz, slogan: c.slogan } : null;
}

/** Variantes de categoria que o slugify sozinho nao resolve. */
const ALIAS: Record<string, string> = {
  'beleza': 'estilo-e-beleza',
  'moda': 'estilo-e-beleza',
  'maquiagem': 'estilo-e-beleza',
  'estilo-e-beleza-beleza': 'estilo-e-beleza',
  'saude': 'saude-e-bem-estar',
  'bem-estar': 'saude-e-bem-estar',
  'autoconhecimento': 'desenvolvimento-pessoal',
  'maternidade': 'maternidade-e-familia',
  'familia': 'maternidade-e-familia',
  'relacionamentos': 'relacionamentos-conscientes',
  'casamentos': 'casamentos-com-proposito',
  'carreira': 'carreira-e-financas',
  'financas': 'carreira-e-financas',
};

/**
 * Nivel 3 da arvore editorial -> nivel 2 ao qual pertence.
 * Só as folhas cujo nome nao comeca pelo nome do pai; o resto o prefixo resolve.
 */
const SUB_ALIAS: Record<string, string> = {
  // Estilo e Beleza
  'maquiagem': 'beleza', 'beleza-inclusiva': 'beleza', 'cuidados': 'beleza',
  'cuidados-com-a-pele': 'beleza', 'skincare': 'beleza', 'cabelo': 'beleza',
  'tendencias': 'moda', 'guarda-roupa': 'moda', 'acessorios': 'moda',
  'estilo-para-todos-os-corpos': 'moda', 'estilo-inclusivo': 'moda',
  'estilo-todos-corpos': 'moda', 'looks': 'moda', 'compras': 'moda',
  // Saude e Bem-Estar
  'nutricao': 'saude', 'fitness': 'saude', 'saude-mental': 'saude', 'prevencao': 'saude',
  'autocuidado': 'bem-estar', 'mindfulness': 'bem-estar', 'terapias': 'bem-estar',
  'espiritualidade': 'bem-estar', 'sono': 'bem-estar',
  // Maternidade e Familia
  'antes-bebe': 'maternidade', 'antes-do-bebe': 'maternidade', 'pos-parto': 'maternidade',
  'vida-com-bebe': 'maternidade', 'maternidade-e-vida': 'maternidade', 'gravidez': 'maternidade',
  'vida-em-familia': 'familia', 'educacao': 'familia', 'financas-casa': 'familia',
  'familias-diversas': 'familia',
  // Estilo de Vida
  'destinos': 'viagens', 'roteiros': 'viagens',
  'receitas': 'gastronomia', 'culinaria': 'gastronomia',
  'organizacao': 'decoracao', 'lar': 'decoracao',
  'artesanato': 'hobbies', 'relaxamento': 'hobbies',
  // Desenvolvimento Pessoal
  'journaling': 'autoconhecimento', 'ferramentas': 'autoconhecimento',
  'metas': 'crescimento', 'aprendizado': 'crescimento', 'resiliencia': 'crescimento',
  'estresse': 'bem-estar', 'gratidao': 'bem-estar',
  // Historias Inspiradoras
  'superacao': 'relatos', 'mulheres-que-inspiram': 'relatos', 'reflexoes': 'reflexoes',
};

/**
 * Reduz qualquer subcategoria ao nivel 2 da categoria, para agrupar a listagem.
 * Devolve '' quando nao reconhece (o artigo cai em "Mais de <categoria>").
 */
export function subCanon(catSlugAlvo: string, bruto: string): string {
  const cat = CATEGORIAS.find(c => c.slug === catSlugAlvo);
  if (!cat) return '';
  const alvos = cat.sub.map(s => ({ nome: s, slug: slugify(s) }));
  const s = slugify(bruto);
  if (!s) return '';
  const exato = alvos.find(a => a.slug === s);
  if (exato) return exato.slug;
  const prefixo = alvos.find(a => s.startsWith(a.slug + '-') || s.startsWith(a.slug));
  if (prefixo) return prefixo.slug;
  const alias = SUB_ALIAS[s];
  if (alias && alvos.some(a => a.slug === alias)) return alias;
  return '';
}

export function nomeSub(catSlugAlvo: string, subSlugAlvo: string): string {
  const cat = CATEGORIAS.find(c => c.slug === catSlugAlvo);
  return cat?.sub.find(s => slugify(s) === subSlugAlvo) || subSlugAlvo.replace(/-/g, ' ');
}

/** Valor bruto de category/categoria -> slug de uma das 9 canonicas, ou ''. */
export function catSlug(bruto: string): string {
  const s = slugify(bruto);
  if (!s) return '';
  if (CATEGORIAS.some(c => c.slug === s)) return s;
  return ALIAS[s] || '';
}

export function nomeCategoria(slug: string): string {
  return CATEGORIAS.find(c => c.slug === slug)?.nome || slug;
}

/** Le a primeira chave preenchida entre as variantes que convivem no frontmatter. */
function primeiro(data: any, ...chaves: string[]): string {
  for (const k of chaves) {
    const v = data?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

export function getFiles(): string[] {
  if (!fs.existsSync(ROOT)) return [];
  return walk(ROOT);
}

/**
 * Deriva categoria e subcategoria da posicao do arquivo no disco.
 * `src/app/estilo-e-beleza/beleza/tendencias/artigos/<slug>/artigo.md`
 * -> { cat: 'estilo-e-beleza', sub: 'beleza' }
 * Usado quando o frontmatter nao traz a categoria.
 */
function daPasta(file: string): { cat: string; sub: string } {
  const rel = path.relative(ROOT, file).split(path.sep);
  const cat = CATEGORIAS.some(c => c.slug === rel[0]) ? rel[0] : '';
  if (!cat) return { cat: '', sub: '' };
  const seg = rel[1];
  const sub = seg && seg !== 'artigos' ? seg : '';
  return { cat, sub };
}

function lerArquivo(file: string): Artigo | null {
  let raw: string;
  try { raw = fs.readFileSync(file, 'utf8'); } catch { return null; }
  const m = safeMatter(raw);
  if (!m) return null;
  const { data, content } = m;
  const pasta = daPasta(file);

  const slugArtigo = primeiro(data, 'slug') || path.basename(path.dirname(file));

  const heroBruto =
    (data.images && data.images.hero) ||
    (data.imagens && data.imagens.hero) ||
    primeiro(data, 'ogImage', 'imagemHero', 'image', 'hero');
  const hero = resolveHero(slugArtigo, heroBruto);

  // Secoes declaradas no frontmatter, completadas pelo que existir na pasta.
  const declaradas = ['section1', 'section2', 'section3', 'section4', 'section5']
    .map(n => (data.images && data.images[n]) || (data.imagens && data.imagens[n]) || '')
    .filter(v => exists(v));
  const naPasta = secoesDe(slugArtigo, hero);
  const todas = Array.from(new Set([...declaradas, ...naPasta]));
  const [s1 = '', s2 = '', s3 = '', s4 = '', s5 = ''] = todas;

  // Frontmatter manda; a pasta e o fallback quando ele nao traz categoria.
  const categoriaBruta = primeiro(data, 'category', 'categoria');
  const categoriaSlug = catSlug(categoriaBruta) || pasta.cat;
  const categoria = categoriaBruta || nomeCategoria(pasta.cat) || 'Geral';

  // O rotulo mostrado no card e o valor bruto (nivel 2 ou 3 da arvore).
  // O agrupamento da pagina de categoria usa sempre o nivel 2 canonico.
  const subcategoriaBruta = primeiro(data, 'subcategory', 'subcategoria');
  const subcategoria = subcategoriaBruta || (pasta.sub ? pasta.sub.replace(/-/g, ' ') : '');
  const subcategoriaSlug =
    subCanon(categoriaSlug, subcategoriaBruta) ||
    subCanon(categoriaSlug, pasta.sub) ||
    '';

  return {
    slug: slugArtigo,
    title: primeiro(data, 'title', 'titulo') || path.basename(path.dirname(file)),
    description: primeiro(data, 'description', 'descricao', 'metaDescription', 'meta_description',
      'ogDescription', 'og_description', 'resumo'),
    category: categoria,
    categorySlug: categoriaSlug,
    subcategory: subcategoria,
    subcategorySlug: subcategoriaSlug,
    author: primeiro(data, 'author', 'autor') || 'Lillith Nogah',
    publishedAt: primeiro(data, 'publishedAt', 'publishDate', 'date', 'data'),
    readingTime: primeiro(data, 'readingTime', 'tempo_leitura'),
    hero,
    content: limparRodapeDeMaquina(content),
    images: {
      hero,
      section1: s1, section2: s2, section3: s3, section4: s4, section5: s5,
      totalSections: todas.length + 1,
    },
  };
}

let _cache: Artigo[] | null = null;

/**
 * Todos os artigos, mais recentes primeiro. Lido uma vez por build.
 * Seis slugs existem em duas pastas (a plana `artigos/` e a taxonomica).
 * Regra: vence a versao com mais texto, para nunca perder conteudo.
 */
export function getTodos(): Artigo[] {
  if (_cache) return _cache;
  const porSlug = new Map<string, Artigo>();
  for (const a of getFiles().map(lerArquivo)) {
    if (!a || !a.slug) continue;
    const atual = porSlug.get(a.slug);
    if (!atual || a.content.length > atual.content.length) porSlug.set(a.slug, a);
  }
  _cache = Array.from(porSlug.values())
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  return _cache;
}

export function getSlugs(): string[] {
  return getTodos().map(a => a.slug).filter(Boolean);
}

export function getArtigo(slug: string): Artigo | null {
  return getTodos().find(a => a.slug === slug) || null;
}


/**
 * Tira do corpo do artigo o rodape que a automacao de geracao deixa para tras
 * ("Artigo gerado automaticamente pelo Nexus...", "Autor: Nexus...").
 *
 * Isso ja apareceu publicado, com o nome pessoal do dono do site e o processo
 * de geracao expostos ao leitor. Como os artigos sao gerados por automacao, a
 * limpeza fica aqui tambem, e nao so nos arquivos: assim um texto novo com o
 * mesmo rodape nao chega a ser publicado. A assinatura do site e Lillith Nogah.
 */
export function limparRodapeDeMaquina(md: string): string {
  const lixo = [
    // Rodape da automacao de geracao
    /^\s*\*?\s*Artigo (gerado automaticamente|criado) pelo Nexus.*$/gim,
    // Instrucao de briefing que vazou para o corpo publicado
    /^.*\(?(mais de |completo com )?2500\+?\s*palavras.*$/gim,
    /^.*[Cc]onte[uú]do extenso\s*\(?2\.?500.*$/gim,
    /^.*[Ii]ntro longo.*$/gim,
    /^\s*\[IMAGEM:[^\]]*\]\s*$/gim,
    /^.*imagens WebP (disponiveis|dispon[ií]veis|utilizadas|geradas).*$/gim,
    /^.*\*\*Total de imagens WebP:\*\*.*$/gim,
    // Caminho interno de servidor
    /^.*\/workspace\/.*$/gim,
    /^\s*\*\*Autor:\*\*\s*Nexus.*$/gim,
    /^\s*\*?\s*Gerado (automaticamente )?(por|pelo)\s+(Nexus|IA|ChatGPT).*$/gim,
    // Inventario de imagens que a geracao deixou no fim do texto:
    // "1. Hero: /images/<slug>/hero.webp", "3. Valores: /images/..."
    /^\s*\d+\.\s+\S[^:]{0,38}:\s*\/(images|artigos)\/\S+\s*$/gim,
    // Contagem de palavras do briefing, que nunca foi para a leitora
    /^\s*\*\*Total de palavras:\*\*.*$/gim,
  ];
  let out = md;
  for (const r of lixo) out = out.replace(r, '');
  // fecha os buracos deixados pelas linhas removidas
  return out.replace(/\n{3,}/g, '\n\n');
}

/** Uma imagem existe e tem conteudo suficiente para ser exibida? */
export function imagemUtil(src: string): boolean {
  if (!src) return false;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return true;
  return exists(src);
}

/**
 * Remove do HTML do artigo as <img> que apontam para arquivo vazio ou
 * inexistente. Varios corpos de markdown referenciam imagens de 0 byte,
 * que o navegador desenha como icone de imagem quebrada no meio do texto.
 */
/**
 * No corpo do texto a regua e mais dura que em `exists`.
 *
 * O acervo antigo deixou dezenas de arquivos de 10 a 15 KB que existem, abrem,
 * e na tela sao um risco fino sobre roxo. No card eles ja nao entram; no meio
 * do artigo ainda entravam, e imagem ruim no meio do texto e pior do que
 * imagem nenhuma.
 */
const MIN_BYTES_CORPO = 20000;

function imagemBoaNoCorpo(src: string): boolean {
  if (!src) return false;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return true;
  try {
    return fs.statSync(path.join(PUB, src.split('?')[0])).size >= MIN_BYTES_CORPO;
  } catch {
    return false;
  }
}

export function limparImagensQuebradas(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, tag => {
    const m = tag.match(/src=["']([^"']+)["']/i);
    if (!m) return '';
    const src = m[1];
    // A capa ja aparece no topo da pagina; repetida no texto so ocupa espaco.
    if (/\/hero\.(webp|jpg|jpeg|png)$/i.test(src)) return '';
    return imagemBoaNoCorpo(src) ? tag : '';
  });
}

/** Artigos de uma categoria (nivel 1), pelo slug da rota. */
export function getPorCategoriaSlug(slug: string): Artigo[] {
  return getTodos().filter(a => a.categorySlug === slug);
}

/** Artigos de uma subcategoria (nivel 2) dentro de uma categoria. */
export function getPorSubcategoria(catSlugAlvo: string, subSlug: string): Artigo[] {
  return getPorCategoriaSlug(catSlugAlvo).filter(a => a.subcategorySlug === subSlug);
}

/**
 * Os nivel-2 daquela categoria que realmente tem artigo, na ordem da arvore
 * editorial (nao por volume), para a pagina refletir a estrutura desenhada.
 */
export function subcategoriasDe(catSlugAlvo: string): { nome: string; slug: string; total: number }[] {
  const cat = CATEGORIAS.find(c => c.slug === catSlugAlvo);
  if (!cat) return [];
  const artigos = getPorCategoriaSlug(catSlugAlvo);
  return cat.sub
    .map(nome => {
      const slug = slugify(nome);
      return { nome, slug, total: artigos.filter(a => a.subcategorySlug === slug).length };
    })
    .filter(s => s.total > 0);
}

/** Compatibilidade com chamadas antigas pelo nome bruto. */
export function getPorCategoria(cat: string): Artigo[] {
  return getPorCategoriaSlug(catSlug(cat));
}
