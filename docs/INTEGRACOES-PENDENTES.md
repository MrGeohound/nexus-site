# Integrações pendentes (o que falta conectar)

A estrutura técnica está pronta; o que depende de credenciais/config externa está
listado aqui. **Nada foi simulado.**

## 1. Confirmação de compra (Purchase) — CRÍTICO

> **Status: estrutura IMPLEMENTADA** (ver `docs/SYMPLA-PURCHASE.md`).
> Falta apenas: gerar o token da CAPI, definir o segredo e ligar o webhook/poller.
A Sympla é um checkout externo. **Não** disparamos `purchase` no clique.
Para medir compras reais, escolha uma das opções e implemente a confirmação:

- **Webhook/Postback da Sympla** → endpoint próprio que recebe a venda confirmada e
  dispara `purchase` (server-side / Conversions API). *Requer conta Sympla com essa opção.*
- **Exportação/Conciliação** → importar compradores da Sympla periodicamente para o CRM.
- **Redirecionamento pós-compra confiável** para uma URL de obrigado com token — só então
  disparar `purchase`. A rota `/obrigado` **não** deve ser a única prova de compra.

Enquanto não houver confirmação confiável, `EVENTS.PURCHASE` fica disponível na camada
de analytics, porém **não é chamado** em nenhum fluxo.

## 2. Meta Pixel + Conversions API (CAPI)
- `VITE_META_PIXEL_ID` já ativa o Pixel (após consentimento).
- Eventos mapeados: `view_event/view_pricing → ViewContent`, `select_ticket → AddToCart`,
  `initiate_checkout → InitiateCheckout`, `lead → Lead`, `purchase → Purchase`.
- Cada evento já gera `event_id` para **deduplicação** quando a CAPI for implementada
  (server-side). A CAPI em si precisa de um backend com o token de acesso.

## 3. Backend de leads / CRM
- Definir `VITE_LEADS_ENDPOINT` (e opcional `VITE_ONBOARDING_ENDPOINT`).
- O endpoint recebe JSON com: campos do formulário + UTMs + `session_id` + timestamp.
- Sugestão: Supabase (tabela `leads` / `onboarding`) ou automação (Zapier/Make → planilha/CRM).

## 4. WhatsApp
- Definir `VITE_WHATSAPP_NUMERO`. Sem número, os links abrem o compositor genérico.
- Para automação de mensagens, integrar um provedor (ex.: API oficial / plataforma).

## 5. Provedor de e-mail (jornada pré/pós-evento)
- Os templates estão em `comunicacao/`. Falta conectar um ESP (ex.: Brevo, Mailchimp,
  Resend) ou automação. Não há credenciais no código.

## Resumo do que já está pronto
UTMs, camada de analytics, consentimento LGPD, seleção de oferta, escassez, captura de
lead (com fallback), rotas de obrigado/indique/privacidade, onboarding, SEO/JSON-LD.
