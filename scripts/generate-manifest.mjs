#!/usr/bin/env node
// =============================================================================
// NEXUS — Gerador do manifesto da Galeria de vídeos
// -----------------------------------------------------------------------------
// Lê uma listagem de arquivos (do Google Drive via `rclone lsjson`, ou o JSON
// exportado da pasta) e produz public/videos-manifest.json, consumido pela
// página /galeria.
//
// Uso:
//   node scripts/generate-manifest.mjs --in listing.json --source drive
//   node scripts/generate-manifest.mjs --in listing.json --source r2
//
// Formatos de entrada aceitos (auto-detectados):
//   1) rclone lsjson:      [{ "Name":"NEXUS_2307_00605595.mov","Size":123,"ID":"1abc..." }]
//   2) Drive MCP/API:      [{ "title":"...","fileSize":"123","id":"1abc..." }] ou { "files":[...] }
//
// O manifesto guarda apenas dados neutros (id do clipe, driveId, tamanho).
// As URLs finais (poster, mp4, download) são montadas em runtime por
// src/lib/videos.js a partir de VITE_VIDEOS_BASE — assim dá para trocar de
// Drive (ponte) para R2 (final) sem regerar nada além do "source".
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const inPath = arg('in');
const source = (arg('source', 'drive') || 'drive').toLowerCase(); // 'drive' | 'r2'
const outPath = arg('out', resolve(ROOT, 'public', 'videos-manifest.json'));

if (!inPath) {
  console.error('Erro: informe --in <arquivo.json> (rclone lsjson ou export do Drive).');
  process.exit(1);
}

// Aceita apenas clipes curtos do evento: NEXUS_2307_<numero>.mov
// (exclui o master "NEXUS - 23-07.mov" e outros arquivos não-clipe).
const CLIP_RE = /^NEXUS[_ ]?2307[_ ]?(\d{4,})\.(mov|mp4|m4v)$/i;

function normalizeEntry(raw) {
  const title = raw.Name || raw.name || raw.title || raw.Path || '';
  const driveId = raw.ID || raw.id || raw.fileId || '';
  const size = Number(raw.Size ?? raw.fileSize ?? raw.size ?? 0);
  return { title, driveId, size };
}

function loadListing(file) {
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  const list = Array.isArray(parsed) ? parsed : parsed.files || parsed.items || [];
  return list.map(normalizeEntry);
}

const entries = loadListing(inPath);

const clips = [];
const seen = new Set();
for (const e of entries) {
  const m = CLIP_RE.exec(e.title || '');
  if (!m) continue;               // ignora master e não-clipes
  const id = m[1];                // ex.: "00605595"
  if (seen.has(id)) continue;     // dedupe
  seen.add(id);
  clips.push({ id, driveId: e.driveId, sizeBytes: e.size || 0 });
}

// Ordem cronológica de captura = ordem crescente do contador do arquivo.
clips.sort((a, b) => Number(a.id) - Number(b.id));
clips.forEach((c, i) => { c.seq = i + 1; });

const manifest = {
  event: 'NEXUS — Conexão de Verdade',
  generatedAt: new Date().toISOString(),
  source,                          // 'drive' (ponte) | 'r2' (final)
  count: clips.length,
  videos: clips,
};

writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(`OK: ${clips.length} clipes -> ${outPath} (source=${source})`);
