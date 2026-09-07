'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Primitivas de movimento do site.
 *
 * Regra da casa: toda animacao respeita `prefers-reduced-motion`. Quem pediu
 * menos movimento no sistema recebe o conteudo parado, nao uma versao degradada.
 * E nada anima opacidade de texto para 0 sem garantir que ele volte: conteudo
 * invisivel por falha de script e conteudo perdido para o leitor e para o robo.
 */

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

const deslocamento: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/** Revela o bloco quando ele entra na tela. Uma vez so, sem piscar na volta. */
export function Reveal({
  children,
  delay = 0,
  dir = 'up',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  dir?: Dir;
  className?: string;
}) {
  const d = deslocamento[dir];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: d.x, y: d.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Escalona a entrada dos filhos: cada um entra logo depois do anterior. */
export function RevealLista({
  children,
  className = '',
  passo = 0.07,
}: {
  children: ReactNode;
  className?: string;
  passo?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visivel: { transition: { staggerChildren: passo } } }}
    >
      {children}
    </motion.div>
  );
}

export function ItemLista({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        oculto: { opacity: 0, y: 24 },
        visivel: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titulo que revela palavra por palavra conforme entra na tela.
 * O texto continua no HTML inteiro: quem nao roda script, e o robo de busca,
 * leem tudo normalmente.
 */
export function TituloRevelado({
  texto,
  className = '',
  as: Tag = 'h2',
}: {
  texto: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {

  // A estrutura e sempre a mesma, com ou sem movimento. Antes, quem tinha
  // "reduzir movimento" ligado recebia do servidor o titulo quebrado em
  // palavras e do cliente o titulo inteiro: a hidratacao falhava e o React
  // redesenhava a pagina toda. Agora so a animacao muda.
  const palavras = texto.split(' ');
  return (
    <Tag className={className}>
      <motion.span
        initial="oculto"
        whileInView="visivel"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visivel: { transition: { staggerChildren: 0.045 } } }}
        style={{ display: 'inline' }}
      >
        {palavras.map((p, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            variants={{
              oculto: { opacity: 0, y: '0.4em' },
              visivel: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {p}
            {i < palavras.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Imagem que desliza mais devagar que a pagina. */
export function Parallax({
  src,
  alt,
  className = '',
  forca = 90,
}: {
  src: string;
  alt: string;
  className?: string;
  forca?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-forca, forca]) as MotionValue<number>;

  return (
    <div ref={ref} className={'overflow-hidden ' + className}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/**
 * Numero que conta de 0 ate o valor quando entra na tela.
 *
 * Comeca com o valor FINAL, nao com zero: assim o HTML estatico ja sai com o
 * numero certo, e quem chega sem JavaScript — ou o robo de busca — le "63
 * artigos", nao "0 artigos". A contagem so comeca depois que o componente
 * monta no navegador.
 */
export function Contador({
  ate,
  duracao = 1.4,
  className = '',
}: {
  ate: number;
  duracao?: number;
  className?: string;
}) {
  const parado = useReducedMotion();
  const [valor, setValor] = useState(ate);
  const ref = useRef<HTMLSpanElement>(null);
  const naTela = useInView(ref, { once: true, margin: '-60px' });
  const jaRodou = useRef(false);

  useEffect(() => {
    if (parado || !naTela || jaRodou.current) return;
    jaRodou.current = true;

    let raf = 0;
    let inicio = 0;
    setValor(0);
    const passo = (t: number) => {
      if (!inicio) inicio = t;
      const p = Math.min((t - inicio) / (duracao * 1000), 1);
      // desacelera no fim, que e o que faz o numero parecer "assentar"
      const eased = 1 - Math.pow(1 - p, 3);
      setValor(Math.round(eased * ate));
      if (p < 1) raf = requestAnimationFrame(passo);
      else setValor(ate);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [naTela, ate, duracao, parado]);

  return (
    <span ref={ref} className={className}>
      {valor}
    </span>
  );
}

/** Elemento que se inclina levemente na direcao do cursor. */
export function Magnetico({
  children,
  forca = 0.25,
  className = '',
}: {
  children: ReactNode;
  forca?: number;
  className?: string;
}) {
  const parado = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [d, setD] = useState({ x: 0, y: 0 });

  const mover = (e: React.MouseEvent) => {
    if (parado) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setD({
      x: (e.clientX - (r.left + r.width / 2)) * forca,
      y: (e.clientY - (r.top + r.height / 2)) * forca,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={mover}
      onMouseLeave={() => setD({ x: 0, y: 0 })}
      animate={{ x: d.x, y: d.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={'inline-block ' + className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cartao com brilho que segue o cursor. E o efeito que mais separa visual
 * "premium" de "template" — e custa uma variavel CSS, nao uma biblioteca.
 */
export function CartaoBrilho({
  children,
  className = '',
  cor = 'rgba(247,37,133,0.22)',
}: {
  children: ReactNode;
  className?: string;
  cor?: string;
}) {
  const parado = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const mover = (e: React.MouseEvent) => {
    if (parado) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={mover}
      onMouseLeave={() => setPos(null)}
      className={'relative ' + className}
    >
      {pos ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, ${cor}, transparent 65%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  );
}

/** Barra fina no topo mostrando o quanto da pagina ja foi lido. */
export function ProgressoLeitura() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] bg-gradient-to-r from-[#F72585] via-[#e85d8a] to-[#9AA4AF]"
      aria-hidden="true"
    />
  );
}
