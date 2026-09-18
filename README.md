# Aprimora Rede+ · NOSCas RMR

Landing page institucional e dashboard interativo do **Núcleo de Apoio às Organizações da
Sociedade Civil de Assistência Social (NOSCas)** — programa **Aprimora Rede+** na Região
Metropolitana do Recife (RMR), uma iniciativa da UFRPE em parceria com o MDS / Governo Federal.

Stack: **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide Icons**.

## Como executar

Pré-requisito: [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em /dist
npm run preview   # serve o build de produção localmente
npm run lint      # checagem de tipos (tsc --noEmit)
```

## Estrutura

```
src/
  components/
    Header.tsx, Hero.tsx, PartnersBar.tsx, About.tsx, StatsSection.tsx,
    NewsSection.tsx, AssessoriaForm.tsx, InstagramFeed.tsx, Footer.tsx
    Dashboard/                # mapa interativo das OSCs
      DashboardSection.tsx    # orquestra filtros, mapa, lista e gráficos
      Sidebar.tsx, MapView.tsx, DetailPanel.tsx, StatsCharts.tsx
  data/
    oscs.ts                   # 18 OSCs mapeadas (mock), tipos de serviço e municípios
    content.ts                # textos institucionais, eixos, metas, ODS, notícias
  lib/
    submitAssessoria.ts       # envio do formulário (webhook configurável)
    instagram.ts              # integração opcional com a API do Instagram
    useCountUp.ts             # hook para os contadores animados
```

## Integrações a configurar

Copie `.env.example` para `.env` e preencha o que for aplicável:

- **`VITE_ASSESSORIA_WEBHOOK_URL`** — endpoint para onde as solicitações de assessoria são
  enviadas (Google Apps Script Web App, Formspree, Supabase, n8n/Make/Zapier). Sem essa variável,
  o formulário funciona em modo de demonstração (valida e simula o envio, registrando o payload
  no console). Detalhes de cada opção estão comentados em `src/lib/submitAssessoria.ts`.
- **`VITE_INSTAGRAM_ACCESS_TOKEN`** — token da Instagram Basic Display / Graph API para exibir
  publicações reais na seção "Redes Sociais". Sem o token, a seção mostra cards ilustrativos de
  fallback. Detalhes em `src/lib/instagram.ts`.

## Dados do dashboard

As 18 OSCs, tipos de serviço e municípios em `src/data/oscs.ts` foram extraídos do mockup de
referência (`documentos-compartilhados/mapa_oscs_rmr_noscas.html`) e são dados ilustrativos
(nomes, telefones, e-mails e CNPJs fictícios) para fins de demonstração. Para uso real, substitua
pelo cadastro efetivo das OSCs mapeadas pelo NOSCas — o mapa é um SVG esquemático da RMR (sem
dependência de serviço de tiles externo), então basta ajustar as coordenadas `x`/`y` de cada
organização dentro do `viewBox` de 460×520.

## Conteúdo institucional

Textos sobre eixos do programa, metas, ODS e coordenação em `src/data/content.ts` foram extraídos
do Plano de Trabalho oficial do projeto (dez/2025 a nov/2026). Números pessoais (CPF, RG,
endereços, telefones pessoais das coordenadoras) foram deliberadamente omitidos do site público;
apenas nomes, papéis institucionais e e-mails `@ufrpe.br` são exibidos.
