import PaginaCategoria from '../../components/PaginaCategoria';

export const metadata = {
  title: 'Famosos e Entretenimento | Bem Mais Bella',
  description:
    'Famosos, TV, reality e cultura pop a partir de fato atribuivel — o que a pessoa publicou, disse ou anunciou. Sem rumor.',
};

/**
 * Area estruturada, ainda sem materia publicada.
 *
 * A rota existe para que a arvore do site esteja completa e para que a regra
 * editorial da area seja publica antes da primeira materia, nao depois. A
 * pagina se explica sozinha enquanto nao houver acervo — quem chega aqui sai
 * com um caminho, nao com uma grade vazia.
 */
export default function Page() {
  return (
    <PaginaCategoria
      cat="famosos-e-entretenimento"
      descricao="Famosos, TV, reality e cultura pop do jeito que este site consegue fazer: a partir do que a pessoa publicou, disse em entrevista ou anunciou, com a origem no texto."
    />
  );
}
