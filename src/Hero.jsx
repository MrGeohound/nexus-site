import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Star, CheckCircle, Users, Play } from 'lucide-react';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

const TRAILER_QUOTES = [
  { text: "Maravilhoso", author: "Ricardo Capistrano", company: "Boxmove", rating: 10 },
  { text: "Conexões com qualidade e intencionalidade.", author: "Camilo Castelo", company: "Ágape Soluções", rating: 10 },
  { text: "Se posicionar é fazer barulho", author: "Wilker Corumba", company: "Saron Investments", rating: 10 },
  { text: "Insights muito úteis para mim.", author: "Silvio César", company: "Move Branding", rating: 8 },
  { text: "Excelente ambiente de trocas e parcerias.", author: "Lucas", company: "Participante", rating: 10 },
  { text: "Dinâmica de valor que tornou o espectador parte ativa.", author: "Giovani Santos", company: "THEPLAN Consultoria", rating: 8 },
];

export default function Hero({ isRebranded = true }) {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  // Intervalo estilo trailer de cinema (troca a cada 4.5 segundos com fade)
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % TRAILER_QUOTES.length);
        setFadeState(true);
      }, 500);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = TRAILER_QUOTES[quoteIdx];

  return (
    <div id="home" className={`relative w-full font-inter overflow-hidden transition-colors duration-700 ${
      isRebranded ? 'bg-[#050505] text-[#F5F5F7]' : 'bg-[#12333A] text-[#F8F3EA]'
    }`}>
      
      {/* ========================================================================= */}
      {/* DESKTOP HERO (Full screen height, left-aligned glass card + trailer quotes) */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative min-h-screen w-full flex-col justify-center overflow-hidden">
        
        {/* Background Custom Video (Desktop 16:9) */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef} 
            src="/assets/video-hero-nexus.mp4"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110" 
            muted 
            loop 
            playsInline 
            autoPlay 
          />
        </div>

        {/* Soft Left & Bottom Gradient Overlays */}
        <div className={`absolute inset-0 z-0 bg-gradient-to-r via-transparent to-transparent pointer-events-none transition-colors duration-700 ${
          isRebranded ? 'from-[#050505]/95 via-[#050505]/40' : 'from-[#12333A]/90 via-[#12333A]/35'
        }`}></div>
        <div className={`absolute inset-0 z-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none transition-colors duration-700 ${
          isRebranded ? 'from-[#050505]/90 to-[#050505]/60' : 'from-[#12333A]/80 to-[#12333A]/50'
        }`}></div>

        {/* Floating Movie Trailer Quote (Desktop - Clean Text Only) */}
        <div className="absolute right-12 xl:right-16 top-28 z-20 max-w-md pointer-events-none">
          <div className={`transition-all duration-700 transform ${fadeState ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}`}>
            <div className="text-right drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <div className={`flex items-center justify-end gap-1.5 mb-1.5 text-xs font-extrabold uppercase tracking-widest ${
                isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'
              }`}>
                <Star size={13} className={isRebranded ? 'fill-[#E1121F]' : 'fill-[#C8A96A]'} />
                <span>Avaliação dos Participantes · {currentQuote.rating}/10</span>
              </div>
              <p className={`text-xl xl:text-2xl font-extrabold italic leading-snug mb-2 ${
                isRebranded ? 'text-[#F5F5F7]' : 'text-[#F8F3EA]'
              }`}>
                "{currentQuote.text}"
              </p>
              <p className={`text-xs xl:text-sm font-bold ${
                isRebranded ? 'text-[#C5C7CB]' : 'text-[#C8A96A]'
              }`}>
                — {currentQuote.author} <span className={isRebranded ? 'text-[#9A9AA0] font-normal' : 'text-[#F8F3EA]/60 font-normal'}>· {currentQuote.company}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Container (Desktop - Above the Fold guaranteed) */}
        <main className="relative z-10 w-full px-8 xl:px-[8%] pt-20 pb-8 flex items-center min-h-screen">
          <div className="w-full max-w-[520px] mr-auto">
            
            {/* Compact Glass Card */}
            <div className={`backdrop-blur-xl border rounded-3xl p-6 xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-colors duration-700 ${
              isRebranded 
                ? 'bg-[#0B0B0D]/85 border-[#C5C7CB]/20 text-[#F5F5F7]' 
                : 'bg-[#12333A]/75 border-[#F8F3EA]/20 text-[#F8F3EA]'
            }`}>
              
              <img 
                src={isRebranded ? "/assets/rebrand/logo-nexus-principal.png" : "/assets/logo-nexus-2.png"} 
                alt="NEXUS Conexão de Verdade" 
                className="w-[220px] xl:w-[260px] mb-4 object-contain" 
              />

              <h1 className="text-[26px] xl:text-[34px] font-inter font-extrabold tracking-tight leading-[1.1] mb-3">
                O NEXUS aconteceu. E <span className={isRebranded ? "text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]" : "text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]"}>redefiniu o networking.</span>
              </h1>

              <p className={`font-inter text-xs xl:text-sm leading-relaxed mb-3 ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#F8F3EA]/90'}`}>
                Com <strong className={isRebranded ? "text-[#E1121F] font-bold" : "text-[#C8A96A] font-bold"}>9,3 de satisfação média</strong> e <strong className={isRebranded ? "text-[#E1121F] font-bold" : "text-[#C8A96A] font-bold"}>92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
              </p>

              <p className={`font-inter text-[11px] xl:text-xs leading-relaxed mb-5 ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/70'}`}>
                Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para receber o aviso e o Lote 1 exclusivo.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento' }); navigate('#lista-de-espera'); }}
                  className={`flex-1 flex justify-center items-center gap-2 px-4 py-3.5 rounded-full font-bold text-xs uppercase tracking-wide transition-all hover:scale-105 group ${
                    isRebranded 
                      ? 'bg-[#E1121F] text-white hover:bg-[#A00D18] shadow-[0_0_25px_rgba(225,18,31,0.4)]' 
                      : 'bg-[#B86B4B] text-[#F8F3EA] hover:bg-[#9F573E] shadow-[0_0_20px_rgba(184,107,75,0.4)]'
                  }`}
                >
                  Entrar na Lista VIP
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#depoimentos"
                  onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos' })}
                  className={`flex justify-center items-center gap-1.5 border px-4 py-3.5 rounded-full font-bold text-xs uppercase tracking-wide transition-colors group shrink-0 ${
                    isRebranded 
                      ? 'border-[#C5C7CB]/40 text-[#F5F5F7] hover:border-[#E1121F] hover:text-[#E1121F]' 
                      : 'border-[#C8A96A] text-[#F8F3EA] hover:bg-[#C8A96A] hover:text-[#12333A]'
                  }`}
                >
                  <Star size={14} className={isRebranded ? "text-[#E1121F]" : "text-[#C8A96A] group-hover:text-[#12333A]"} />
                  Depoimentos
                </a>
              </div>

              {/* Verified Metrics Bar */}
              <div className={`grid grid-cols-3 gap-2 border-t pt-4 text-center ${isRebranded ? 'border-[#C5C7CB]/15' : 'border-[#F8F3EA]/15'}`}>
                <div>
                  <p className={`text-base xl:text-lg font-black ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>9,3 / 10</p>
                  <p className={`text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Satisfação</p>
                </div>

                <div>
                  <p className={`text-base xl:text-lg font-black ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>92%</p>
                  <p className={`text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Retorno</p>
                </div>

                <div>
                  <p className={`text-base xl:text-lg font-black ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#C8A96A]'}`}>100%</p>
                  <p className={`text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Conexões</p>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>


      {/* ========================================================================= */}
      {/* MOBILE HERO (Custom 16:9 Video Showcase + Intercalated Trailer Quotes)     */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex flex-col pt-20 px-4 pb-12">
        
        {/* 16:9 Custom Video Showcase Card */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#C5C7CB]/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] mb-6 bg-black">
          <video 
            ref={mobileVideoRef} 
            src="/assets/video-hero-nexus.mp4"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110" 
            muted 
            loop 
            playsInline 
            autoPlay 
          />
          
          {/* Overlay Gradient at the bottom of the video */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-4">
            
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 mb-1 text-[#E1121F]">
              <Play size={10} className="fill-[#E1121F]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Destaques 1ª Edição</span>
            </div>

            {/* Intercalated Quote */}
            <div className={`transition-all duration-500 transform ${fadeState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              <p className="text-base sm:text-lg font-extrabold text-[#F5F5F7] italic tracking-tight leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                "{currentQuote.text}"
              </p>
              <p className="text-[11px] text-[#C5C7CB] font-semibold mt-0.5">
                — {currentQuote.author} <span className="text-[#9A9AA0] font-normal">({currentQuote.company})</span>
              </p>
            </div>

          </div>
        </div>

        {/* Copy & CTAs Section (Second block on mobile) */}
        <div className={`backdrop-blur-md border rounded-2xl p-6 shadow-xl transition-colors duration-700 ${
          isRebranded ? 'bg-[#0B0B0D]/90 border-[#C5C7CB]/15 text-[#F5F5F7]' : 'bg-[#12333A]/85 border-[#F8F3EA]/15 text-[#F8F3EA]'
        }`}>
          
          <img 
            src={isRebranded ? "/assets/rebrand/logo-nexus-principal.png" : "/assets/logo-nexus-2.png"} 
            alt="NEXUS Conexão de Verdade" 
            className="w-[200px] mb-4 object-contain" 
          />

          <h1 className="text-2xl font-extrabold tracking-tight leading-tight mb-3">
            O NEXUS aconteceu. E <span className={isRebranded ? "text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]" : "text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] via-[#E8D8BE] to-[#B86B4B]"}>redefiniu o networking.</span>
          </h1>

          <p className={`text-sm leading-relaxed mb-3 ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#F8F3EA]/90'}`}>
            Com <strong className={isRebranded ? "text-[#E1121F]" : "text-[#C8A96A]"}>9,3 de satisfação média</strong> e <strong className={isRebranded ? "text-[#E1121F]" : "text-[#C8A96A]"}>92% dos participantes confirmados</strong> para a próxima edição, provamos que conexões reais não se prometem — se provocam.
          </p>

          <p className={`text-xs leading-relaxed mb-6 ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/70'}`}>
            Inscreva-se na <strong>Lista de Espera VIP da 2ª Edição</strong> para garantir prioridade e o menor valor (Lote 1).
          </p>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero_pos_evento_mobile' }); navigate('#lista-de-espera'); }}
              className={`w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wide shadow-lg ${
                isRebranded ? 'bg-[#E1121F] text-white hover:bg-[#A00D18]' : 'bg-[#B86B4B] text-[#F8F3EA] hover:bg-[#9F573E]'
              }`}
            >
              Entrar na Lista VIP (2ª Edição)
              <ArrowRight size={16} />
            </button>

            <a
              href="#depoimentos"
              onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_depoimentos_mobile' })}
              className={`w-full flex justify-center items-center gap-2 border py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wide text-center ${
                isRebranded ? 'border-[#C5C7CB]/30 text-[#F5F5F7]' : 'border-[#C8A96A] text-[#F8F3EA]'
              }`}
            >
              <Star size={14} className={isRebranded ? "text-[#E1121F]" : "text-[#C8A96A]"} />
              Ver Depoimentos
            </a>
          </div>

          {/* Mobile Metrics */}
          <div className={`grid grid-cols-3 gap-2 border-t pt-4 text-center ${isRebranded ? 'border-[#C5C7CB]/15' : 'border-[#F8F3EA]/15'}`}>
            <div>
              <p className={`text-base font-black ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>9,3 / 10</p>
              <p className={`text-[9px] uppercase font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Satisfação</p>
            </div>
            <div>
              <p className={`text-base font-black ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>92%</p>
              <p className={`text-[9px] uppercase font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Retorno</p>
            </div>
            <div>
              <p className={`text-base font-black ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#C8A96A]'}`}>100%</p>
              <p className={`text-[9px] uppercase font-semibold ${isRebranded ? 'text-[#9A9AA0]' : 'text-[#F8F3EA]/60'}`}>Conexões</p>
            </div>
          </div>

        </div>

      </div>

      {/* Supporters Marquee (Desktop only) */}
      <div className={`relative w-full border-t backdrop-blur-md pt-2.5 pb-2.5 overflow-hidden z-20 mt-auto hidden lg:flex flex-col items-center transition-colors duration-700 ${
        isRebranded ? 'bg-[#0B0B0D]/90 border-[#C5C7CB]/10' : 'bg-[#12333A]/80 border-[#F8F3EA]/10'
      }`}>
        <p className={`text-[9px] uppercase tracking-[0.3em] font-bold mb-1 ${isRebranded ? 'text-[#C5C7CB]/60' : 'text-[#C8A96A]/60'}`}>Parceiros da 1ª Edição</p>
        <div className="relative w-full overflow-hidden flex">
          <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r to-transparent z-30 pointer-events-none ${isRebranded ? 'from-[#050505]' : 'from-[#12333A]'}`}></div>
          <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l to-transparent z-30 pointer-events-none ${isRebranded ? 'from-[#050505]' : 'from-[#12333A]'}`}></div>
          <div className="flex w-max animate-marquee opacity-70 hover:opacity-100 transition-opacity">
            {[1, 2, 3, 4].map((set) => (
              <div key={set} className="flex items-center justify-around w-screen max-w-[1000px] shrink-0">
                <span className="uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Wine Vinhos</span>
                <span className={`text-xs mx-4 ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>✦</span>
                <span className="uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Marvin Soluções</span>
                <span className={`text-xs mx-4 ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>✦</span>
                <span className="uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Ninna Hub</span>
                <span className={`text-xs mx-4 ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>✦</span>
                <span className="uppercase tracking-[0.2em] font-jakarta text-xs font-bold cursor-default">Daniele Almeida</span>
                <span className={`text-xs mx-4 ${isRebranded ? 'text-[#E1121F]' : 'text-[#C8A96A]'}`}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
