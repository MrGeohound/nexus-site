import React, { useRef } from 'react';
import { ArrowRight, Star, CheckCircle, Users } from 'lucide-react';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <div id="home" className="relative min-h-screen w-full bg-[#12333A] text-[#F8F3EA] font-inter overflow-hidden flex flex-col justify-center">
      
      {/* Background Compilation Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          src="/assets/nexus-highlights-2026.mp4"
          className="w-full h-full object-cover filter brightness-110 contrast-115" 
          muted 
          loop 
          playsInline 
          autoPlay 
        />
      </div>

      {/* Subtle Gradient Overlay - keeps video clear on the right */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#12333A]/85 via-[#12333A]/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#12333A] via-transparent to-[#12333A]/40 pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-[8%] pt-24 lg:pt-28 pb-16">
        
        {/* Mobile Highlight Title (over video) */}
        <div className="lg:hidden text-center mt-12 mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F3EA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            1ª Edição Concluída com Sucesso
          </h2>
          <div className="w-16 h-1 bg-[#C8A96A] mx-auto mt-2 rounded-full shadow-[0_2px_8px_rgba(200,169,106,0.8)]"></div>
        </div>

        {/* Desktop Left-aligned Glassmorphism Card */}
        <div className="w-full lg:max-w-[560px] lg:mr-auto">
          
          <div className="bg-[#12333A]/75 backdrop-blur-xl border border-[#F8F3EA]/20 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            
            <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[160px] sm:w-[200px] mb-6 object-contain" />

            <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-inter font-extrabold tracking-tight leading-[1.08] mb-5 text-[#F8F3EA]">
              O NEXUS aconteceu. E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">redefiniu o networking.</span>
            </h1>

            <p className="font-inter text-base sm:text-lg text-[#F8F3EA]/90 leading-relaxed mb-4">
              Com <strong className="text-[#C8A96A] font-bold">9,3 de satisfação média</strong> e <strong className="text-[#C8A96A] font-bold">92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
            </p>

            <p className="font-inter text-xs sm:text-sm text-[#F8F3EA]/70 leading-relaxed mb-6">
              Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para receber o aviso em primeira mão e garantir o Lote 1 exclusivo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <button
                onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento' }); navigate('#lista-de-espera'); }}
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#B86B4B] text-[#F8F3EA] px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide hover:bg-[#9F573E] transition-all hover:scale-105 shadow-[0_0_25px_rgba(184,107,75,0.4)] group"
              >
                Entrar na Lista VIP (2ª Edição)
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#depoimentos"
                onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos' })}
                className="w-full sm:w-auto flex justify-center items-center gap-2 border border-[#C8A96A] text-[#F8F3EA] px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide hover:bg-[#C8A96A] hover:text-[#12333A] transition-colors group"
              >
                <Star size={16} className="text-[#C8A96A] group-hover:text-[#12333A] transition-colors" />
                Ver Depoimentos
              </a>
            </div>

            {/* Verified Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 border-t border-[#F8F3EA]/15 pt-5 text-center sm:text-left">
              <div>
                <p className="text-lg sm:text-xl font-black text-[#C8A96A]">9,3 / 10</p>
                <p className="text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Satisfação</p>
              </div>

              <div>
                <p className="text-lg sm:text-xl font-black text-[#C8A96A]">92%</p>
                <p className="text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Confirmados</p>
              </div>

              <div>
                <p className="text-lg sm:text-xl font-black text-[#C8A96A]">100%</p>
                <p className="text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Conexões</p>
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
