import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function safeMatter(raw: string) {
  try { return matter(raw); } catch { return null; }
}

const DIR = path.join(process.cwd(), 'src/app/artigos');
const FALLBACK = '/images/placeholder.webp';

export type Artigo = {
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  hero: string;
  content: string;
};

function exists(p: string) {
  if (!p) return false;
  return fs.existsSync(path.join(process.cwd(), 'public', p));
}

const ROOT = path.join(process.cwd(), 'src/app');

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full));
    else if (e.name === 'artigo.md') out.push(full);
  }
  return out;
}

export function getFiles(): string[] {
  if (!fs.existsSync(ROOT)) return [];
  return walk(ROOT);
}

export function getSlugs(): string[] {
  return getFiles().map(f => {
    const raw = fs.readFileSync(f, 'utf8');
    const m = safeMatter(raw);
    if (!m) return '';
    return m.data.slug || path.basename(path.dirname(f));
  });
}

export function getArtigo(slug: string): Artigo | null {
  const file = getFiles().find(f => {
    const m2 = safeMatter(fs.readFileSync(f, 'utf8'));
    if (!m2) return false;
    return (m2.data.slug || path.basename(path.dirname(f))) === slug;
  });
  if (!file) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const m = safeMatter(raw);
  if (!m) return null;
  const { data, content } = m;
  // Hero: sempre tenta carregar, usa fallback se não existir
  const hero = data.images?.hero || data.ogImage || FALLBACK;
  // Seções: apenas as que realmente existem no disco
  const sec1 = data.images?.section1 ? (exists(data.images.section1) ? data.images.section1 : '') : '';
  const sec2 = data.images?.section2 ? (exists(data.images.section2) ? data.images.section2 : '') : '';
  const sec3 = data.images?.section3 ? (exists(data.images.section3) ? data.images.section3 : '') : '';
  const sec4 = data.images?.section4 ? (exists(data.images.section4) ? data.images.section4 : '') : '';
  const sec5 = data.images?.section5 ? (exists(data.images.section5) ? data.images.section5 : '') : '';
  return {
    slug: data.slug || slug,
    title: data.title || slug,
    description: data.description || '',
    category: data.category || 'Geral',
    subcategory: data.subcategory || '',
    author: data.author || 'Bem Mais Bella',
    publishedAt: data.publishedAt || '',
    readingTime: data.readingTime || '',
    hero,
    content,
    images: {
      hero,
      section1: sec1,
      section2: sec2,
      section3: sec3,
      section4: sec4,
      section5: sec5,
      // Total de imagens disponíveis (para contagem no frontend)
      totalSections: sec1 || sec2 || sec3 || sec4 || sec5 ? 5 : 1,
    },
  };
}

export function getTodos(): Artigo[] {
  return getSlugs()
    .filter(s => s !== '')
    .map(getArtigo)
    .filter((a): a is Artigo => a !== null)
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
}

export function getPorCategoria(cat: string): Artigo[] {
  return getTodos().filter(a => a.category === cat);
}
