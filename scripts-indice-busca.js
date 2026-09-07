/**
 * Gera public/busca.json — o indice que a pagina /busca consulta no navegador.
 *
 * O site e estatico (output: export), entao nao existe servidor para consultar.
 * O indice carrega uma vez e a busca roda inteira no cliente. So metadados:
 * incluir o corpo dos artigos passaria de 1 MB e pesaria no celular.
 *
 * Espelha as regras de src/lib/artigos.ts. Mexeu la, mexa aqui.
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

const slugify = (s) =>
  String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const CANON = [
  "estilo-e-beleza", "saude-e-bem-estar", "maternidade-e-familia",
  "casamentos-com-proposito", "relacionamentos-conscientes", "carreira-e-financas",
  "estilo-de-vida", "desenvolvimento-pessoal", "historias-inspiradoras",
];
const ALIAS = {
  beleza: "estilo-e-beleza", moda: "estilo-e-beleza", maquiagem: "estilo-e-beleza",
  "estilo-e-beleza-beleza": "estilo-e-beleza", saude: "saude-e-bem-estar",
  "bem-estar": "saude-e-bem-estar", autoconhecimento: "desenvolvimento-pessoal",
  maternidade: "maternidade-e-familia", familia: "maternidade-e-familia",
  relacionamentos: "relacionamentos-conscientes", casamentos: "casamentos-com-proposito",
  carreira: "carreira-e-financas", financas: "carreira-e-financas",
};
function catSlug(bruto, file) {
  const s = slugify(bruto);
  if (CANON.includes(s)) return s;
  if (ALIAS[s]) return ALIAS[s];
  const rel = path.relative(ROOT, file).split(path.sep);
  return CANON.includes(rel[0]) ? rel[0] : "";
}

const porSlug = new Map();
for (const f of walk(ROOT)) {
  let m;
  try { m = matter(fs.readFileSync(f, "utf8")); } catch { continue; }
  const d = m.data;
  if (!d) continue;
  const slug = d.slug || path.basename(path.dirname(f));
  const title = primeiro(d, "title", "titulo");
  if (!title) continue;

  const cand = (d.images && d.images.hero) || (d.imagens && d.imagens.hero) ||
    primeiro(d, "ogImage", "imagemHero", "image", "hero");

  const reg = {
    slug,
    title,
    desc: primeiro(d, "description", "descricao", "meta_description", "ogDescription", "og_description"),
    cat: primeiro(d, "category", "categoria"),
    catSlug: catSlug(primeiro(d, "category", "categoria"), f),
    sub: primeiro(d, "subcategory", "subcategoria"),
    tags: []
      .concat(d.keywords || [], d.tags || [], d.keyword ? [d.keyword] : [], d.palavraChave ? [d.palavraChave] : [])
      .map(String).slice(0, 12),
    img: resolveHero(slug, cand),
    author: primeiro(d, "author", "autor") || "Lillith Nogah",
    read: primeiro(d, "readingTime", "tempo_leitura"),
    date: primeiro(d, "publishedAt", "publishDate", "date", "data"),
    _peso: String(m.content || "").length,
  };

  const atual = porSlug.get(slug);
  if (!atual || reg._peso > atual._peso) porSlug.set(slug, reg);
}

const itens = Array.from(porSlug.values())
  .map(({ _peso, ...r }) => r)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

const destino = path.join(PUB, "busca.json");
fs.writeFileSync(destino, JSON.stringify(itens), "utf8");
const kb = Math.round(fs.statSync(destino).size / 1024);
console.log("busca.json gerado: " + itens.length + " artigos, " + kb + " KB");
