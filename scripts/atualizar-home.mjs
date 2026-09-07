/**
 * Regenera src/lib/home.json a partir de public/busca.json.
 *
 * A home le um snapshot estatico. Quando o acervo muda (capa nova, artigo
 * arquivado, categoria recontada), o snapshot envelhece em silencio e a home
 * mostra imagem antiga ou contagem errada. Rodar depois de mexer no acervo:
 *
 *   node scripts/atualizar-busca.mjs && node scripts/atualizar-home.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const PUB = path.join(process.cwd(), 'public');
const itens = JSON.parse(fs.readFileSync(path.join(PUB, 'busca.json'), 'utf8'));

const CATEGORIAS = [
  ['estilo-e-beleza', 'Estilo e Beleza'],
  ['saude-e-bem-estar', 'Saúde e Bem-Estar'],
  ['maternidade-e-familia', 'Maternidade e Família'],
  ['casamentos-com-proposito', 'Casamentos com Propósito'],
  ['relacionamentos-conscientes', 'Relacionamentos Conscientes'],
  ['carreira-e-financas', 'Carreira e Finanças'],
  ['estilo-de-vida', 'Estilo de Vida'],
  ['desenvolvimento-pessoal', 'Desenvolvimento Pessoal'],
  ['historias-inspiradoras', 'Histórias Inspiradoras'],
];

const existe = (rel) => {
  try { return fs.statSync(path.join(PUB, rel)).size > 0; } catch { return false; }
};

const novidades = itens
  .filter(a => a.date && a.img && a.desc)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  .slice(0, 6)
  .map(({ slug, title, cat, catSlug, desc, img, author, read, date }) => ({
    slug, title, cat: catSlug || cat, desc, img, author, read, date,
  }));

const populares = CATEGORIAS.map(([slug, nome]) => {
  const daCat = itens.filter(a => a.catSlug === slug);
  const capaCat = '/categorias/' + slug + '.webp';
  return {
    slug, nome, total: daCat.length,
    img: existe(capaCat) ? capaCat : (daCat[0] ? daCat[0].img : ''),
  };
}).filter(c => c.total > 0);

const saida = { novidades, populares, totalArtigos: itens.length };
fs.writeFileSync(path.join(process.cwd(), 'src/lib/home.json'), JSON.stringify(saida, null, 1));
console.log('home.json: ', itens.length, 'artigos |', populares.length, 'categorias |', novidades.length, 'novidades');
console.log('novidades:', novidades.map(n => n.slug).join(', '));

/* --- src/lib/destaques.json: mesmo snapshot, mesma manutencao --- */
const arqDest = path.join(process.cwd(), 'src/lib/destaques.json');
if (fs.existsSync(arqDest)) {
  const dest = JSON.parse(fs.readFileSync(arqDest, 'utf8'));
  const porSlug = new Map(itens.map(i => [i.slug, i]));
  let n = 0;
  const vivos = dest.filter(d => porSlug.has(d.slug));
  for (const d of vivos) {
    const i = porSlug.get(d.slug);
    if (i.img !== d.img || i.date !== d.date || i.title !== d.title) n++;
    d.img = i.img; d.date = i.date; d.title = i.title; d.desc = i.desc;
    d.cat = i.catSlug || d.cat; d.author = i.author; d.read = i.read;
  }
  fs.writeFileSync(arqDest, JSON.stringify(vivos, null, 1));
  console.log('destaques.json:', vivos.length, 'itens |', n, 'atualizados |',
    dest.length - vivos.length, 'removidos por nao existirem mais');
}
