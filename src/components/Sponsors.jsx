import React from 'react';

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 relative z-10 bg-[#12333A]">
      <div className="container mx-auto px-6 lg:px-[10%]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight text-[#F8F3EA]">
            Marcas que apoiam <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-[#E8D8BE]">conexões de verdade</span>
          </h2>
          <p className="text-[#F8F3EA]/60 font-inter text-lg max-w-2xl mx-auto">
            O NEXUS conta com parceiros que ajudam a tornar a experiência mais completa, acolhedora e memorável.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 items-stretch flex-wrap">
          {/* Sponsor 1: Wine */}
          <div className="bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center flex-1 max-w-[400px] hover:border-[#C8A96A]/30 hover:bg-[#F8F3EA]/10 transition-all duration-300">
            <h3 className="text-[#F8F3EA] text-4xl md:text-5xl font-inter font-black tracking-widest mb-4 text-center">
              WINE VINHOS
            </h3>
            <div className="w-12 h-[1px] bg-[#C8A96A]/50 mb-4"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[#F8F3EA]/60 text-sm font-jakarta uppercase tracking-widest">
                Loja Fortaleza
              </span>
              <a href="https://instagram.com/Wine.Fortaleza" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] text-xs font-bold hover:text-[#F8F3EA] transition-colors">
                @Wine.Fortaleza
              </a>
            </div>
          </div>

          {/* Sponsor 2: Marvin */}
          <div className="bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center flex-1 max-w-[400px] hover:border-[#C8A96A]/30 hover:bg-[#F8F3EA]/10 transition-all duration-300">
            <h3 className="text-[#F8F3EA] text-4xl md:text-5xl font-inter font-black tracking-widest mb-4 text-center">
              MARVIN
            </h3>
            <div className="w-12 h-[1px] bg-[#C8A96A]/50 mb-4"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[#F8F3EA]/60 text-sm font-jakarta uppercase tracking-widest">
                Entregas Tecnológicas
              </span>
              <a href="https://instagram.com/marvinsolucoes" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] text-xs font-bold hover:text-[#F8F3EA] transition-colors">
                @marvinsolucoes
              </a>
            </div>
          </div>

          {/* Sponsor 3: NINNA Hub */}
          <div className="bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center flex-1 max-w-[400px] hover:border-[#C8A96A]/30 hover:bg-[#F8F3EA]/10 transition-all duration-300">
            <h3 className="text-[#F8F3EA] text-4xl md:text-5xl font-inter font-black tracking-widest mb-4 text-center">
              NINNA HUB
            </h3>
            <div className="w-12 h-[1px] bg-[#C8A96A]/50 mb-4"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[#F8F3EA]/60 text-sm font-jakarta uppercase tracking-widest">
                Inovação Integrada
              </span>
              <a href="https://instagram.com/ninna.hub" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] text-xs font-bold hover:text-[#F8F3EA] transition-colors">
                @ninna.hub
              </a>
            </div>
          </div>

          {/* Sponsor 4: Daniele Almeida */}
          <div className="bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center flex-1 max-w-[400px] hover:border-[#C8A96A]/30 hover:bg-[#F8F3EA]/10 transition-all duration-300">
            <h3 className="text-[#F8F3EA] text-4xl md:text-5xl font-inter font-black tracking-widest mb-4 text-center">
              DANIELE ALMEIDA
            </h3>
            <div className="w-12 h-[1px] bg-[#C8A96A]/50 mb-4"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[#F8F3EA]/60 text-sm font-jakarta uppercase tracking-widest">
                Coffee Break
              </span>
              <a href="https://instagram.com/danielealmeida_cofeebreack" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] text-xs font-bold hover:text-[#F8F3EA] transition-colors">
                @danielealmeida_cofeebreack
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
