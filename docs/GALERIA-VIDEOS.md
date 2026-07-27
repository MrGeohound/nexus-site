# Galeria de vídeos do NEXUS — como funciona e como publicar

Repositório de vídeos do evento em `/galeria`: os participantes assistem aos
clipes da gravação profissional e baixam para usar nas redes sociais. Captura
contato (nome + WhatsApp/e-mail) antes do primeiro download, alimentando a base
comercial pós-evento.

## Visão geral da arquitetura

- **Página**: `src/pages/Galeria.jsx` (rota `/galeria`, já no menu do site).
- **Config**: `src/config/videos.js` — ligar/desligar, base do R2, tamanho de
  página, gate. **Edite só aqui.**
- **Dados**: `src/lib/videos.js` — carrega o manifesto e monta as URLs.
- **Manifesto**: `public/videos-manifest.json` — lista dos clipes. Gerado por
  `scripts/generate-manifest.mjs`.
- **Gate/leads**: reaproveita `/api/leads` com `origem: "galeria-videos"` (mesma
  base dos outros leads, filtrável por origem).

### Duas fontes possíveis (campo `source` do manifesto)

| source  | uso                                   | player      | quando |
|---------|---------------------------------------|-------------|--------|
| `drive` | ponte temporária pelo Google Drive    | iframe      | já funciona hoje, sem migração |
| `r2`    | arquivos MP4/JPG no bucket (final)     | `<video>`   | depois de rodar o pipeline |

O manifesto atual está em **`source: "drive"` com 40 clipes reais de amostra**,
para você já ver a galeria funcionando. Ao rodar o pipeline, ele é regenerado
com os **258 clipes** e `source: "r2"`.

> Para a ponte via Drive funcionar de imediato, a pasta do Drive precisa estar
> como **"Qualquer pessoa com o link · Leitor"**. Se preferir não abrir o Drive,
> pule direto para a migração ao R2 (recomendado).

## Migração para o Cloudflare R2 (recomendado)

### 1. Criar o bucket e o acesso público
1. Cloudflare Dashboard → **R2** → *Create bucket* → `nexus-videos`.
2. No bucket → *Settings* → **Public access / Custom domain** → conecte
   `videos.siganexus.com.br` (cria o DNS automaticamente no domínio da Cloudflare).
3. *Settings* → **CORS** → permita `GET` de `https://www.siganexus.com.br` e
   `https://siganexus.com.br`.
4. **R2 → Manage API Tokens** → crie um token (Object Read & Write) e guarde
   `Access Key ID`, `Secret Access Key` e o `Account ID`.

### 2. Rodar o pipeline (na sua máquina)
Precisa de `ffmpeg`, `rclone` e `node`. Configure os remotes do rclone:
`gdrive` (tipo *drive*) e `r2` (tipo *s3 / Cloudflare*). Depois:

```bash
export GDRIVE_REMOTE=gdrive
export GDRIVE_FOLDER_ID=1BtyhAoeUPpLOTyT88TWqx5YjXCsSE_YX
export R2_REMOTE=r2
export R2_BUCKET=nexus-videos

bash scripts/process-videos.sh          # baixa, converte, envia e gera o manifesto
```

O script é idempotente (pula o que já foi feito) e tem etapas isoladas:
`pull`, `transcode`, `upload`, `manifest`. Para preview mudo no hover:
`MAKE_PREVIEW=1 bash scripts/process-videos.sh`.

Resultado no bucket:
```
nexus-videos/
  mp4/00605595.mp4   ...   (vídeo web H.264)
  thumb/00605595.jpg ...   (poster)
  preview/00605595.mp4 ... (opcional, hover)
```

### 3. Apontar o site para o R2 e publicar
Defina a variável de ambiente no Cloudflare Pages (*Settings → Environment
variables*) e no `.env` local:

```
VITE_VIDEOS_BASE=https://videos.siganexus.com.br
```

Faça `npm run build` e deploy. Pronto: a galeria passa a servir do R2.

## Custo (referência)
~258 clipes, ~7 GB de origem `.mov`. Após conversão para MP4 web, tende a ficar
**bem menor**. R2: 10 GB de armazenamento grátis e **sem taxa de egress**, então
o custo típico desse volume é praticamente zero. ffmpeg reduz tamanho e garante
compatibilidade com todos os navegadores (o `.mov` original não toca em vários).

## Ajustes rápidos
- **Desligar a galeria**: `VIDEOS.ativo` em `src/config/videos.js` (ou remova o
  link no `Header.jsx`).
- **Download aberto (sem gate)**: `VIDEOS.gate.ativo = false`.
- **Pedir o cadastro de novo a cada X dias**: `VIDEOS.gate.revalidarDias`.
- **Itens por rolagem**: `VIDEOS.pageSize`.

## Leads capturados
Chegam em `/api/leads` (KV `NEXUS_KV` e/ou `LEADS_WEBHOOK_URL`) com
`tipo: "lead"` e `origem: "galeria-videos"`, junto de UTM/atribuição. Filtre por
essa origem para separar quem veio pela galeria.
