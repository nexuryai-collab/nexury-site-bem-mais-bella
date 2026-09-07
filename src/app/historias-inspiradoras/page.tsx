import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Historias Inspiradoras | Bem Mais Bella',
  description: 'Relatos de superacao, entrevistas e reflexoes. Mulheres reais, contadas sem verniz.',
};

export default function Page() {
  return <PaginaCategoria cat="historias-inspiradoras" descricao="Relatos de superacao, entrevistas e reflexoes. Mulheres reais, contadas sem verniz." />;
}
