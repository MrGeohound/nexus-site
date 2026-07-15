# Variáveis de ambiente

Copie `.env.example` para `.env` e preencha o que tiver. **Todas são opcionais** —
o site funciona sem nenhuma. Nunca comite `.env` com valores reais.

| Variável | Uso | Exemplo |
|---|---|---|
| `VITE_GA4_ID` | Google Analytics 4 | `G-XXXXXXXXXX` |
| `VITE_GTM_ID` | Google Tag Manager | `GTM-XXXXXXX` |
| `VITE_META_PIXEL_ID` | Meta Pixel (Facebook/Instagram) | `000000000000000` |
| `VITE_WHATSAPP_NUMERO` | Número WhatsApp (só dígitos, com DDI) | `5585999999999` |
| `VITE_CONTATO_EMAIL` | E-mail de contato | `contato@siganexus.com.br` |
| `VITE_INSTAGRAM_URL` | Perfil Instagram | `https://instagram.com/siganexus` |
| `VITE_LINKEDIN_URL` | Página LinkedIn | `https://linkedin.com/company/...` |
| `VITE_LEADS_ENDPOINT` | Endpoint POST para leads (padrão: `/api/leads`) | `https://api.exemplo.com/leads` |
| `VITE_ONBOARDING_ENDPOINT` | Endpoint POST para onboarding | `https://api.exemplo.com/onboarding` |

Bindings/Secrets de runtime usados pela função `/api/leads`:

| Variável | Uso |
|---|---|
| `NEXUS_KV` | Binding KV que guarda leads/onboarding por 90 dias e limita abuso |
| `LEADS_WEBHOOK_URL` | Webhook opcional para encaminhar imediatamente ao CRM/Make/Zapier |
| `LEADS_WEBHOOK_SECRET` | Segredo opcional enviado ao webhook no header `x-nexus-secret` |

## Como o consentimento afeta o tracking
GA4 e Meta Pixel **só carregam após o usuário aceitar** os cookies no banner LGPD.
Sem `VITE_*_ID`, nenhum script de terceiros é injetado (a camada de analytics vira no-op
com log em desenvolvimento).

## Entrega de leads
O site usa `/api/leads` por padrão. A função exige ao menos o binding `NEXUS_KV`
ou `LEADS_WEBHOOK_URL`. Se nenhum destino estiver disponível, a interface mostra
erro e guarda apenas uma cópia local de recuperação; nunca exibe um falso sucesso.
