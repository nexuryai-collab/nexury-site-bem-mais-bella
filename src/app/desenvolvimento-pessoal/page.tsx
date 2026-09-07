import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Desenvolvimento Pessoal | Bem Mais Bella',
  description: 'Autoconhecimento, journaling, metas e equilibrio. Ferramentas para quem quer se entender antes de se cobrar.',
};

export default function Page() {
  return <PaginaCategoria cat="desenvolvimento-pessoal" descricao="Autoconhecimento, journaling, metas e equilibrio. Ferramentas para quem quer se entender antes de se cobrar." />;
}
