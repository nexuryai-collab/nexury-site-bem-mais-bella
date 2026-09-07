'use client';

import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import FundoTematico from './FundoTematico';

export type CardArtigo = {
  slug: string;
  title: string;
  description: string;
  hero: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  author: string;
  readingTime: string;
};

/** Sem foto util, o card usa o fundo tematico da categoria em vez do placeholder. */
function temFoto(hero: string) {
  return !!hero && !hero.includes('placeholder');
}

export default function GradeArtigos({ artigos }: { artigos: CardArtigo[] }) {
  if (!artigos.length) {
    return (
      <p className="text-[#9AA4AF]/70 py-12">
        Ainda não publicamos nada por aqui. Enquanto isso, o resto do acervo esta em{' '}
        <a href="/" className="text-[#F72585] hover:underline">todas as categorias</a>.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {artigos.map((a, i) => (
        <TiltCard
          key={a.slug}
          className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all hover:shadow-[0_20px_60px_rgba(240,72,133,0.15)]"
        >
          <motion.a
            href={'/artigos/' + a.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: Math.min(i, 8) * 0.06 }}
            whileHover={{ y: -8 }}
            className="block"
          >
            <div className="relative h-60 overflow-hidden">
              {temFoto(a.hero) ? (
                <>
                  <img
                    src={a.hero}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-transparent to-transparent" />
                </>
              ) : (
                <FundoTematico slug={a.categorySlug} animado={false} />
              )}

              <span className="absolute top-4 left-4 px-3 py-1 bg-[#240046]/90 backdrop-blur text-[#F72585] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#F72585]/30">
                {a.subcategory || a.category}
              </span>
            </div>

            <div className="p-7">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] leading-tight mb-3 group-hover:text-[#F72585] transition-colors">
                {a.title}
              </h3>
              {a.description ? (
                <p className="text-[#9AA4AF]/80 text-sm leading-relaxed mb-5 line-clamp-3">{a.description}</p>
              ) : null}
              <div className="flex items-center justify-between text-xs text-[#9AA4AF]/60">
                <span>Por <strong className="text-[#F72585]">{a.author}</strong></span>
                {a.readingTime ? <span>{a.readingTime}</span> : null}
              </div>
            </div>
          </motion.a>
        </TiltCard>
      ))}
    </div>
  );
}
