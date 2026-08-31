"use client"

import { GeistSans as GeistSans } from 'next/font/google'
import './globals.css'

const geistSans = GeistSans({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata = {
  title: "Bem Mais Bella - Notícias",
  description: "Fique por dentro das últimas tendências, dicas e oportunidades para mulheres"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={geistSans.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-900">
        {children}
      </body>
    </html>
  )
}