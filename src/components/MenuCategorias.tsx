'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { paletaDe } from './FundoTematico';
import home from '../lib/home.json';

/**
 * Menu suspenso de categorias no cabecalho.
 *
 * Abre no hover (mouse) e no clique/teclado (toque e leitor de tela), fecha
 * com Esc e ao clicar fora. Os numeros sao reais, vindos de home.json.
 */
export default function MenuCategorias() {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const parado = useReducedMotion();

  useEffect(() => {
    const fora = (e: MouseEvent) => {
      if (caixa.current && !caixa.current.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    document.addEventListener('mousedown', fora);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', fora);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  const entrar = () => {
    if (timer.current) clearTimeout(timer.current);
    setAberto(true);
  };
  const sair = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAberto(false), 160);
  };

  return (
    <div ref={caixa} className="relative" onMouseEnter={entrar} onMouseLeave={sair}>
      <button
        type="button"
        aria-expanded={aberto}
        aria-haspopup="true"
        onClick={() => setAberto(v => !v)}
        className="flex items-center gap-1.5 hover:text-[#F72585] transition-colors"
      >
        Categorias
        <motion.span
          animate={{ rotate: aberto ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-block text-[10px] leading-none"
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {aberto ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={parado ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
          >
            <div className="w-[min(92vw,640px)] rounded-2xl border border-[rgba(240,72,133,0.22)] bg-[#1a0a2e]/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] p-3">
              <div className="grid sm:grid-cols-2 gap-1">
                {home.populares.map(c => {
                  const p = paletaDe(c.slug);
                  return (
                    <a
                      key={c.slug}
                      href={'/' + c.slug}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F72585]/10 transition-colors"
                    >
                      <span
                        className="w-2 h-8 rounded-full shrink-0 transition-transform group-hover:scale-y-110"
                        style={{ background: `linear-gradient(${p.brilho}, ${p.de})` }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[#f5f0e6] text-sm leading-tight group-hover:text-[#F72585] transition-colors truncate">
                          {c.nome}
                        </span>
                        <span className="block text-[#9AA4AF]/55 text-xs">
                          {c.total} {c.total === 1 ? 'artigo' : 'artigos'}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-2 pt-3 border-t border-[rgba(240,72,133,0.14)] flex items-center justify-between px-3 pb-1">
                <span className="text-[#9AA4AF]/55 text-xs">
                  {home.totalArtigos} artigos no acervo
                </span>
                <a
                  href="/busca"
                  className="text-[#F72585] text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  Buscar por palavra
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
