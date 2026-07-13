import React from 'react';
import { Users, BookOpen, Briefcase, Wine } from 'lucide-react';

export default function About() {
  const cards = [
    { 
      icon: <Users size={32} className="text-[#C8A96A]" />, 
      title: 'Conexão intencional',
      text: 'Atividades desenhadas para fazer os participantes se conhecerem de forma prática, sem depender apenas do acaso.'
    },
    { 
      icon: <BookOpen size={32} className="text-[#C8A96A]" />, 
      title: 'Conteúdo aplicável',
      text: 'Palestras e conversas voltadas para gestão, posicionamento, pessoas, finanças, comunicação, IA e crescimento empresarial.'
    },
    { 
      icon: <Briefcase size={32} className="text-[#C8A96A]" />, 
      title: 'Ambiente de decisão',
      text: 'Um encontro para quem empreende, lidera, vende, contrata, decide e busca crescer com mais clareza.'
    },
    { 
      icon: <Wine size={32} className="text-[#C8A96A]" />, 
      title: 'Happy hour estratégico',
      text: 'Vinho, finger foods e um ambiente mais leve para transformar conversas em oportunidades.'
    },
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#12333A]">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-8 tracking-tight text-[#F8F3EA] leading-tight">
            Chega de evento onde todo mundo assiste, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-[#E8D8BE]">aplaude e vai embora igual.</span>
          </h2>
          <p className="text-[#F8F3EA]/70 text-lg leading-relaxed mb-6 font-inter">
            O mercado está cheio de encontros onde as pessoas entram como desconhecidas e saem como contatos esquecidos no celular.
          </p>
          <p className="text-[#F8F3EA]/70 text-lg leading-relaxed mb-8 font-inter">
            O <strong className="text-[#F8F3EA]">NEXUS</strong> nasce com uma proposta diferente: criar um ambiente onde empresários, executivos e líderes conversem de verdade, troquem experiências úteis e encontrem possibilidades concretas de parceria.
          </p>
          <div className="pl-6 border-l-2 border-[#C8A96A]">
            <p className="text-[#F8F3EA] font-inter text-xl font-semibold italic">
              Não é sobre colecionar cartões.<br/>É sobre criar pontes.
            </p>
          </div>
        </div>

        {/* Right Grid (Cards) */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 lg:mt-0">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 rounded-2xl p-8 hover:bg-[#F8F3EA]/10 hover:border-[#C8A96A]/30 transition-all duration-300 group"
            >
              <div className="bg-[#C8A96A]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold font-inter text-[#F8F3EA] mb-3">{card.title}</h3>
              <p className="text-[#F8F3EA]/60 font-inter text-sm leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
