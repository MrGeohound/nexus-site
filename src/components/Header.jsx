import React, { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

const goToListaVip = (origem) => {
  track(EVENTS.CLICK_PRIMARY_CTA, { origem });
  navigate('#lista-de-espera');
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-[#12333A]/90 backdrop-blur-md border-b border-[#F8F3EA]/10">
      <div className="flex items-center z-[60]">
        <a href="#home" className="relative flex items-center justify-center w-24 h-10 md:w-32 md:h-12 hover:opacity-90 transition-opacity">
          <img
            src="/assets/logo-nexus-3.png"
            alt="Ponte NEXUS"
            className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110px] md:h-[140px] max-w-none object-contain pointer-events-none"
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center gap-8 text-[16px] font-inter text-[#F8F3EA]/80">
        <a href="#about" className="hover:text-[#C8A96A] transition-colors">Quem somos</a>
        <a href="#depoimentos" className="hover:text-[#C8A96A] transition-colors">Depoimentos</a>
        <a href="#speakers" className="hover:text-[#C8A96A] transition-colors">Convidados</a>
        <a href="#lista-de-espera" className="hover:text-[#C8A96A] transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); navigate('/galeria'); }} className="hover:text-[#C8A96A] transition-colors">Galeria</a>

        <div className="flex items-center gap-6 pl-6 ml-2 border-l border-[#F8F3EA]/10">
          <div className="flex items-center gap-2 bg-[#C8A96A]/15 border border-[#C8A96A]/30 px-3 py-1.5 rounded-full text-xs font-bold text-[#C8A96A]">
            <Star size={14} className="fill-[#C8A96A]" />
            <span>Nota 9,3 · Pós-Evento</span>
          </div>

          <button onClick={() => goToListaVip('header_desktop')} className="bg-[#B86B4B] text-[#F8F3EA] font-bold px-6 py-2.5 rounded-full hover:bg-[#9F573E] transition-colors text-sm uppercase tracking-wide">
            Lista VIP 2ª Edição
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center gap-4 z-[60]">
        <div className="flex items-center gap-1.5 bg-[#C8A96A]/15 border border-[#C8A96A]/30 px-2.5 py-1 rounded-full text-xs font-bold text-[#C8A96A]">
          <Star size={12} className="fill-[#C8A96A]" />
          <span>Nota 9,3</span>
        </div>

        <button className="p-2 text-[#F8F3EA]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#12333A] flex flex-col items-center justify-center gap-8 text-2xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Quem somos</a>
        <a href="#depoimentos" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Depoimentos</a>
        <a href="#speakers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Convidados</a>
        <a href="#lista-de-espera" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/galeria'); }} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Galeria</a>
        <button onClick={() => { setMobileMenuOpen(false); goToListaVip('header_mobile'); }} className="mt-2 bg-[#B86B4B] text-[#F8F3EA] font-bold px-8 py-3 rounded-full hover:bg-[#9F573E] transition-colors text-base uppercase tracking-wide">
          Lista VIP 2ª Edição
        </button>
      </div>
    </header>
  );
}
