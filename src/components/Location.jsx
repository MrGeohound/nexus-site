import React from 'react';
import { MapPin, Navigation, Car, ExternalLink } from 'lucide-react';

export default function Location() {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Avenida%20Dom%20Manuel%201020%20Fortaleza%20CE%2060060-090";

  return (
    <section id="location" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#F8F3EA] border-t border-[#12333A]/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-extrabold mb-4 tracking-tight text-[#12333A]">
            Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B86B4B] to-[#C8A96A]">chegar</span>
          </h2>
          <p className="text-[#12333A]/60 font-inter text-lg">
            O NEXUS acontecerá no Ninna Hub, em uma localização estratégica de Fortaleza.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#12333A]/5 border border-[#12333A]/10 rounded-3xl p-6 md:p-12 shadow-sm">
          
          {/* Informações */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#C8A96A]/10 p-4 rounded-xl border border-[#C8A96A]/20">
                <MapPin size={32} className="text-[#B86B4B]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-inter text-[#12333A]">Ninna Hub</h3>
                <p className="text-[#12333A]/50 font-jakarta text-sm">Fortaleza, Ceará</p>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Navigation size={24} className="text-[#12333A]/40 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#12333A] font-inter">Endereço Completo</h4>
                  <p className="text-[#12333A]/60 font-inter leading-relaxed">
                    Avenida Dom Manuel, 1020<br/>
                    Fortaleza - CE, 60060-090
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Car size={24} className="text-[#12333A]/40 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#12333A] font-inter">Facilidades</h4>
                  <p className="text-[#12333A]/60 font-inter leading-relaxed">
                    Estacionamentos próximos e fácil acesso para motoristas de aplicativo.
                  </p>
                </div>
              </div>
            </div>

            <a 
              href={mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#B86B4B] text-[#F8F3EA] font-bold px-8 py-4 rounded-full hover:bg-[#9F573E] transition-colors uppercase tracking-wide font-inter w-full md:w-auto justify-center shadow-lg"
            >
              Abrir no GPS
              <ExternalLink size={18} />
            </a>
          </div>

          {/* Imagem / Mapa Visual (Placeholder estilizado) */}
          <div className="order-1 lg:order-2 w-full h-[300px] lg:h-[450px] bg-[#12333A] rounded-2xl relative overflow-hidden group border border-[#12333A]/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3394627195435!2d-38.49887718524089!3d-3.736021697282688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7487eb2327521%3A0x67db23a54bdeee2e!2sNINNA%20Hub!5e0!3m2!1spt-BR!2sbr!4v1684345678901!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.9) contrast(1.2) opacity(0.7)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-500 group-hover:filter-[grayscale(0.3)_contrast(1.1)_opacity(1)]"
            ></iframe>
            
            {/* Link invisível que sobrepõe o iframe e redireciona ao clique */}
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 cursor-pointer"
              title="Abrir no Google Maps"
            >
              <span className="sr-only">Abrir localização no Google Maps</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
