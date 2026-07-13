import React from 'react';

const scheduleItems = [
  {
    time: '16h30',
    title: 'Credenciamento e recepção',
    description: 'Chegada dos participantes, ambientação e início das primeiras conexões.'
  },
  {
    time: '17h00',
    title: 'Abertura NEXUS',
    description: 'Apresentação da proposta do encontro e condução inicial da experiência.'
  },
  {
    time: '17h20',
    title: 'Conteúdo e provocações empresariais',
    description: 'Palestras e conversas com especialistas sobre gestão, pessoas, posicionamento, comunicação, conteúdo, IA e crescimento.'
  },
  {
    time: '19h00',
    title: 'Dinâmicas de conexão',
    description: 'Atividades guiadas para aproximar os participantes e gerar conversas mais relevantes.'
  },
  {
    time: '20h00',
    title: 'Palestra de destaque',
    description: 'Com Rejane Abreu, executiva de referência no setor de Saúde.'
  },
  {
    time: '21h00',
    title: 'Happy hour NEXUS',
    description: 'Vinhos, finger foods e networking em um ambiente mais leve, próximo e estratégico.'
  },
  {
    time: '22h00',
    title: 'Encerramento',
    description: ''
  }
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#12333A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight text-[#F8F3EA]">
            Uma experiência pensada do <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-[#E8D8BE]">início ao fim.</span>
          </h2>
          <p className="text-[#F8F3EA]/60 font-inter text-lg">
            A programação poderá sofrer pequenos ajustes para melhorar a experiência dos participantes.
          </p>
        </div>

        <div className="relative border-l border-[#F8F3EA]/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#F8F3EA]/10 to-transparent -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {scheduleItems.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Dot Marker */}
                <div className="absolute left-[-37px] md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-[#C8A96A] shadow-[0_0_15px_rgba(200,169,106,0.6)] md:-translate-x-1/2 md:-translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-150"></div>
                
                {/* Content Box */}
                <div className="md:w-1/2 md:px-12 relative">
                  <div className={`bg-[#F8F3EA]/5 border border-[#F8F3EA]/10 p-6 rounded-2xl hover:bg-[#F8F3EA]/10 hover:border-[#C8A96A]/50 transition-all ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="font-jakarta text-[#C8A96A] font-bold text-sm tracking-widest mb-2">
                      {item.time}
                    </div>
                    <h3 className="text-2xl font-inter font-bold text-[#F8F3EA] mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-[#F8F3EA]/60 font-inter leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
