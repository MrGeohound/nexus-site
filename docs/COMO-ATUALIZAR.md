# Como atualizar (vagas, preços, links, lote, organizadores)

> Tudo abaixo se edita em **um lugar só**: a pasta `src/config/`.
> Depois de editar, rode `npm run build` e publique o conteúdo de `dist/`.

## Vagas preenchidas (escassez real)
Arquivo: `src/config/event.js` → `EVENT.vagas`
```js
vagas: {
  total: 80,
  preenchidas: 58,   // << ATUALIZE com o número REAL de vendas
  exibir: true,      // false para esconder a contagem
}
```
A landing mostra automaticamente "58 de 80 vagas preenchidas", a barra e "Restam N".
**Não coloque número falso** — a escassez deve ser verdadeira.

## Preços e links de compra
Arquivo: `src/config/offers.js`
```js
preco: 247,          // ingresso individual
preco: 199,          // passe duplo (por pessoa)
checkoutUrl: SYMPLA_BASE,   // link da Sympla (ou link por categoria)
```
Se a Sympla fornecer um link por categoria de ingresso, troque o `checkoutUrl` de cada oferta.

## Data, horário e local
Arquivo: `src/config/event.js` → `EVENT.dataInicioISO`, `dataFimISO`, `dataExtenso`,
`horario`, `local`. O countdown e o schema.org usam esses campos.

## Lote (aviso real de virada)
Arquivo: `src/config/event.js` → `EVENT.lote`
```js
lote: { nome: '1º Lote', mudaEmISO: '2026-07-16T23:59:59', aviso: 'Preços sobem na virada.' }
```
Deixe `mudaEmISO` vazio para não exibir aviso.

## Organizadores
Arquivo: `src/config/site.js` → `ORGANIZADORES` (nome, atuação, credencial, papel, foto).
Fotos já apontam para `/assets/speakers/`. Não invente cargos/credenciais.

## Contato, WhatsApp e redes
Preferencialmente via `.env` (ver `docs/VARIAVEIS-AMBIENTE.md`) ou direto em `src/config/site.js`.
