// =============================================================================
// Depoimentos (prova social) — SOMENTE respostas REAIS, com consentimento.
// -----------------------------------------------------------------------------
// Fluxo: colete as avaliações em /avaliacao -> exporte em
//   https://siganexus.com.br/api/survey?secret=SEU_WEBHOOK_SECRET  (ou &format=csv)
// -> selecione as que têm "consentDepoimento": true e nota alta
// -> cole aqui as aprovadas. Nunca publique sem consentimento (LGPD).
// =============================================================================

export const TESTIMONIALS = [
  // Exemplo do formato (REMOVA — não publique nada inventado):
  // {
  //   texto: 'Saí com 3 conversas que já viraram reunião.',
  //   nome: 'Fulano de Tal',
  //   empresa: 'Empresa X',
  //   foto: '', // opcional, só se consentFoto = true
  // },
];

export default TESTIMONIALS;
