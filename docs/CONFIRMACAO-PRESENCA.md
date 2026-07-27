# NEXUS — Confirmação de presença (Google Forms + e-mail)

## Opção A (rápida): criar o Google Forms por script
1. Acesse https://script.google.com → **Novo projeto**.
2. Apague o conteúdo e cole o código abaixo.
3. Clique em **Executar** (Run). Autorize com sua conta Google na primeira vez.
4. Abra os **Registros/Logs** (menu Execução → ver logs, ou Ctrl+Enter): ali aparecem
   a **URL para responder** (a que você envia por e-mail) e a **URL de edição**.

```javascript
function criarFormularioNexus() {
  var form = FormApp.create('NEXUS — Confirmação de Presença')
    .setDescription('Sua presença é parte essencial da experiência. Confirme abaixo para deixarmos tudo pronto para você: conexões, conteúdo e o happy hour. 23 de julho, a partir das 16h30, no Ninna Hub — Fortaleza.')
    .setConfirmationMessage('Presença confirmada! Nos vemos no NEXUS. 🍷')
    .setCollectEmail(false);

  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('E-mail').setRequired(true);
  form.addTextItem().setTitle('WhatsApp (com DDD)').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você confirma sua presença no NEXUS?')
    .setChoiceValues([
      'Sim, confirmo minha presença!',
      'Ainda não tenho certeza',
      'Infelizmente não poderei ir'
    ])
    .setRequired(true);

  Logger.log('URL para responder (enviar por e-mail): ' + form.getPublishedUrl());
  Logger.log('URL de edição: ' + form.getEditUrl());
}
```

## Opção B (manual): montar o formulário no Google Forms
Título: **NEXUS — Confirmação de Presença**
Descrição: "Sua presença é parte essencial da experiência. Confirme abaixo… 23 de julho, 16h30, Ninna Hub — Fortaleza."
Perguntas:
1. Nome completo — resposta curta — obrigatória
2. E-mail — resposta curta — obrigatória
3. WhatsApp (com DDD) — resposta curta — obrigatória
4. Você confirma sua presença no NEXUS? — múltipla escolha — obrigatória
   - Sim, confirmo minha presença!
   - Ainda não tenho certeza
   - Infelizmente não poderei ir
Dica: em Configurações, ative "Coletar e-mails" se quiser identificar por conta Google,
e em "Respostas" vincule a uma planilha para acompanhar as confirmações em tempo real.

---

## E-mail de acompanhamento

**Assunto (escolha um):**
- Sua vaga no NEXUS está garantida — confirme sua presença 🍷
- Falta pouco para o NEXUS. Confirme sua presença
- Nos vemos no NEXUS? Confirme em 30 segundos

**Corpo:**

Olá, {{nome}}!

Falta pouco para o NEXUS — Conexão de Verdade, e a sua presença é parte do que torna essa noite única.

No dia 23 de julho, a partir das 16h30, no Ninna Hub, você vai estar em uma sala de empresários, líderes e profissionais reunidos com um propósito claro: sair com conexões reais — e não com uma pilha de cartões esquecidos. Serão conversas com contexto, momentos pensados para aproximar as pessoas certas e oportunidades que raramente acontecem por acaso.

E, para fechar a noite no tom certo, preparamos um happy hour de alto refino: vinhos selecionados e finger foods, no ambiente ideal para as melhores conversas acontecerem sem pressa.

Cada lugar nessa sala importa — inclusive o seu. Por isso, pedimos só 30 segundos para confirmar sua presença:

👉 Confirmar minha presença: {{link_do_formulario}}

📅 23 de julho · 16h30 às 22h
📍 Ninna Hub — Av. Dom Manuel, 1020, Fortaleza/CE

Chegue com um pouco de folga para aproveitar a experiência desde o início. Nos vemos lá.

Um abraço,
Equipe NEXUS
