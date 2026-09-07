import { FundoSecao } from './FundoTematico';
import { Reveal, TituloRevelado } from './Motion';
import type { ReactNode } from 'react';

/**
 * Molde das paginas institucionais (Sobre, Comunidade, Privacidade, Termos).
 * Mesma linguagem visual do resto do site, com a leitura em coluna estreita.
 */
export default function PaginaInstitucional({
  chapeu,
  titulo,
  resumo,
  atualizado,
  cor = 'desenvolvimento-pessoal',
  children,
}: {
  chapeu: string;
  titulo: string;
  resumo?: string;
  atualizado?: string;
  cor?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug={cor} />
        <div className="relative max-w-3xl mx-auto px-6">
          <nav className="text-[11px] uppercase tracking-[0.2em] text-[#9AA4AF]/60 mb-5 flex gap-2">
            <a href="/" className="hover:text-[#F72585] transition">Inicio</a>
            <span>/</span>
            <span className="text-[#F72585]">{chapeu}</span>
          </nav>

          <TituloRevelado
            as="h1"
            texto={titulo}
            className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-[#f5f0e6] leading-tight"
          />

          {resumo ? (
            <Reveal delay={0.1}>
              <p className="text-[#9AA4AF] mt-5 text-lg leading-relaxed">{resumo}</p>
            </Reveal>
          ) : null}

          {atualizado ? (
            <Reveal delay={0.15}>
              <p className="text-[#9AA4AF]/50 text-sm mt-6">Atualizado em {atualizado}.</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-[family-name:var(--font-cormorant)] prose-headings:text-[#f5f0e6] prose-a:text-[#F72585] prose-strong:text-[#f5f0e6] prose-li:text-[#9AA4AF] prose-p:text-[#9AA4AF]">
          {children}
        </div>
      </section>
    </main>
  );
}
