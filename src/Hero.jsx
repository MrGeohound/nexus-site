import React, { useRef } from 'react';
import { ArrowRight, Star, CheckCircle, Users } from 'lucide-react';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <div id="home" className="relative min-h-screen w-full bg-[#12333A] text-[#F8F3EA] font-inter overflow-hidden flex flex-col">
      {/* Background Compilation Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          src="/assets/nexus-highlights-2026.mp4"
          className="w-full h-full object-cover opacity-45 scale-105 filter brightness-110 contrast-125" 
          muted 
          loop 
          playsInline 
          autoPlay 
        />
      </div>

      {/* Overlays - Cinematic Lighting */}
      <div className="absolute inset-0 z-0 bg-[#12333A]/65"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#12333A] via-[#12333A]/85 to-[#B86B4B]/30"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#12333A] via-transparent to-[#C8A96A]/20 pointer-events-none"></div>

      {/* Central Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#glow)">
            <ellipse cx="400" cy="200" rx="300" ry="100" fill="#B86B4B" fillOpacity="0.4" />
            <ellipse cx="400" cy="200" rx="200" ry="50" fill="#C8A96A" fillOpacity="0.25" />
          </g>
          <defs>
            <filter id="glow" x="-100" y="-100" width="1000" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-[10%] pt-24 pb-12">
        <div className="max-w-4xl mt-16 md:mt-24">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/15 text-[#C8A96A] font-bold text-xs uppercase tracking-widest mb-6">
            <CheckCircle size={14} className="text-[#C8A96A]" /> 1ª Edição Concluída com Sucesso · Ninna Hub
          </div>

          <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[180px] md:w-[240px] mb-8 object-contain" />

          <h1 className="text-[38px] md:text-[58px] lg:text-[72px] font-inter font-extrabold tracking-tight leading-[1.05] mb-6 text-[#F8F3EA]">
            O NEXUS aconteceu. E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">redefiniu o networking.</span>
          </h1>

          <p className="font-inter text-lg md:text-2xl text-[#F8F3EA]/90 max-w-3xl leading-relaxed mb-4">
            Com <strong className="text-[#C8A96A] font-bold">9,3 de satisfação média</strong> e <strong className="text-[#C8A96A] font-bold">92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
          </p>

          <p className="font-inter text-[15px] md:text-[17px] text-[#F8F3EA]/70 max-w-2xl leading-relaxed mb-8">
            Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para receber o aviso em primeira mão e garantir o Lote 1 exclusivo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
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
              Ver Depoimentos dos Participantes
            </a>
          </div>

          {/* Verified Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#F8F3EA]/15 pt-8 max-w-3xl">
            <div className="bg-[#F8F3EA]/[0.04] border border-[#F8F3EA]/10 rounded-2xl p-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C8A96A] mb-1">
                <Star size={18} className="fill-[#C8A96A]" />
                <span className="text-2xl font-black text-[#F8F3EA]">9,3 / 10</span>
              </div>
              <p className="text-xs text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Nota de Satisfação</p>
            </div>

            <div className="bg-[#F8F3EA]/[0.04] border border-[#F8F3EA]/10 rounded-2xl p-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C8A96A] mb-1">
                <Users size={18} />
                <span className="text-2xl font-black text-[#F8F3EA]">92%</span>
              </div>
              <p className="text-xs text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Confirmados na 2ª Edição</p>
            </div>

            <div className="bg-[#F8F3EA]/[0.04] border border-[#F8F3EA]/10 rounded-2xl p-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C8A96A] mb-1">
                <CheckCircle size={18} />
                <span className="text-2xl font-black text-[#F8F3EA]">100%</span>
              </div>
              <p className="text-xs text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Conexões Reais</p>
            </div>
          </div>

        </div>
      </main>

      {/* Supporters Marquee */}
      <div className="relative w-full border-t border-[#F8F3EA]/10 bg-[#12333A]/80 backdrop-blur-sm pt-4 pb-4 overflow-hidden z-20 mt-auto hidden md:flex flex-col items-center">
        <p className="text-[10px] text-[#C8A96A]/60 uppercase tracking-[0.3em] font-bold mb-3">Parceiros da 1ª Edição</p>
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
