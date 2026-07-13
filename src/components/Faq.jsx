import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';

const faqs = [
  {
    question: 'Quando e onde será o NEXUS?',
    answer:
      'Dia 23 de julho de 2026, das 16h30 às 22h, no Ninna Hub — Avenida Dom Manuel, 1020, Fortaleza/CE.',
  },
  {
    question: 'Como funciona o Passaporte Duplo+?',
    answer:
      'É a opção para levar mais alguém estratégico (sócio, parceiro, cliente ou líder). O valor por pessoa fica mais vantajoso a partir de 2 ingressos. A compra é feita na Sympla como as demais.',
  },
  {
    question: 'O evento é apenas para empresários?',
    answer:
      'O foco principal é o público empresarial, mas o evento também é indicado para executivos, gestores, profissionais liberais, consultores e especialistas que desejam ampliar conexões estratégicas.',
  },
  {
    question: 'Vai ter networking de verdade?',
    answer:
      'Sim. O NEXUS foi criado justamente para fugir do modelo passivo de evento. Teremos atividades de conexão entre os participantes e momentos pensados para gerar conversas relevantes.',
  },
  {
    question: 'O happy hour está incluso?',
    answer:
      'Sim. O evento contará com happy hour com vinho e finger foods ao final da programação.',
  },
  {
    question: 'Posso transferir meu ingresso para outra pessoa?',
    answer:
      'A emissão e as regras de transferência do ingresso seguem a política da Sympla, plataforma oficial de venda. Consulte as condições no seu e-mail de confirmação ou fale com nosso suporte.',
  },
  {
    question: 'Como funciona cancelamento e reembolso?',
    answer:
      'Compras realizadas pela Sympla seguem a política de reembolso da plataforma e a legislação aplicável. Em caso de dúvida, entre em contato com nosso suporte.',
  },
  {
    question: 'Qual a vestimenta recomendada?',
    answer:
      'Ambiente de negócios: recomendamos traje social ou business casual, à vontade para uma noite de conexões e happy hour.',
  },
  {
    question: 'As vagas são limitadas?',
    answer:
      'Sim. A limitação de vagas é importante para preservar a qualidade da experiência e das conexões.',
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
    <section id="faq" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#E8D8BE]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-12 tracking-tight text-center text-[#12333A]">
          Dúvidas{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B86B4B] to-[#C8A96A]">
            Frequentes
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-[#12333A]/5 border border-[#12333A]/10 rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-[#12333A]/10 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold font-inter text-[#12333A] pr-8">{faq.question}</span>
                  <div className={`shrink-0 text-[#B86B4B] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <X size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#12333A]/70 font-inter leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
