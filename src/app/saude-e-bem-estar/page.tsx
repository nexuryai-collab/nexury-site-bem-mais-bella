import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Saude e Bem-Estar | Bem Mais Bella',
  description: 'Nutricao, fitness no seu ritmo, saude mental e autocuidado diario. Conteudo pratico sobre o corpo e a mente da mulher brasileira.',
};

export default function Page() {
  return <PaginaCategoria cat="saude-e-bem-estar" descricao="Nutricao, fitness no seu ritmo, saude mental e autocuidado diario. Conteudo pratico sobre o corpo e a mente da mulher brasileira." />;
}
