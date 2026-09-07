import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Estilo e Beleza | Bem Mais Bella',
  description: 'Moda, beleza e maquiagem para todos os corpos, tons e texturas. Tendencias da estacao, guarda-roupa essencial e cuidados que cabem na sua rotina.',
};

export default function Page() {
  return <PaginaCategoria cat="estilo-e-beleza" descricao="Moda, beleza e maquiagem para todos os corpos, tons e texturas. Tendencias da estacao, guarda-roupa essencial e cuidados que cabem na sua rotina." />;
}
