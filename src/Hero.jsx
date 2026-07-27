import React, { useRef } from 'react';
import { ArrowRight, Star, CheckCircle, Users } from 'lucide-react';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <div id="home" className="relative min-h-screen w-full bg-[#12333A] text-[#F8F3EA] font-inter overflow-hidden flex flex-col justify-center">
      {/* Background Compilation Video - Bright & Clear */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          src="/assets/nexus-highlights-2026.mp4"
          className="w-full h-full object-cover filter brightness-105 contrast-110" 
          muted 
          loop 
          playsInline 
          autoPlay 
        />
      </div>

      {/* Overlays - Soft & Subtle so video shines through */}
      <div className="absolute inset-0 z-0 bg-[#12333A]/25"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#12333A] via-transparent to-[#12333A]/60 pointer-events-none"></div>

      {/* Main Content Area in Glassmorphism Card */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-[10%] pt-28 pb-16">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Glass Card */}
          <div className="bg-[#12333A]/70 backdrop-blur-xl border border-[#F8F3EA]/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/20 text-[#C8A96A] font-bold text-xs uppercase tracking-widest mb-6">
              <CheckCircle size={14} className="text-[#C8A96A]" /> 1ª Edição Concluída com Sucesso · Ninna Hub
            </div>

            <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[180px] md:w-[220px] mb-8 object-contain" />

            <h1 className="text-[36px] md:text-[54px] lg:text-[68px] font-inter font-extrabold tracking-tight leading-[1.05] mb-6 text-[#F8F3EA]">
              O NEXUS aconteceu. E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">redefiniu o networking.</span>
            </h1>

            <p className="font-inter text-lg md:text-2xl text-[#F8F3EA]/90 leading-relaxed mb-4">
              Com <strong className="text-[#C8A96A] font-bold">9,3 de satisfação média</strong> e <strong className="text-[#C8A96A] font-bold">92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
            </p>

            <p className="font-inter text-[15px] md:text-[17px] text-[#F8F3EA]/75 leading-relaxed mb-8">
              Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para receber o aviso em primeira mão e garantir o Lote 1 exclusivo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <button
                onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento' }); navigate('#lista-de-espera'); }}
                className="w-full sm:w-auto flex justify-center items-center gap-3 bg-[#B86B4B] text-[#F8F3EA] px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-[#9F573E] transition-all hover:scale-105 shadow-[0_0_30px_rgba(184,107,75,0.4)] group"
              >
                Entrar na Lista de Espera (2ª Edição)
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#depoimentos"
                onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos' })}
                className="w-full sm:w-auto flex justify-center items-center gap-3 border border-[#C8A96A] text-[#F8F3EA] px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-[#C8A96A] hover:text-[#12333A] transition-colors group"
              >
                <Star size={18} className="text-[#C8A96A] group-hover:text-[#12333A] transition-colors" />
                Ver Depoimentos
              </a>
            </div>

            {/* Verified Metrics Bar Inside Glass Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#F8F3EA]/15 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] shrink-0">
                  <Star size={18} className="fill-[#C8A96A]" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#F8F3EA]">9,3 / 10</p>
                  <p className="text-[11px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Nota de Satisfação</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xl font-black text-[#F8F3EA]">92%</p>
                  <p className="text-[11px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Retorno Confirmado</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] shrink-0">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <p className="text-xl font-black text-[#F8F3EA]">100%</p>
                  <p className="text-[11px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Conexões Reais</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Supporters Marquee */}
      <div className="relative w-full border-t border-[#F8F3EA]/10 bg-[#12333A]/80 backdrop-blur-md pt-3 pb-3 overflow-hidden z-20 mt-auto hidden md:flex flex-col items-center">
        <p className="text-[10px] text-[#C8A96A]/60 uppercase tracking-[0.3em] font-bold mb-2">Parceiros da 1ª Edição</p>
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#12333A] to-transparent z-30 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#12333A] to-transparent z-30 pointer-events-none"></div>
          <div className="flex w-max animate-marquee opacity-60 hover:opacity-100 transition-opacity">
            {[1, 2, 3, 4].map((set) => (
              <div key={set} className="flex items-center justify-around w-screen max-w-[1000px] shrink-0">
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-sm font-bold cursor-default">Wine</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-sm font-bold cursor-default">Marvin</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-sm font-bold cursor-default">Ninna Hub</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-sm font-bold cursor-default">Daniele Almeida</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
