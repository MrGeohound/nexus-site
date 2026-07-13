// =============================================================================
// NEXUS — CONFIGURAÇÃO DE SITE, CONTATOS, ORGANIZADORES E INTEGRAÇÕES
// -----------------------------------------------------------------------------
// IDs de analytics e endpoints vêm de variáveis de ambiente (import.meta.env).
// Nunca commite credenciais. Veja .env.example e docs/VARIAVEIS-AMBIENTE.md.
// Todos os IDs são opcionais: o site funciona sem nenhum provedor configurado.
// =============================================================================

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

// --- Contato / WhatsApp ------------------------------------------------------
// Número no formato internacional, apenas dígitos (ex.: 5585999999999).
export const CONTACT = {
  whatsappNumero: env.VITE_WHATSAPP_NUMERO || '', // >>> preencha com o número oficial
  email: env.VITE_CONTATO_EMAIL || 'contato@siganexus.com.br',
};

// --- Redes sociais -----------------------------------------------------------
export const SOCIAL = {
  instagram: env.VITE_INSTAGRAM_URL || 'https://instagram.com/siganexus',
  linkedin: env.VITE_LINKEDIN_URL || '',
};

// --- Organizadores -----------------------------------------------------------
// Não invente cargos/credenciais. Ajuste com as informações oficiais.
export const ORGANIZADORES = [
  {
    nome: 'Anderson Caruso',
    atuacao: 'Idealizador do NEXUS',
    credencial: '',
    papel: 'Co-organização e curadoria de conexões.',
    foto: '/assets/speakers/anderson-caruso.png',
  },
  {
    nome: 'Ana Amélia Rodrigues',
    atuacao: 'Co-organizadora',
    credencial: '',
    papel: 'Experiência e relacionamento com participantes.',
    foto: '/assets/speakers/ana-amelia.png',
  },
  {
    nome: 'Gabriela Ramos',
    atuacao: 'Co-organizadora',
    credencial: '',
    papel: 'Conteúdo e curadoria do evento.',
    foto: '/assets/speakers/gabi.png',
  },
];

// --- Analytics / Pixel (opcionais, via env) ---------------------------------
export const ANALYTICS = {
  ga4Id: env.VITE_GA4_ID || '',        // ex.: G-XXXXXXX
  gtmId: env.VITE_GTM_ID || '',        // ex.: GTM-XXXXX
  metaPixelId: env.VITE_META_PIXEL_ID || '1706951560594723', // Meta Pixel NEXUS
  // Debug no console em desenvolvimento.
  debug: !!env.DEV,
};

// --- Backend de leads/onboarding (opcional) ---------------------------------
// Endpoint que recebe os POSTs de lead e onboarding. Sem endpoint, os dados
// são apenas rastreados via analytics e guardados localmente (fallback).
export const LEADS = {
  endpoint: env.VITE_LEADS_ENDPOINT || '',       // ex.: https://api.exemplo.com/leads
  onboardingEndpoint: env.VITE_ONBOARDING_ENDPOINT || '',
};

// --- Flags de recurso --------------------------------------------------------
export const FEATURES = {
  stickyCtaMobile: true,
  leadCapture: true,
  consentBanner: true,
};

export default { CONTACT, SOCIAL, ORGANIZADORES, ANALYTICS, LEADS, FEATURES };
