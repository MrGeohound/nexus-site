import React, { useRef } from 'react';
import { ArrowRight, Star, CheckCircle, Users, Play } from 'lucide-react';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

export default function Hero() {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  return (
    <div id="home" className="relative w-full bg-[#12333A] text-[#F8F3EA] font-inter overflow-hidden">
      
      {/* ========================================================================= */}
      {/* DESKTOP HERO (Full screen height, left-aligned compact glass card)        */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative min-h-screen w-full flex-col justify-center overflow-hidden">
        
        {/* Background Compilation Video (Desktop) */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef} 
            src="/assets/nexus-highlights-2026.mp4"
            className="w-full h-full object-cover filter brightness-110 contrast-115 object-[center_35%]" 
            muted 
            loop 
            playsInline 
            autoPlay 
          />
        </div>

        {/* Soft Left Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#12333A]/90 via-[#12333A]/35 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#12333A]/80 via-transparent to-[#12333A]/50 pointer-events-none"></div>

        {/* Main Content Container (Desktop - Above the Fold guaranteed) */}
        <main className="relative z-10 w-full px-8 xl:px-[8%] pt-20 pb-8 flex items-center min-h-screen">
          <div className="w-full max-w-[500px] mr-auto">
            
            {/* Compact Glass Card */}
            <div className="bg-[#12333A]/75 backdrop-blur-xl border border-[#F8F3EA]/20 rounded-3xl p-6 xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[130px] xl:w-[150px] mb-4 object-contain" />

              <h1 className="text-[26px] xl:text-[34px] font-inter font-extrabold tracking-tight leading-[1.1] mb-3 text-[#F8F3EA]">
                O NEXUS aconteceu. E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">redefiniu o networking.</span>
              </h1>

              <p className="font-inter text-xs xl:text-sm text-[#F8F3EA]/90 leading-relaxed mb-3">
                Com <strong className="text-[#C8A96A] font-bold">9,3 de satisfação média</strong> e <strong className="text-[#C8A96A] font-bold">92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
              </p>

              <p className="font-inter text-[11px] xl:text-xs text-[#F8F3EA]/70 leading-relaxed mb-5">
                Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para receber o aviso e o Lote 1 exclusivo.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento' }); navigate('#lista-de-espera'); }}
                  className="flex-1 flex justify-center items-center gap-2 bg-[#B86B4B] text-[#F8F3EA] px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-[#9F573E] transition-all hover:scale-105 shadow-[0_0_20px_rgba(184,107,75,0.4)] group"
                >
                  Entrar na Lista VIP
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#depoimentos"
                  onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos' })}
                  className="flex justify-center items-center gap-1.5 border border-[#C8A96A] text-[#F8F3EA] px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-[#C8A96A] hover:text-[#12333A] transition-colors group shrink-0"
                >
                  <Star size={14} className="text-[#C8A96A] group-hover:text-[#12333A] transition-colors" />
                  Depoimentos
                </a>
              </div>

              {/* Verified Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 border-t border-[#F8F3EA]/15 pt-4 text-center">
                <div>
                  <p className="text-base xl:text-lg font-black text-[#C8A96A]">9,3 / 10</p>
                  <p className="text-[9px] xl:text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Satisfação</p>
                </div>

                <div>
                  <p className="text-base xl:text-lg font-black text-[#C8A96A]">92%</p>
                  <p className="text-[9px] xl:text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Retorno</p>
                </div>

                <div>
                  <p className="text-base xl:text-lg font-black text-[#C8A96A]">100%</p>
                  <p className="text-[9px] xl:text-[10px] text-[#F8F3EA]/60 uppercase tracking-wider font-semibold">Conexões</p>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>


      {/* ========================================================================= */}
      {/* MOBILE HERO (Video 16:9 Showcase First, Copy Card Second)                */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex flex-col pt-20 px-4 pb-12">
        
        {/* 16:9 Video Showcase Card (Main Highlight) */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#F8F3EA]/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] mb-6 bg-black">
          <video 
            ref={mobileVideoRef} 
            src="/assets/nexus-highlights-2026.mp4"
            className="w-full h-full object-cover filter brightness-110 contrast-115 object-[center_35%]" 
            muted 
            loop 
            playsInline 
            autoPlay 
          />
          
          {/* Overlay Gradient at the bottom of the 16:9 video */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12333A] via-[#12333A]/30 to-transparent flex flex-col justify-end p-4">
            <div className="flex items-center gap-2 mb-1 text-[#C8A96A]">
              <Play size={12} className="fill-[#C8A96A]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96A]">Destaques da 1ª Edição</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8F3EA] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
              1ª Edição Concluída com Sucesso
            </h2>
          </div>
        </div>

        {/* Copy & CTAs Section (Second block on mobile) */}
        <div className="bg-[#12333A]/85 backdrop-blur-md border border-[#F8F3EA]/15 rounded-2xl p-6 shadow-xl">
          
          <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[140px] mb-4 object-contain" />

          <h1 className="text-2xl font-extrabold tracking-tight leading-tight mb-3 text-[#F8F3EA]">
            O NEXUS aconteceu. E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]">redefiniu o networking.</span>
          </h1>

          <p className="text-sm text-[#F8F3EA]/90 leading-relaxed mb-3">
            Com <strong className="text-[#C8A96A]">9,3 de satisfação média</strong> e <strong className="text-[#C8A96A]">92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
          </p>

          <p className="text-xs text-[#F8F3EA]/70 leading-relaxed mb-6">
            Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para garantir prioridade e o menor valor (Lote 1).
          </p>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento_mobile' }); navigate('#lista-de-espera'); }}
              className="w-full flex justify-center items-center gap-2 bg-[#B86B4B] text-[#F8F3EA] py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wide shadow-lg hover:bg-[#9F573E]"
            >
              Entrar na Lista VIP (2ª Edição)
              <ArrowRight size={16} />
            </button>

            <a
              href="#depoimentos"
              onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos_mobile' })}
              className="w-full flex justify-center items-center gap-2 border border-[#C8A96A] text-[#F8F3EA] py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wide text-center"
            >
              <Star size={14} className="text-[#C8A96A]" />
              Ver Depoimentos
            </a>
          </div>

          {/* Mobile Metrics */}
          <div className="grid grid-cols-3 gap-2 border-t border-[#F8F3EA]/15 pt-4 text-center">
            <div>
              <p className="text-base font-black text-[#C8A96A]">9,3 / 10</p>
              <p className="text-[9px] text-[#F8F3EA]/60 uppercase font-semibold">Satisfação</p>
            </div>
            <div>
              <p className="text-base font-black text-[#C8A96A]">92%</p>
              <p className="text-[9px] text-[#F8F3EA]/60 uppercase font-semibold">Retorno</p>
            </div>
            <div>
              <p className="text-base font-black text-[#C8A96A]">100%</p>
              <p className="text-[9px] text-[#F8F3EA]/60 uppercase font-semibold">Conexões</p>
            </div>
          </div>

        </div>

      </div>

      {/* Supporters Marquee (Desktop only) */}
      <div className="relative w-full border-t border-[#F8F3EA]/10 bg-[#12333A]/80 backdrop-blur-md pt-2 pb-2 overflow-hidden z-20 mt-auto hidden lg:flex flex-col items-center">
        <p className="text-[9px] text-[#C8A96A]/60 uppercase tracking-[0.3em] font-bold mb-1">Parceiros da 1ª Edição</p>
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#12333A] to-transparent z-30 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#12333A] to-transparent z-30 pointer-events-none"></div>
          <div className="flex w-max animate-marquee opacity-60 hover:opacity-100 transition-opacity">
            {[1, 2, 3, 4].map((set) => (
              <div key={set} className="flex items-center justify-around w-screen max-w-[1000px] shrink-0">
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Wine</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Marvin</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Ninna Hub</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
                <span className="text-[#F8F3EA] uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Daniele Almeida</span>
                <span className="text-[#C8A96A] text-xs mx-4">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
