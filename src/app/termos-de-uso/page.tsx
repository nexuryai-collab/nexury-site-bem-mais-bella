import PaginaInstitucional from '@/components/PaginaInstitucional';

export const metadata = {
  title: 'Termos de Uso | Bem Mais Bella',
  description:
    'As regras de uso do Bem Mais Bella: direitos sobre o conteúdo, limites de responsabilidade e como falar com a gente.',
};

/**
 * Como a política de privacidade: ponto de partida honesto, com os campos que
 * dependem do responsável marcados entre colchetes. Precisa de revisão antes
 * de publicar.
 */
export default function Page() {
  return (
    <PaginaInstitucional
      chapeu="Termos de Uso"
      titulo="Termos de Uso"
      resumo="As regras de quem publica e de quem le. Curtas, e em portugues de gente."
      atualizado="[DATA DE PUBLICAÇÃO]"
      cor="estilo-de-vida"
    >
      <p>
        Ao navegar pelo <strong>Bem Mais Bella</strong>, você concorda com os termos abaixo. Se não
        concordar com algum deles, o caminho e não usar o site.
      </p>

      <h2>O que este site e</h2>
      <p>
        Um veículo editorial sobre estilo, saúde, maternidade, relacionamentos, carreira e
        desenvolvimento pessoal. O conteúdo e informativo e reflete a linha editorial da casa.
      </p>

      <h2>Conteúdo não é consultoria</h2>
      <p>
        Nada aqui substitui profissional habilitado. Textos sobre saúde não substituem medico ou
        nutricionista; textos sobre dinheiro não substituem contador ou assessor de investimentos;
        textos sobre maternidade não substituem acompanhamento obstétrico ou pediátrico. Use o
        conteúdo como ponto de partida para uma conversa, não como decisão final.
      </p>

      <h2>Direitos sobre o conteúdo</h2>
      <p>
        Textos, imagens e identidade visual do Bem Mais Bella sao protegidos por direito autoral.
        Você pode citar trechos curtos com crédito e link para a página de origem. Reproducao
        integral, adaptação ou uso comercial dependem de autorização prévia por escrito.
      </p>

      <h2>Links para fora</h2>
      <p>
        Alguns artigos apontam para sites de terceiros. Não controlamos esses sites e não
        respondemos pelo conteúdo, pelas práticas de privacidade ou pelas ofertas deles.
      </p>

      <h2>Publicidade e parcerias</h2>
      <p>
        <strong>[ATIVAR QUANDO HOUVER PUBLICIDADE OU LINK DE AFILIADO.]</strong> Quando um conteúdo for
        patrocinado ou contiver link de afiliado, isso será dito de forma visível no próprio texto.
        A remuneração não define o que a gente escreve.
      </p>

      <h2>Limite de responsabilidade</h2>
      <p>
        O site e oferecido no estado em que se encontra. Trabalhamos para manter tudo correto e no
        ar, mas não garantimos ausência de erros nem disponibilidade ininterrupta. Encontrou algo
        errado? Escreva para <strong>[E-MAIL DE CONTATO]</strong> — corrigimos.
      </p>

      <h2>Mudanças</h2>
      <p>
        Estes termos podem mudar. A data no topo indica a última revisão.
      </p>

      <h2>Foro</h2>
      <p>
        Aplica-se a legislação brasileira. <strong>[COMARCA]</strong> fica eleita para resolver eventuais
        controvérsias.
      </p>
    </PaginaInstitucional>
  );
}
