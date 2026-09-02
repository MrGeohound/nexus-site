import React from 'react';

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 relative z-10 bg-[#050505] border-t border-[#C5C7CB]/10">
      <div className="container mx-auto px-6 lg:px-[10%]">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E1121F] mb-3">Parceiros & Apoiadores</p>
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight text-[#F5F5F7] uppercase leading-tight">
            Agradecemos as marcas que acreditam em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]">conexão de verdade</span>
          </h2>
          <p className="text-[#C5C7CB] font-inter text-lg max-w-2xl mx-auto">
            O NEXUS 1ª Edição foi um sucesso também graças aos parceiros que tornaram a experiência completa e marcante.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 items-stretch flex-wrap">
          {/* Sponsor 1: Wine */}
          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl p-8 flex flex-col items-center justify-center flex-1 min-w-[260px] max-w-[320px] hover:border-[#E1121F]/50 transition-all duration-300">
            <h3 className="text-[#F5F5F7] text-2xl md:text-3xl font-inter font-black tracking-widest mb-3 text-center">
              WINE VINHOS
            </h3>
            <div className="w-10 h-[1px] bg-[#E1121F]/50 mb-3"></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[#9A9AA0] text-xs font-jakarta uppercase tracking-widest">
                Loja Fortaleza
              </span>
              <a href="https://instagram.com/Wine.Fortaleza" target="_blank" rel="noopener noreferrer" className="text-[#E1121F] text-xs font-bold hover:text-[#F5F5F7] transition-colors">
                @Wine.Fortaleza
              </a>
            </div>
          </div>

          {/* Sponsor 2: Marvin */}
          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl p-8 flex flex-col items-center justify-center flex-1 min-w-[260px] max-w-[320px] hover:border-[#E1121F]/50 transition-all duration-300">
            <h3 className="text-[#F5F5F7] text-2xl md:text-3xl font-inter font-black tracking-widest mb-3 text-center">
              MARVIN
            </h3>
            <div className="w-10 h-[1px] bg-[#E1121F]/50 mb-3"></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[#9A9AA0] text-xs font-jakarta uppercase tracking-widest">
                Entregas Tecnológicas
              </span>
              <a href="https://instagram.com/marvinsolucoes" target="_blank" rel="noopener noreferrer" className="text-[#E1121F] text-xs font-bold hover:text-[#F5F5F7] transition-colors">
                @marvinsolucoes
              </a>
            </div>
          </div>

          {/* Sponsor 3: NINNA Hub */}
          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl p-8 flex flex-col items-center justify-center flex-1 min-w-[260px] max-w-[320px] hover:border-[#E1121F]/50 transition-all duration-300">
            <h3 className="text-[#F5F5F7] text-2xl md:text-3xl font-inter font-black tracking-widest mb-3 text-center">
              NINNA HUB
            </h3>
            <div className="w-10 h-[1px] bg-[#E1121F]/50 mb-3"></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[#9A9AA0] text-xs font-jakarta uppercase tracking-widest">
                Inovação Integrada
              </span>
              <a href="https://instagram.com/ninna.hub" target="_blank" rel="noopener noreferrer" className="text-[#E1121F] text-xs font-bold hover:text-[#F5F5F7] transition-colors">
                @ninna.hub
              </a>
            </div>
          </div>

          {/* Sponsor 4: Daniele Almeida */}
          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl p-8 flex flex-col items-center justify-center flex-1 min-w-[260px] max-w-[320px] hover:border-[#E1121F]/50 transition-all duration-300">
            <h3 className="text-[#F5F5F7] text-2xl md:text-3xl font-inter font-black tracking-widest mb-3 text-center">
              DANIELE ALMEIDA
            </h3>
            <div className="w-10 h-[1px] bg-[#E1121F]/50 mb-3"></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[#9A9AA0] text-xs font-jakarta uppercase tracking-widest">
                Coffee Break
              </span>
              <a href="https://instagram.com/danielealmeida_cofeebreack" target="_blank" rel="noopener noreferrer" className="text-[#E1121F] text-xs font-bold hover:text-[#F5F5F7] transition-colors">
                @danielealmeida_cofeebreack
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
