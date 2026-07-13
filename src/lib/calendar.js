// =============================================================================
// Calendário — link "Adicionar ao Google Calendar" e download .ics
// =============================================================================
import { EVENT } from '../config/event.js';

// Converte ISO local (America/Fortaleza, UTC-3) para formato UTC do calendário.
function toCalUTC(iso) {
  // iso ex.: '2026-07-23T16:30:00' (horário local Fortaleza = UTC-3)
  const local = new Date(iso + '-03:00');
  return local
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

const detalhes = () => {
  const l = EVENT.local;
  return {
    titulo: EVENT.nome,
    descricao:
      'Encontro empresarial de conexões intencionais. Chegue no horário e traga cartões/contato profissional.',
    local: `${l.nome} — ${l.endereco}, ${l.cidade}/${l.estado}`,
  };
};

export function googleCalendarUrl() {
  const d = detalhes();
  const dates = `${toCalUTC(EVENT.dataInicioISO)}/${toCalUTC(EVENT.dataFimISO)}`;
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: d.titulo,
    dates,
    details: d.descricao,
    location: d.local,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function icsContent() {
  const d = detalhes();
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NEXUS//PT-BR',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@siganexus.com.br`,
    `DTSTAMP:${toCalUTC(new Date().toISOString().slice(0, 19))}`,
    `DTSTART:${toCalUTC(EVENT.dataInicioISO)}`,
    `DTEND:${toCalUTC(EVENT.dataFimISO)}`,
    `SUMMARY:${d.titulo}`,
    `DESCRIPTION:${d.descricao}`,
    `LOCATION:${d.local}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs() {
  const blob = new Blob([icsContent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nexus-conexao-de-verdade.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default { googleCalendarUrl, icsContent, downloadIcs };
