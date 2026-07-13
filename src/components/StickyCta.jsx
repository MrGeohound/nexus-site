import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EVENT, vagasRestantes, FEATURES } from '../config';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

// CTA fixo no rodapé (apenas mobile). Aparece após rolar o hero.
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!FEATURES.stickyCtaMobile) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!FEATURES.stickyCtaMobile) return null;

  const onClick = () => {
    track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'sticky_mobile' });
    navigate('#pricing');
  };

  const restantes = vagasRestantes();

  return (
    <div
      className={`fixed bottom-0 left-0 z-40 w-full border-t border-[#C8A96A]/20 bg-[#12333A]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#F8F3EA]">
            Garanta sua vaga no NEXUS
          </p>
          {EVENT.vagas.exibir && (
            <p className="truncate text-[11px] text-[#C8A96A]">
              {restantes > 0
                ? `Restam ${restantes} de ${EVENT.vagas.total} vagas`
                : 'Últimas vagas'}
            </p>
          )}
        </div>
        <button
          onClick={onClick}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#B86B4B] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#F8F3EA] transition-colors hover:bg-[#9F573E]"
        >
          Garantir vaga
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
