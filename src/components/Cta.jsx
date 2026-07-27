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
    <section className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#12333A] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A96A]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-br from-[#F8F3EA]/5 to-[#F8F3EA]/0 border border-[#F8F3EA]/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96A]/10 blur-[80px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 text-[#C8A96A] text-xs font-bold uppercase tracking-widest mb-6">
          <Star size={14} className="fill-[#C8A96A]" /> 92% de Confirmação na 2ª Edição
        </div>

        <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-6 tracking-tight text-[#F8F3EA] leading-tight">
          Não fique de fora da próxima sala{' '}
          <span className="text-[#C8A96A]">preparada para conexões reais.</span>
        </h2>

        <p className="text-[#F8F3EA]/70 text-lg md:text-xl font-inter mb-8 max-w-2xl mx-auto">
          A 1ª edição provou a força do ecossistema. Garanta sua vaga antecipada na Lista VIP para a 2ª Edição e receba o primeiro lote em primeira mão.
        </p>

        <button
          onClick={onClick}
          className="inline-flex justify-center items-center gap-3 bg-[#B86B4B] text-[#F8F3EA] px-10 py-5 rounded-full font-bold uppercase tracking-wide hover:bg-[#9F573E] transition-all hover:scale-105 shadow-[0_0_30px_rgba(184,107,75,0.3)]"
        >
          Entrar na Lista VIP da 2ª Edição
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
