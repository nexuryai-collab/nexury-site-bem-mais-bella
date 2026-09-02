import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: 'Bem Mais Bella — Blog de Empoderamento Feminino',
  description: 'Estilo, saúde, maternidade, carreira, finanças e desenvolvimento. Conteúdo por Lillith Nogah.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950 text-amber-50 antialiased">
        {/* Header */}
        <header className="border-b border-amber-900/30 bg-black/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center">
                  <span className="text-amber-400 font-serif text-xl">B</span>
                </div>
                <span className="font-serif text-xl font-bold">Bem Mais Bella</span>
              </Link>
              
              {/* Menu Desktop */}
              <nav className="hidden md:flex gap-6 text-sm">
                <Link href="/estilo-e-beleza" className="hover:text-amber-400 transition">Estilo e Beleza</Link>
                <Link href="/saude-e-bem-estar" className="hover:text-amber-400 transition">Saúde</Link>
                <Link href="/maternidade-e-familia" className="hover:text-amber-400 transition">Maternidade</Link>
                <Link href="/casamentos" className="hover:text-amber-400 transition">Casamentos</Link>
                <Link href="/relacionamentos" className="hover:text-amber-400 transition">Relacionamentos</Link>
                <Link href="/carreira-e-financas" className="hover:text-amber-400 transition">Carreira</Link>
                <Link href="/estilo-de-vida" className="hover:text-amber-400 transition">Estilo de Vida</Link>
                <Link href="/desenvolvimento-pessoal" className="hover:text-amber-400 transition">Desenvolvimento</Link>
                <Link href="/historias-inspiradoras" className="hover:text-amber-400 transition">Histórias</Link>
                <Link href="/comunidade" className="hover:text-amber-400 transition">Comunidade</Link>
              </nav>
              
              <div className="flex items-center gap-3">
                <Link href="/newsletter" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded text-sm font-bold transition">
                  Newsletter
                </Link>
                <Link href="/monetize" className="px-4 py-2 border border-amber-600 hover:bg-amber-600/20 rounded text-sm transition">
                  Anuncie
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-amber-900/30 bg-black/60 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-serif text-lg font-bold mb-4">Bem Mais Bella</h3>
                <p className="text-sm text-slate-400">Plataforma de empoderamento feminino por Lillith Nogah.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">CATEGORIAS</h4>
                <ul className="text-sm space-y-2">
                  <li><Link href="/estilo-e-beleza" className="hover:text-amber-400">Estilo e Beleza</Link></li>
                  <li><Link href="/saude-e-bem-estar" className="hover:text-amber-400">Saúde e Bem-Estar</Link></li>
                  <li><Link href="/maternidade-e-familia" className="hover:text-amber-400">Maternidade</Link></li>
                  <li><Link href="/casamentos" className="hover:text-amber-400">Casamentos</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">MAIS</h4>
                <ul className="text-sm space-y-2">
                  <li><Link href="/carreira-e-financas" className="hover:text-amber-400">Carreira</Link></li>
                  <li><Link href="/estilo-de-vida" className="hover:text-amber-400">Estilo de Vida</Link></li>
                  <li><Link href="/desenvolvimento-pessoal" className="hover:text-amber-400">Desenvolvimento</Link></li>
                  <li><Link href="/historias-inspiradoras" className="hover:text-amber-400">Histórias</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">CONTATO</h4>
                <ul className="text-sm space-y-2">
                  <li><Link href="/monetize" className="hover:text-amber-400">Anuncie Conosco</Link></li>
                  <li><Link href="/comunidade" className="hover:text-amber-400">Comunidade</Link></li>
                  <li><Link href="/sobre-nos" className="hover:text-amber-400">Sobre Nós</Link></li>
                  <li><Link href="/newsletter" className="hover:text-amber-400">Newsletter</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-amber-900/20 text-center text-sm text-slate-500">
              <p>© 2026 Bem Mais Bella por Lillith Nogah. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
