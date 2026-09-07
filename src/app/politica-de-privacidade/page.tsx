import PaginaInstitucional from '@/components/PaginaInstitucional';

export const metadata = {
  title: 'Política de Privacidade | Bem Mais Bella',
  description:
    'Como o Bem Mais Bella trata dados de quem navega no site: cookies, publicidade, análise de tráfego e os direitos garantidos pela LGPD.',
};

/**
 * ATENÇÃO — este texto precisa de revisão antes de publicar.
 *
 * Ele cobre o que o site de fato faz hoje (localStorage para a seção "Para
 * Você", nada mais) e deixa marcados, entre colchetes, os pontos que dependem
 * de dado que so o responsável tem: razão social, e-mail de contato e quais
 * serviços de terceiros serão efetivamente ativados. Não preenchi nenhum
 * desses por conta própria — inventar dado de contato numa política de
 * privacidade e pior que não ter a página.
 *
 * Isto e um ponto de partida honesto, não parecer jurídico.
 */
export default function Page() {
  return (
    <PaginaInstitucional
      chapeu="Política de Privacidade"
      titulo="Política de Privacidade"
      resumo="O que o Bem Mais Bella coleta, o que não coleta, e o que você pode exigir a qualquer momento."
      atualizado="[DATA DE PUBLICAÇÃO]"
      cor="carreira-e-financas"
    >
      <p>
        Esta política explica como o <strong>Bem Mais Bella</strong> trata informações de quem navega
        por este site, em linha com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>

      <h2>Quem e o responsável</h2>
      <p>
        O site e mantido por <strong>[RAZAO SOCIAL OU NOME DO RESPONSÁVEL]</strong>
        {' '}
        <strong>[CNPJ, se houver]</strong>. Para qualquer assunto ligado a privacidade, o contato e{' '}
        <strong>[E-MAIL DE CONTATO]</strong>.
      </p>

      <h2>O que o site coleta hoje</h2>
      <p>
        O Bem Mais Bella não pede cadastro para ler os artigos e não mantém contas de usuário.
        Na prática, hoje existem três situações:
      </p>
      <ul>
        <li>
          <strong>Histórico de leitura no seu próprio navegador.</strong> A seção &quot;Para Você&quot; da
          página inicial guarda, no armazenamento local do seu dispositivo, os endereços dos últimos
          artigos que você abriu. Essa informação <strong>não sai do seu navegador</strong>, não chega aos
          nossos servidores e não é associada a nenhuma identidade. Limpar os dados de navegação
          apaga tudo.
        </li>
        <li>
          <strong>Newsletter.</strong> Se você escolher informar seu e-mail, ele será usado apenas para
          enviar os conteúdos do site. Você pode cancelar quando quiser, e o pedido de exclusão e
          atendido sem contrapartida.
          {' '}
          <strong>[CONFIRMAR QUAL SERVIÇO DE E-MAIL SERA USADO]</strong>
        </li>
        <li>
          <strong>Dados técnicos de acesso.</strong> Como qualquer site, o servidor que entrega estas
          páginas registra informações técnicas de conexão, como endereço IP e tipo de navegador.
        </li>
      </ul>

      <h2>Publicidade e cookies de terceiros</h2>
      <p>
        <strong>[ATIVAR ESTA SEÇÃO SOMENTE QUANDO A PUBLICIDADE ENTRAR NO AR.]</strong>
      </p>
      <p>
        Quando o site exibir anúncios, fornecedores externos — incluindo o Google — poderao usar
        cookies para veicular anúncios com base em visitas anteriores suas a este e a outros sites.
        O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem
        anúncios para você.
      </p>
      <p>
        Você pode desativar a publicidade personalizada nas{' '}
        <a href="https://www.google.com/settings/ads" rel="noopener noreferrer nofollow" target="_blank">
          Configurações de anúncios do Google
        </a>{' '}
        ou, para fornecedores terceiros, em{' '}
        <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer nofollow" target="_blank">
          aboutads.info
        </a>
        .
      </p>

      <h2>Medição de audiência</h2>
      <p>
        <strong>[ATIVAR QUANDO UMA FERRAMENTA DE ANÁLISE FOR INSTALADA.]</strong> Nenhuma ferramenta de
        análise de tráfego esta instalada neste site no momento em que esta política foi escrita.
        Quando houver, esta seção dirá qual e, o que ela coleta e como recusar.
      </p>

      <h2>Com quem os dados sao compartilhados</h2>
      <p>
        Não vendemos, alugamos nem cedemos dados pessoais. O compartilhamento se limita aos
        fornecedores necessários para o site funcionar — hospedagem e, quando existir, envio de
        e-mail e publicidade — e a hipóteses de obrigação legal.
      </p>

      <h2>Seus direitos</h2>
      <p>A LGPD garante a você, entre outros, o direito de:</p>
      <ul>
        <li>confirmar se tratamos dados seus e acessá-los;</li>
        <li>corrigir dados incompletos ou desatualizados;</li>
        <li>pedir a exclusão dos dados tratados com base no seu consentimento;</li>
        <li>revogar o consentimento a qualquer momento;</li>
        <li>saber com quem compartilhamos seus dados.</li>
      </ul>
      <p>
        Para exercer qualquer um deles, escreva para <strong>[E-MAIL DE CONTATO]</strong>. Respondemos em
        até 15 dias.
      </p>

      <h2>Conteúdo de saúde, finanças e maternidade</h2>
      <p>
        Os artigos deste site têm caráter informativo e editorial. <strong>Não substituem</strong> consulta
        médica, orientação nutricional, aconselhamento jurídico ou recomendação de investimento.
        Decisões sobre a sua saúde, o seu dinheiro e a sua família devem ser tomadas com um
        profissional habilitado que conheça o seu caso.
      </p>

      <h2>Crianças e adolescentes</h2>
      <p>
        O site não é direcionado a menores de 18 anos e não coleta intencionalmente dados dessa
        faixa. Se identificarmos coleta indevida, os dados serão apagados.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Esta política pode ser atualizada. A data no topo indica a última revisão. Mudanças
        relevantes serão sinalizadas na própria página.
      </p>
    </PaginaInstitucional>
  );
}
