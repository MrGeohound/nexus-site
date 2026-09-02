import React from 'react';
import { Users, BookOpen, Briefcase, Wine } from 'lucide-react';

export default function About() {
  const cards = [
    { 
      icon: <Users size={32} className="text-[#E1121F]" />, 
      title: 'Conexão intencional',
      text: 'Atividades desenhadas para fazer os participantes se conhecerem de forma prática, sem depender apenas do acaso.'
    },
    { 
      icon: <BookOpen size={32} className="text-[#E1121F]" />, 
      title: 'Conteúdo aplicável',
      text: 'Palestras e conversas voltadas para gestão, posicionamento, pessoas, finanças, comunicação, IA e crescimento empresarial.'
    },
    { 
      icon: <Briefcase size={32} className="text-[#E1121F]" />, 
      title: 'Ambiente de decisão',
      text: 'Um encontro para quem empreende, lidera, vende, contrata, decide e busca crescer com mais clareza.'
    },
    { 
      icon: <Wine size={32} className="text-[#E1121F]" />, 
      title: 'Happy hour estratégico',
      text: 'Vinho, finger foods e um ambiente mais leve para transformar conversas em oportunidades.'
    },
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#050505] border-t border-[#C5C7CB]/10">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#E1121F]/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-8 tracking-tight text-[#F5F5F7] leading-tight">
            Chega de evento onde todo mundo assiste, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]">aplaude e vai embora igual.</span>
          </h2>
          <p className="text-[#C5C7CB] text-lg leading-relaxed mb-6 font-inter">
            O mercado está cheio de encontros onde as pessoas entram como desconhecidas e saem como contatos esquecidos no celular.
          </p>
          <p className="text-[#C5C7CB] text-lg leading-relaxed mb-8 font-inter">
            O <strong className="text-[#F5F5F7]">NEXUS</strong> nasce com uma proposta diferente: criar um ambiente onde empresários, executivos e líderes conversem de verdade, troquem experiências úteis e encontrem possibilidades concretas de parceria.
          </p>
          <div className="pl-6 border-l-2 border-[#E1121F]">
            <p className="text-[#F5F5F7] font-inter text-xl font-semibold italic">
              Não é sobre colecionar cartões.<br/>É sobre criar pontes.
            </p>
          </div>
        </div>

        {/* Right Grid (Cards) */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 lg:mt-0">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl p-8 hover:border-[#E1121F]/50 transition-all duration-300 group"
            >
              <div className="bg-[#E1121F]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold font-inter text-[#F5F5F7] mb-3">{card.title}</h3>
              <p className="text-[#9A9AA0] font-inter text-sm leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
