import './globals.css'

export const metadata = {
  title: "Bem Mais Bella - Notícias",
  description: "Fique por dentro das últimas tendências, dicas e oportunidades para mulheres"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
// build-v2-corrected
