'use client';

import { useEffect, useState } from 'react';
import { Reveal } from './Motion';

/**
 * "Voce estava lendo" — a parte de "Em Alta" que e sua, e so sua.
 *
 * Le a mesma lista que o RegistraLeitura guarda no localStorage. Nada sai do
 * dispositivo, e por isso mesmo a secao simplesmente nao aparece para quem
 * chegou agora: e melhor sumir do que inventar historico.
 */

type Item = { slug: string; title: string; cat: string; catSlug: string; img: string };

const CHAVE = 'bmb:lidos';

export default function VoceEstavaLendo() {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    let lidos: string[] = [];
    try {
      lidos = JSON.parse(localStorage.getItem(CHAVE) || '[]');
    } catch {
      return;
    }
    if (!lidos.length) return;

    fetch('/busca.json')
      .then(r => r.json())
      .then((todos: Item[]) => {
        const porSlug = new Map(todos.map(t => [t.slug, t]));
        setItens(lidos.map(s => porSlug.get(s)).filter(Boolean).slice(0, 4) as Item[]);
      })
      .catch(() => undefined);
  }, []);

  if (!itens.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <Reveal>
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mb-2">
          Voce estava lendo
        </h2>
        <p className="text-[#9AA4AF]/70 text-sm mb-8">
          Guardado so neste navegador. Ninguem alem de voce ve esta lista.
        </p>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {itens.map(a => (
          <a
            key={a.slug}
            href={'/artigos/' + a.slug}
            className="group block rounded-2xl overflow-hidden bg-[#45495f]/15 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/45 transition-all"
          >
            <img
              src={a.img}
              alt=""
              loading="lazy"
              className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="p-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#F72585]">
                {a.cat}
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-lg text-[#f5f0e6] mt-1 leading-tight line-clamp-3 group-hover:text-[#F72585] transition-colors">
                {a.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
