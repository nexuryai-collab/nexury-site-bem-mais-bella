import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Estilo de Vida | Bem Mais Bella',
  description: 'Viagens, decoracao, hobbies e gastronomia. O cotidiano tratado como escolha, nao como sobra de tempo.',
};

export default function Page() {
  return <PaginaCategoria cat="estilo-de-vida" descricao="Viagens, decoracao, hobbies e gastronomia. O cotidiano tratado como escolha, nao como sobra de tempo." />;
}
