// =============================================================================
// NEXUS — Camada de dados da Galeria de vídeos
// -----------------------------------------------------------------------------
// - Carrega o manifesto (public/videos-manifest.json).
// - Monta as URLs de poster / streaming / download conforme a fonte:
//     source = 'r2'    -> arquivos MP4/JPG no bucket (VITE_VIDEOS_BASE).
//     source = 'drive' -> ponte temporária usando o Google Drive.
// - Controla o "gate" de contato (guardado no localStorage).
// =============================================================================

import { VIDEOS } from '../config/videos.js';

const GATE_KEY = 'nexus_galeria_gate';

let _cache = null;

export async function loadManifest() {
  if (_cache) return _cache;
  const res = await fetch(VIDEOS.manifest, { cache: 'no-cache' });
  if (!res.ok) throw new Error('manifest_http_' + res.status);
  const data = await res.json();

  // Vídeos recebem type 'video'.
  const videos = (data.videos || []).map((v) => ({ ...v, type: v.type || 'video' }));

  // Fotos (opcional): manifesto separado. Entram no início da galeria.
  let fotos = [];
  if (VIDEOS.photosManifest) {
    try {
      const pr = await fetch(VIDEOS.photosManifest, { cache: 'no-cache' });
      if (pr.ok) {
        const pd = await pr.json();
        fotos = (pd.items || pd.videos || []).map((p) => ({ ...p, type: 'photo' }));
      }
    } catch { /* sem fotos, segue só com vídeos */ }
  }

  _cache = { ...data, videos: [...fotos, ...videos], count: fotos.length + videos.length };
  return _cache;
}

// --- Montagem de URLs --------------------------------------------------------
function r2(base, folder, file) {
  return `${base}/${folder}/${file}`;
}

/**
 * Resolve as URLs de um clipe conforme a fonte do manifesto.
 * Retorna { poster, stream, download, embed, kind } onde kind é 'video' | 'iframe'.
 */
export function resolveUrls(video, source) {
  const src = source || 'drive';

  // Fotos: sempre servidas do R2 (imagem web + miniatura).
  if (video.type === 'photo') {
    const base = VIDEOS.base;
    const full = r2(base, VIDEOS.paths.photo, `${video.id}.jpg`);
    return {
      kind: 'image',
      poster: r2(base, VIDEOS.paths.thumb, `${video.id}.jpg`),
      stream: full,
      preview: '',
      download: full,
      embed: '',
    };
  }

  if (src === 'r2') {
    const base = VIDEOS.base;
    return {
      kind: 'video',
      poster: r2(base, VIDEOS.paths.thumb, `${video.id}.jpg`),
      stream: r2(base, VIDEOS.paths.mp4, `${video.id}.mp4`),
      // preview curto mudo p/ hover; se não existir, o front usa o poster.
      preview: r2(base, VIDEOS.paths.preview, `${video.id}.mp4`),
      download: r2(base, VIDEOS.paths.mp4, `${video.id}.mp4`),
      embed: '',
    };
  }

  // --- Ponte Google Drive ----------------------------------------------------
  const gid = video.driveId;
  return {
    kind: 'iframe',
    poster: `https://drive.google.com/thumbnail?id=${gid}&sz=w800`,
    stream: '', // Drive não toca em <video>; usamos o embed (iframe).
    preview: '',
    embed: `https://drive.google.com/file/d/${gid}/preview`,
    download: `https://drive.usercontent.google.com/download?id=${gid}&export=download`,
  };
}

// --- Gate de contato ---------------------------------------------------------
export function getGate() {
  try {
    const raw = window.localStorage.getItem(GATE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const dias = VIDEOS.gate.revalidarDias;
    if (dias > 0 && data.ts) {
      const idadeDias = (Date.now() - new Date(data.ts).getTime()) / 86_400_000;
      if (idadeDias > dias) return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function saveGate(data) {
  try {
    window.localStorage.setItem(
      GATE_KEY,
      JSON.stringify({ ...data, ts: new Date().toISOString() }),
    );
  } catch {
    /* ignora */
  }
}

export function gateLiberado() {
  if (!VIDEOS.gate.ativo) return true;
  return !!getGate();
}

export default { loadManifest, resolveUrls, getGate, saveGate, gateLiberado };
