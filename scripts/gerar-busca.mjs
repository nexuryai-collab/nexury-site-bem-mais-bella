/**
 * Gera public/busca.json a partir do que existe no disco.
 *
 * Havia só um `atualizar-busca.mjs`, que corrigia campos das entradas
 * existentes mas nunca criava nem removia nenhuma. Depois de um merge que
 * trouxe 90 artigos novos, o índice continuou com 142 itens: a busca e a seção
 * "Para Você" simplesmente não enxergavam um terço do acervo.
 *
 * Este script reconstrói o índice inteiro. As regras de normalização são as
 * mesmas de `src/lib/artigos.ts` — se elas mudarem lá, mudam aqui.
 *
 *   node scripts/gerar-busca.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const RAIZ = process.cwd();
const APP = path.join(RAIZ, 'src', 'app');
const PUB = path.join(RAIZ, 'public');
const MIN_IMAGEM = 20000;

const CATEGORIAS = {
  'estilo-e-beleza': 'Estilo e Beleza',
  'saude-e-bem-estar': 'Saúde e Bem-Estar',
  'maternidade-e-familia': 'Maternidade e Família',
  'casamentos-com-proposito': 'Casamentos com Propósito',
  'relacionamentos-conscientes': 'Relacionamentos Conscientes',
  'carreira-e-financas': 'Carreira e Finanças',
  'estilo-de-vida': 'Estilo de Vida',
  'desenvolvimento-pessoal': 'Desenvolvimento Pessoal',
  'historias-inspiradoras': 'Histórias Inspiradoras',
  'famosos-e-entretenimento': 'Famosos e Entretenimento',
};

const semAcento = s =>
  String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');

const slugify = s =>
  semAcento(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function catSlug(bruto) {
  const alvo = slugify(bruto);
  if (CATEGORIAS[alvo]) return alvo;
  for (const k of Object.keys(CATEGORIAS)) {
    if (slugify(CATEGORIAS[k]) === alvo) return k;
  }
  return '';
}

function primeiro(d, ...chaves) {
  for (const k of chaves) {
    const v = d[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (v instanceof Date) return v.toISOString().slice(0, 10);
  }
  return '';
}

function paraISO(v) {
  if (!v) return '';
  const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[0];
  const d = new Date(String(v));
  if (isNaN(d.getTime())) return '';
  return (
    d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0')
  );
}

const tamanho = rel => {
  try { return fs.statSync(path.join(PUB, rel)).size; } catch { return 0; }
};

/** Mesma regra do leitor: a capa canônica ganha do que estiver no frontmatter. */
function capaDe(slug, candidata) {
  const conv = [
    '/artigos/' + slug + '/hero.webp',
    '/artigos/' + slug + '/hero.jpg',
    '/images/' + slug + '/hero.webp',
  ];
  for (const c of conv) if (tamanho(c) >= MIN_IMAGEM) return c;
  if (candidata && tamanho(candidata) >= MIN_IMAGEM) return candidata;
  return '';
}

function varrer(dir, saida = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) varrer(p, saida);
    else if (e.name === 'artigo.md') saida.push(p);
  }
  return saida;
}

const porSlug = new Map();

for (const arquivo of varrer(APP)) {
  const bruto = fs.readFileSync(arquivo, 'utf8');
  let d, corpo;
  try {
    const g = matter(bruto);
    d = g.data || {};
    corpo = g.content || '';
  } catch {
    continue; // frontmatter quebrado: o leitor também não vai conseguir
  }

  const pasta = path.basename(path.dirname(arquivo));
  const slug = primeiro(d, 'slug') || pasta;
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) continue;
  if (!corpo.trim()) continue;

  const cat = primeiro(d, 'category', 'categoria');
  const entrada = {
    slug,
    title: primeiro(d, 'title', 'titulo') || pasta,
    desc: primeiro(d, 'description', 'descricao', 'metaDescription',
                   'meta_description', 'ogDescription', 'og_description', 'resumo'),
    cat: cat || '',
    catSlug: catSlug(cat),
    sub: primeiro(d, 'subcategory', 'subcategoria'),
    tags: Array.isArray(d.tags) ? d.tags : [],
    img: capaDe(slug, primeiro(d, 'ogImage', 'imagemHero', 'image')),
    author: primeiro(d, 'author', 'autor') || 'Lillith Nogah',
    read: primeiro(d, 'readingTime', 'tempo_leitura'),
    date: paraISO(primeiro(d, 'publishedAt', 'publishDate', 'date', 'data')),
    _len: corpo.length,
  };

  // Mesma regra de desempate do leitor: vence o texto mais longo.
  const atual = porSlug.get(slug);
  if (!atual || entrada._len > atual._len) porSlug.set(slug, entrada);
}

const itens = Array.from(porSlug.values())
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  .map(({ _len, ...resto }) => resto);

fs.writeFileSync(path.join(PUB, 'busca.json'), JSON.stringify(itens));

const semCapa = itens.filter(i => !i.img).length;
const semData = itens.filter(i => !i.date).length;
const semCat = itens.filter(i => !i.catSlug).length;
console.log(
  `busca.json: ${itens.length} artigos | sem capa: ${semCapa} | sem data: ${semData} | sem categoria: ${semCat}`
);
