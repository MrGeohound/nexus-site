# NEXUS — Auditoria do projeto (resumo)

## Stack identificada
- **Framework:** React 19 + Vite 8 (bundler Rolldown) + Tailwind CSS 4.
- **Projeto vigente:** `nexus-react-human-colors/` (dist mais recente; é o site de produção).
  - `nexus-react-hero/` é uma versão anterior/protótipo — **não** foi alterada.
  - `index.html`, `style.css`, `script.js` na raiz são de uma versão estática antiga.
- **Deploy:** Cloudflare Pages (havia `PASTA_PARA_CLOUDFLARE/`). Saída de build em `dist/`.
- **Domínio:** www.siganexus.com.br.

## Identidade visual (preservada)
- Cores: `#12333A` (petróleo), `#C8A96A` (dourado), `#B86B4B` (terracota/CTA), `#F8F3EA` (creme), `#E8D8BE` (bege).
- Fontes: Inter, Plus Jakarta Sans, Instrument Serif.
- Efeito `liquid-glass` no countdown; vídeo HLS (Mux) no hero.

## Componentes existentes
Header, Hero, About, TargetAudience, Schedule, Speakers, Sponsors, Pricing, Location, Faq, Cta, Footer, Countdown, SpeakersMarquee, NexusLogo.

## Comercial (validado no código)
- Ingresso individual: **R$ 247** (âncora "De R$ 600").
- Passaporte Duplo+: **R$ 199/pessoa** (a partir de 2). → confirma o briefing.
- Checkout: Sympla `https://www.sympla.com.br/evento/nexus-conexao-de-verdade/3454239`.
- Data/local: 23/07/2026, 16h30–22h, Ninna Hub — Av. Dom Manuel, 1020, Fortaleza/CE.

## Lacunas encontradas (antes)
- **Sem analytics/pixel/GA4**, sem GTM, sem dataLayer.
- **Sem captura/propagação de UTM**.
- **Sem consentimento LGPD**.
- **Links Sympla e data hardcoded** repetidos em Header, Hero, Pricing, Cta (anti-padrão).
- **Sem escassez configurável**, sem sticky CTA mobile, sem captura de leads.
- **Sem páginas** de obrigado / indicação / privacidade.
- **Sem dados estruturados** (schema.org) nem canonical.

## Observação de ambiente
`node_modules` do usuário foi instalado no Windows; o build Linux exige reinstalar
as dependências nativas do Rolldown. A verificação de build foi feita em cópia
Linux isolada — **o `node_modules` do Windows não foi tocado**.
