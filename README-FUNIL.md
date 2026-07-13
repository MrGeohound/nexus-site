# NEXUS — Funil de conversão (guia rápido)

Landing de alta conversão + funil completo (aquisição → checkout → recuperação →
onboarding → indicação → pós-evento) sobre o projeto React/Vite existente.

## Rodar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção -> dist/
```

## Onde mexer (config central)
`src/config/event.js` (vagas, data, local, lote) · `src/config/offers.js` (preços/links) ·
`src/config/site.js` (organizadores, contatos, IDs). Ver `docs/COMO-ATUALIZAR.md`.

## Documentação (`docs/`)
- `AUDITORIA.md` — estado inicial do projeto.
- `IMPLEMENTACAO.md` — arquivos criados/alterados e decisões.
- `COMO-ATUALIZAR.md` — vagas, preços, links, lote, organizadores.
- `VARIAVEIS-AMBIENTE.md` — `.env` (GA4/Pixel/WhatsApp/leads).
- `INTEGRACOES-PENDENTES.md` — Purchase/CAPI/CRM/e-mail a conectar.
- `PLANO-ANALYTICS.md` — eventos e parâmetros.
- `CHECKLIST-PUBLICACAO.md` / `CHECKLIST-TESTES.md`.
- `comunicacao/` — templates da jornada pré/pós-evento.

## Rotas
`/` landing · `/obrigado` onboarding · `/indique` indicação · `/privacidade` LGPD.
