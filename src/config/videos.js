// =============================================================================
// NEXUS — CONFIGURAÇÃO DA GALERIA DE VÍDEOS (fonte única de verdade)
// -----------------------------------------------------------------------------
// Repositório onde os participantes assistem e baixam os clipes do evento para
// usar nas redes sociais. Ajuste aqui sem mexer na página.
// =============================================================================

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

export const VIDEOS = {
  // Liga/desliga a galeria no site.
  ativo: true,

  // Caminho do manifesto (gerado por scripts/generate-manifest.mjs).
  manifest: '/videos-manifest.json',

  // Base pública dos arquivos no R2 (ou domínio de mídia). Ex.:
  //   https://videos.siganexus.com.br
  // Enquanto a migração para o R2 não roda, a galeria opera em modo "drive"
  // (definido pelo campo "source" do manifesto) e este valor é ignorado.
  base: (env.VITE_VIDEOS_BASE || '').replace(/\/$/, ''),

  // Estrutura de pastas no R2 (usada quando source = 'r2').
  paths: {
    mp4: 'mp4',      // {base}/mp4/{id}.mp4     — vídeo web (H.264)
    thumb: 'thumb',  // {base}/thumb/{id}.jpg   — poster
    preview: 'preview', // {base}/preview/{id}.mp4 — clipe curto mudo p/ hover (opcional)
  },

  // Gate de contato antes de baixar (alimenta a base comercial pós-evento).
  gate: {
    ativo: true,
    // Reexibe o formulário a cada N dias (0 = só uma vez por navegador).
    revalidarDias: 0,
  },

  // Quantos itens carregar por vez (rolagem infinita).
  pageSize: 24,

  // Texto do topo da página.
  titulo: 'Galeria do NEXUS',
  subtitulo:
    'Reviva o evento e baixe seus momentos. Role a galeria, encontre você e ' +
    'seus contatos, e compartilhe nas suas redes marcando @siganexus.',
};

export default VIDEOS;
