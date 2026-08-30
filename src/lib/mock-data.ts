export interface Noticia {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  category: string;
}

export const NOTICIAS_MOCK: Noticia[] = [
  {
    slug: "independencia-financeira-2026",
    title: "Independência Financeira: Como Mulheres Estão Reconstruindo Patrimônio",
    excerpt:
      "Estudo de 2025 mostra crescimento de 23% no patrimônio de mulheres entre 25-40 anos que adotaram sistemas de cobrança automática via Pix.",
    date: "2026-08-30",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mulher analisando finanças",
    category: "Money",
  },
  {
    slug: "higgsfield-ia-imagens",
    title: "Higgsfield: Geração de Imagens e Vídeos por IA para Conteúdo",
    excerpt:
      "Nova integração entre Cloudflare Pages e Higgsfield permite criar imagens otimizadas e vídeos animados diretamente no pipeline de conteúdo.",
    date: "2026-08-29",
    image: "https://images.unsplash.com/photo-1677442136019-21779b4bfa28?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Tecnologia de IA",
    category: "AI",
  },
  {
    slug: "limpeza-estofados-saas",
    title: "S.o.S Interni Puri: SaaS de Limpeza de Estofados no Brasil",
    excerpt:
      "Modelo de preço acessível (R$129,97 / R$329,97 / R$397,97) com sistema automático de registro e cobrança via Pix.",
    date: "2026-08-28",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Serviço de limpeza",
    category: "Career",
  },
];
