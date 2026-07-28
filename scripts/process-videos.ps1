# =============================================================================
# NEXUS — Pipeline de vídeos (Windows / PowerShell): Google Drive -> MP4 -> R2
# -----------------------------------------------------------------------------
# Baixa os clipes do Drive, converte .mov -> .mp4 web + thumbnails e envia ao R2.
# Ao final, regenera public/videos-manifest.json com source=r2.
#
# PRÉ-REQUISITOS (instalar uma vez, no PowerShell):
#   winget install Rclone.Rclone
#   winget install Gyan.FFmpeg
#   winget install OpenJS.NodeJS.LTS
#   (feche e reabra o PowerShell depois de instalar)
#
# E dois remotes no rclone (rclone config): "gdrive" (Google Drive) e "r2" (S3/Cloudflare).
#
# COMO RODAR (na pasta do projeto):
#   $env:GDRIVE_REMOTE   = "gdrive"
#   $env:GDRIVE_FOLDER_ID= "1BtyhAoeUPpLOTyT88TWqx5YjXCsSE_YX"
#   $env:R2_REMOTE       = "r2"
#   $env:R2_BUCKET       = "nexus-videos"
#   powershell -ExecutionPolicy Bypass -File scripts\process-videos.ps1
#
# Etapas isoladas (opcional): ... -File scripts\process-videos.ps1 -Step transcode
# Valores válidos de -Step: pull | transcode | upload | manifest | all (padrão).
# É idempotente: pula o que já foi feito.
# =============================================================================
param([string]$Step = "all")
$ErrorActionPreference = "Stop"

$GDRIVE_REMOTE    = if ($env:GDRIVE_REMOTE)    { $env:GDRIVE_REMOTE }    else { "gdrive" }
$GDRIVE_FOLDER_ID = if ($env:GDRIVE_FOLDER_ID) { $env:GDRIVE_FOLDER_ID } else { "1BtyhAoeUPpLOTyT88TWqx5YjXCsSE_YX" }
$R2_REMOTE        = if ($env:R2_REMOTE)        { $env:R2_REMOTE }        else { "r2" }
$R2_BUCKET        = if ($env:R2_BUCKET)        { $env:R2_BUCKET }        else { "nexus-videos" }
$MAKE_PREVIEW     = $env:MAKE_PREVIEW -eq "1"

$ROOT  = Split-Path -Parent $PSScriptRoot
$WORK  = Join-Path $ROOT "work"
$MOV   = Join-Path $WORK "mov"
$MP4   = Join-Path $WORK "mp4"
$THUMB = Join-Path $WORK "thumb"
$PREV  = Join-Path $WORK "preview"
$null = New-Item -ItemType Directory -Force -Path $MOV,$MP4,$THUMB,$PREV

function Get-ClipId([string]$name) {
  if ($name -match '^NEXUS[_ ]?2307[_ ]?(\d{4,})\.[A-Za-z0-9]+$') { return $Matches[1] }
  return $null
}

function Step-Pull {
  Write-Host ">> [1/4] Baixando clipes do Drive ($GDRIVE_FOLDER_ID)..."
  rclone copy "${GDRIVE_REMOTE}:" $MOV --drive-root-folder-id $GDRIVE_FOLDER_ID `
    --include "NEXUS_2307_*.mov" --transfers 4 --progress
  Write-Host ("   {0} arquivos em {1}" -f (Get-ChildItem $MOV -Filter *.mov).Count, $MOV)
}

function Step-Transcode {
  Write-Host ">> [2/4] Convertendo .mov -> .mp4 web + thumbnails..."
  $scale = "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'"
  $scaleT = "scale='if(gt(iw,ih),min(800,iw),-2)':'if(gt(iw,ih),-2,min(800,ih))'"
  $n = 0
  Get-ChildItem $MOV -Filter "NEXUS_2307_*.mov" | ForEach-Object {
    $id = Get-ClipId $_.Name
    if (-not $id) { return }
    $out = Join-Path $MP4 "$id.mp4"; $th = Join-Path $THUMB "$id.jpg"
    if (-not (Test-Path $out)) {
      ffmpeg -hide_banner -loglevel error -y -i $_.FullName -vf $scale `
        -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p `
        -c:a aac -b:a 128k -movflags +faststart $out
    }
    if (-not (Test-Path $th)) {
      ffmpeg -hide_banner -loglevel error -y -ss 00:00:01 -i $_.FullName -frames:v 1 -vf $scaleT $th
    }
    if ($MAKE_PREVIEW -and -not (Test-Path (Join-Path $PREV "$id.mp4"))) {
      ffmpeg -hide_banner -loglevel error -y -ss 00:00:01 -t 3 -i $_.FullName -an `
        -vf "scale=-2:640" -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p `
        -movflags +faststart (Join-Path $PREV "$id.mp4")
    }
    $n++; Write-Host -NoNewline ("`r   {0} convertidos" -f $n)
  }
  Write-Host ""
}

function Step-Upload {
  Write-Host ">> [3/4] Enviando para o R2 (${R2_REMOTE}:${R2_BUCKET})..."
  $cc = "Cache-Control: public, max-age=31536000, immutable"
  rclone copy $MP4   "${R2_REMOTE}:${R2_BUCKET}/mp4"   --transfers 8 --progress --header-upload $cc
  rclone copy $THUMB "${R2_REMOTE}:${R2_BUCKET}/thumb" --transfers 8 --progress --header-upload $cc
  if ($MAKE_PREVIEW) {
    rclone copy $PREV "${R2_REMOTE}:${R2_BUCKET}/preview" --transfers 8 --progress --header-upload $cc
  }
}

function Step-Manifest {
  Write-Host ">> [4/4] Gerando manifesto (source=r2)..."
  $listing = Join-Path $WORK "drive-listing.json"
  rclone lsjson "${GDRIVE_REMOTE}:" --drive-root-folder-id $GDRIVE_FOLDER_ID --files-only | Out-File -Encoding utf8 $listing
  node (Join-Path $ROOT "scripts\generate-manifest.mjs") --in $listing --source r2
  Write-Host "   Pronto. Defina VITE_VIDEOS_BASE=https://videos.siganexus.com.br e faça o deploy."
}

switch ($Step) {
  "pull"      { Step-Pull }
  "transcode" { Step-Transcode }
  "upload"    { Step-Upload }
  "manifest"  { Step-Manifest }
  "all"       { Step-Pull; Step-Transcode; Step-Upload; Step-Manifest }
  default     { Write-Host "Etapa inválida: $Step (use pull|transcode|upload|manifest|all)"; exit 1 }
}
Write-Host "Concluído: $Step"
