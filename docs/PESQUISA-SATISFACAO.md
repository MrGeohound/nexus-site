# NEXUS — Pesquisa de satisfação (QR Code → prova social)

Objetivo duplo: (1) medir a satisfação do evento e (2) capturar depoimentos REAIS,
com autorização, que possam virar prova social nas próximas edições.
Regra de ouro: só publicamos depoimento com consentimento explícito (LGPD). Nada inventado.

---

## 1. O questionário (pronto para usar)
Curto de propósito (≈2 min) — o participante responde na saída, no celular.

1. De 0 a 10, o quanto você recomendaria o NEXUS a um colega ou parceiro? (0–10) → NPS
2. O que mais te marcou hoje? (múltipla escolha)
   - Conteúdo / palestras
   - Conexões e networking
   - Ambiente e experiência
   - Happy hour (vinhos e finger foods)
   - Organização
3. Você fez alguma conexão relevante hoje? (Sim / Ainda é cedo / Não)
4. Em uma frase, como você descreveria sua experiência no NEXUS? (texto aberto) → DEPOIMENTO
5. Seu nome e empresa/cargo (para creditar o depoimento)
6. Instagram e/ou LinkedIn (opcional — para marcar você na divulgação)
7. [ ] Autorizo o NEXUS a divulgar meu depoimento, nome e empresa em materiais de
   divulgação de futuras edições (site, redes e anúncios). → CONSENTIMENTO (obrigatório p/ publicar)
8. [ ] Autorizo o uso da minha foto/imagem, caso registrada no evento. (opcional)
9. O que podemos melhorar para a próxima edição? (texto aberto — uso interno)
10. Quer ser avisado da próxima edição? (Sim, entrar na lista de espera / Não) → alimenta o pós-evento

Dica: perguntas 1–3 dão métrica; 4–6 geram o depoimento; 7–8 destravam a publicação;
9–10 alimentam melhoria e a base comercial para a próxima edição.

---

## 2. Opções GRATUITAS
### A) Google Forms (recomendada no gratuito)
- Custo: R$0, respostas ilimitadas. Respostas caem numa planilha Google (fácil de curar).
- Prós: rápido de montar, confiável, exporta CSV.
- Contras: visual simples, sem sua identidade; curadoria dos depoimentos é manual.
- Setup: crie o formulário com as perguntas acima → botão "Enviar" → aba do link →
  ative "encurtar URL" → gere o QR (ver seção 4).

### B) Tally.so (gratuito e mais bonito)
- Custo: plano gratuito generoso (formulários e respostas ilimitados no essencial).
- Prós: visual mais moderno que o Forms, campos condicionais, dá para usar suas cores.
- Contras: recursos avançados e remoção de marca são pagos.

> As duas atendem bem. Se a prioridade é simplicidade + planilha, use Google Forms.
> Se quer algo mais bonito sem pagar, use Tally.

---

## 3. Opções PREMIUM
### A) Typeform (pago) — a experiência mais "conversacional"
- Prós: uma pergunta por vez, altíssima taxa de conclusão, lógica e design lindos.
- Contras: mensalidade e limite de respostas por plano; dados ficam num SaaS.

### B) SurveyMonkey (pago) — clássico corporativo
- Prós: relatórios e análises robustos.
- Contras: caro, visual datado, menos flexível para virar prova social.

### C) ⭐ Página própria no site: /avaliacao (RECOMENDADA como premium)
Em vez de pagar SaaS, criamos uma página de avaliação no próprio siganexus.com.br,
com a identidade do NEXUS, salvando as respostas no seu backend (o mesmo padrão de
leads/onboarding já existente, ou Supabase).
- Prós:
  - Identidade visual 100% NEXUS; experiência mobile impecável no QR.
  - Dados são SEUS (sem limite de respostas, sem mensalidade).
  - Já integra com o funil/analytics (evento "survey_complete", UTMs, NPS).
  - Vira prova social AUTOMATICAMENTE: depoimentos com consentimento aprovado
    alimentam a seção de prova social da landing (via config/tabela), sem retrabalho.
  - Fluxo de curadoria: você aprova quais depoimentos entram no ar.
- Contras: precisa ser construído uma vez (eu implemento) — reaproveita o que já existe.
- Custo: R$0 recorrente (usa Cloudflare + backend que você já tem/monta).

> Recomendação: para ESTA edição, rode o gratuito (Google Forms/Tally) se faltar tempo;
> mas o melhor custo-benefício de longo prazo é a página /avaliacao própria — posso
> construí-la já alinhada ao funil e à prova social.

---

## 4. QR Code — como gerar e onde usar
### Gerar (grátis)
- Gerador online: qualquer um confiável (ex.: o próprio gerador do encurtador, ou sites de QR).
- Ou eu gero para você em alta resolução, nas cores do NEXUS (petróleo/dourado),
  em PNG e SVG, assim que o link final existir. É só me passar a URL.
- Use um link com UTM para o site captar a origem:
  `?utm_source=evento&utm_medium=qr&utm_campaign=pesquisa_satisfacao`

### Onde espalhar no dia
- Mesas / totens de mesa e no crachá.
- Telão no encerramento ("Avalie e concorra/participe da próxima").
- Banner na saída (momento ideal: experiência fresca).
- E-mail e WhatsApp pós-evento (reforço para quem não respondeu na hora).

### Como aumentar a taxa de resposta
- Peça a avaliação no palco, no encerramento, enquanto o happy hour rola.
- Ofereça um incentivo real (ex.: prioridade/condição na próxima edição) — sem prometer nada falso.
- Deixe curto: os 3 primeiros campos já entregam a métrica principal.

---

## 5. De resposta a PROVA SOCIAL (pipeline)
1. Coleta: pergunta 4 (frase) + 5 (nome/empresa) + 7 (consentimento) = depoimento publicável.
2. Curadoria: selecione depoimentos com nota alta E consentimento marcado.
3. Publicação (somente consentidos):
   - Seção "prova social" da landing (já há estrutura no site).
   - Criativos de anúncio, stories e página da próxima edição.
   - Formato: frase + nome + empresa (+ foto, se autorizada na pergunta 8).
4. Métrica: acompanhe o NPS por edição (média das notas 0–10) para mostrar evolução.
5. Técnico (se usar a página própria): uma fonte única (config `testimonials` ou tabela)
   com um campo "aprovado" — só entradas aprovadas e consentidas aparecem no site.

> Importante (LGPD + regra do projeto): nunca publique depoimento sem o consentimento
> da pergunta 7. Sem autorização, a resposta serve só para métrica e melhoria interna.

---

## 6. IMPLEMENTADO no site (página própria — opção premium)
- Página: **/avaliacao** (`src/pages/Avaliacao.jsx`) — questionário completo, identidade NEXUS, mobile-first (ideal para QR). Dispara `survey_start` e `survey_complete` (com NPS) no analytics.
- Backend: **`functions/api/survey.js`** (Cloudflare Pages Function) grava as respostas no KV `NEXUS_KV` (o mesmo já configurado). Envio via `src/lib/survey.js` (com fallback local).
- QR Code pronto: **`public/assets/qr-avaliacao.png`** (nas cores do NEXUS) apontando para
  `https://siganexus.com.br/avaliacao?utm_source=evento&utm_medium=qr&utm_campaign=pesquisa_satisfacao`.

### Como ver / exportar as respostas (curadoria)
Abra no navegador (usa o mesmo WEBHOOK_SECRET já cadastrado no Cloudflare):
- JSON + NPS calculado: `https://siganexus.com.br/api/survey?secret=SEU_WEBHOOK_SECRET`
- CSV (planilha):        `https://siganexus.com.br/api/survey?secret=SEU_WEBHOOK_SECRET&format=csv`

### Transformar em prova social (site)
1. Nas respostas, filtre as que têm `consentDepoimento: true` e nota alta.
2. Cole as aprovadas em **`src/config/testimonials.js`** (texto, nome, empresa).
3. O componente **`src/components/Depoimentos.jsx`** exibe automaticamente. Para colocá-lo
   na landing, adicione `<Depoimentos />` no `Home.jsx` (ex.: perto da prova social).
   Enquanto a lista estiver vazia, ele não renderiza nada (nunca mostra depoimento falso).

### Publicar
Faça commit e push na branch main — o Cloudflare publica sozinho:
```
git add -A && git commit -m "feat: pesquisa de satisfacao /avaliacao + prova social" && git push
```
