'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Quiz: Descubra Seu Estilo e Propósito.
 *
 * Cada resposta pontua categorias reais do site. O resultado leva para uma
 * página que existe e tem artigos — não há resultado decorativo aqui.
 */

type Opcao = { texto: string; pontos: Record<string, number> };
type Pergunta = { titulo: string; opcoes: Opcao[] };

const PERGUNTAS: Pergunta[] = [
  {
    titulo: 'Como você descreveria o seu momento agora?',
    opcoes: [
      { texto: 'Quero me reencontrar', pontos: { 'desenvolvimento-pessoal': 3, 'saude-e-bem-estar': 1 } },
      { texto: 'Quero cuidar do corpo', pontos: { 'saude-e-bem-estar': 3, 'estilo-e-beleza': 1 } },
      { texto: 'Quero organizar a vida financeira', pontos: { 'carreira-e-financas': 3, 'estilo-de-vida': 1 } },
      { texto: 'Estou construindo família', pontos: { 'maternidade-e-familia': 3, 'relacionamentos-conscientes': 1 } },
    ],
  },
  {
    titulo: 'O que te da mais prazer no dia a dia?',
    opcoes: [
      { texto: 'Montar um look que me representa', pontos: { 'estilo-e-beleza': 3 } },
      { texto: 'Uma conversa profunda', pontos: { 'relacionamentos-conscientes': 3, 'historias-inspiradoras': 1 } },
      { texto: 'Cozinhar, viajar, decorar', pontos: { 'estilo-de-vida': 3 } },
      { texto: 'Escrever e refletir', pontos: { 'desenvolvimento-pessoal': 3, 'historias-inspiradoras': 1 } },
    ],
  },
  {
    titulo: 'O que você quer que mude nos próximos seis meses?',
    opcoes: [
      { texto: 'Minha rotina de autocuidado', pontos: { 'saude-e-bem-estar': 3, 'desenvolvimento-pessoal': 1 } },
      { texto: 'Minha relação com dinheiro', pontos: { 'carreira-e-financas': 3 } },
      { texto: 'Minha relação a dois', pontos: { 'relacionamentos-conscientes': 3, 'casamentos-com-proposito': 1 } },
      { texto: 'Minha confiança em mim', pontos: { 'desenvolvimento-pessoal': 2, 'historias-inspiradoras': 2 } },
    ],
  },
];

const NOMES: Record<string, string> = {
  'estilo-e-beleza': 'Estilo e Beleza',
  'saude-e-bem-estar': 'Saúde e Bem-Estar',
  'maternidade-e-familia': 'Maternidade e Família',
  'casamentos-com-proposito': 'Casamentos com Propósito',
  'relacionamentos-conscientes': 'Relacionamentos Conscientes',
  'carreira-e-financas': 'Carreira e Finanças',
  'estilo-de-vida': 'Estilo de Vida',
  'desenvolvimento-pessoal': 'Desenvolvimento Pessoal',
  'historias-inspiradoras': 'Histórias Inspiradoras',
};

const FRASE: Record<string, string> = {
  'estilo-e-beleza': 'Você se expressa pelo que veste e pelo cuidado com a própria imagem.',
  'saude-e-bem-estar': 'Seu propósito passa pelo corpo: energia, equilíbrio e presença.',
  'maternidade-e-familia': 'Sua jornada gira em torno de cuidar e construir vínculo.',
  'casamentos-com-proposito': 'Você quer celebrar com sentido, não com excesso.',
  'relacionamentos-conscientes': 'Você cresce nas relações, e quer que elas cresçam com você.',
  'carreira-e-financas': 'Você quer autonomia — e sabe que ela passa por dinheiro e trabalho.',
  'estilo-de-vida': 'Seu propósito esta no cotidiano bem vivido, não no extraordinário.',
  'desenvolvimento-pessoal': 'Você esta em processo de se entender antes de se cobrar.',
  'historias-inspiradoras': 'Você se move pelo exemplo de outras mulheres reais.',
};

export default function Quiz() {
  const [passo, setPasso] = useState(0);
  const [placar, setPlacar] = useState<Record<string, number>>({});

  const responder = (o: Opcao) => {
    const novo = { ...placar };
    for (const [k, v] of Object.entries(o.pontos)) novo[k] = (novo[k] || 0) + v;
    setPlacar(novo);
    setPasso(passo + 1);
  };

  const reiniciar = () => { setPlacar({}); setPasso(0); };

  const terminou = passo >= PERGUNTAS.length;
  const vencedor = terminou
    ? Object.entries(placar).sort((a, b) => b[1] - a[1])[0]?.[0] || 'desenvolvimento-pessoal'
    : '';

  return (
    <div className="rounded-3xl border border-[rgba(240,72,133,0.2)] bg-gradient-to-br from-[#45495f]/25 to-[#240046]/40 p-8 md:p-12">
      <AnimatePresence mode="wait">
        {!terminou ? (
          <motion.div
            key={passo}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              {PERGUNTAS.map((_, i) => (
                <span
                  key={i}
                  className={
                    'h-1 flex-1 rounded-full transition-colors duration-500 ' +
                    (i <= passo ? 'bg-[#F72585]' : 'bg-[#9AA4AF]/20')
                  }
                />
              ))}
            </div>

            <p className="text-[#9AA4AF]/60 text-xs uppercase tracking-[0.25em] font-bold">
              Pergunta {passo + 1} de {PERGUNTAS.length}
            </p>

            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-[#f5f0e6] mt-3 mb-8 leading-tight">
              {PERGUNTAS[passo].titulo}
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {PERGUNTAS[passo].opcoes.map(o => (
                <button
                  key={o.texto}
                  onClick={() => responder(o)}
                  className="text-left px-6 py-5 rounded-2xl bg-[#240046]/50 border border-[rgba(240,72,133,0.15)] text-[#f5f0e6] hover:border-[#F72585] hover:bg-[#F72585]/10 transition-all"
                >
                  {o.texto}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Seu resultado</p>
            <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-[#f5f0e6] mt-3">
              {NOMES[vencedor]}
            </h3>
            <p className="text-[#9AA4AF] mt-4 max-w-xl mx-auto leading-relaxed">{FRASE[vencedor]}</p>

            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <a href={'/' + vencedor} className="btn-rosa px-8 py-4 text-base">
                Ver os artigos
              </a>
              <button
                onClick={reiniciar}
                className="px-8 py-4 rounded-full border border-[#F72585]/40 text-[#F72585] hover:bg-[#F72585]/10 transition-all text-base font-medium"
              >
                Refazer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
