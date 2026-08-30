# Deploy para Cloudflare

## Como configurar o deploy do site Bem Mais Bella

### 1. Acesso ao Cloudflare
- Crie uma conta no Cloudflare (plano gratuito)
- Acesse Cloudflare Pages (https://pages.cloudflare.com/)
- Clique em "Create a Project"

### 2. Conectar o repositório
- Selecione "Connect to Git"
- Selecione o repositório `nexury-site-bem-mais-bella`
- Configure a branch `master`

### 3. Configurar Build
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Build Directory: `.` (raiz)

### 4. Configurar Variáveis de Ambiente
- `NEXT_PUBLIC_SUPABASE_URL`: Sua URL do Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Sua chave pública do Supabase
- `HIGGSFIELD_API_KEY`: Sua chave da API do Higgsfield

### 5. Configurar DNS (para `bem-mais-bella.com.br`)
1. Acesse "DNS" no painel do Cloudflare
2. Adicione um registro CNAME apontando para `pages.dev`
3. Troque os nameservers no painel do HostGator para:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`

### 6. Aplicar as alterações de HTML no site
- Após o deploy, você pode editar diretamente no painel do Cloudflare (se necessário) ou fazer push para o repositório e o deploy será feito automaticamente.

### 7. Como fazer o deploy automaticamente
- Toda vez que você fizer um push para o repositório (`git push origin master`), o Cloudflare Pages fará o build automaticamente.
- Se precisar de um deploy manual, clique em "Deploy" no painel do Cloudflare Pages.

### 8. Como acessar o site
- O site estará disponível no domínio `bem-mais-bella.com.br` após a propagação dos DNS (pode levar de 15 minutos a 2 horas).
- Você também pode acessar o site pelo URL temporário fornecido pelo Cloudflare Pages (ex.: `https://bem-mais-bella.pages.dev`).

### 9. Como verificar se o deploy foi feito com sucesso
- Acesse o URL do site (`https://bem-mais-bella.com.br` ou `https://bem-mais-bella.pages.dev`)
- Verifique se a página inicial está carregando corretamente
- Verifique se as imagens estão sendo otimizadas (você pode usar o DevTools para verificar o tamanho das imagens)
- Verifique se a integração com o Higgsfield está funcionando (se você estiver usando a API)

### 10. Como fazer rollback (se algo der errado)
- Acesse o painel do Cloudflare Pages
- Selecione a versão anterior do deploy
- Clique em "Redeploy" para restaurar a versão anterior

---

> **Nota:** Este documento é apenas uma referência de como configurar o deploy. Você ainda precisará configurar as credenciais e os DNS manualmente no painel do Cloudflare.
