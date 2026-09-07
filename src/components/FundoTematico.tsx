'use client';

import { motion } from 'framer-motion';

/**
 * Visual tematico por categoria.
 *
 * Cada uma das nove categorias tem uma fotografia propria em
 * /public/categorias/<slug>.webp. Quando o slug recebido e o de uma categoria,
 * a foto entra como base e o gradiente da marca vem por cima, so o suficiente
 * para o texto branco ter contraste e para os nove cartoes parecerem do mesmo
 * site. Quando o slug nao e de categoria (ou a foto ainda nao existe), sobra o
 * gradiente animado, que pesa quase nada e nunca quebra.
 */

type Paleta = { de: string; para: string; brilho: string };

/** Cada categoria tem um acento proprio, todos dentro da paleta da marca. */
const PALETAS: Record<string, Paleta> = {
  'estilo-e-beleza':            { de: '#3B0A45', para: '#240046', brilho: '#F72585' },
  'saude-e-bem-estar':          { de: '#16324F', para: '#240046', brilho: '#4CC9F0' },
  'maternidade-e-familia':      { de: '#4A1942', para: '#240046', brilho: '#FF8FAB' },
  'casamentos-com-proposito':   { de: '#3F2B56', para: '#240046', brilho: '#E0AAFF' },
  'relacionamentos-conscientes':{ de: '#4B1D3F', para: '#240046', brilho: '#F72585' },
  'carreira-e-financas':        { de: '#1E3A3A', para: '#240046', brilho: '#64DFDF' },
  'estilo-de-vida':             { de: '#3A2E1F', para: '#240046', brilho: '#F9C74F' },
  'desenvolvimento-pessoal':    { de: '#2B1B5A', para: '#240046', brilho: '#7B7BFF' },
  'historias-inspiradoras':     { de: '#4A2C1A', para: '#240046', brilho: '#FF9E6D' },
  'famosos-e-entretenimento':   { de: '#2A1240', para: '#240046', brilho: '#C77DFF' },
  'compras':                    { de: '#1F3326', para: '#240046', brilho: '#80ED99' },
};

const PADRAO: Paleta = { de: '#3B0A45', para: '#240046', brilho: '#F72585' };

export function paletaDe(slug: string): Paleta {
  return PALETAS[slug] || PADRAO;
}

/** So as nove categorias tem foto propria; qualquer outro slug daria 404. */
export function fotoDeCategoria(slug: string): string | undefined {
  return slug in PALETAS ? '/categorias/' + slug + '.webp' : undefined;
}

/**
 * Grao sutil em SVG embutido. Quebra o gradiente liso, que e o que separa
 * "fundo bonito" de "fundo de template".
 */
const GRAO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

export default function FundoTematico({
  slug,
  imagem,
  animado = true,
  className = '',
}: {
  slug: string;
  /** Foto especifica. Sem ela, cai na foto da categoria, se houver. */
  imagem?: string;
  animado?: boolean;
  className?: string;
}) {
  const p = paletaDe(slug);
  const mover = animado;
  const foto = imagem || fotoDeCategoria(slug);

  return (
    <div className={'absolute inset-0 overflow-hidden ' + className} aria-hidden="true">
      {/* base: gradiente sempre presente, para nunca haver buraco branco */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(150deg, ${p.de} 0%, ${p.para} 70%)` }}
      />

      {/* foto, quando houver */}
      {foto ? (
        <>
          <img
            src={foto}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* so o pe da imagem escurece, para o titulo ter onde se apoiar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                `linear-gradient(to top, ${p.para}F0 0%, ${p.para}A6 32%, ${p.para}26 60%, transparent 82%)`,
            }}
          />
          {/* fio de cor da categoria, so para os nove cartoes serem da mesma casa */}
          <div
            className="absolute inset-x-0 bottom-0 h-[3px]"
            style={{ background: p.brilho, opacity: 0.85 }}
          />
        </>
      ) : null}

      {/* aurora: dois halos que respiram devagar */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[80%] h-[130%] rounded-full blur-3xl"
        style={{ background: p.brilho, opacity: foto ? 0.05 : 0.22 }}
        animate={mover ? { x: [0, 30, 0], y: [0, -18, 0], scale: [1, 1.12, 1] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[70%] h-[120%] rounded-full blur-3xl"
        style={{ background: p.de, opacity: foto ? 0.1 : 0.5 }}
        animate={mover ? { x: [0, -26, 0], y: [0, 20, 0], scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* grao */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: GRAO, opacity: foto ? 0.05 : 0.14 }}
      />

      {/* sem foto, a vinheta e o unico contraste do titulo; com foto ela ja veio acima */}
      {foto ? null : (
        <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-[#240046]/45 to-transparent" />
      )}
    </div>
  );
}

/**
 * Fundo ambiente de secao: mesma linguagem, bem mais discreto, para o corpo
 * do site nao ser um retangulo chapado atras do outro.
 */
export function FundoSecao({
  slug = 'estilo-e-beleza',
  className = '',
}: {
  slug?: string;
  className?: string;
}) {
  const p = paletaDe(slug);

  return (
    <div className={'absolute inset-0 overflow-hidden pointer-events-none ' + className} aria-hidden="true">
      <motion.div
        className="absolute top-[-20%] left-[10%] w-[55%] h-[80%] rounded-full blur-[120px]"
        style={{ background: p.brilho, opacity: 0.09 }}
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-25%] right-[5%] w-[45%] h-[70%] rounded-full blur-[120px]"
        style={{ background: p.de, opacity: 0.28 }}
        animate={{ x: [0, -34, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAO, opacity: 0.07 }}
      />
    </div>
  );
}
