/**
 * Validador de artigos.
 *
 * Este script existe porque documentação sozinha não segurou. Os mesmos
 * defeitos voltaram várias vezes, escritos por agentes diferentes:
 *
 *   - slug com acento          -> a página vira 404 no export estático
 *   - frontmatter sem fechar   -> gray-matter engole o arquivo, página vazia
 *   - imagem de 0 byte         -> 37 delas foram commitadas de uma vez
 *   - rodapé de máquina        -> "Total de palavras: 2.678" publicado à leitora
 *   - data no futuro           -> artigo "recém-publicado" datado semana que vem
 *
 * Regra do projeto: quem escreve artigo roda isto antes de commitar. O que o
 * validador reprova não vai para o ar.
 *
 *   node scripts/checar-artigos.mjs            # tudo
 *   node scripts/checar-artigos.mjs <slug>     # só um
 *
 * Sai com código 1 se houver ERRO, 0 se só houver AVISO.
 */
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = process.cwd();
const APP = path.join(RAIZ, 'src', 'app');
const PUB = path.join(RAIZ, 'public');

const MIN_IMAGEM = 20000; // abaixo disto o site descarta na renderização
const HOJE = new Date().toISOString().slice(0, 10);

const alvo = process.argv[2] || null;

/**
 * Quais slugs estao de fato no ar. Artigo arquivado tambem e verificado, mas
 * o que nele seria erro vira aviso: reprovar publicacao por causa de arquivo
 * que ninguem le e o caminho mais curto para o validador ser ignorado.
 */
let ARQUIVADOS = new Set();
try {
  const red = fs.readFileSync(path.join(PUB, '_redirects'), 'utf8');
  for (const linha of red.split(/\r?\n/)) {
    const m = linha.match(/^\/artigos\/([^\s]+)\s/);
    if (m) ARQUIVADOS.add(decodeURIComponent(m[1]));
  }
} catch {
  // sem _redirects: nada foi aposentado ainda
}

/**
 * Artigo aposentado de proposito (tem redirect apontando para outro lugar) so
 * gera aviso. Todo o resto — inclusive o que voce acabou de escrever e ainda
 * nao esta no indice — e tratado como candidato a ir ao ar, e erro nele
 * bloqueia.
 */
const estaNoAr = slug => !ARQUIVADOS.has(slug);

/* ------------------------------------------------------------------ */

function varrer(dir, saida = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) varrer(p, saida);
    else if (e.name === 'artigo.md') saida.push(p);
  }
  return saida;
}

function lerFrontmatter(bruto) {
  const m = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const campos = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const c = linha.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (c) campos[c[1]] = c[2].replace(/^["']|["']$/g, '').trim();
  }
  return { campos, corpo: bruto.slice(m[0].length) };
}

const RODAPE_DE_MAQUINA = [
  [/\*\*Total de palavras:\*\*/i, 'contagem de palavras do briefing'],
  [/gerado automaticamente pelo Nexus/i, 'assinatura de máquina'],
  [/\/workspace\//, 'caminho interno de servidor'],
  [/^\s*\d+\.\s+\S[^:]{0,38}:\s*\/(images|artigos)\/\S+\s*$/m, 'inventário de imagens'],
  [/\[IMAGEM:/i, 'marcador de imagem não preenchido'],
  [/2500\+?\s*palavras/i, 'instrução de briefing'],
];

const PROIBIDO_NO_TEXTO = [
  [/\bNexus\b/, 'menciona "Nexus" — tudo é assinado só por Lillith Nogah'],
  [/Fellipe Lelis/i, 'menciona o nome do responsável — o site é assinado por Lillith Nogah'],
];

/* ------------------------------------------------------------------ */

const arquivos = varrer(APP).filter(f => !alvo || f.includes(alvo));
let erros = 0;
let avisos = 0;
const problemas = [];

function erro(slug, msg) {
  if (!estaNoAr(slug)) return aviso(slug, msg + ' [arquivado]');
  problemas.push({ nivel: 'ERRO', slug, msg });
  erros++;
}
function aviso(slug, msg) { problemas.push({ nivel: 'aviso', slug, msg }); avisos++; }

for (const arquivo of arquivos) {
  const bruto = fs.readFileSync(arquivo, 'utf8');
  const rel = arquivo.replace(RAIZ + path.sep, '').split(path.sep).join('/');
  const pasta = path.basename(path.dirname(arquivo));

  const fm = lerFrontmatter(bruto);
  if (!fm) {
    erro(pasta, 'frontmatter não abre ou não fecha com --- (a página sai vazia)');
    continue;
  }

  const slug = fm.campos.slug || pasta;

  // 1. slug
  if (!/^[a-z0-9-]+$/.test(slug)) {
    erro(slug, 'slug tem acento, maiúscula ou caractere especial — vira 404 no export');
  }
  if (fm.campos.slug && fm.campos.slug !== pasta) {
    aviso(slug, `slug "${fm.campos.slug}" difere do nome da pasta "${pasta}"`);
  }

  // 2. campos obrigatórios.
  // As variantes aceitas são as mesmas que src/lib/artigos.ts normaliza — se o
  // validador for mais rigoroso que o leitor, vira alarme falso e é ignorado.
  const VARIANTES = {
    title: ['title', 'titulo'],
    description: ['description', 'descricao', 'metaDescription', 'meta_description',
                  'ogDescription', 'og_description', 'resumo'],
  };
  for (const [campo, chaves] of Object.entries(VARIANTES)) {
    if (!chaves.some(k => fm.campos[k])) {
      erro(slug, `falta "${campo}" no frontmatter (aceito também como: ${chaves.slice(1).join(', ')})`);
    }
  }
  const data = fm.campos.publishDate || fm.campos.publishedAt || fm.campos.date || fm.campos.data;
  if (!data) {
    aviso(slug, 'sem data no frontmatter — fica fora da ordenação e do "Acabou de sair"');
  } else {
    const iso = String(data).match(/^\d{4}-\d{2}-\d{2}/);
    if (!iso) aviso(slug, `data em formato estranho: "${data}" — use AAAA-MM-DD`);
    else if (iso[0] > HOJE) aviso(slug, `datado no futuro (${iso[0]}) — aparece como "ainda por sair"`);
  }
  const autor = fm.campos.author || fm.campos.autor;
  if (autor && !/lillith/i.test(autor)) {
    erro(slug, `autor "${autor}" — todo artigo é assinado por Lillith Nogah`);
  }

  // 3. corpo
  const corpo = fm.corpo;
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  if (palavras < 800) aviso(slug, `só ${palavras} palavras — conteúdo magro reprova no AdSense`);
  if (!/^##\s+/m.test(corpo.replace(/^ +/gm, ''))) {
    aviso(slug, 'nenhum <h2> — o texto sai sem respiro e sem imagem no corpo');
  }

  for (const [re, oque] of RODAPE_DE_MAQUINA) {
    if (re.test(corpo)) erro(slug, `rodapé de máquina no texto: ${oque}`);
  }
  for (const [re, oque] of PROIBIDO_NO_TEXTO) {
    if (re.test(corpo)) erro(slug, oque);
  }

  // 3b. Areas com regra propria.
  // Materia sobre pessoa real exige atribuicao visivel: link de fonte, ou
  // "segundo X", ou "em entrevista a". Sem isso e rumor, e rumor nao entra.
  const cat = (fm.campos.category || fm.campos.categoria || '').toLowerCase();
  if (/famoso|entretenimento/.test(cat)) {
    const temFonte =
      /\]\(https?:\/\//.test(corpo) ||
      /segundo\s+[A-ZÀ-Ú]/.test(corpo) ||
      /em entrevista (a|ao|à)\s/i.test(corpo) ||
      /em publicação (no|na)\s/i.test(corpo) ||
      /anunciou (em|no|na)\s/i.test(corpo);
    if (!temFonte) {
      erro(
        slug,
        'área de Famosos sem atribuição no texto — cobertura de pessoa real exige ' +
          'fonte visível (link, "segundo X", "em entrevista a"). Rumor não entra.'
      );
    }
  }

  // 4. imagens
  const dirs = [path.join(PUB, 'artigos', slug), path.join(PUB, 'images', slug)];
  let hero = null;
  const secs = [];
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      const tam = fs.statSync(path.join(d, f)).size;
      if (tam === 0) erro(slug, `imagem de 0 byte: ${path.basename(d)}/${f}`);
      if (/^hero\./i.test(f)) { if (!hero || tam > hero) hero = tam; }
      else if (/^se(c|cao|ction)[-_]?\d+\./i.test(f) && tam >= MIN_IMAGEM) secs.push(f);
    }
  }
  if (hero === null) erro(slug, `sem capa — crie public/artigos/${slug}/hero.webp`);
  else if (hero < MIN_IMAGEM) erro(slug, `capa com ${Math.round(hero / 1024)} KB — o site descarta abaixo de 20 KB`);
  if (!secs.length) aviso(slug, `sem imagem de seção — crie public/artigos/${slug}/sec1.webp`);
}

/* Slug duplicado: dois arquivos disputando a mesma URL. O leitor resolve
   ficando com o texto mais longo, mas o perdedor continua ali, envelhecendo em
   silencio — foi assim que nasceu metade dos redirects deste projeto. */
const vistos = new Map();
for (const arquivo of arquivos) {
  const bruto = fs.readFileSync(arquivo, 'utf8');
  const fm = lerFrontmatter(bruto);
  const slug = (fm && fm.campos.slug) || path.basename(path.dirname(arquivo));
  if (!vistos.has(slug)) vistos.set(slug, []);
  vistos.get(slug).push(arquivo.replace(RAIZ + path.sep, '').split(path.sep).join('/'));
}
for (const [slug, lista] of vistos) {
  if (lista.length > 1) {
    aviso(slug, `slug duplicado em ${lista.length} arquivos — vence o mais longo: ${lista.join(' | ')}`);
  }
}

/* ------------------------------------------------------------------ */

const porSlug = new Map();
for (const p of problemas) {
  if (!porSlug.has(p.slug)) porSlug.set(p.slug, []);
  porSlug.get(p.slug).push(p);
}

for (const [slug, lista] of porSlug) {
  console.log('\n' + slug);
  for (const p of lista) console.log(`  ${p.nivel === 'ERRO' ? '✗' : '·'} ${p.msg}`);
}

console.log(
  `\n${arquivos.length} artigos verificados — ${erros} erro(s), ${avisos} aviso(s).`
);
if (erros) {
  console.log('Erro bloqueia publicação. Aviso é para você decidir.');
  process.exit(1);
}
