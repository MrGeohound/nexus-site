#!/usr/bin/env bash
# =============================================================================
# NEXUS — Pipeline de migração dos vídeos: Google Drive -> MP4 web -> R2
# -----------------------------------------------------------------------------
# Baixa os 258 clipes do Drive, converte .mov -> .mp4 (H.264, pronto p/ web),
# gera thumbnails (e previews opcionais) e envia tudo para um bucket R2.
# Ao final, regenera o public/videos-manifest.json com source=r2.
#
# PRÉ-REQUISITOS (instale uma vez):
#   - ffmpeg        (conversão de vídeo)
#   - rclone        (https://rclone.org) com 2 remotes configurados:
#       * um remote do tipo "drive"  (ex.: gdrive)
#       * um remote do tipo "s3" apontando para o Cloudflare R2 (ex.: r2)
#   - node          (para gerar o manifesto)
#
# CONFIGURAR rclone R2 (uma vez):
#   rclone config
#     name> r2
#     Storage> s3   |  provider> Cloudflare
#     access_key_id / secret_access_key  -> criados em R2 > Manage API Tokens
#     endpoint> https://<ACCOUNT_ID>.r2.cloudflarestorage.com
#
# USO:
#   export GDRIVE_REMOTE=gdrive
#   export GDRIVE_FOLDER_ID=1BtyhAoeUPpLOTyT88TWqx5YjXCsSE_YX
#   export R2_REMOTE=r2
#   export R2_BUCKET=nexus-videos
#   bash scripts/process-videos.sh            # roda tudo
#   bash scripts/process-videos.sh transcode  # só converte (etapa isolada)
#
# Etapas: pull | transcode | upload | manifest  (sem argumento = todas).
# É idempotente: pula arquivos já convertidos/enviados.
# =============================================================================
set -euo pipefail

GDRIVE_REMOTE="${GDRIVE_REMOTE:-gdrive}"
GDRIVE_FOLDER_ID="${GDRIVE_FOLDER_ID:-1BtyhAoeUPpLOTyT88TWqx5YjXCsSE_YX}"
R2_REMOTE="${R2_REMOTE:-r2}"
R2_BUCKET="${R2_BUCKET:-nexus-videos}"
MAKE_PREVIEW="${MAKE_PREVIEW:-0}"      # 1 = gera preview mudo p/ hover

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$ROOT/work"
MOV="$WORK/mov"; MP4="$WORK/mp4"; THUMB="$WORK/thumb"; PREVIEW="$WORK/preview"
mkdir -p "$MOV" "$MP4" "$THUMB" "$PREVIEW"

STEP="${1:-all}"

# Extrai o número do clipe do nome NEXUS_2307_<numero>.mov -> <numero>
clip_id() { basename "$1" | sed -nE 's/^NEXUS[_ ]?2307[_ ]?([0-9]{4,})\.[A-Za-z0-9]+$/\1/p'; }

pull() {
  echo ">> [1/4] Baixando clipes do Drive (folder $GDRIVE_FOLDER_ID)..."
  # Só arquivos de vídeo do padrão do evento; ignora o master longo.
  rclone copy "$GDRIVE_REMOTE:" "$MOV" \
    --drive-root-folder-id "$GDRIVE_FOLDER_ID" \
    --include "NEXUS_2307_*.mov" \
    --transfers 4 --progress
  echo "   $(ls "$MOV" | wc -l) arquivos em $MOV"
}

transcode() {
  echo ">> [2/4] Convertendo .mov -> .mp4 web + thumbnails..."
  shopt -s nullglob
  local n=0
  for src in "$MOV"/NEXUS_2307_*.mov; do
    id="$(clip_id "$src")"; [ -z "$id" ] && continue
    out="$MP4/$id.mp4"; thumb="$THUMB/$id.jpg"
    if [ ! -f "$out" ]; then
      # H.264 web: mantém proporção, no máx. 1280px na maior dimensão, +faststart.
      ffmpeg -hide_banner -loglevel error -y -i "$src" \
        -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'" \
        -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p \
        -c:a aac -b:a 128k -movflags +faststart "$out"
    fi
    if [ ! -f "$thumb" ]; then
      ffmpeg -hide_banner -loglevel error -y -ss 00:00:01 -i "$src" \
        -frames:v 1 -vf "scale='if(gt(iw,ih),min(800,iw),-2)':'if(gt(iw,ih),-2,min(800,ih))'" "$thumb"
    fi
    if [ "$MAKE_PREVIEW" = "1" ] && [ ! -f "$PREVIEW/$id.mp4" ]; then
      ffmpeg -hide_banner -loglevel error -y -ss 00:00:01 -t 3 -i "$src" \
        -an -vf "scale=-2:640" -c:v libx264 -preset veryfast -crf 28 \
        -pix_fmt yuv420p -movflags +faststart "$PREVIEW/$id.mp4"
    fi
    n=$((n+1)); printf "\r   %d convertidos" "$n"
  done
  echo ""
}

upload() {
  echo ">> [3/4] Enviando para o R2 ($R2_REMOTE:$R2_BUCKET)..."
  rclone copy "$MP4"   "$R2_REMOTE:$R2_BUCKET/mp4"     --transfers 8 --progress \
    --header-upload "Cache-Control: public, max-age=31536000, immutable"
  rclone copy "$THUMB" "$R2_REMOTE:$R2_BUCKET/thumb"   --transfers 8 --progress \
    --header-upload "Cache-Control: public, max-age=31536000, immutable"
  if [ "$MAKE_PREVIEW" = "1" ]; then
    rclone copy "$PREVIEW" "$R2_REMOTE:$R2_BUCKET/preview" --transfers 8 --progress \
      --header-upload "Cache-Control: public, max-age=31536000, immutable"
  fi
}

manifest() {
  echo ">> [4/4] Gerando manifesto (source=r2)..."
  # Lista a pasta do Drive para preservar driveId e ordem; o gerador filtra os clipes.
  rclone lsjson "$GDRIVE_REMOTE:" --drive-root-folder-id "$GDRIVE_FOLDER_ID" \
    --files-only > "$WORK/drive-listing.json"
  node "$ROOT/scripts/generate-manifest.mjs" --in "$WORK/drive-listing.json" --source r2
  echo "   Pronto. Faça o deploy e defina VITE_VIDEOS_BASE (ex.: https://videos.siganexus.com.br)."
}

case "$STEP" in
  pull) pull ;;
  transcode) transcode ;;
  upload) upload ;;
  manifest) manifest ;;
  all) pull; transcode; upload; manifest ;;
  *) echo "Etapa inválida: $STEP (use pull|transcode|upload|manifest|all)"; exit 1 ;;
esac
echo "Concluído: $STEP"
