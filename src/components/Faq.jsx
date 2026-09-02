import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';

const faqs = [
  {
    question: 'Quando será a 2ª Edição do NEXUS?',
    answer:
      'A data oficial da 2ª Edição será divulgada em breve. Cadastrando-se na Lista VIP, você receberá a confirmação da data e o link de inscrição com prioridade absoluta.',
  },
  {
    question: 'Como funcionou a 1ª Edição do NEXUS?',
    answer:
      'A 1ª Edição foi realizada no Ninna Hub com 100% de ocupação. O evento reuniu empresários, executivos e líderes em um ambiente desenhado para conexões reais, palestras práticas e um happy hour exclusivo com nota 9,3 de satisfação.',
  },
  {
    question: 'O cadastramento na Lista VIP garante o menor valor?',
    answer:
      'Sim! Quem está na Lista VIP recebe o link de compra 24h antes da abertura pública e garante a condição exclusiva do Lote 1.',
  },
  {
    question: 'O evento é exclusivo para empresários e líderes?',
    answer:
      'O foco é no público decisor: empresários, executivos, gestores e profissionais liberais que buscam gerar negócios, parcerias e conexões estratégicas de verdade.',
  },
  {
    question: 'Posso levar um sócio ou convidado para a 2ª Edição?',
    answer:
      'Sim! Na liberação das vagas, teremos a opção de Passaporte Duplo/Corporativo com descontos para você levar sócios ou parceiros estratégicos.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    const willOpen = openIndex !== index;
    setOpenIndex(willOpen ? index : null);
    if (willOpen) track(EVENTS.FAQ_OPEN, { pergunta: faqs[index].question });
  };

  return (
    <section id="faq" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#050505] border-t border-[#C5C7CB]/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-12 tracking-tight text-center text-[#F5F5F7]">
          Dúvidas{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]">
            Frequentes
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-[#C5C7CB]/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold font-inter text-[#F5F5F7] pr-8">{faq.question}</span>
                  <div className={`shrink-0 text-[#E1121F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <X size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#C5C7CB] font-inter leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
