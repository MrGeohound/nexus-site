# Plano de mensuração (eventos e parâmetros)

Todos os eventos passam por `src/lib/analytics.js` (`track(nome, params)`), que
encaminha para dataLayer (GTM), gtag (GA4) e fbq (Meta Pixel) quando disponíveis.

## Eventos do funil
| Evento | Quando dispara |
|---|---|
| `page_view` | troca de rota |
| `view_event` | boot da aplicação |
| `scroll_25/50/75/90` | profundidade de rolagem |
| `click_primary_cta` | CTA principal (hero, header, cta final, sticky) |
| `click_secondary_cta` | CTA secundário (ver localização) |
| `view_pricing` | seção de ofertas entra na tela |
| `select_ticket` | clique em uma oferta |
| `initiate_checkout` | redirecionamento para a Sympla |
| `lead` | envio do formulário de captura |
| `whatsapp_click` | clique em botões de WhatsApp |
| `faq_open` | abertura de uma pergunta |
| `share_event` | compartilhamento (whatsapp/linkedin/link) |
| `onboarding_start` / `onboarding_complete` | página /obrigado |
| `add_to_calendar` | Google Agenda / .ics |
| `purchase` | **somente com confirmação confiável** (não implementado por clique) |

## Parâmetros padrão (em todo evento)
`source, medium, campaign, content, term, referrer, landing_page, session_id,
device, viewport, timestamp, page_path, event_id`.
Extras por evento: `ticket_type, ticket_value, currency, content_name, origem`.

## Mapa Meta Pixel
`ViewContent, AddToCart, InitiateCheckout, Lead, Purchase` (com `eventID` p/ dedupe).

## GTM (recomendado)
Se usar `VITE_GTM_ID`, configure as tags no GTM lendo o `dataLayer` (o `event` é o nome
padronizado acima). Assim evita scripts espalhados e centraliza a governança.
