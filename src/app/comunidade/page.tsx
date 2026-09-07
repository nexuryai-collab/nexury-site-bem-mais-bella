import PaginaInstitucional from '@/components/PaginaInstitucional';

export const metadata = {
  title: 'Comunidade | Bem Mais Bella',
  description:
    'Fóruns, blogs de convidadas, encontros e desafios mensais do Bem Mais Bella.',
};

/**
 * A árvore editorial prevê quatro frentes de comunidade. Nenhuma existe ainda
 * como funcionalidade. Esta página descreve o que esta no ar hoje (newsletter e
 * envio de história por e-mail) e marca o resto como planejado, em vez de
 * anunciar fórum e evento que não existem — prometer comunidade que não roda e
 * a forma mais rápida de perder a leitora que aparece uma vez.
 */
export default function Page() {
  return (
    <PaginaInstitucional
      chapeu="Comunidade"
      titulo="Comunidade"
      resumo="O Bem Mais Bella nasceu para ser lido, mas não para ser um monólogo. Aqui esta o que já funciona e o que vem."
      cor="relacionamentos-conscientes"
    >
      <h2>Newsletter — no ar</h2>
      <p>
        Uma carta por semana com os melhores textos e o que ainda não foi publicado. E o canal
        principal hoje. Você assina{' '}
        <a href="/#comunidade">na página inicial</a> e cancela quando quiser.
      </p>

      <h2>Compartilhe Sua História — no ar</h2>
      <p>
        A seção <a href="/historias-inspiradoras">Histórias Inspiradoras</a> vive de relato real. Se
        você passou por algo que outra mulher precisa ler, escreva para{' '}
        <strong>[E-MAIL DE CONTATO]</strong>. Publicamos com o nome que você escolher, inclusive
        anônimo, e nunca sem a sua leitura prévia do texto final.
      </p>

      <h2>Fóruns e Ideias — planejado</h2>
      <p>
        Um espaço para conversa entre leitoras, moderado. <strong>Ainda não existe.</strong> Enquanto não
        houver moderação de verdade, abrir fórum e criar um problema, não uma comunidade.
      </p>

      <h2>Blogs de Convidadas — planejado</h2>
      <p>
        Espaço para quem tem o que dizer e não tem onde. <strong>Ainda não existe.</strong> Quando abrir,
        as regras de pauta, crédito e remuneração serão publicadas aqui antes da primeira convidada.
      </p>

      <h2>Eventos e Encontros — planejado</h2>
      <p>
        Encontros online e presenciais. <strong>Ainda não existe.</strong> Será anunciado primeiro na
        newsletter.
      </p>

      <h2>Desafios Mensais — planejado</h2>
      <p>
        Desafios de autocuidado, finanças e organização, com acompanhamento ao longo do mês.{' '}
        <strong>Ainda não existe.</strong>
      </p>

      <h2>Enquanto isso</h2>
      <p>
        O acervo esta todo aberto, sem cadastro. Comece pela{' '}
        <a href="/busca">busca</a>, pelo{' '}
        <a href="/#busca-hoje">&quot;O Que Você Busca Hoje?&quot;</a> ou por uma categoria:{' '}
        <a href="/estilo-e-beleza">Estilo e Beleza</a>,{' '}
        <a href="/saude-e-bem-estar">Saúde e Bem-Estar</a>,{' '}
        <a href="/maternidade-e-familia">Maternidade e Família</a>.
      </p>
    </PaginaInstitucional>
  );
}
