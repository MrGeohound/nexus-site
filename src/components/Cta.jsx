import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

export default function Cta() {
  const onClick = () => {
    track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'cta_final' });
    navigate('#lista-de-espera');
  };

  return (
    <section className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#050505] border-t border-[#C5C7CB]/10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E1121F]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 bg-[#0B0B0D] border border-[#C5C7CB]/20 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1121F]/10 blur-[80px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E1121F]/40 bg-[#E1121F]/10 text-[#E1121F] text-xs font-bold uppercase tracking-widest mb-6">
          <Star size={14} className="fill-[#E1121F]" /> 92% de Confirmação na 2ª Edição
        </div>

        <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-6 tracking-tight text-[#F5F5F7] leading-tight">
          Não fique de fora da próxima sala{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]">
            preparada para conexões reais.
          </span>
        </h2>

        <p className="text-[#C5C7CB] text-lg md:text-xl font-inter mb-8 max-w-2xl mx-auto">
          A 1ª edição provou a força do ecossistema. Garanta sua vaga antecipada na Lista VIP para a 2ª Edição e receba o primeiro lote em primeira mão.
        </p>

        <button
          onClick={onClick}
          className="inline-flex justify-center items-center gap-3 bg-[#E1121F] text-white px-10 py-5 rounded-full font-bold uppercase tracking-wide hover:bg-[#A00D18] transition-all hover:scale-105 shadow-[0_0_30px_rgba(225,18,31,0.4)]"
        >
          Entrar na Lista VIP da 2ª Edição
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
