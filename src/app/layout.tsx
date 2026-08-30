export const metadata = {
  title: "Bem Mais Bella — Independência Feminina",
  description: "Plataforma digital da Nexury: 30 universos, inteligência adaptativa, conteúdo de alta qualidade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
