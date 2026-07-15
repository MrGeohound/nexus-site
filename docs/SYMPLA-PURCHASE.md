# Item A — Confirmação de compra (Sympla → Purchase via CAPI)

Objetivo: disparar o evento **Purchase** no Meta **somente com compra confirmada**,
otimizando as campanhas por venda real. O checkout é externo (Sympla), então a
confirmação chega por **webhook (push)** ou por **poller (pull)**. Os dois enviam o
Purchase pela **Conversions API** (server-side), com hash de dados (LGPD) e
deduplicação por `order_id`.

## Arquivos
- `functions/_shared/capi.js` — envia Purchase para a CAPI (hash + dedup + valor BR).
- `functions/api/sympla-webhook.js` — endpoint `POST /api/sympla-webhook` (push).
- `workers/sympla-poller/` — Worker + cron que lê a API da Sympla (pull).

## Pré-requisitos (uma vez)
1. **Token da Conversions API**: Meta Events Manager → seu Pixel (1706951560594723)
   → Configurações → Conversions API → *Gerar token de acesso*. Guarde como `META_CAPI_TOKEN`.
2. **Segredo do webhook** (`WEBHOOK_SECRET`): gere uma string aleatória forte.
3. **KV para deduplicação**: `npx wrangler kv namespace create NEXUS_KV` e use o `id`.

---

## Opção 1 (recomendada): Webhook em tempo real
Funciona com **Pluga / Zapier / Make** (ou webhook nativo, se seu plano Sympla tiver).

### Deploy (Cloudflare Pages)
As Pages Functions já vão junto com o site (pasta `functions/`). No painel do Pages:
- **Settings → Environment variables** (Production): `META_PIXEL_ID`, `META_CAPI_TOKEN`, `WEBHOOK_SECRET`, (opc.) `META_TEST_EVENT_CODE`.
- **Settings → Functions → KV namespace bindings**: `NEXUS_KV` → o namespace criado.
- Publique. O endpoint fica em: `https://www.siganexus.com.br/api/sympla-webhook`.
  Envie o segredo no header `x-nexus-secret` para evitar credenciais em URLs e logs.

### Ligar a Sympla ao endpoint (via automação)
No Pluga/Zapier/Make: gatilho **"Novo pedido aprovado na Sympla"** → ação **Webhook (POST)**
para a URL acima, enviando o JSON do pedido (email, valor, status, id do pedido).
O endpoint entende os campos comuns automaticamente; só dispara em status aprovado.

### Teste
```bash
curl -X POST "https://www.siganexus.com.br/api/sympla-webhook" \
  -H "Content-Type: application/json" \
  -H "x-nexus-secret: SEU_WEBHOOK_SECRET" \
  -d '{"order":{"id":"TESTE123","order_status":"approved","email":"teste@exemplo.com","order_total_sale_price":247,"quantity":1}}'
```
Confira no **Meta Events Manager → Test Events** (use `META_TEST_EVENT_CODE`).

---

## Opção 2: Poller (sem automação)
Usa a **API da Sympla** direto. Precisa do `SYMPLA_TOKEN` (Central do Produtor → Integrações/API).

```bash
cd workers/sympla-poller
npx wrangler kv namespace create NEXUS_KV      # cole o id no wrangler.toml
npx wrangler secret put SYMPLA_TOKEN
npx wrangler secret put META_PIXEL_ID
npx wrangler secret put META_CAPI_TOKEN
npx wrangler secret put WEBHOOK_SECRET
npx wrangler deploy
```
O cron roda a cada 15 min, pega pedidos aprovados novos e dispara Purchase.
Teste manual: `https://<worker>.workers.dev/?key=SEU_SEGREDO`.

---

## Garantias e observações
- **Nunca** dispara Purchase por clique nem por status não aprovado.
- **Deduplicação**: `event_id = purchase_<order_id>` + KV → mesmo pedido nunca conta 2x
  (inclusive se webhook e poller rodarem juntos).
- **Horário real**: quando a Sympla fornece a data de aprovação/pagamento, ela é
  enviada em `event_time`. A Meta aceita backfill de no máximo 7 dias; pedidos
  mais antigos são ignorados, nunca reclassificados artificialmente como venda nova.
- **Match quality**: enviamos e-mail/telefone/nome com hash SHA-256. Se a automação
  também repassar `fbp`/`fbc`, o casamento melhora (campos já suportados no `capi.js`).
- **Moeda**: BRL. **Valor**: aceita "R$ 1.234,56" ou número.
- Cancelamento/reembolso: se quiser, dá para estender o `capi.js` com um evento de
  refund — hoje o escopo é só confirmação de compra.
