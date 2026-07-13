import React from 'react';

export default function Speakers() {
  const organizers = [
    {
      name: 'Anderson Caruso',
      role: 'Founder da Opera Prime',
      theme: 'Gestão · Finanças · Pessoas · IA',
      bio: 'Especialista em Gestão Financeira, Gestão de Pessoas e Implantação de IA. MBA em Gestão Empresarial pela FGV. Possui 15 anos de carreira como gestor e 10 anos como executivo em multinacionais, atuando na construção de operações, liderança de times e melhoria de performance.',
      image: '/assets/speakers/anderson-caruso.png'
    },
    {
      name: 'Ana Amélia Rodrigues',
      role: 'Founder da AA Gestão e TOM',
      theme: 'Pessoas · Comunicação · Posicionamento',
      bio: 'Especialista em Gestão de Pessoas, Comunicação e Posicionamento. Formada em Psicologia, possui mais de 15 anos de experiência gerando oportunidades na vida das pessoas por meio do desenvolvimento humano, da comunicação e da construção de presença.',
      image: '/assets/speakers/ana-amelia.png'
    },
    {
      name: 'Gabriela Ramos',
      role: 'Founder do Tao ON',
      theme: 'Conteúdo · Marketing · Posicionamento',
      bio: 'Especialista em Posicionamento e Produção de Conteúdo. Formada em Marketing, vive há 10 anos o mercado de social media, ajudando marcas e profissionais a comunicarem melhor sua autoridade, sua essência e sua proposta de valor.',
      image: '/assets/speakers/gabi.png'
    }
  ];

  return (
    <section id="speakers" className="py-24 relative z-10 overflow-hidden bg-[#E8D8BE] border-y border-[#12333A]/5">
      <div className="container mx-auto px-6 lg:px-[10%] mb-16">
        
        {/* SEÇÃO 5 - PALESTRANTE DE DESTAQUE */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight text-[#12333A]">
              Palestrante <span className="text-[#B86B4B]">Confirmada</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#12333A] border border-[#F8F3EA]/10 rounded-3xl overflow-hidden p-6 md:p-10 relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96A]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-full md:w-1/3 aspect-[4/5] rounded-2xl overflow-hidden relative border border-[#F8F3EA]/10 shadow-2xl shrink-0">
              <img 
                src="/assets/speakers/rejane.png" 
                alt="Rejane Abreu" 
                className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12333A] via-transparent to-transparent opacity-80"></div>
            </div>
            
            <div className="w-full md:w-2/3 relative z-10">
              <div className="inline-block px-3 py-1 bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Executiva de referência no setor de Saúde
              </div>
              <h3 className="text-4xl md:text-5xl font-inter font-black text-[#F8F3EA] mb-2">Rejane Abreu</h3>
              <h4 className="text-xl md:text-2xl font-inter text-[#F8F3EA]/60 font-medium mb-6">Head de Atendimento Hapvida</h4>
              
              <p className="text-[#F8F3EA]/80 font-inter text-lg leading-relaxed max-w-2xl">
                Com 23 anos de trajetória guiando uma das maiores operações de atendimento do setor de Saúde, Rejane Abreu é uma executiva de referência para quem busca entender liderança, relacionamento com clientes, operação e gestão em ambientes complexos.
              </p>
            </div>
          </div>
        </div>

        {/* SEÇÃO 6 - ORGANIZADORES */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-inter font-extrabold mb-4 tracking-tight text-[#12333A]">
              Quem está por trás do <span className="text-[#B86B4B]">NEXUS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizers.map((org, index) => (
              <div key={index} className="bg-[#12333A] border border-[#F8F3EA]/10 rounded-2xl overflow-hidden hover:border-[#C8A96A]/30 shadow-xl transition-all duration-300 group flex flex-col">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={org.image} 
                    alt={org.name} 
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12333A] via-[#12333A]/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold font-inter text-[#F8F3EA] leading-tight">{org.name}</h3>
                    <p className="text-[#C8A96A] font-medium text-sm mt-1">{org.role}</p>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs uppercase tracking-widest font-bold text-[#F8F3EA]/40 mb-4 pb-4 border-b border-[#F8F3EA]/10">
                    {org.theme}
                  </div>
                  <p className="text-[#F8F3EA]/70 font-inter text-sm leading-relaxed">
                    {org.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
