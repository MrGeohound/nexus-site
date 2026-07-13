import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { ArrowRight, MapPin } from 'lucide-react';
import Countdown from './components/Countdown';
import ScarcityBadge from './components/ScarcityBadge';
import { track, EVENTS } from './lib/analytics.js';
import { navigate } from './lib/router.jsx';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log('Autoplay prevented:', err));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => console.log('Autoplay prevented:', err));
      });
    }
  }, []);

  return (
    <div id="home" className="relative min-h-screen w-full bg-[#12333A] text-[#F8F3EA] font-inter overflow-hidden flex flex-col">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} className="w-full h-full object-cover opacity-50" muted loop playsInline autoPlay />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-0 bg-[#12333A]/60"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#12333A] via-[#12333A]/90 to-[#B86B4B]/30"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#12333A] via-transparent to-[#C8A96A]/20 pointer-events-none"></div>

      {/* Grid System */}
      <div className="absolute inset-0 z-0 hidden lg:flex justify-between w-full pointer-events-none opacity-20">
        <div className="w-[1px] h-full bg-[#F8F3EA]/10 ml-[25%]"></div>
        <div className="w-[1px] h-full bg-[#F8F3EA]/10 ml-[25%]"></div>
        <div className="w-[1px] h-full bg-[#F8F3EA]/10 ml-[25%] mr-[25%]"></div>
      </div>

      {/* Central Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#glow)">
            <ellipse cx="400" cy="200" rx="300" ry="100" fill="#B86B4B" fillOpacity="0.3" />
            <ellipse cx="400" cy="200" rx="200" ry="50" fill="#C8A96A" fillOpacity="0.2" />
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
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 text-[#C8A96A] font-bold text-xs uppercase tracking-widest mb-6">
            23 de julho · Fortaleza · Ninna Hub
          </div>

          <img src="/assets/logo-nexus-2.png" alt="NEXUS Conexão de Verdade" className="w-[180px] md:w-[240px] mb-8 object-contain" />

          <h1 className="text-[40px] md:text-[60px] lg:text-[76px] font-inter font-extrabold tracking-tight leading-[1] mb-6 text-[#F8F3EA]">
            Networking não se promete. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-[#E8D8BE]">Se provoca.</span>
          </h1>

          <p className="font-inter text-xl md:text-2xl text-[#F8F3EA]/90 max-w-3xl leading-relaxed mb-4">
            O NEXUS é um encontro empresarial criado para transformar apresentações rápidas em conexões reais, conversas estratégicas e oportunidades de negócio.
          </p>

          <p className="font-inter text-[15px] md:text-[17px] text-[#F8F3EA]/70 max-w-2xl leading-relaxed mb-10">
            Conteúdo prático, empresários no mesmo ambiente, atividades guiadas de conexão e um happy hour pensado para aproximar quem decide, constrói e movimenta negócios.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <button
              onClick={() => { track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'hero' }); navigate('#pricing'); }}
              className="w-full sm:w-auto flex justify-center items-center gap-3 bg-[#B86B4B] text-[#F8F3EA] px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-[#9F573E] transition-colors group"
            >
              Garantir minha vaga
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#location"
              onClick={() => track(EVENTS.CLICK_SECONDARY_CTA, { origem: 'hero_location' })}
              className="w-full sm:w-auto flex justify-center items-center gap-3 border border-[#C8A96A] text-[#F8F3EA] px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-[#C8A96A] hover:text-[#12333A] transition-colors group"
            >
              <MapPin size={20} className="text-[#C8A96A] group-hover:text-[#12333A] transition-colors" />
              Ver localização
            </a>
          </div>

          <div className="mb-10">
            <ScarcityBadge variant="inline" dark />
            <p className="mt-3 text-xs text-[#F8F3EA]/50 uppercase tracking-widest font-jakarta text-center sm:text-left">
              Vagas limitadas para preservar a qualidade das conexões.
            </p>
          </div>

          <div className="mt-6 md:mt-10 sm:max-w-md">
            <Countdown />
          </div>
        </div>
      </main>

      {/* Investors Marquee */}
      <div className="relative w-full border-t border-[#F8F3EA]/10 bg-[#12333A]/80 backdrop-blur-sm pt-4 pb-4 overflow-hidden z-20 mt-auto hidden md:flex flex-col items-center">
        <p className="text-[10px] text-[#C8A96A]/60 uppercase tracking-[0.3em] font-bold mb-3">Investidores</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
