import React from 'react';

const speakers = [
  {
    name: 'Anderson Caruso',
    role: 'Opera Prime',
    theme: 'Tema: Gestão Financeira',
    image: '/assets/speakers/anderson-caruso.png'
  },
  {
    name: 'Ana Amélia Rodrigues',
    role: 'Founder da TOM',
    theme: 'Especialista em Gestão de Pessoas e Comunicação. Mais de 10 anos como executiva de RH.',
    image: '/assets/speakers/ana-amelia.png'
  },
  {
    name: 'Gabriela Ramos',
    role: 'Founder do Tao ON',
    theme: 'Especialista em Posicionamento e Produção de conteúdo. 10 anos no mercado de social media.',
    image: '/assets/speakers/gabi.png'
  },
  {
    name: 'Rejane Abreu',
    role: 'Executiva',
    theme: '+23 anos na Hapvida, sendo um pilar no crescimento e segmento de atendimento ao cliente.',
    image: '/assets/speakers/rejane.png'
  },
  {
    name: 'Michael',
    role: 'Ninna Hub',
    theme: 'Abertura & Inovação Tecnológica',
    image: '/assets/speakers/michael-ninna.png'
  }
];

export default function SpeakersMarquee() {
  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [...speakers, ...speakers];

  return (
    <section id="speakers" className="py-24 relative z-10 overflow-hidden bg-[#070b0a] border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-[10%] mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight">
          Conheça Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ed29c] to-emerald-600">Especialistas</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto font-inter text-lg">
          Nomes de peso do mercado que trarão insights valiosos e aplicáveis para alavancar a sua empresa.
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#070b0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#070b0a] to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-[max-content]">
          {marqueeItems.map((speaker, index) => (
            <div 
              key={index} 
              className="liquid-glass w-[320px] shrink-0 mx-4 rounded-2xl overflow-hidden flex flex-col group/card cursor-pointer"
            >
              <div className="h-[320px] w-full overflow-hidden relative bg-white/5">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover/card:grayscale-0 transition-all duration-500 transform group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/40 to-transparent opacity-80"></div>
              </div>
              <div className="p-6 relative -mt-16 z-10">
                <h3 className="text-2xl font-bold font-inter mb-1 text-white group-hover/card:text-[#5ed29c] transition-colors">{speaker.name}</h3>
                <p className="text-[#5ed29c] font-bold text-sm tracking-widest uppercase mb-3 font-jakarta">{speaker.role}</p>
                <p className="text-white/60 text-sm font-inter leading-relaxed line-clamp-3">
                  {speaker.theme}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
