import type { Metadata } from 'next';
import './globals.css';
import './globals-premium.css';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { motion } from 'framer-motion';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','600'], variable: '--font-cormorant' });
const outfit = Outfit({ subsets: ['latin'], weight: ['300','400','600'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Bem Mais Bella — Notícias',
  description: 'Estilo, saúde, maternidade, carreira e desenvolvimento pessoal para a mulher brasileira. Conteúdo premium com animações e retenção.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
<script src="https://unpkg.com/@studio-freight/lenis@1.1.13/dist/lenis.min.js" defer></script>
<script>
  document.addEventListener("DOMContentLoaded", function(){ if(window.Lenis) {const lenis = new Lenis({dur: 1.2, easing: (t)=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel: true}); requestAnimationFrame(function raf(time){ lenis.raf(time); requestAnimationFrame(raf); });} });
</script> className="font-[family-name:var(--font-outfit)] bg-[#240046] text-[#9AABAF] antialiased">
        {/* Progress Bar — retencao */}
        <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-[rgba(36,0,70,0.9)]">
          <div className="h-full w-[35%] bg-gradient-to-r from-[#F72585] to-[#e85d8a] animate-[pulse_3s_ease-in-out_infinite] rounded-full" />
        </div>

        {/* Header — cores Ninja */}
        <header className="sticky top-0 z-50 bg-[#240046]/90 backdrop-blur-xl border-b border-[rgba(240,72,133,0.15)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F72585] to-[#e85d8a] flex items-center justify-center shadow-[0_0_20px_rgba(240,72,133,0.3)] group-hover:shadow-[0_0_30px_rgba(240,72,133,0.5)] transition-all">
                <span className="text-white font-serif text-xl">B</span>
              </div>
              <div>
                <h1 className="text-xl font-[family-name:var(--font-cormorant)] text-[#f5f0e6] leading-none tracking-tight">Bem Mais Bella</h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#F72585] font-medium">Notícias & Estilo</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#9AABAF]">
              {['Início','Estilo e Beleza','Saúde','Maternidade','Relacionamentos','Carreira'].map(link => (
                <a key={link} href="#" className="hover:text-[#F72585] transition-colors">{link}</a>
              ))}
            </nav>

            <div className="relative">
              <input type="text" placeholder="Pesquisar..." className="w-48 lg:w-72 bg-[#45495f]/60 border border-[rgba(240,72,133,0.2)] rounded-full px-4 py-2 text-sm text-[#9AABAF] placeholder:text-[#9AABAF]/50 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all" />
            </div>
          </div>
        </header>

        {/* Main — animação de entrada */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer — cores Ninja */}
        <footer className="bg-[#1a0a2e] border-t border-[rgba(240,72,133,0.12)] mt-16">
          <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="font-serif text-xl text-[#f5f0e6] mb-3">Bem Mais Bella</h3>
              <p className="text-[#9AABAF]/70 leading-relaxed">Notícias, estilo e desenvolvimento para a mulher brasileira. Conteúdo premium com animações e retenção.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#F72585] mb-3">Categorias</h4>
              <ul className="space-y-2 text-[#9AABAF]/80">
                {['Estilo e Beleza','Saúde e Bem-Estar','Maternidade','Relacionamentos','Carreira'].map(c => <li key={c}><a href="#" className="hover:text-[#F72585] transition">{c}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F72585] mb-3">Monetização</h4>
              <ul className="space-y-2 text-[#9AABAF]/80">
                {['AdSense','Afiliados','eBooks','PLR','Dropshipping','SaaS'].map(i => <li key={i}><a href="#" className="hover:text-[#F72585] transition">{i}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F72585] mb-3">Contato</h4>
              <p className="text-[#9AABAF]/80">Telegram: @felipelelis</p>
              <p className="text-[#9AABAF]/80">Instagram, TikTok, YouTube</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 py-4 border-t border-[rgba(240,72,133,0.08)] text-xs text-[#9AABAF]/50 flex justify-between items-center">
            <span>Bem Mais Bella — 2026. Todos os direitos reservados.</span>
            <span>Deploy: 194233a2 | Status: HTTP 200</span>
          </div>
        </footer>
      </body>
    </html>
  );
}