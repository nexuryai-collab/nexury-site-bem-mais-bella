# Comentários do Bem Mais Bella

API própria em Cloudflare Worker + D1. O site é estático, então o comentário
precisa de um lugar para viver — este é esse lugar.

## Por que não Disqus

Disqus injeta publicidade de terceiros, rastreia a leitora entre sites e pesa
centenas de kilobytes na página. Isso contradiz a Política de Privacidade que o
site publica. Aqui a Cloudflare cuida de servidor, banco e proteção anti-robô;
**os dados são do projeto**.

O que é guardado: nome, texto, data, e-mail opcional (nunca publicado) e um
**hash com sal do IP** — nunca o IP em texto claro. Sem cookie, sem
identificador entre sites.

## Publicar, passo a passo

Tudo roda dentro de `workers/comentarios`.

**1. Criar o banco**

```bash
npx wrangler d1 create bmb-comentarios
```

Copie o `database_id` que o comando devolve e cole em `wrangler.toml`, no lugar
de `[COLE_O_DATABASE_ID_AQUI]`.

**2. Criar a tabela**

```bash
npx wrangler d1 execute bmb-comentarios --remote --file=./schema.sql
```

**3. Definir os segredos**

`TOKEN_MODERACAO` é a senha que aprova comentário — use algo longo e aleatório.
`SAL_IP` é o sal do hash, qualquer texto longo serve, e não pode mudar depois.

```bash
npx wrangler secret put TOKEN_MODERACAO
```

```bash
npx wrangler secret put SAL_IP
```

**4. Publicar**

```bash
npx wrangler deploy
```

Anote a URL que aparece, algo como `https://bmb-comentarios.SEU-SUBDOMINIO.workers.dev`.

**5. Ligar o site à API**

Na raiz do projeto, crie `.env.local` com a URL do passo anterior:

```bash
echo "NEXT_PUBLIC_API_COMENTARIOS=https://bmb-comentarios.SEU-SUBDOMINIO.workers.dev" > .env.local
```

Depois rode o build de novo. Sem essa variável, a seção de comentários mostra
um convite para escrever à redação em vez de um formulário quebrado.

## Anti-robô (opcional, recomendado)

Crie um widget Turnstile no painel da Cloudflare e guarde a chave secreta:

```bash
npx wrangler secret put TURNSTILE_SECRET
```

Sem essa chave o Worker aceita os envios, contando apenas com o campo-isca e o
freio de 2 minutos por IP. Com tráfego real, ative.

## Moderar

Todo comentário nasce com `aprovado = 0` e **não aparece** no site até ser
liberado.

Ver os pendentes:

```bash
curl "https://bmb-comentarios.SEU-SUBDOMINIO.workers.dev/moderacao?token=SEU_TOKEN"
```

Aprovar:

```bash
curl -X POST "https://bmb-comentarios.SEU-SUBDOMINIO.workers.dev/moderacao?token=SEU_TOKEN" -H "Content-Type: application/json" -d '{"id":"ID_DO_COMENTARIO","acao":"aprovar"}'
```

Remover:

```bash
curl -X POST "https://bmb-comentarios.SEU-SUBDOMINIO.workers.dev/moderacao?token=SEU_TOKEN" -H "Content-Type: application/json" -d '{"id":"ID_DO_COMENTARIO","acao":"remover"}'
```

## Antes de abrir ao público

- Trocar `ORIGEM_PERMITIDA` no `wrangler.toml` para o domínio real. Com `*`,
  qualquer site consegue postar no seu banco.
- Ativar o Turnstile.
- Atualizar a Política de Privacidade: hoje ela diz que o site guarda apenas
  histórico de leitura local, newsletter e dados técnicos. Com comentários
  ativos, passa a guardar nome, texto e e-mail opcional — isso precisa estar
  escrito lá.
