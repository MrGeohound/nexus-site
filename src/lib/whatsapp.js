// =============================================================================
// WhatsApp helpers
// =============================================================================
import { CONTACT } from '../config/site.js';

// Monta um link wa.me com mensagem pré-preenchida.
export function waLink(mensagem = '', numero = CONTACT.whatsappNumero) {
  const texto = encodeURIComponent(mensagem);
  if (numero) return `https://wa.me/${numero}?text=${texto}`;
  // Sem número configurado: abre o compositor para o usuário escolher o contato.
  return `https://wa.me/?text=${texto}`;
}

// Mensagem sugerida de indicação (compartilhamento).
export const MSG_INDICACAO =
  'Vou participar do NEXUS — Conexão de Verdade, no dia 23 de julho, no Ninna Hub (Fortaleza). ' +
  'A proposta é criar conexões mais intencionais entre empresários, líderes e profissionais. ' +
  'Acho que faz sentido você estar lá também. Detalhes: https://www.siganexus.com.br';

// Mensagem para quem quer tirar dúvidas antes de comprar.
export const MSG_DUVIDA =
  'Olá! Quero entender melhor como funciona o NEXUS — Conexão de Verdade antes de garantir minha vaga.';

export default { waLink, MSG_INDICACAO, MSG_DUVIDA };
