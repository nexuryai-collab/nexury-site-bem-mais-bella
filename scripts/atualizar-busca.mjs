/**
 * Regenera o campo `img` de public/busca.json a partir do que existe em disco.
 *
 * O indice de busca foi gerado uma vez e ficou apontando para o acervo antigo
 * (/images/<slug>/hero.webp, arquivos de 10 KB). As capas de verdade vivem em
 * /artigos/<slug>/hero.webp. Mesma regra do resolveHero em src/lib/artigos.ts:
 * a convencao ganha do que estiver escrito.
 *
 * Rodar sempre que capas forem regeradas:  node scripts/atualizar-busca.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const PUB = path.join(process.cwd(), 'public');
const MIN = 20000;

const tamanho = (rel) => {
  try { return fs.statSync(path.join(PUB, rel)).size; } catch { return 0; }
};

const arquivo = path.join(PUB, 'busca.json');
const itens = JSON.parse(fs.readFileSync(arquivo, 'utf8'));

// Metade do indice guardava a data como string de Date em locale do build
// ("Tue Sep 15 2026 ... Ora legale dell'Europa centrale"), que aparecia crua
// para a leitora e quebrava a ordenacao. Normaliza para AAAA-MM-DD.
const paraISO = (v) => {
  if (!v) return '';
  const m = String(v).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[0];
  const d = new Date(String(v));
  if (isNaN(d.getTime())) return '';
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0')
    + '-' + String(d.getUTCDate()).padStart(2, '0');
};

let trocadas = 0, semCapa = [], datas = 0;
for (const it of itens) {
  const iso = paraISO(it.date);
  if (iso && iso !== it.date) { it.date = iso; datas++; }
  const candidatos = [
    '/artigos/' + it.slug + '/hero.webp',
    '/artigos/' + it.slug + '/hero.jpg',
    '/images/' + it.slug + '/hero.webp',
    it.img,
  ];
  const boa = candidatos.find(c => c && tamanho(c) >= MIN);
  if (!boa) { semCapa.push(it.slug); continue; }
  if (boa !== it.img) { it.img = boa; trocadas++; }
}

fs.writeFileSync(arquivo, JSON.stringify(itens));
console.log('itens:', itens.length, '| capas corrigidas:', trocadas, '| datas normalizadas:', datas, '| sem capa util:', semCapa.length);
if (semCapa.length) console.log('  ', semCapa.join(', '));
