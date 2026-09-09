# Relatório Estratégico, Técnico e Analítico — Bem Mais Bella

Site analisado

**Domínio principal:** bemmaisbella.com.br  
**Status:** site recém-lançado, aproximadamente 2 a 3 dias no ar  
**Fonte dos dados analisados:** Cloudflare Analytics & Logs — Tráfego HTTP  
**Objetivo deste documento:** reunir uma análise técnica e estratégica do tráfego atual, interpretar os números, apontar riscos, oportunidades, melhorias e definir um plano de rastreamento para entender melhor as leitoras/visitantes.

## 1. Resumo Executivo

O site **bemmaisbella.com.br** apresenta sinais positivos para um lançamento recente.

Com base nos prints analisados, os principais números observados foram:

| Métrica | Valor aproximado |
|---|---:|
| Requests | 17.34k |
| Data transfer | 141.63 MB |
| Page views | 1.94k |
| Visits | 1.72k |
| API requests | 67 |

**Interpretação geral:**
- O volume de tráfego é interessante para um site recém-lançado.
- Não há, pelos prints, sinal claro de ataque forte.
- O volume de dados transferidos é baixo/moderado.
- O número de API requests é baixo.
- O domínio principal já está recebendo tráfego relevante.
- Existe tráfego considerável em um domínio temporário/alternativo, o que precisa ser organizado.
- O próximo passo não deve ser apenas "ter mais visitas", mas sim transformar visitas em dados úteis, leitura real, cliques, leads, conversas e vendas.

**Veredito inicial**
- Status geral: bom/neutro
- Risco aparente: baixo
- Principal oportunidade: organizar rastreamento, domínio, SEO, conversão e analytics
- Principal ponto de atenção: tráfego dividido entre domínio oficial e domínio temporário

## 2. Dados observados no Cloudflare

### 2.1 Métricas principais

Período exibido no painel:

- **Aug 10, 08:39 - Sep 9, 08:39**

Apesar do período ser de quase 30 dias, o tráfego relevante parece concentrado nos últimos dias, compatível com o lançamento recente do site.

**Métricas principais:**

| Indicador | Valor | O que significa |
|---|---:|---|
| Requests | 17.34k | Total de requisições HTTP ao domínio filtrado |
| Data transfer | 141.63 MB | Quantidade de dados transferidos |
| Page views | 1.94k | Visualizações de páginas |
| Visits | 1.72k | Visitas/sessões aproximadas |
| API requests | 67 | Chamadas de API detectadas |

### 3. Importante: requests não são pessoas

Um erro comum é olhar 17.34k requests e achar que isso significa 17.340 pessoas. **Não significa.**

Uma única visita pode gerar várias requisições, por exemplo:

- HTML da página;
- imagens;
- arquivos CSS;
- arquivos JavaScript;
- fontes;
- ícones;
- chamadas internas da aplicação;
- scripts externos;
- arquivos de analytics;
- imagens de preview;
- recursos carregados pelo navegador.

Por isso, para entender melhor o público, as métricas mais relevantes são:

- **Visits**
- **Page views**
- eventos de leitura;
- cliques em botões;
- cliques no WhatsApp;
- formulários enviados;
- origem do tráfego;
- comportamento por página.

## 4. Cálculos importantes

Com base nos números:

- **Visits:** aproximadamente 1.72k
- **Page views:** aproximadamente 1.94k
- **Requests:** aproximadamente 17.34k
- **Data transfer:** aproximadamente 141.63 MB

### 4.1 Page views por visita

**Cálculo:**

1.94k page views / 1.72k visits = **aproximadamente 1.13 page views por visita**

**Interpretação:**
- Cada visita visualizou, em média, pouco mais de 1 página.
- Isso pode ser normal se o site for uma landing page ou página única.
- Se o site tiver várias páginas, artigos, categorias ou catálogo, esse número pode indicar baixa navegação interna.

### 4.2 Requests por page view

**Cálculo:**

17.34k requests / 1.94k page views = **aproximadamente 8.9 requests por page view**

**Interpretação:**
- O site parece relativamente leve.
- Não aparenta, pelos números, ser uma página extremamente pesada.

### 4.3 Requests por visita

**Cálculo:**

17.34k requests / 1.72k visits = **aproximadamente 10.08 requests por visita**

**Interpretação:**
- Número normal para um site simples/moderado.
- Não indica, sozinho, comportamento perigoso.

### 4.4 Dados transferidos por page view

**Cálculo aproximado:**

141.63 MB / 1.94k page views = **aproximadamente 73 KB por page view**

**Interpretação:**
- O volume parece baixo.
- Isso é bom para performance, especialmente em celular e 4G.
- Deve-se confirmar com ferramentas de performance, pois Cloudflare pode medir de forma diferente do peso real percebido pelo usuário.

## 5. Análise dos hosts/domínios

Os prints mostram tráfego em diferentes hosts:

| Host | Requests aproximadas |
|---|---:|
| bemmaisbella.com.br | 17.34k |
| nexury-site-bem-mais-... | 8.94k |
| www.bemmaisbella... | 143 |
| outros hosts menores | 124, 62, 53 etc. |

### 5.1 Interpretação

O domínio principal **bemmaisbella.com.br** está recebendo o maior volume de tráfego, o que é bom.

Porém, também existe volume relevante no domínio:

**nexury-site-bem-mais-...**

Esse domínio provavelmente é:

- URL temporária da plataforma;
- URL de preview;
- URL de hospedagem;
- domínio interno do projeto.

### 5.2 Por que isso merece atenção?

Porque tráfego dividido entre domínios pode causar:

- duplicidade nos dados de analytics;
- confusão para o Google;
- possível conteúdo duplicado;
- perda de autoridade SEO;
- visitantes acessando domínio não oficial;
- aparência menos profissional;
- dificuldade de mensurar resultados.

### 5.3 Recomendação

**Escolher uma única versão oficial do site.**

**Recomendação:**

https://bemmaisbella.com.br

E redirecionar tudo para ela:

| Origem | Destino recomendado |
|---|---|
| http://bemmaisbella.com.br | https://bemmaisbella.com.br |
| http://www.bemmaisbella.com.br | https://bemmaisbella.com.br |
| https://www.bemmaisbella.com.br | https://bemmaisbella.com.br |
| nexury-site-bem-mais-... | https://bemmaisbella.com.br |

## 6. Isso é bom ou ruim?

**Resposta curta**

Parece mais bom/neutro do que ruim.

Para um site lançado há 2 ou 3 dias, ter aproximadamente:

- 1.72k visitas;
- 1.94k page views;
- 17.34k requests;

é um começo interessante.

### Quando isso é bom?

É bom se o site foi divulgado em canais como:

- Instagram;
- WhatsApp;
- grupos;
- anúncios;
- clientes;
- bio de rede social;
- campanha de lançamento;
- parceiros;
- influenciadoras;
- boca a boca.

### Nesse caso, os números indicam que as pessoas estão acessando.

### Quando pode ser preocupante?

Pode merecer investigação se:

- o site não foi divulgado em lugar nenhum;
- os acessos vêm de países sem relação com o público;
- há muitos acessos a caminhos suspeitos;
- existem muitos códigos 404, 500, 502, 522;
- o site fica lento;
- o tráfego vem de poucos IPs repetidos;
- há picos muito altos sem explicação;
- aparecem tentativas de acessar arquivos sensíveis.

## 7. O que verificar no Cloudflare para confirmar se o tráfego é saudável

### 7.1 Aba Country

Verificar de quais países vêm os acessos.

**Bom sinal:**

- **Brasil** como principal país;
- **países coerentes** com seu público;
- tráfego distribuído de forma natural.

**Sinal de atenção:**

- **tráfego muito forte** de países sem relação com o negócio;
- **um único país estranho** concentrando muitas requests;
- **picos vindos de regiões incomuns**.

### 7.2 Aba Path

Verificar quais URLs estão sendo acessadas.

**Caminhos normais:**

- /
- /contato
- /sobre
- /produtos
- /servicos
- /blog
- /assets/...
- /images/...
- /css/...
- /js/...

**Caminhos suspeitos:**

- /.env
- /wp-admin
- /wp-login.php
- /xmlrpc.php
- /phpmyadmin
- /admin
- /login
- /config
- /backup
- /database
- /server-status

Se aparecerem muitos caminhos suspeitos, provavelmente são bots procurando falhas conhecidas.

### 7.3 Aba Edge Status Code

**Códigos normais:**

| Código | Significado |
|---|---|
| 200 | Página carregou com sucesso |
| 301 | Redirecionamento permanente |
| 302 | Redirecionamento temporário |
| 304 | Conteúdo em cache/não modificado |

**Códigos que merecem atenção:**

| Código | Possível problema |
|---|---|
| 403 | Bloqueado/proibido. Pode ser normal se for proteção |
| 404 | Página não encontrada. Pode indicar bots ou links quebrados |
| 500 | Erro interno do servidor |
| 502 | Erro entre proxy e servidor |
| 522 | Timeout na origem |
| 524 | Timeout prolongado |

### 7.4 Aba Referrer Host

Mostra de onde vieram os acessos.

**Bons sinais:**

- **Instagram**;
- **Facebook**;
- **WhatsApp**;
- **Google**;
- **Pinterest**;
- **links de parceiros**;
- **tráfego de campanhas**.

**Ponto de atenção:**

- muitos acessos sem referrer;
- referrers estranhos;
- sites desconhecidos mandando tráfego artificial;
- spam referral.

## 8. Diagnóstico estratégico

**Hoje o site já tem tráfego.**

**O próximo nível é responder:**

1. **Quem entrou?**
2. **De onde veio?**
3. **O que viu?**
4. **Leu ou só abriu?**
5. **Clicou em algo?**
6. **Chamou no WhatsApp?**
7. **Seguiu no Instagram?**
8. **Virou lead?**
9. **Virou cliente?**
10. **Voltou depois?**

**Sem rastreamento, você só sabe que “entrou gente”.**

**Com rastreamento, você descobre o que funciona.**

## 9. A pergunta mais importante

**A pergunta mais importante não é:**

“Quantas visitas eu tive?”

**A pergunta mais importante é:**

“Qual ação eu quero que a leitora faça depois de entrar no site?”

**Exemplos de objetivo principal:**

- chamar no WhatsApp;
- seguir no Instagram;
- comprar;
- ler artigos;
- preencher formulário;
- agendar atendimento;
- entrar em uma lista;
- baixar um material;
- compartilhar conteúdo;
- conhecer a marca.

**North Star Metric recomendada**

Se o site tem objetivo comercial, a principal métrica deveria ser:

**conversas qualificadas iniciadas pelo site**

Ou seja:

`visitas -> leitura/interesse -> clique no WhatsApp -> conversa -> venda/orçamento`

## 10. Funil recomendado para o site

### 10.1 Funil básico

1. **Aquisição**  
   A pessoa vem do Instagram, Google, WhatsApp, anúncio, Pinterest ou link direto.

2. **Entrada**  
   A pessoa acessa uma página do site.

3. **Engajamento**  
   A pessoa rola a página, lê, clica, navega ou compartilha.

4. **Conversão**  
   A pessoa clica no WhatsApp, formulário, Instagram, telefone ou CTA principal.

5. **Qualificação**  
   A conversa vira lead real.

6. **Resultado**  
   Lead vira venda, agendamento, orçamento ou relacionamento.

7. **Retenção**  
   A pessoa volta, segue a marca, entra em lista ou compra novamente.

## 11. Tipos de rastreamento recomendados

### 11.1 Analytics básico

**Ferramentas possíveis:**

- Google Analytics 4;
- Cloudflare Web Analytics;
- Plausible;
- Umami;
- PostHog.

**O que medir:**

- visitas;
- visualizações de página;
- origem do tráfego;
- país;
- cidade aproximada;
- dispositivo;
- navegador;
- páginas mais acessadas;
- visitantes novos vs recorrentes;
- tempo engajado;
- taxa de engajamento.

**Objetivo:**

Entender o volume e o perfil geral das visitantes.

### 11.2 Google Search Console

**Ferramenta obrigatória para SEO.**

**O que mostra:**

- pesquisas que levam ao site;
- impressões no Google;
- cliques recebidos;
- CTR orgânico;
- posição média;
- páginas indexadas;
- erros de indexação;
- problemas de experiência;
- sitemap;
- páginas com crescimento.

**Perguntas que responde:**

- As pessoas acham o site pesquisando o quê?
- Quais termos geram cliques?
- Quais páginas aparecem no Google?
- O domínio certo está indexado?
- O domínio temporário está aparecendo indevidamente?

### 11.3 Rastreamento de leitura

**Muito importante para entender leitoras.**

**Eventos recomendados:**

| Evento | Quando dispara |
|---|---|
| view_article | Quando uma página de conteúdo/artigo é aberta |
| scroll_25 | Quando a leitora chega a 25% da página |
| scroll_50 | Quando chega a 50% |
| scroll_75 | Quando chega a 75% |
| scroll_90 | Quando chega a 90% |
| read_complete | Quando chega ao final ou cumpre critério de leitura |
| engaged_reader | Quando fica tempo mínimo e rola boa parte da página |
| click_related_article | Quando clica em conteúdo relacionado |

**Métrica importante:**

**taxa de leitura completa** = read_complete / view_article

**Exemplo:**

Se um artigo teve 1.000 visualizações e 250 leituras completas:

250 / 1000 = **25% de leitura completa**

### 11.4 Rastreamento de cliques importantes

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| click_whatsapp | Clique para falar no WhatsApp |
| click_instagram | Clique para ir ao Instagram |
| click_phone | Clique no telefone |
| click_email | Clique no e-mail |
| click_cta_principal | Clique no CTA principal |
| click_produto | Clique em produto |
| click_servico | Clique em serviço |
| click_agendamento | Clique em agendar |
| click_menu | Clique em item de navegação |
| click_footer_link | Clique em links do rodapé |

**Métrica essencial:**

**taxa de clique no WhatsApp** = click_whatsapp / visits

**Exemplo:**

- 1.720 visitas
- 200 cliques no WhatsApp

200 / 1720 = **11,6%**

**Essa seria uma taxa muito interessante.**

### 11.5 Rastreamento de formulários

Se houver formulário de contato, orçamento, cadastro ou newsletter:

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| form_view | Formulário visualizado |
| form_start | Usuária começou a preencher |
| form_submit | Enviou com sucesso |
| form_error | Erro no envio |
| lead_generated | Lead confirmado |
| newsletter_signup | Cadastro em lista |

**Métricas importantes:**

- taxa de início do formulário;
- taxa de conclusão;
- taxa de erro;
- campos que causam abandono;
- origem dos leads.

**Atenção:**

**Não enviar dados pessoais** como e-mail, telefone, CPF ou nome para Google Analytics, Meta Pixel ou ferramentas similares.

### 11.6 Rastreamento de origem com UTM

**UTMs são fundamentais.**

Sem UTM, muito tráfego aparece como “direct” e você perde clareza.

**Exemplo de link para bio do Instagram:**

https://bemmaisbella.com.br/?utm_source=instagram&utm_medium=bio&utm_campaign=lancamento_site

**Exemplo para story:**

https://bemmaisbella.com.br/?utm_source=instagram&utm_medium=story&utm_campaign=lancamento_site

**Exemplo para WhatsApp:**

https://bemmaisbella.com.br/?utm_source=whatsapp&utm_medium=grupo&utm_campaign=lancamento_site

**Exemplo para influenciadora:**

https://bemmaisbella.com.br/?utm_source=instagram&utm_medium=influencer&utm_campaign=lancamento_site&utm_content=nome_influenciadora

### 11.7 Padrão recomendado de UTMs

| Parâmetro | Uso |
|---|---|
| utm_source | plataforma/origem: instagram, whatsapp, google, pinterest |
| utm_medium | tipo de canal: bio, story, post, grupo, cpc, organic |
| utm_campaign | nome da campanha |
| utm_content | variação do criativo/link |
| utm_term | termo, palavra-chave ou segmentação, se aplicável |

### 11.8 Exemplos de nomenclatura

| Canal | Link recomendado |
|---|---|
| Instagram Bio | utm_source=instagram&utm_medium=bio&utm_campaign=lancamento_site |
| Instagram Stories | utm_source=instagram&utm_medium=story&utm_campaign=lancamento_site |
| Instagram Reels | utm_source=instagram&utm_medium=reels&utm_campaign=lancamento_site |
| WhatsApp Grupo | utm_source=whatsapp&utm_medium=grupo&utm_campaign=lancamento_site |
| WhatsApp Cliente | utm_source=whatsapp&utm_medium=cliente&utm_campaign=lancamento_site |
| Google Perfil da Empresa | utm_source=google&utm_medium=perfil_empresa&utm_campaign=organico_local |
| Pinterest | utm_source=pinterest&utm_medium=pin&utm_campaign=conteudo_organico |

## 12. Rastreamento de compartilhamento

Se as leitoras compartilham o conteúdo, isso é muito valioso.

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| share_whatsapp | Compartilhamento pelo WhatsApp |
| share_facebook | Compartilhamento no Facebook |
| share_pinterest | Compartilhamento no Pinterest |
| share_copy_link | Cópia do link |
| share_native | Compartilhamento nativo do celular |

**Pergunta que responde:**

“Quais conteúdos as leitoras acham bons o suficiente para compartilhar?”

## 13. Rastreamento de busca interna

Se o site tiver campo de busca, rastrear:

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| search_query | Termo pesquisado |
| search_no_results | Pesquisa sem resultado |
| search_result_click | Clique em resultado da busca |

Isso ajuda a descobrir o que as leitoras querem.

**Exemplos de termos possíveis:**

- skincare;
- cabelo;
- unhas;
- maquiagem;
- moda;
- vestido;
- perfume;
- produtos baratos;
- promoção;
- atendimento;
- localização.

**Cuidados:**

- **não registrar dados sensíveis**;
- **evitar salvar termos que contenham telefone, e-mail, CPF ou informações pessoais**;
- **filtrar/sanitizar buscas antes de enviar para ferramentas externas**.

## 14. Heatmaps e gravações de sessão

**Ferramentas possíveis:**

- Microsoft Clarity;
- Hotjar;
- PostHog.

**O que mostram:**

- onde as pessoas clicam;
- até onde rolam;
- onde param;
- onde tentam clicar e não acontece nada;
- onde abandonam;
- se o botão principal está visível;
- se há confusão no layout.

**Cuidados obrigatórios**

- **mascar campos de formulário**;
- **não gravar senha**;
- **não gravar telefone**;
- **não gravar e-mail**;
- **não gravar dados pessoais**;
- **evitar gravar conteúdo sensível**;
- **informar na política de privacidade**;
- **respeitar LGPD**.

## 15. Rastreamento de performance

**Muito importante** porque o público provavelmente acessa pelo celular.

**Métricas técnicas recomendadas:**

| Métrica | Meta recomendada |
|---|---:|
| LCP | abaixo de 2.5s |
| INP | abaixo de 200ms |
| CLS | abaixo de 0.1 |
| TTFB | quanto menor, melhor |
| Peso da página | preferencialmente leve no 4G |

**O que rastrear:**

- tempo de carregamento;
- erros JavaScript;
- páginas lentas;
- imagens pesadas;
- falhas no carregamento;
- páginas com alta taxa de saída;
- experiência por dispositivo.

**Ferramentas possíveis:**

- PageSpeed Insights;
- Lighthouse;
- Google Search Console;
- Cloudflare;
- Sentry;
- LogRocket;
- SpeedCurve;
- WebPageTest.

## 16. Rastreamento de erros

**Além de medir visitas, é importante saber se algo quebra.**

**Eventos/problemas a monitorar:**

- erro 404;
- erro 500;
- erro de JavaScript;
- formulário quebrado;
- botão de WhatsApp quebrado;
- imagem não carregando;
- página lenta;
- erro em checkout, se existir;
- erro de API;
- erro no mobile.

**Alertas recomendados:**

| Situação | Ação |
|---|---|
| Muitos 404 | Verificar bots ou links quebrados |
| Muitos 500 | Verificar servidor/aplicação |
| API requests subindo muito | Analisar origem |
| Queda em cliques de WhatsApp | Verificar botão/campanha/layout |
| Picos de tráfego incomuns | Verificar país, IP, path e user-agent |
| Aumento de bounce/queda de engajamento | Verificar conteúdo e velocidade |

## 17. Taxonomia de eventos recomendada

**Eventos prioritários P0**

**Esses são os mais importantes para começar:**

| Evento | Prioridade | Descrição |
|---|---|---|
| page_view | P0 | Visualização de página |
| session_start | P0 | Início de visita |
| click_whatsapp | P0 | Clique no WhatsApp |
| click_instagram | P0 | Clique para Instagram |
| click_cta_principal | P0 | Clique no CTA principal |
| form_submit | P0 | Envio de formulário |
| lead_generated | P0 | Lead gerado |

**Eventos de leitura P1**

| Evento | Prioridade | Descrição |
|---|---|---|
| view_article | P1 | Visualização de artigo |
| scroll_50 | P1 | Chegou a 50% da página |
| scroll_90 | P1 | Chegou a 90% da página |
| read_complete | P1 | Leitura completa |
| click_related_article | P1 | Clique em artigo relacionado |

**Eventos de descoberta P1/P2**

| Evento | Prioridade | Descrição |
|---|---|---|
| search_query | P1 | Busca interna |
| search_no_results | P1 | Busca sem resultado |
| share_whatsapp | P1 | Compartilhamento no WhatsApp |
| share_copy_link | P2 | Cópia de link |
| click_menu | P2 | Clique no menu |
| click_footer_link | P2 | Clique no rodapé |

## 18. Parâmetros recomendados para eventos

**Para cada evento, quando possível, enviar parâmetros.**

**Parâmetros gerais:**

| Parâmetro | Exemplo |
|---|---|
| page_type | home, article, product, contact |
| page_title | título da página |
| page_url | URL da página |
| content_category | skincare, cabelo, moda, maquiagem |
| article_title | título do artigo |
| article_id | ID interno do artigo |
| author | autora/editor |
| publish_date | data de publicação |
| reading_time_bucket | 0_2_min, 3_5_min, 6_plus_min |
| cta_location | hero, middle, footer, floating_button |
| button_text | texto do botão |
| outbound_domain | domínio de destino |
| traffic_source | origem do tráfego |
| utm_source | origem UTM |
| utm_medium | mídia UTM |
| utm_campaign | campanha UTM |

## 19. Exemplos de nomenclatura

**| Canal | Link recomendado |**
|---|---|
**| Instagram Bio | utm_source=instagram&utm_medium=bio&utm_campaign=lancamento_site |**
**| Instagram Stories | utm_source=instagram&utm_medium=story&utm_campaign=lancamento_site |**
**| Instagram Reels | utm_source=instagram&utm_medium=reels&utm_campaign=lancamento_site |**
**| WhatsApp Grupo | utm_source=whatsapp&utm_medium=grupo&utm_campaign=lancamento_site |**
**| WhatsApp Cliente | utm_source=whatsapp&utm_medium=cliente&utm_campaign=lancamento_site |**
**| Google Perfil da Empresa | utm_source=google&utm_medium=perfil_empresa&utm_campaign=organico_local |**
**| Pinterest | utm_source=pinterest&utm_medium=pin&utm_campaign=conteudo_organico |**

## 20. Rastreamento de compartilhamento

**Se as leitoras compartilham o conteúdo, isso é muito valioso.**

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| share_whatsapp | Compartilhamento pelo WhatsApp |
| share_facebook | Compartilhamento no Facebook |
| share_pinterest | Compartilhamento no Pinterest |
| share_copy_link | Cópia de link |
| share_native | Compartilhamento nativo do celular |

**Pergunta que responde:**

“Quais conteúdos as leitoras acham bons o suficiente para compartilhar?”

## 21. Rastreamento de busca interna

**Se o site tiver campo de busca, rastrear:**

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| search_query | Termo pesquisado |
| search_no_results | Pesquisa sem resultado |
| search_result_click | Clique em resultado da busca |

**Isso ajuda a descobrir o que as leitoras querem.**

**Exemplos de termos possíveis:**

- skincare;
- cabelo;
- unhas;
- maquiagem;
- moda;
- vestido;
- perfume;
- produtos baratos;
- promoção;
- atendimento;
- localização.

**Cuidados:**

- **não registrar dados sensíveis**;
- **evitar salvar termos que contenham telefone, e-mail, CPF ou informações pessoais**;
- **filtrar/sanitizar buscas antes de enviar para ferramentas externas**.

## 22. Heatmaps e gravações de sessão

**Ferramentas possíveis:**

- Microsoft Clarity;
- Hotjar;
- PostHog.

**O que mostram:**

- onde as pessoas clicam;
- até onde rolam;
- onde param;
- onde tentam clicar e não acontece nada;
- onde abandonam;
- se o botão principal está visível;
- se há confusão no layout.

**Cuidados obrigatórios:**

- **mascar campos de formulário**;
- **não gravar senha**;
- **não gravar telefone**;
- **não gravar e-mail**;
- **não gravar dados pessoais**;
- **evitar gravar conteúdo sensível**;
- **informar na política de privacidade**;
- **respeitar LGPD**.

## 23. Rastreamento de performance

**Muito importante** porque o público provavelmente acessa pelo celular.

**Métricas técnicas recomendadas:**

| Métrica | Meta recomendada |
|---|---:|
| LCP | abaixo de 2.5s |
| INP | abaixo de 200ms |
| CLS | abaixo de 0.1 |
| TTFB | quanto menor, melhor |
| Peso da página | preferencialmente leve no 4G |

**O que rastrear:**

- tempo de carregamento;
- erros JavaScript;
- páginas lentas;
- imagens pesadas;
- falhas no carregamento;
- páginas com alta taxa de saída;
- experiência por dispositivo.

**Ferramentas possíveis:**

- PageSpeed Insights;
- Lighthouse;
- Google Search Console;
- Cloudflare;
- Sentry;
- LogRocket;
- SpeedCurve;
- WebPageTest.

## 24. Rastreamento de erros

**Além de medir visitas, é importante saber se algo quebra.**

**Eventos/problemas a monitorar:**

- erro 404;
- erro 500;
- erro de JavaScript;
- formulário quebrado;
- botão de WhatsApp quebrado;
- imagem não carregando;
- página lenta;
- erro em checkout, se existir;
- erro de API;
- erro no mobile.

**Alertas recomendados:**

| Situação | Ação |
|---|---|
| Muitos 404 | Verificar bots ou links quebrados |
| Muitos 500 | Verificar servidor/aplicação |
| API requests subindo muito | Analisar origem |
| Queda em cliques de WhatsApp | Verificar botão/campanha/layout |
| Picos de tráfego incomuns | Verificar país, IP, path e user-agent |
| Aumento de bounce/queda de engajamento | Verificar conteúdo e velocidade |

## 25. Taxonomia de eventos recomendada

**Eventos prioritários P0**

**Esses são os mais importantes para começar:**

| Evento | Prioridade | Descrição |
|---|---|---|
| page_view | P0 | Visualização de página |
| session_start | P0 | Início de visita |
| click_whatsapp | P0 | Clique no WhatsApp |
| click_instagram | P0 | Clique para Instagram |
| click_cta_principal | P0 | Clique no CTA principal |
| form_submit | P0 | Envio de formulário |
| lead_generated | P0 | Lead gerado |

**Eventos de leitura P1**

| Evento | Prioridade | Descrição |
|---|---|---|
| view_article | P1 | Visualização de artigo |
| scroll_50 | P1 | Chegou a 50% da página |
| scroll_90 | P1 | Chegou a 90% da página |
| read_complete | P1 | Leitura completa |
| click_related_article | P1 | Clique em artigo relacionado |

**Eventos de descoberta P1/P2**

| Evento | Prioridade | Descrição |
|---|---|---|
| search_query | P1 | Busca interna |
| search_no_results | P1 | Busca sem resultado |
| share_whatsapp | P1 | Compartilhamento no WhatsApp |
| share_copy_link | P2 | Cópia de link |
| click_menu | P2 | Clique no menu |
| click_footer_link | P2 | Clique no rodapé |

## 26. Parâmetros recomendados para eventos

**Para cada evento, quando possível, enviar parâmetros.**

**Parâmetros gerais:**

| Parâmetro | Exemplo |
|---|---|
| page_type | home, article, product, contact |
| page_title | título da página |
| page_url | URL da página |
| content_category | skincare, cabelo, moda, maquiagem |
| article_title | título do artigo |
| article_id | ID interno do artigo |
| author | autora/editor |
| publish_date | data de publicação |
| reading_time_bucket | 0_2_min, 3_5_min, 6_plus_min |
| cta_location | hero, middle, footer, floating_button |
| button_text | texto do botão |
| outbound_domain | domínio de destino |
| traffic_source | origem do tráfego |
| utm_source | origem UTM |
| utm_medium | mídia UTM |
| utm_campaign | campanha UTM |

## 27. Exemplos de nomenclatura

**| Canal | Link recomendado |**
|---|---|
**| Instagram Bio | utm_source=instagram&utm_medium=bio&utm_campaign=lancamento_site |**
**| Instagram Stories | utm_source=instagram&utm_medium=story&utm_campaign=lancamento_site |**
**| Instagram Reels | utm_source=instagram&utm_medium=reels&utm_campaign=lancamento_site |**
**| WhatsApp Grupo | utm_source=whatsapp&utm_medium=grupo&utm_campaign=lancamento_site |**
**| WhatsApp Cliente | utm_source=whatsapp&utm_medium=cliente&utm_campaign=lancamento_site |**
**| Google Perfil da Empresa | utm_source=google&utm_medium=perfil_empresa&utm_campaign=organico_local |**
**| Pinterest | utm_source=pinterest&utm_medium=pin&utm_campaign=conteudo_organico |**

## 28. Rastreamento de compartilhamento

**Se as leitoras compartilham o conteúdo, isso é muito valioso.**

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| share_whatsapp | Compartilhamento pelo WhatsApp |
| share_facebook | Compartilhamento no Facebook |
| share_pinterest | Compartilhamento no Pinterest |
| share_copy_link | Cópia de link |
| share_native | Compartilhamento nativo do celular |

**Pergunta que responde:**

“Quais conteúdos as leitoras acham bons o suficiente para compartilhar?”

## 29. Rastreamento de busca interna

**Se o site tiver campo de busca, rastrear:**

**Eventos recomendados:**

| Evento | O que mede |
|---|---|
| search_query | Termo pesquisado |
| search_no_results | Pesquisa sem resultado |
| search_result_click | Clique em resultado da busca |

**Isso ajuda a descobrir o que as leitoras querem.**

**Exemplos de termos possíveis:**

- skincare;
- cabelo;
- unhas;
- maquiagem;
- moda;
- vestido;
- perfume;
- produtos baratos;
- promoção;
- atendimento;
- localização.

**Cuidados:**

- **não registrar dados sensíveis**;
- **evitar salvar termos que contenham telefone, e-mail, CPF ou informações pessoais**;
- **filtrar/sanitizar buscas antes de enviar para ferramentas externas**.

## 30. Heatmaps e gravações de sessão

**Ferramentas possíveis:**

- Microsoft Clarity;
- Hotjar;
- PostHog.

**O que mostram:**

- onde as pessoas clicam;
- até onde rolam;
- onde param;
- onde tentam clicar e não acontece nada;
- onde abandonam;
- se o botão principal está visível;
- se há confusão no layout.

**Cuidados obrigatórios:**

- **mascar campos de formulário**;
- **não gravar senha**;
- **não gravar telefone**;
- **não gravar e-mail**;
- **não gravar dados pessoais**;
- **evitar gravar conteúdo sensível**;
- **informar na política de privacidade**;
- **respeitar LGPD**.

## 31. Rastreamento de performance

**Muito importante** porque o público provavelmente acessa pelo celular.

**Métricas técnicas recomendadas:**

| Métrica | Meta recomendada |
|---|---:|
| LCP | abaixo de 2.5s |
| INP | abaixo de 200ms |
| CLS | abaixo de 0.1 |
| TTFB | quanto menor, melhor |
| Peso da página | preferencialmente leve no 4G |

**O que rastrear:**

- tempo de carregamento;
- erros JavaScript;
- páginas lentas;
- imagens pesadas;
- falhas no carregamento;
- páginas com alta taxa de saída;
- experiência por dispositivo.

**Ferramentas possíveis:**

- PageSpeed Insights;
- Lighthouse;
- Google Search Console;
- Cloudflare;
- Sentry;
- LogRocket;
- SpeedCurve;
- WebPageTest.

## 32. Rastreamento de erros

**Além de medir visitas, é importante saber se algo quebra.**

**Eventos/problemas a monitorar:**

- erro 404;
- erro 500;
- erro de JavaScript;
- formulário quebrado;
- botão de WhatsApp quebrado;
- imagem não carregando;
- página lenta;
- erro em checkout, se existir;
- erro de API;
- erro no mobile.

**Alertas recomendados:**

| Situação | Ação |
|---|---|
| Muitos 404 | Verificar bots ou links quebrados |
| Muitos 500 | Verificar servidor/aplicação |
| API requests subindo muito | Analisar origem |
| Queda em cliques de WhatsApp | Verificar botão/campanha/layout |
| Picos de tráfego incomuns | Verificar país, IP, path e user-agent |
| Aumento de bounce/queda de engajamento | Verificar conteúdo e velocidade |

---

**Fim do relatório.**
