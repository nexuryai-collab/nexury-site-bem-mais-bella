#!/bin/bash
# Cron job: gera 1 artigo a cada 30 min durante a noite (8h = 16 artigos por ciclo)
# Cron: 0,30 * * * * /workspace/nexury-site-bem-mais-bella/cron/night-articles.sh

set -e
cd /workspace/nexury-site-bem-mais-bella

LOG=/tmp/bem-mais-bella-night.log
echo "===== $(date) =====" >> "$LOG"

# Lista de slugs a gerar (próximos artigos da fila - 2026-09-08)
SLUGS=(
  "tendencias-maquiagem-outono-2026"
  "skincare-rotina-sensivel-2026"
  "ansiedade-financas-femininas-2026"
  "maternidade-real-autenticidade-2026"
  "relacionamento-toxico-superacao-2026"
  "carreira-mulher-transicao-2026"
  "decoracao-biofilia-casa-2026"
  "viagens-autoconhecimento-retiro-2026"
  "journaling-terapeutico-guia-2026"
  "hype-brasilcore-trends-2026"
  "beleza-clean-girl-brasileira-2026"
  "investimentos-mulheres-iniciantes-2026"
  "familia-monoparental-apoio-2026"
  "casamento-intencional-pequeno-2026"
  "comunicacao-nao-violenta-relacionamento-2026"
)

# Pega o próximo slug da fila baseado no último commit
NEXT_SLUG=""
for slug in "${SLUGS[@]}"; do
  if [ ! -d "src/app/artigos/$slug" ]; then
    NEXT_SLUG="$slug"
    break
  fi
done

if [ -z "$NEXT_SLUG" ]; then
  echo "Todos os artigos da fila já foram criados" >> "$LOG"
  exit 0
fi

echo "Próximo artigo a gerar: $NEXT_SLUG" >> "$LOG"

# Sinaliza via flag file que o artigo precisa ser criado pelo Nexus
touch "/tmp/next-slug-$NEXT_SLUG"

# Em ambiente real, aqui chamaria a API de geração.
# Como o cron job não pode chamar IA, deixamos a flag para a próxima sessão do Nexus processar.

echo "Flag criada: /tmp/next-slug-$NEXT_SLUG" >> "$LOG"