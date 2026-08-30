# NEXUS AGENT OS — 8 Agentes Especializados

> Framework reutilizável para qualquer nicho da Nexury

## 🧠 7 Camadas Universais (Data → Valor)

| # | Camada | Descrição |
|---|---|---|
| 1 | Data Foundation | Coleta de dados (PLR, APIs, scraping) |
| 2 | Data Quality | Validação e limpeza de dados |
| 3 | Market Intelligence | Análise de concorrência e tendências |
| 4 | Product Genome | Estudo do produto (genoma) |
| 5 | Offer & Direct Response | Estrutura de oferta e resposta direta |
| 6 | Experiment & Analytics | Testes e métricas |
| 7 | Growth & Scale | Escala e expansão |

## 🧩 8 Agentes Especializados

### 1. **Nexury Scout Agent** (3001-3100)
- **Purpose**: Hunt opportunities 24/7
- **Inputs**: Nicho, fontes (ClickBank, Amazon, Reddit, Trends)
- **Outputs**: Opportunity Score (0-100), Weekly Report
- **Stack**: n8n + Supabase + LLM
- **Governance**: 🟢 Autonomous (data collection), 🟡 Supervised (proposal)

### 2. **Nexury Research Agent** (3101-3150)
- **Purpose**: Deep dive → Product Brief
- **Inputs**: Opportunity ID, nicho
- **Outputs**: Product Brief (problem, avatar, mechanism, etc.)
- **Stack**: Web search + LLM + Supabase
- **Governance**: 🟢 Autonomous; 🟡 Supervised (mechanism)

### 3. **Nexury Offer Agent** (P1-P1)
- **Purpose**: Build VSL + funnel
- **Outputs**: VSL, sales page, bump, upsell, downsell, checkout
- **Governance**: 🟡 Supervised (claims/price approval)

### 4. **Nexury CRO Agent** (P1-P2)
- **Purpose**: Optimize conversions
- **Tools**: A/B testing, analytics, heatmaps
- **Governance**: 🟢 Autonomous; 🟡 Supervised (major changes)

### 5. **Nexury Analytics Agent**
- **Purpose**: Extract insights from data
- **Outputs**: Weekly reports, trend analysis
- **Stack**: Python + Supabase + LLM

### 5. **Nexury Support Agent**
- **Purpose**: First-line support (WhatsApp/email)
- **Governance**: 🟢 Autonomous (FAQ); 🟡 Supervised (refunds/claims)

### 5. **Nexury Governance Agent**
- **Purpose**: Enforce 3-level governance
- **Rules**:
  - 🟢 Autonomous: tags, dashboards, small params
  - 🟡 Supervised: offers, prices, tests (approval needed)
  - 🔴 Restricted: finance >R$50k, contracts, legal

### 5. **Nexury Adaptive Intelligence** (3001-3500)
- **Ciclo**: Monitor → Detect → Evaluate → Update → Simulate → Deploy → Measure → Learn
- **Adaptive Intelligence Layer** (3001-3500):
  - 3001-3100: Market Monitoring & Change Detection
  - 3101-3150: Self-Updating Knowledge
  - 3151-3200: Change Detection Engine
  - 3201-3250: Module Evolution
  - 3251-3300: Self-Testing (Shadow Mode)
  - 3301-3350: Early Warning System
  - 3351-3400: Strategic Auto-Adaptation
  - 3401-3450: Human Governance
  - 3451-3500: Global Market Adaptation

---

## 🌐 Cloudflare Architecture (Recomendação)

| Camada | Tecnologia | Benefício |
|------|------------|-----------|
| **Frontend** | Next.js 14 + Tailwind | SSR/SSG, performance |
| **Imagens** | Higgsfield + Cloudflare Polish | Qualidade alta + baixa ocupação |
| **Banco de Dados** | Supabase | Postgres + real-time |
| **Back-end** | n8n + Next.js API routes | Workflow + API |
| **CDN** | Cloudflare Pages | CDN global + SSL |
| **DNS** | Cloudflare DNS | Gerenciamento centralizado |

---

## 📁 Estrutura de Pastas (Recomendada)

```
/workspace/nexury-site-bem-mais-bella
├── /src
│   ├── /app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── news/[slug].tsx
│   ├── /components
│   │   ├── NewsCard.tsx
│   │   ├── HeroImage.tsx
│   │   └── ImageOptimizer.tsx  # Componente para otimizar imagens
│   └── /lib
│       ├── utils.ts
│       └── image-optimizer.ts  # Integração com Higgsfield
│
├── /public
│   └── images/  # Imagens otimizadas (se houver backup)
│
├── /lib
│   ├── image-optimizer.ts  # Otimiza imagens via Higgsfield API
│   └── utils.ts
│
├── /pages/api
│   └── higgsfield.ts  # API para gerar imagens
│
├── /public
│   └── images/  # Imagens originais (não otimizadas)
│
└── /public/nexury-logo.png  # Logo da Nexury
```

---

## 🛠️ Como Implementar o Fluxo de Imagem Otimizada

### Passo 1: Criar API para Higgsfield (Cloudflare Workers)
Crie um arquivo em `/api/higgsfield.ts`:
```ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { text, width, height } = await request.json()
  
  // Simulação de chamada para Higgsfield (em produção, use API real)
  const response = await fetch('https://api.higgsfield.ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, width, height })
  })
  
  const blob = await response.blob()
  const imageData = await blob.arrayBuffer()
  
  return new Response(imageData, {
    headers: { 'Content-Type': 'image/webp' }
  }
}