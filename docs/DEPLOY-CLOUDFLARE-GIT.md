# Deploy via Git no Cloudflare Pages (recomendado)

Conectar o repositório faz o Cloudflare buildar e publicar sozinho a cada push —
e inclui a pasta `functions/` (endpoint da CAPI) automaticamente.

## 1. Subir o projeto para o GitHub
Já deixei o repositório iniciado e com o 1º commit. No GitHub:
1. Crie um repositório **vazio** (ex.: `nexus-site`), **sem** README/.gitignore.
2. No terminal, dentro de `nexus-react-human-colors`:
```bash
git remote add origin https://github.com/SEU_USUARIO/nexus-site.git
git branch -M main
git push -u origin main
```

## 2. Criar o projeto no Cloudflare Pages (a partir do Git)
Cloudflare → Workers & Pages → **Criar** → **Pages** → **Conectar ao Git** → escolha o repo.
Configurações de build:
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** *(deixe vazio se o repo for a pasta do app)*
- **Variável de ambiente de build:** `NODE_VERSION` = `20`

## 3. Recolocar variáveis + binding no NOVO projeto
Projetos criados via Git são **novos** — reponha o que você já cadastrou:
- Variáveis/Secrets: `META_PIXEL_ID`, `META_CAPI_TOKEN`, `WEBHOOK_SECRET`.
- Associação KV: `NEXUS_KV` → namespace `NEXUS_KV`.

## 4. Mover o domínio siganexus.com.br para o novo projeto
- No **projeto antigo** (upload manual): Custom domains → remover `www.siganexus.com.br`.
- No **projeto novo** (Git): Custom domains → adicionar `www.siganexus.com.br` (e o apex, se usava).
- Como o DNS está na mesma conta Cloudflare, a troca é rápida.

## 5. Validar
- Push de qualquer commit → deploy automático.
- Endpoint: `https://www.siganexus.com.br/api/sympla-webhook` deve responder no GET
  `{"ok":true,"service":"sympla-webhook","status":"up"}`.

> Observação: o `.env`, `.dev.vars` e `node_modules` NÃO vão para o Git (já no .gitignore).
> O Pixel do site funciona mesmo sem as variáveis; elas são para o Purchase server-side.
