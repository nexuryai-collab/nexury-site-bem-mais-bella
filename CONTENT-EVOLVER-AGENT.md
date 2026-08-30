# 🔬 Content Evolver Agent — Self-Improving Editorial System

> **Inspired by Lewis Jackson's self-improving AI trading agent pattern.**
> Applied to **editorial content strategy** for Bem Mais Bella (not trading).

## The Core Insight

> "A calculator gives answers. A researcher asks better questions."
>
> Same for content: not just generating — **learning and evolving**.

Most content strategies are **static**: publish → hope → forget.
The Content Evolver is **dynamic**: publish → measure → learn → adapt → repeat.

---

## 🔄 Scientific Method Loop (Content Edition)

```
┌─────────────────┐
│   BASELINE       │  ← Current content performance (metrics)
└──────┬──────────┘
       ↓
┌─────────────────┐
│   HYPOTHESIS     │  ← "What single change could improve?"
└──────┬──────────┘
       ↓
┌─────────────────┐
│   TEST           │  ← Publish A/B variant for 7 days
└──────┬──────────┘
       ↓
┌─────────────────┐
│   MEASURE        │  ← GA4 + PostHog + Supabase
└──────┬──────────┘
       ↓
┌─────────────────┐
│   FEEDBACK       │  ← What patterns emerge?
└──────┬──────────┘
       ↓
┌─────────────────┐
│   ADAPT          │  ← Update next content template
└──────┬──────────┘
       ↓
┌─────────────────┐
│   REPEAT         │  ← Next variable, next universe
└─────────────────┘
```

---

## 🧪 4 Variables to Optimize (One at a Time)

| Variable | What to Test | Example Hypothesis |
|---|---|---|
| **Hook** | Headlines, first paragraph, thumbnails | "I Did X and Got Y" format converts 30% more than "5 Tips" |
| **Mechanism** | Content angle | How-to articles vs. case studies vs. personal stories |
| **Segment** | Which of 30 universes to focus | Beauty articles convert better than Career in Brazil |
| **Offer** | CTA placement, affiliate positioning | Affiliate link after 3 paragraphs vs. end of article |

**Rule**: Change ONE variable at a time. Isolate the winner. Document the learning.

---

## 📊 Metrics to Track

| Metric | Tool | Target |
|---|---|---|
| Engagement rate | GA4 + PostHog | >3 min per article |
| Scroll depth | GA4 | >70% of article |
| CTR (click-through) | Supabase + PostHog | >5% on CTAs |
| Conversion | GA4 + PostHog | >2% (newsletter/signup) |
| Affiliate clicks | n8n + GA4 | >100/mo per article |
| Revenue per article | GA4 + Supabase | >R$100/mo per article |
| Brand authority | Ahrefs + Backlinks | Domain rating growth |
| LTV per content piece | Supabase | >R$500 lifetime |

---

## 🛠️ Stack Tecnológico

```
┌─────────────────────┐     ┌─────────────────────┐
│  Cloudflare Pages    │────▶│  Next.js (SSG/ISR)  │
│  (CDN + Polish)     │     │  + Tailwind CSS      │
└─────────────────────┘     └─────────┬──────────┘
                                        │
                                        ▼
┌─────────────────────┐     ┌─────────────────────┐
│  Supabase            │◀────│  n8n (Orchestration) │
│  (Content + Metrics) │     │  + GA4 + PostHog     │
└─────────┬───────────┘     └─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  LLM (gpt-4o)        │
│  Content Generation  │
│  + Analysis          │
└─────────────────────┘
```

---

## 📋 Schema do Banco (Supabase)

### Table: `content_experiments`

```sql
CREATE TABLE content_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES content(id),
  universe TEXT,           -- Qual dos 30 universos
  variable_tested TEXT,    -- hook / mechanism / segment / offer
  hypothesis TEXT,         -- O que testamos
  baseline_metric FLOAT,   -- Métrica antes (ex: 3.2% conversion)
  experiment_metric FLOAT, -- Métrica depois (ex: 4.1% conversion)
  delta_percent FLOAT,     -- Diferença (+28%)
  winner BOOLEAN,          -- Venceu?
  confidence FLOAT,        -- Nível de confiança (0-1)
  tested_at TIMESTAMPTZ DEFAULT now(),
  next_test TEXT,          -- Próximo teste sugerido
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Indexes
```sql
CREATE INDEX idx_content_experiments_variable ON content_experiments(variable_tested);
CREATE INDEX idx_content_experiments_universe ON content_experiments(universe);
CREATE INDEX idx_content_experiments_winner ON content_experiments(winner) WHERE winner = TRUE;
```

---

## 📈 SOP Completo do Agente (11 Passos)

```
1. COLLECT — Pull 7-day metrics from all published content
   → GA4: page views, engagement, CTR
   → PostHog: retention, funnel
   → Supabase: affiliate clicks, sales
   → n8n: orchestrate the data pull

2. ANALYZE — Identify top 3 and worst 3 content pieces
   → Sort by conversion rate
   → Sort by engagement rate
   → Flag anomalies (>2σ from mean)

3. HYPOTHESIZE — Form a testable hypothesis
   → "Hooks with numbers convert 20% more"
   → "Case studies in Beauty universe get 35% more shares"
   → "Affiliate links at paragraph 3 get 40% more clicks"

4. DESIGN — Create 2 variants
   → Control (current best performer)
   → Hypothesis (new variable)
   → A/B test setup via n8n + GA4

5. PUBLISH — Deploy via Cloudflare Pages
   → SSG build → CDN global
   → Polish auto-optimizes images
   → Mirage lazy loads below fold

6. TRACK — Monitor for 7 days
   → n8n cron: daily metric pull
   → Anomaly detection (Early Warning System)
   → Dashboard update

7. CONCLUDE — Statistical significance? Winner?
   → p < 0.05 → declare winner
   → No significance → extend test +3 days
   → Loser → archive + document why

8. DOCUMENT — Save to content_experiments table
   → Full record: hypothesis, metrics, winner, confidence
   → Knowledge base update (modules 3101-3150)
   → Versioning: old strategy → archived, new → active

9. ADAPT — Update next content template
   → Integrate winning hook/mechanism into default template
   → Update content brief template
   → Update VSL templates if applicable

10. REPORT — Weekly summary to human
    → Top 3 winners of the week
    → Key learnings
    → Next recommended test
    → Metrics dashboard link

11. REPEAT — Next variable, next universe
    → Test hook → done → test mechanism → done → test segment...
    → Rotate through 30 universos
    → Continuous improvement loop
```

---

## 🎯 Example Loop: Beauty Universe

### Week 1 — Baseline
- **Current**: "5 Dicas para..." posts → 3.2% conversion
- **Universe**: Beleza (Beleza & Estética)
- **Metric**: 1,000 visits/week → 32 conversions

### Week 2 — Hypothesis
- **Hypothesis**: "I Did X and Got Y" format converts 30% more
- **Variant**: "Testei 30 dias com ácido retinóico — veja o que aconteceu"
- **Control**: "5 Dicas para tratar acne"

### Week 3 — Test
- **Published**: 5 articles in new format
- **Measured**: 4.1% conversion (+28%)
- **Winner**: ✅ New format wins with 95% confidence

### Week 4 — Adapt
- **Template updated**: New default for Beleza universe
- **Documented**: Saved to content_experiments
- **Next test**: Mechanism (how-to vs. case study)

---

## 📝 Prompts Prontos para Uso

### Prompt: Gerar Hipótese de Conteúdo
```
Você é o Content Evolver Agent. Com base nos dados:
- Top performer: "{top_title}" com {top_metric}% de conversão
- Worst performer: "{worst_title}" com {worst_metric}% de conversão
- Universo: {universe}

Formule UMA hipótese testável:
1. Qual variável mudar? (hook/mechanism/segment/offer)
2. Qual a mudança específica?
3. Qual o resultado esperado?
4. Como medir?

Responda em formato JSON:
{{
  "hypothesis": "...",
  "variable": "hook/mechanism/segment/offer",
  "change": "descrição específica da mudança",
  "expected_improvement": "+X%",
  "measure_method": "GA4/PostHog/Supabase"
}}
```

### Prompt: Analisar Resultados
```
Você é o Content Evolver Agent. Analise os resultados do teste:

Conteúdo: {content_title}
Hipótese: {hypothesis}
Variável testada: {variable_tested}
Baseline: {baseline_metric}%
Resultado: {experiment_metric}%
Delta: {delta_percent}%
Winner: {winner}
Confidence: {confidence}

Responda:
1. A hipótese foi confirmada? Sim/Não
2. Qual a explicação para o resultado?
3. O que podemos aprender?
4. Qual o próximo teste sugerido?
5. Devemos aplicar essa mudança ao template padrão? (Sim/Não)
```

### Prompt: Gerar Variantes A/B
```
Você é o Content Evolver Agent. Gere 2 variantes de conteúdo para teste A/B:

Tema: {topic}
Universo: {universe}
Variável a testar: {variable}
Hipótese: {hypothesis}

Responda:
CONTROL (atual melhor):
- Título:
- Primeiro parágrafo:
- CTA:
- Estrutura sugerida:

HYPOTHESIS (nova variante):
- Título:
- Primeiro parágrafo:
- CTA:
- Estrutura sugerida:
```

---

## 🧬 Integração com o Nexury Agent OS

Este agente se conecta com os 8 agentes existentes:

| Agente | Integração |
|---|---|
| **Scout Agent** | Fornece dados de tendências → informa quais universos testar |
| **Research Agent** | Gera briefings de conteúdo para os testes |
| **Offer Agent** | Testa variações de CTA/upsell |
| **CRO Agent** | Analisa resultados + declara vencedores |
| **Analytics Agent** | Extrai padrões → alimenta o Content Evolver |
| **Support Agent** | Coleta feedback de usuários → melhora conteúdo |
| **Governance Agent** | Controla níveis de autonomia (autônomo/supervisionado/restrito) |
| **Adaptive Intelligence** | Atualiza o Knowledge Base com os learnings (3101-3150) |

---

## 📁 O que foi criado

```
/workspace/nexury-site-bem-mais-bella/
├── src/
│   ├── agents/
│   │   ├── content-strategist.ts  # Skill: Evolve content strategy
│   │   └── content-evolver.ts     # Agent: Self-improving editorial
│   ├── components/
│   │   ├── NewsCard.tsx
│   │   └── HeroImage.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── image-optimizer.ts
│   └── pages/
│       └── api/
│           └── higgsfield.ts
│
├── HIGGSFIELD-IMAGE-CONFIG.md
└── package.json
```

---

## 🚀 Próximos passos

1. **Publicar as skills no sistema** → `skill_view` para validar
2. **Conectar com GA4 + PostHog** → Métricas reais
3. **Primeiro teste A/B** → Hipótese + Control + Variant
4. **Documentar learnings** → Modules 3101-3150

---

## 🎯 TL;DR

- ✅ 2 skills criadas: `nexury-content-strategist` + `nexury-content-evolver`
- ✅ Loop científico completo: Baseline → Hypothesis → Test → Measure → Feedback → Adapt
- ✅ 4 variáveis para otimizar (hook, mechanism, segment, offer)
- ✅ Schema Supabase para tracking de experiments
- ✅ SOP de 11 passos documentado
- ✅ Integração com os 8 agentes existentes
- ✅ Prompts prontos para uso
- ✅ Exemplo prático: Beauty universe, hook test, +28% conversion

**Pronto para o primeiro teste A/B? Me diga o universo e a hipótese — eu gero as variantes e lançamos.** 🧪🚀
