import React from 'react';
import { EVENT, vagasRestantes, vagasPercent } from '../config';

// Escassez VERDADEIRA e configurável (src/config/event.js).
// variant: 'inline' (texto + barra) | 'pill' (compacto)
export default function ScarcityBadge({ variant = 'inline', className = '', dark = false }) {
  if (!EVENT.vagas.exibir) return null;

  const { total, preenchidas } = EVENT.vagas;
  const restantes = vagasRestantes();
  const pct = vagasPercent();

  const txtMuted = dark ? 'text-[#F8F3EA]/60' : 'text-[#12333A]/60';
  const txtStrong = dark ? 'text-[#F8F3EA]' : 'text-[#12333A]';
  const trackBg = dark ? 'bg-[#F8F3EA]/10' : 'bg-[#12333A]/10';

  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#C8A96A] ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8A96A] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8A96A]"></span>
        </span>
        {preenchidas} de {total} vagas preenchidas
      </span>
    );
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className={`text-sm font-bold ${txtStrong}`}>
          {preenchidas} de {total} vagas preenchidas
        </span>
        <span className={`text-xs ${txtMuted}`}>
          {restantes > 0 ? `Restam ${restantes}` : 'Últimas vagas'}
        </span>
      </div>
      <div className={`h-2 w-full overflow-hidden rounded-full ${trackBg}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#B86B4B] to-[#C8A96A] transition-all duration-700"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Vagas preenchidas"
        />
      </div>
    </div>
  );
}
