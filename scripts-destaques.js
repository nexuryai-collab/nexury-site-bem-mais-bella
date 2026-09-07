/**
 * Gera src/lib/destaques.json, os 9 artigos que a home exibe.
 *
 * IMPORTANTE: as regras aqui devem espelhar src/lib/artigos.ts. Quando as duas
 * divergiram, a home passou a mostrar placeholder e descricao vazia enquanto as
 * paginas de categoria mostravam a capa certa. Mexeu numa, mexa na outra.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(process.cwd(), "src/app");
const PUB = path.join(process.cwd(), "public");
const FALLBACK = "/images/placeholder.webp";

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full));
    else if (e.name === "artigo.md") out.push(full);
  }
  return out;
}

/**
 * Byte minimo para uma imagem contar como utilizavel. O acervo tem 25 arquivos
 * de 0 byte, que renderizam como icone quebrado. Espelha MIN_BYTES de artigos.ts.
 */
const MIN_BYTES = 8000;
const existe = (p) => {
  if (!p) return false;
  try { return fs.statSync(path.join(PUB, String(p).split("?")[0])).size >= MIN_BYTES; }
  catch { return false; }
};

function primeiraImagem(dir) {
  const abs = path.join(PUB, dir);
  if (!fs.existsSync(abs)) return "";
  const f = fs.readdirSync(abs)
    .filter((x) => /\.(webp|jpg|jpeg|png|avif)$/i.test(x))
    .filter((x) => { try { return fs.statSync(path.join(abs, x)).size >= MIN_BYTES; } catch { return false; } })
    .sort();
  return f.length ? dir + "/" + f[0] : "";
}

/** Mesma resolucao por convencao de src/lib/artigos.ts. */
function resolveHero(slug, candidato) {
  if (existe(candidato)) return candidato;
  for (const c of [
    "/artigos/" + slug + "/hero.webp",
    "/images/" + slug + "/hero.webp",
    "/artigos/" + slug + "/hero.jpg",
  ]) {
    if (existe(c)) return c;
  }
  return primeiraImagem("/images/" + slug) || primeiraImagem("/artigos/" + slug) || FALLBACK;
}

function primeiro(d, ...chaves) {
  for (const k of chaves) {
    const v = d[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

const porSlug = new Map();
for (const f of walk(ROOT)) {
  let m;
  try { m = matter(fs.readFileSync(f, "utf8")); } catch { continue; }
  const d = m.data;
  if (!d || !d.title) continue;
  const slug = d.slug || path.basename(path.dirname(f));

  const cand = (d.images && d.images.hero) || (d.imagens && d.imagens.hero) ||
    primeiro(d, "ogImage", "imagemHero", "image", "hero");

  const art = {
    slug,
    title: d.title,
    cat: primeiro(d, "subcategory", "subcategoria", "category", "categoria") || "Bem Mais Bella",
    catRaw: primeiro(d, "category", "categoria") || pastaCategoria(f),
    desc: primeiro(d, "description", "descricao", "meta_description", "ogDescription", "og_description"),
    img: resolveHero(slug, cand),
    author: primeiro(d, "author", "autor") || "Lillith Nogah",
    read: primeiro(d, "readingTime", "tempo_leitura"),
    date: primeiro(d, "publishedAt", "publishDate", "date", "data"),
    _peso: String(m.content || "").length,
  };

  // Mesmo criterio do leitor: entre slugs duplicados vence o texto mais longo.
  const atual = porSlug.get(slug);
  if (!atual || art._peso > atual._peso) porSlug.set(slug, art);
}

/** Quando o frontmatter nao traz categoria, a pasta do arquivo diz qual e. */
function pastaCategoria(file) {
  const rel = path.relative(ROOT, file).split(path.sep);
  return rel[0] || "";
}

const arts = Array.from(porSlug.values());

// Prioriza quem tem capa real e descricao: a home e a vitrine do site.
arts.sort((a, b) => {
  const qa = (a.img !== FALLBACK ? 2 : 0) + (a.desc ? 1 : 0);
  const qb = (b.img !== FALLBACK ? 2 : 0) + (b.desc ? 1 : 0);
  if (qa !== qb) return qb - qa;
  return String(b.date).localeCompare(String(a.date));
});

const limpo = (a) => { const { _peso, catRaw, ...r } = a; return r; };

const top = arts.slice(0, 9).map(limpo);
fs.writeFileSync(path.join(process.cwd(), "src/lib/destaques.json"), JSON.stringify(top, null, 2), "utf8");

// --- Dados das demais secoes da home ---------------------------------------

const slugify = (s) =>
  String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const CATEGORIAS = [
  ["estilo-e-beleza", "Estilo e Beleza"],
  ["saude-e-bem-estar", "Saude e Bem-Estar"],
  ["maternidade-e-familia", "Maternidade e Familia"],
  ["casamentos-com-proposito", "Casamentos com Proposito"],
  ["relacionamentos-conscientes", "Relacionamentos Conscientes"],
  ["carreira-e-financas", "Carreira e Financas"],
  ["estilo-de-vida", "Estilo de Vida"],
  ["desenvolvimento-pessoal", "Desenvolvimento Pessoal"],
  ["historias-inspiradoras", "Historias Inspiradoras"],
];
const ALIAS = {
  beleza: "estilo-e-beleza", moda: "estilo-e-beleza", maquiagem: "estilo-e-beleza",
  "estilo-e-beleza-beleza": "estilo-e-beleza", saude: "saude-e-bem-estar",
  "bem-estar": "saude-e-bem-estar", autoconhecimento: "desenvolvimento-pessoal",
  maternidade: "maternidade-e-familia", familia: "maternidade-e-familia",
  relacionamentos: "relacionamentos-conscientes", casamentos: "casamentos-com-proposito",
  carreira: "carreira-e-financas", financas: "carreira-e-financas",
};
const catDe = (bruto) => {
  const s = slugify(bruto);
  if (CATEGORIAS.some(([k]) => k === s)) return s;
  return ALIAS[s] || "";
};

// Novidades: os mais recentes com data real e capa real.
const novidades = arts
  .filter((a) => a.date && a.img !== FALLBACK)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  .slice(0, 6)
  .map(limpo);

// Secoes populares: contagem real por categoria, com uma capa de exemplo.
const populares = CATEGORIAS.map(([slug, nome]) => {
  const dela = arts.filter((a) => catDe(a.catRaw) === slug);
  const comCapa = dela.find((a) => a.img !== FALLBACK);
  return { slug, nome, total: dela.length, img: comCapa ? comCapa.img : FALLBACK };
})
  .filter((c) => c.total > 0)
  .sort((a, b) => b.total - a.total);

fs.writeFileSync(
  path.join(process.cwd(), "src/lib/home.json"),
  JSON.stringify({ novidades, populares, totalArtigos: arts.length }, null, 2),
  "utf8"
);

const semCapa = top.filter((a) => a.img === FALLBACK).length;
const semDesc = top.filter((a) => !a.desc).length;
console.log("destaques.json: " + top.length + " artigos (de " + arts.length + " disponiveis)");
console.log("  sem capa real: " + semCapa + "   sem descricao: " + semDesc);
console.log("home.json: " + novidades.length + " novidades, " + populares.length + " secoes populares");
populares.forEach((c) => console.log("   " + String(c.total).padStart(3) + "  " + c.nome));
