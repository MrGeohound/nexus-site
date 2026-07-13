// =============================================================================
// NEXUS — OFERTAS / INGRESSOS (fonte única de verdade)
// -----------------------------------------------------------------------------
// Preços e links de checkout centralizados. Os valores abaixo foram
// VALIDADOS no projeto atual (Pricing.jsx): individual R$247, duplo R$199/pessoa.
// Ajuste aqui caso a Sympla mude os valores ou os links.
// =============================================================================

// Link base do checkout na Sympla (validado no código atual).
// Obs.: a Sympla também aceita a variação com hífen duplo; este é o link vigente.
export const SYMPLA_BASE =
  'https://www.sympla.com.br/evento/nexus-conexao-de-verdade/3454239';

export const CURRENCY = 'BRL';

export const OFFERS = [
  {
    id: 'individual',
    nome: 'Ingresso Individual',
    // Preço "cheio" apenas para ancoragem visual (riscado). Deixe null p/ ocultar.
    precoDe: 600,
    preco: 247,
    unidade: null, // sem "/cada"
    pessoas: 1,
    destaque: false,
    selo: null,
    // Link específico. Se a Sympla tiver ticket_id por categoria, coloque aqui.
    checkoutUrl: SYMPLA_BASE,
    beneficios: [
      'Acesso ao evento',
      'Palestras e conteúdo empresarial',
      'Atividades de conexão e networking guiado',
      'Happy hour com vinho',
      'Finger foods',
    ],
  },
  {
    id: 'duplo',
    nome: 'Passaporte Duplo+',
    precoDe: 600,
    preco: 199,
    unidade: '/cada',
    pessoas: 2,
    destaque: true,
    selo: 'Mais Vantajoso',
    checkoutUrl: SYMPLA_BASE,
    beneficios: [
      'Tudo do ingresso individual',
      'Traga seu sócio ou parceiro',
      'Maior economia por pessoa',
      'Expansão dobrada de networking',
    ],
  },
];

export const getOffer = (id) => OFFERS.find((o) => o.id === id) || null;

// Valor cheio de referência (para "De R$ ...").
export const precoDeReferencia = 600;

export default OFFERS;
