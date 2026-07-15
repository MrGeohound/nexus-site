// =============================================================================
// NEXUS — OFERTAS / INGRESSOS (fonte única de verdade)
// -----------------------------------------------------------------------------
// Preços e links de checkout centralizados. O preço principal é o valor com o
// cupom SOCIAL (50% OFF); "precoDe" guarda o preço regular exibido riscado.
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
    precoDe: 247,
    preco: 123.5,
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
    precoDe: 199,
    preco: 99.5,
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

// Menor preço promocional por participante.
export const precoDeReferencia = 99.5;

export default OFFERS;
