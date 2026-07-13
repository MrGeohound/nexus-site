# Checklist de publicação

## Antes de publicar
- [ ] `src/config/event.js`: **vagas.preenchidas** com o número REAL.
- [ ] `src/config/offers.js`: preços e links Sympla conferidos.
- [ ] `.env` preenchido (GA4/Pixel/WhatsApp) — ou ciente de que ficará sem tracking.
- [ ] Imagem de compartilhamento em `public/assets/nexus-share.png` (1200×630) existe.
- [ ] Organizadores/fotos conferidos em `src/config/site.js`.

## Build
```bash
cd nexus-react-human-colors
npm install        # primeira vez ou ao trocar de máquina/SO
npm run build      # gera dist/
```

## Deploy (Cloudflare Pages)
- [ ] Publicar o conteúdo de `dist/`.
- [ ] Garantir que `_redirects` foi para o `dist/` (fallback SPA das rotas).
- [ ] Domínio `www.siganexus.com.br` apontando para o deploy.

## Pós-deploy
- [ ] Testar `/`, `/obrigado`, `/indique`, `/privacidade` (recarregando cada URL).
- [ ] Validar OG/JSON-LD em https://search.google.com/test/rich-results e no compartilhamento do WhatsApp.
- [ ] Conferir GA4/Pixel disparando **após aceitar cookies** (Meta Pixel Helper / GA DebugView).
- [ ] Testar clique nas ofertas → abre a Sympla com UTMs na URL.
