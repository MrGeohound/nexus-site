# Guia de configuração — Purchase via Zapier + Conversions API

> Objetivo: quando alguém comprar na Sympla, o Zapier avisa nosso endpoint, que
> dispara o **Purchase** no Meta (server-side). Tempo estimado: ~20 min.

## Seu WEBHOOK_SECRET (já gerado — guarde)
```
dadd15ee198afcc344f1b3583e31235924a4800974dc9809
```
Use este valor no Cloudflare (passo 2) e na URL do Zapier (passo 3).

---

## Passo 1 — Gerar o token da Conversions API (Meta)
1. Acesse **business.facebook.com/events_manager**.
2. Na coluna da esquerda, selecione a **fonte de dados / Pixel** `1706951560594723`.
3. Clique em **Configurações** (Settings), no topo.
4. Role até a seção **API de Conversões** (Conversions API).
5. Em **Configurar manualmente / Gerar token de acesso**, clique em **Gerar token de acesso**.
6. Copie o token (começa com `EAA...`). É o **META_CAPI_TOKEN**. Guarde com segurança.
   - (Opcional) No mesmo lugar, em **Testar eventos**, há um **código de teste**
     (`TESTxxxx`) — útil no passo 4. É o **META_TEST_EVENT_CODE**.

## Passo 2 — Configurar o Cloudflare (Pages)
No painel do projeto do site (Cloudflare → Workers & Pages → seu site):
1. **Settings → Variables and Secrets** (Production), adicione:
   - `META_PIXEL_ID` = `1706951560594723`
   - `META_CAPI_TOKEN` = (token do passo 1) — marque como **Secret/Encrypt**
   - `WEBHOOK_SECRET` = (o segredo acima) — **Secret**
   - (opcional) `META_TEST_EVENT_CODE` = (código de teste)
2. Criar o KV de deduplicação: **Storage & Databases → KV → Create namespace**, nome `NEXUS_KV`.
3. Ligar o KV ao site: **Settings → Functions → KV namespace bindings → Add**:
   - Variable name: `NEXUS_KV` → Namespace: `NEXUS_KV`.
4. **Redeploy** o site para as variáveis entrarem em vigor.

Seu endpoint fica: `https://www.siganexus.com.br/api/sympla-webhook?secret=SEU_SEGREDO`

## Passo 3 — Criar o Zap (Zapier)
1. **Create Zap**.
2. **Trigger**: app **Sympla** → evento **New Order** (Novo pedido). Conecte sua conta
   Sympla (vai pedir o token de API — Central do Produtor → Integrações/API).
3. **Filter** (Filtro do Zapier): continuar **somente se** `Order Status` = `A`
   (ou `approved`/`aprovado`). Isso evita disparar em pedido não pago.
4. **Action**: **Webhooks by Zapier** → **POST**.
   - **URL**: `https://www.siganexus.com.br/api/sympla-webhook?secret=dadd15ee198afcc344f1b3583e31235924a4800974dc9809`
   - **Payload Type**: `json`
   - **Data** (mapear os campos do pedido Sympla):
     - `id` → ID do pedido
     - `order_status` → status
     - `email` → e-mail do comprador
     - `order_total_sale_price` → valor total
     - `quantity` → quantidade
     - `buyer_name` → nome do comprador
     - `phone` → telefone (se disponível)
   - **Wrap Request In Array**: No. **Unflatten**: yes.
5. **Test action**. Deve retornar `{"ok":true,...}`.

> No **Pluga** o fluxo é equivalente: gatilho "Novo pedido aprovado na Sympla" →
> ferramenta "Webhooks (HTTP POST)" com a mesma URL e campos.

## Passo 4 — Testar de ponta a ponta
1. No Meta Events Manager → **Testar eventos**, deixe a tela aberta.
2. Rode o teste do Zap (ou um `curl`):
```bash
curl -X POST "https://www.siganexus.com.br/api/sympla-webhook?secret=dadd15ee198afcc344f1b3583e31235924a4800974dc9809" \
  -H "Content-Type: application/json" \
  -d '{"order":{"id":"TESTE123","order_status":"approved","email":"teste@exemplo.com","order_total_sale_price":247,"quantity":1}}'
```
3. Em **Testar eventos**, deve aparecer um **Purchase** com valor 247, BRL.
4. Repetir o mesmo `id` **não** deve gerar 2 eventos (deduplicação OK).

## Pronto
A partir daí, toda compra aprovada na Sympla vira um Purchase real no Meta — e você
pode otimizar as campanhas por **conversão de venda**, não só por clique.
