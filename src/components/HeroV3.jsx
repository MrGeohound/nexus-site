import React from 'react';
import { ArrowRight } from 'lucide-react';
import Countdown from './Countdown';
import ScarcityBadge from './ScarcityBadge';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

export default function HeroV3() {
  return (
    <div id="home" className="relative min-h-[90vh] w-full bg-[#0a0a0a] text-white font-inter flex flex-col justify-center items-center overflow-hidden px-6 pt-32 pb-16">
      
      {/* Intense gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#C8A96A]/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        
        <div className="inline-block px-4 py-1.5 rounded-full border border-red-500/50 bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest mb-8 animate-pulse">
          ATENÇÃO: Lote encerrando
        </div>

        <h1 className="text-[44px] md:text-[72px] lg:text-[88px] font-inter font-black tracking-tighter leading-[1] mb-6">
          NÃO FIQUE DE FORA DAS <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">DECISÕES IMPORTANTES.</span>
        </h1>

        <p className="font-inter text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-10">
          O NEXUS reúne quem decide, quem investe e quem fatura. Faltam 4 dias para o evento e restam apenas as últimas vagas do nosso limite estrito de 80 participantes.
        </p>

        <div className="w-full sm:w-auto mb-12">
          <button
            onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_v3' }); navigate('#pricing'); }}
            className="w-full sm:w-auto flex justify-center items-center gap-3 bg-gradient-to-r from-[#B86B4B] to-[#9F573E] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(184,107,75,0.4)]"
          >
            GARANTIR MINHA VAGA IMEDIATAMENTE
            <ArrowRight size={24} className="animate-bounce-x" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 border-t border-white/10 pt-10 mt-4 w-full justify-center">
          <div className="text-center">
            <p className="text-4xl font-black text-[#C8A96A] mb-1">58 <span className="text-xl text-white/40">/ 80</span></p>
            <p className="text-xs uppercase tracking-widest text-white/50">Empresários Confirmados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-[#C8A96A] mb-1">23/07</p>
            <p className="text-xs uppercase tracking-widest text-white/50">Ninna Hub Fortaleza</p>
          </div>
          <div className="text-center">
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  );
}
