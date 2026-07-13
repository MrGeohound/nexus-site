# NEXUS — Implementação (o que foi feito)

O projeto atual foi transformado em um **funil completo** sem recriar do zero e
preservando a identidade visual. Abaixo, arquivos criados/alterados e decisões.

## Arquivos criados

### Configuração central (fonte única de verdade)
- `src/config/event.js` — data, local, **vagas (total/preenchidas, configurável)**, lote, URLs.
- `src/config/offers.js` — ingressos, preços, links Sympla.
- `src/config/site.js` — contato/WhatsApp, sociais, organizadores, IDs de analytics (via env), endpoints de leads, flags.
- `src/config/index.js` — ponto único de importação (`import { EVENT, OFFERS } from '../config'`).

### Bibliotecas (`src/lib/`)
- `analytics.js` — camada central de eventos padronizados (GTM/GA4/Meta Pixel). Funciona sem provedores.
- `utm.js` — captura, persistência (first/last-touch) e propagação de UTMs; `session_id` anônimo.
- `consent.js` — LGPD; carrega GA4/Pixel **somente após consentimento**.
- `checkout.js` — dispara `select_ticket`+`initiate_checkout`, preserva UTMs e abre a Sympla.
- `leads.js` — envio de lead/onboarding com fallback local (sem backend obrigatório).
- `whatsapp.js`, `calendar.js` — helpers de WhatsApp e "adicionar à agenda" (Google + .ics).
- `router.jsx` — roteamento leve (History API), sem dependência nova.
- `useScrollDepth.js` — eventos scroll_25/50/75/90.

### Componentes (`src/components/`)
- `ScarcityBadge.jsx` — escassez real "X de 80 vagas" (barra e pill).
- `StickyCta.jsx` — CTA fixo no rodapé (mobile).
- `ConsentBanner.jsx` — banner LGPD (sem caixa pré-marcada).
- `LeadCapture.jsx` — captura secundária de leads (nome/WhatsApp/empresa + consentimento).
- `Organizadores.jsx` — seção dos organizadores (dados do config).

### Páginas (`src/pages/`)
- `Home.jsx` — landing (monta as seções + scroll depth + sticky CTA).
- `Obrigado.jsx` — `/obrigado`: próximos passos, add-to-calendar, **onboarding**, indicação, suporte.
- `Indique.jsx` — `/indique`: compartilhamento WhatsApp/LinkedIn/link com UTM `ref`.
- `Privacidade.jsx` — `/privacidade`: política + gestão de consentimento.

### Infra/SEO
- `index.html` — `lang=pt-BR`, canonical, OG/Twitter completos, **JSON-LD schema.org/Event**.
- `public/_redirects` — fallback SPA (Cloudflare/Netlify) para as rotas client-side.
- `.env.example` — variáveis de ambiente documentadas.

## Arquivos alterados
- `src/App.jsx` — passa a usar o router + boot (UTM/consent/view_event) + banner LGPD.
- `src/Hero.jsx` — CTA primário → seleção de oferta; escassez real; eventos.
- `src/components/Header.jsx` — CTA via evento; data do config; CTA no menu mobile.
- `src/components/Pricing.jsx` — **data-driven** por `offers.js`; `startCheckout`; `view_pricing`; escassez.
- `src/components/Cta.jsx` — CTA final via evento; escassez; copy de fechamento.
- `src/components/Faq.jsx` — FAQ expandido (passe duplo, transferência, reembolso, vestimenta) + `faq_open`.
- `src/components/Countdown.jsx` — data do config central.
- `src/components/Footer.jsx` — sociais/contato do config; links Privacidade e Indique.

## Decisões importantes
1. **Pré-checkout como camada de seleção:** CTAs de topo (hero/header/cta) levam à seção
   de ofertas; os botões de cada oferta é que abrem a Sympla — registrando a oferta escolhida.
2. **Purchase nunca é disparado por clique.** Só deve ser emitido com confirmação real
   (ver `docs/INTEGRACOES-PENDENTES.md`).
3. **Escassez verdadeira e centralizada** em `event.js` (`vagas.preenchidas`).
4. **Zero credenciais no código.** IDs e endpoints via `.env`.
5. **Router próprio** (sem adicionar `react-router`) para não inflar o bundle.
