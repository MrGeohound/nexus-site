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
    <section id="depoimentos" className="relative z-10 bg-[#12333A] py-24 px-6 lg:px-[10%] border-t border-[#F8F3EA]/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 text-[#C8A96A] text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={16} /> Depoimentos Autorizados
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F8F3EA] tracking-tight mb-4">
            O que os participantes disseram sobre a 1ª Edição
          </h2>
          <p className="text-lg text-[#F8F3EA]/70 max-w-2xl mx-auto">
            Avaliações reais colhidas logo após o encerramento do evento.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 hover:border-[#C8A96A]/40 hover:bg-[#F8F3EA]/[0.06] transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote size={28} className="text-[#C8A96A]/40 group-hover:text-[#C8A96A] transition-colors" />
                  <div className="flex items-center gap-1.5 bg-[#C8A96A]/15 border border-[#C8A96A]/30 text-[#C8A96A] px-3 py-1 rounded-full text-xs font-extrabold">
                    <Star size={12} className="fill-[#C8A96A]" />
                    <span>Nota {t.rating}</span>
                  </div>
                </div>

                <p className="text-[#F8F3EA] text-base md:text-lg italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8F3EA]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/40 flex items-center justify-center text-[#C8A96A] font-bold text-sm">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F8F3EA]">{t.name}</h4>
                  <p className="text-xs text-[#C8A96A]/80">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
