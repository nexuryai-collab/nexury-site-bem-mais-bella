'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = {
  slug: string; title: string; desc: string; cat: string; catSlug: string;
  sub: string; tags: string[]; img: string; author: string; read: string; date: string;
};

const semAcento = (s: string) =>
  String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Pontua por onde o termo bate: titulo vale mais que descricao, que vale mais que tag. */
function pontuar(it: Item, termos: string[]): number {
  const t = semAcento(it.title);
  const d = semAcento(it.desc);
  const c = semAcento(it.cat + ' ' + it.sub);
  const g = semAcento(it.tags.join(' '));
  let p = 0;
  for (const termo of termos) {
    if (!termo) continue;
    if (t.startsWith(termo)) p += 12;
    else if (t.includes(termo)) p += 8;
    if (d.includes(termo)) p += 3;
    if (c.includes(termo)) p += 2;
    if (g.includes(termo)) p += 1;
  }
  return p;
}

export default function BuscaPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [q, setQ] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('q') || '';
    setQ(p);
    fetch('/busca.json')
      .then(r => r.json())
      .then((d: Item[]) => { setItens(d); setCarregando(false); })
      .catch(() => setCarregando(false));
  }, []);

  const resultados = useMemo(() => {
    const termos = semAcento(q).split(/\s+/).filter(Boolean);
    if (!termos.length) return [];
    return itens
      .map(it => ({ it, p: pontuar(it, termos) }))
      .filter(x => x.p > 0)
      .sort((a, b) => b.p - a.p || String(b.it.date).localeCompare(String(a.it.date)))
      .slice(0, 40)
      .map(x => x.it);
  }, [q, itens]);

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 pt-20 pb-24">
      <p className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Busca</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2">
        O que você procura?
      </h1>

      <form
        className="mt-8 flex gap-3"
        onSubmit={e => {
          e.preventDefault();
          const url = new URL(window.location.href);
          if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
          window.history.replaceState(null, '', url.toString());
        }}
      >
        <input
          type="search"
          value={q}
          autoFocus
          onChange={e => setQ(e.target.value)}
          placeholder="Moda consciente, maternidade, journaling..."
          className="flex-1 px-6 py-4 rounded-full bg-[#45495f]/50 border border-[rgba(240,72,133,0.25)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/50 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
        />
      </form>

      <p className="mt-5 text-sm text-[#9AA4AF]/70" aria-live="polite">
        {carregando
          ? 'Carregando o acervo...'
          : !q.trim()
          ? `${itens.length} artigos no acervo. Digite para buscar.`
          : `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'} para "${q}".`}
      </p>

      <div className="mt-10 space-y-4">
        <AnimatePresence mode="popLayout">
          {resultados.map((r, i) => (
            <motion.a
              key={r.slug}
              href={'/artigos/' + r.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i, 10) * 0.03 }}
              className="group flex gap-5 items-center p-4 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/45 hover:bg-[#45495f]/25 transition-all"
            >
              <img
                src={r.img}
                alt=""
                loading="lazy"
                className="w-28 h-20 sm:w-36 sm:h-24 object-cover rounded-xl shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F72585]">
                  {r.sub || r.cat}
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl text-[#f5f0e6] leading-tight group-hover:text-[#F72585] transition-colors">
                  {r.title}
                </h2>
                {r.desc ? (
                  <p className="text-[#9AA4AF]/75 text-sm mt-1 line-clamp-2">{r.desc}</p>
                ) : null}
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {!carregando && q.trim() && !resultados.length ? (
        <div className="mt-10 p-8 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.12)]">
          <p className="text-[#9AA4AF]">
            Nada encontrado para <strong className="text-[#f5f0e6]">{q}</strong>. Tente outra palavra,
            ou comece por uma categoria:
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              ['Estilo e Beleza', '/estilo-e-beleza'],
              ['Saúde e Bem-Estar', '/saude-e-bem-estar'],
              ['Maternidade e Família', '/maternidade-e-familia'],
              ['Desenvolvimento Pessoal', '/desenvolvimento-pessoal'],
            ].map(([nome, url]) => (
              <a
                key={url}
                href={url}
                className="px-5 py-2 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.15)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
              >
                {nome}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
