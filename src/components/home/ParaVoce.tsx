'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * "Para Você: Dicas Personalizadas".
 *
 * A personalizacao e honesta: vem do que este navegador de fato leu, guardado
 * em localStorage por RegistraLeitura. Nada sai do dispositivo, não há perfil,
 * não há rastreamento entre sites. Quem nunca leu nada ve os mais recentes,
 * e o texto da seção muda para não prometer personalizacao que não existe.
 */

type Item = {
  slug: string; title: string; desc: string; cat: string; catSlug: string;
  sub: string; img: string; author: string; read: string; date: string;
};

const CHAVE = 'bmb:lidos';

export default function ParaVoce() {
  const [itens, setItens] = useState<Item[]>([]);
  const [personalizado, setPersonalizado] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let lidos: string[] = [];
    try {
      lidos = JSON.parse(localStorage.getItem(CHAVE) || '[]');
    } catch {
      lidos = [];
    }

    fetch('/busca.json')
      .then(r => r.json())
      .then((todos: Item[]) => {
        const porSlug = new Map(todos.map(t => [t.slug, t]));
        const cats = lidos
          .map(s => porSlug.get(s)?.catSlug)
          .filter(Boolean) as string[];

        if (cats.length) {
          const peso: Record<string, number> = {};
          cats.forEach(c => { peso[c] = (peso[c] || 0) + 1; });
          const favoritas = Object.entries(peso).sort((a, b) => b[1] - a[1]).map(([c]) => c);

          const sugestoes = todos
            .filter(t => favoritas.includes(t.catSlug) && !lidos.includes(t.slug) && t.img && !t.img.includes('placeholder'))
            .sort((a, b) => favoritas.indexOf(a.catSlug) - favoritas.indexOf(b.catSlug))
            .slice(0, 3);

          if (sugestoes.length) {
            setItens(sugestoes);
            setPersonalizado(true);
            setPronto(true);
            return;
          }
        }

        setItens(
          todos.filter(t => t.img && !t.img.includes('placeholder') && t.desc).slice(0, 3)
        );
        setPronto(true);
      })
      .catch(() => setPronto(true));
  }, []);

  if (!pronto || !itens.length) return null;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Para você</span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2">
            Dicas Personalizadas
          </h2>
          <p className="text-[#9AA4AF] mt-3 max-w-xl">
            {personalizado
              ? 'Escolhidas a partir do que você leu aqui. Fica so no seu navegador.'
              : 'Comece por estas. Conforme você ler, esta seção passa a seguir o seu gosto.'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {itens.map((a, i) => (
          <motion.a
            key={a.slug}
            href={'/artigos/' + a.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#240046]/90 backdrop-blur text-[#F72585] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#F72585]/30">
                {a.sub || a.cat}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] leading-tight group-hover:text-[#F72585] transition-colors">
                {a.title}
              </h3>
              {a.desc ? (
                <p className="text-[#9AA4AF]/80 text-sm leading-relaxed mt-3 line-clamp-2">{a.desc}</p>
              ) : null}
            </div>
          </motion.a>
        ))}
      </div>
    </>
  );
}
