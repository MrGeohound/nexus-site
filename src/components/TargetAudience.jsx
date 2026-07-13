import React from 'react';
import { Building2, Briefcase, UserCircle, Lightbulb, TrendingUp, Users } from 'lucide-react';

export default function TargetAudience() {
  const nodes = [
    { label: 'Empresários e fundadores', icon: Building2, pos: { x: 280, y: 0 } },
    { label: 'Executivos e gestores', icon: Briefcase, pos: { x: 140, y: 242 } },
    { label: 'Profissionais liberais', icon: UserCircle, pos: { x: -140, y: 242 } },
    { label: 'Consultores e especialistas', icon: Lightbulb, pos: { x: -280, y: 0 } },
    { label: 'Líderes comerciais', icon: TrendingUp, pos: { x: -140, y: -242 } },
    { label: 'Pessoas que buscam ampliar repertório', icon: Users, pos: { x: 140, y: -242 } },
  ];

  return (
    <section id="audience" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#F8F3EA] border-y border-[#12333A]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-6 tracking-tight text-[#12333A] leading-tight">
            Para quem entende que crescimento <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B86B4B] to-[#C8A96A]">não acontece sozinho.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#12333A]/70 font-inter leading-relaxed max-w-3xl mx-auto">
            O NEXUS reúne empresários, gestores e especialistas que sabem que boas conexões podem abrir novas oportunidades de negócio.
          </p>
        </div>

        {/* Visualização Desktop: HUB */}
        <div className="hidden lg:block relative h-[600px] w-full max-w-[800px] mx-auto mb-16">
          
          {/* SVG para linhas de conexão */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {nodes.map((node, i) => (
              <line 
                key={i}
                x1="50%" 
                y1="50%" 
                x2={`calc(50% + ${node.pos.x}px)`} 
                y2={`calc(50% + ${node.pos.y}px)`} 
                stroke="#C8A96A" 
                strokeWidth="2" 
                opacity="0.4" 
                strokeDasharray="6 6" 
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>

          {/* Nó Central NEXUS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center bg-[#12333A] rounded-full w-56 h-56 border-[6px] border-[#F8F3EA] shadow-[0_0_50px_rgba(200,169,106,0.3)] hover:scale-105 transition-transform duration-500 overflow-hidden">
            <div className="relative w-full h-[60px] flex items-center justify-center mb-1">
              <img src="/assets/logo-nexus-4.png" alt="NEXUS" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[160px] max-w-none object-contain pointer-events-none" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[#F8F3EA]/80 text-center text-[11px] px-4 font-inter font-medium leading-tight">
                Ambiente de conexão empresarial guiada
              </span>
            </div>
          </div>

          {/* Nós em Órbita */}
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div 
                key={i}
                className="absolute z-10 flex flex-col items-center justify-center bg-[#F8F3EA] border border-[#C8A96A]/40 rounded-2xl p-5 w-48 shadow-xl hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(184,107,75,0.15)] transition-all duration-300 group"
                style={{
                  top: `calc(50% + ${node.pos.y}px)`,
                  left: `calc(50% + ${node.pos.x}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-12 h-12 bg-[#12333A]/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#B86B4B]/10 transition-colors">
                  <Icon size={24} className="text-[#B86B4B]" />
                </div>
                <span className="text-center text-sm font-bold font-inter text-[#12333A] leading-snug">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Visualização Mobile/Tablet: Pilha Vertical (Timeline) */}
        <div className="lg:hidden relative py-8 px-4">
          {/* Linha vertical */}
          <div className="absolute top-0 bottom-0 left-10 md:left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#C8A96A]/40 to-transparent md:-translate-x-1/2 z-0"></div>
          
          <div className="space-y-6 relative z-10">
            
            {/* Nó Central Mobile */}
            <div className="flex justify-start md:justify-center mb-10 pl-2 md:pl-0">
              <div className="bg-[#12333A] p-6 rounded-3xl border border-[#C8A96A]/30 shadow-xl text-center w-[240px] relative">
                {/* Indicador de Timeline */}
                {/* Indicador de Timeline */}
                <div className="absolute left-[-16px] md:left-1/2 top-1/2 -translate-y-1/2 md:translate-y-0 md:-top-4 md:-translate-x-1/2 w-4 h-4 bg-[#B86B4B] rounded-full border-4 border-[#F8F3EA] z-10 hidden md:block"></div>
                <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#B86B4B] rounded-full border-4 border-[#F8F3EA] z-10 md:hidden"></div>
                
                <div className="relative w-full h-[40px] mb-2 flex justify-center overflow-hidden">
                  <img src="/assets/logo-nexus-4.png" alt="NEXUS" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120px] max-w-none object-contain pointer-events-none" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[#F8F3EA]/80 text-xs font-inter leading-tight block text-center">
                    Ambiente de conexão empresarial guiada
                  </span>
                </div>
              </div>
            </div>
            
            {/* Perfis Mobile */}
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex items-center md:w-[50%] ${isEven ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:flex-row-reverse'} relative group`}>
                  
                  {/* Pontos da Timeline */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C8A96A] rounded-full border-2 border-[#F8F3EA] shadow-sm transition-transform group-hover:scale-150 hidden md:block ${isEven ? 'left-[-6px]' : 'right-[-6px]'}`}></div>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C8A96A] rounded-full border-2 border-[#F8F3EA] shadow-sm md:hidden"></div>

                  <div className="ml-14 md:ml-0 w-full bg-white/60 backdrop-blur-sm border border-[#12333A]/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#C8A96A]/50 transition-all flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0 bg-[#B86B4B]/10 rounded-full flex items-center justify-center">
                      <Icon size={20} className="text-[#B86B4B]" />
                    </div>
                    <span className="text-[#12333A] text-[15px] font-bold font-inter leading-tight">{node.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frase de Impacto */}
        <div className="mt-16 lg:mt-24 max-w-4xl mx-auto text-center border-t border-[#12333A]/10 pt-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F3EA] px-6 text-[#C8A96A]">
            <Users size={32} />
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-inter font-bold text-[#12333A] leading-relaxed tracking-tight">
            "Se você quer apenas assistir a uma palestra, existem muitos eventos.<br/>
            <span className="text-[#B86B4B]">Se quer sair com novas conversas abertas, o NEXUS é para você.</span>"
          </h3>
        </div>

      </div>
    </section>
  );
}
