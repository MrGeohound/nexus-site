// =============================================================================
// NEXUS — CONFIGURAÇÃO CENTRAL DO EVENTO (fonte única de verdade)
// -----------------------------------------------------------------------------
// Edite SOMENTE este arquivo para atualizar data, local, vagas e lote.
// Não repita esses valores em componentes. Importe de "@config" (src/config).
// =============================================================================

export const EVENT = {
  nome: 'NEXUS — Conexão de Verdade',
  nomeCurto: 'NEXUS',
  tagline: 'Conexão de Verdade',

  // --- Data e horário -------------------------------------------------------
  // ISO local (sem timezone) usado pelo countdown e pelo schema.org
  dataInicioISO: '2026-07-23T16:30:00',
  dataFimISO: '2026-07-23T22:00:00',
  dataExtenso: '23 de julho de 2026',
  diaSemana: 'quinta-feira',
  horario: '16h30 às 22h',
  timezone: 'America/Fortaleza',

  // --- Local ----------------------------------------------------------------
  local: {
    nome: 'Ninna Hub',
    endereco: 'Avenida Dom Manuel, 1020',
    cidade: 'Fortaleza',
    estado: 'CE',
    cep: '',
    pais: 'BR',
    // Usado no botão "Ver localização" e no schema.org
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ninna+Hub+Avenida+Dom+Manuel+1020+Fortaleza',
  },

  // --- Escassez (VERDADEIRA e configurável) ---------------------------------
  // ATENÇÃO: mantenha estes números fiéis à realidade. Não invente escassez.
  // Basta atualizar "vagasPreenchidas" conforme as vendas na Sympla.
  vagas: {
    total: 80,
    // >>> ATUALIZE AQUI o número REAL de vagas já preenchidas <<<
    preenchidas: 58,
    // Exibe a barra/contagem de vagas somente quando "true".
    exibir: true,
  },

  // --- Lote atual (opcional) ------------------------------------------------
  // Preencha "mudaEm" (ISO) para exibir aviso real de virada de lote.
  lote: {
    nome: '1º Lote',
    mudaEmISO: '', // ex.: '2026-07-16T23:59:59' — vazio = sem aviso
    aviso: 'Preços sobem na virada do lote.',
  },

  // --- URL canônica ---------------------------------------------------------
  siteUrl: 'https://www.siganexus.com.br',
  ogImage: '/assets/nexus-share.png',
};

// Vagas restantes derivadas (nunca negativas).
export const vagasRestantes = () =>
  Math.max(0, EVENT.vagas.total - EVENT.vagas.preenchidas);

// Percentual preenchido (0–100) para barras de progresso.
export const vagasPercent = () =>
  EVENT.vagas.total > 0
    ? Math.min(100, Math.round((EVENT.vagas.preenchidas / EVENT.vagas.total) * 100))
    : 0;

export default EVENT;
