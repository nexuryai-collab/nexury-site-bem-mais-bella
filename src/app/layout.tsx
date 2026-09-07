import type { Metadata } from 'next';
import './globals.css';
import './globals-premium.css';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import BuscaHeader from '../components/BuscaHeader';
import MenuCategorias from '../components/MenuCategorias';
import Movimento from '@/components/Movimento';
import home from '@/lib/home.json';
import { areasVisiveis } from '@/lib/taxonomia';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  variable: '--font-cormorant'
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  // Sem metadataBase, toda og:image sai como http://localhost:3000/... e
  // cada compartilhamento em WhatsApp, Instagram ou Facebook vai sem imagem.
  metadataBase: new URL('https://bemmaisbella.com.br'),
  title: 'Bem Mais Bella - Noticias',
  description: 'Estilo, saude, maternidade, carreira e desenvolvimento pessoal para a mulher brasileira.',
};

/**
 * O menu nao e uma lista escrita a mao.
 *
 * Sai da taxonomia (a arvore do site) cruzada com o acervo (o que existe de
 * fato). Area estruturada mas ainda sem materia — Famosos, por exemplo — tem
 * rota e tem pagina, e nao aparece aqui ate ter o que mostrar.
 */
const TOTAL_POR_AREA: Record<string, number> = Object.fromEntries(
  home.populares.map(c => [c.slug, c.total])
);

const COM_ACERVO = areasVisiveis(TOTAL_POR_AREA);

/** Quatro atalhos no topo: os tres maiores do acervo mais as Ferramentas. */
const atalhos = [
  ...COM_ACERVO.slice()
    .sort((a, b) => (TOTAL_POR_AREA[b.slug] || 0) - (TOTAL_POR_AREA[a.slug] || 0))
    .slice(0, 3)
    .map(a => ({ nome: a.curto || a.nome, url: '/' + a.slug })),
  { nome: 'Ferramentas', url: '/ferramentas' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-[family-name:var(--font-outfit)] bg-[#240046] text-[#9AA4AF] antialiased">
        <Movimento>
        <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-[rgba(36,0,70,0.9)]">
          <div className="h-full w-[35%] bg-gradient-to-r from-[#F72585] to-[#e85d8a] animate-[pulse_3s_ease-in-out_infinite] rounded-full" />
        </div>

        <header className="sticky top-0 z-50 bg-[#240046]/90 backdrop-blur-xl border-b border-[rgba(240,72,133,0.15)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-[rgba(247,37,133,0.4)] shadow-[0_0_20px_rgba(240,72,133,0.3)] group-hover:shadow-[0_0_30px_rgba(240,72,133,0.5)] transition-all">
                <img src="/images/logo-bem-mais-bella.png" alt="Bem Mais Bella" className="w-full h-full object-contain scale-110" />
              </div>
              <div>
                <h1 className="text-xl font-[family-name:var(--font-cormorant)] text-[#f5f0e6] leading-none tracking-tight">Bem Mais Bella</h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#F72585] font-medium">Noticias & Estilo</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#9AA4AF]">
              <a href="/em-alta" className="hover:text-[#F72585] transition-colors">Em Alta</a>
              <MenuCategorias />
              {atalhos.map(link => (
                <a key={link.url} href={link.url} className="hover:text-[#F72585] transition-colors">{link.nome}</a>
              ))}
            </nav>

            <BuscaHeader />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>

        <footer className="bg-[#1a0a2e] border-t border-[rgba(240,72,133,0.12)] mt-16">
          <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-serif text-xl text-[#f5f0e6] mb-3">Bem Mais Bella</h3>
              <p className="text-[#9AA4AF]/70 leading-relaxed">Noticias, estilo e desenvolvimento para a mulher brasileira.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#F72585] mb-3">Categorias</h4>
              <ul className="space-y-2 text-[#9AA4AF]/80">
                {COM_ACERVO.map(c => (
                  <li key={c.slug}>
                    <a href={'/' + c.slug} className="hover:text-[#F72585] transition">{c.nome}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F72585] mb-3">Institucional</h4>
              <ul className="space-y-2 text-[#9AA4AF]/80">
                {[
                  { nome: 'Em Alta Agora', url: '/em-alta' },
                  { nome: 'Ferramentas', url: '/ferramentas' },
                  { nome: 'Para Voce', url: '/para-voce' },
                  { nome: 'Compras', url: '/compras' },
                  { nome: 'Sobre Nos', url: '/sobre-nos' },
                  { nome: 'Politica Editorial', url: '/politica-editorial' },
                  { nome: 'Comunidade', url: '/comunidade' },
                  { nome: 'Buscar no acervo', url: '/busca' },
                  { nome: 'Politica de Privacidade', url: '/politica-de-privacidade' },
                  { nome: 'Termos de Uso', url: '/termos-de-uso' },
                ].map(l => (
                  <li key={l.url}>
                    <a href={l.url} className="hover:text-[#F72585] transition">{l.nome}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 py-4 border-t border-[rgba(240,72,133,0.08)] text-xs text-[#9AA4AF]/50 flex justify-between items-center">
            <span>Bem Mais Bella - 2026. Todos os direitos reservados.</span>
          </div>
        </footer>
        </Movimento>
      </body>
    </html>
  );
}
