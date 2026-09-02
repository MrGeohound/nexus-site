import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Maravilhoso",
    name: "Ricardo Capistrano",
    company: "Boxmove",
    rating: 10,
  },
  {
    quote: "Se posicionar é fazer barulho",
    name: "Wilker Corumba",
    company: "Saron investments",
    rating: 10,
  },
  {
    quote: "Conexões com qualidade e intencionalidade.",
    name: "Camilo Castelo",
    company: "Ágape Soluções Financeiras",
    rating: 10,
  },
  {
    quote: "Insights muito úteis para mim.",
    name: "Silvio César Vasconcelos de Sousa",
    company: "Move Branding / CEO",
    rating: 8,
  },
  {
    quote: "Percebi um excelente ambiente de amizades e pessoas batalhadoras com grandes perspectivas de troca de serviços e conhecimentos.",
    name: "Lucas",
    company: "Participante Conectado",
    rating: 10,
  },
  {
    quote: "Interessante oportunidade e uma dinâmica de valor do evento que realmente tornou o espectador parte ativa cumprindo o propósito do mesmo, parabéns!",
    name: "Giovani Santos",
    company: "THEPLAN consultoria · Fundador",
    rating: 8,
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative z-10 bg-[#050505] py-24 px-6 lg:px-[10%] border-t border-[#C5C7CB]/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E1121F]/40 bg-[#E1121F]/10 text-[#E1121F] text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={16} /> Depoimentos Autorizados
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mb-4">
            O que os participantes disseram sobre a 1ª Edição
          </h2>
          <p className="text-lg text-[#C5C7CB] max-w-2xl mx-auto">
            Avaliações reais colhidas logo após o encerramento do evento.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-[#C5C7CB]/15 bg-[#0B0B0D] p-6 hover:border-[#E1121F]/50 transition-all duration-300 group shadow-lg"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote size={28} className="text-[#E1121F]/40 group-hover:text-[#E1121F] transition-colors" />
                  <div className="flex items-center gap-1.5 bg-[#E1121F]/15 border border-[#E1121F]/30 text-[#E1121F] px-3 py-1 rounded-full text-xs font-extrabold">
                    <Star size={12} className="fill-[#E1121F]" />
                    <span>Nota {t.rating}</span>
                  </div>
                </div>

                <p className="text-[#F5F5F7] text-base md:text-lg italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5C7CB]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E1121F]/20 border border-[#E1121F]/40 flex items-center justify-center text-[#E1121F] font-bold text-sm">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F7]">{t.name}</h4>
                  <p className="text-xs text-[#C5C7CB]">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
