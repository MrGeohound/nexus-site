import React, { useState } from 'react';
import { Menu, X, Star, Sparkles } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

const goToListaVip = (origem) => {
  track(EVENTS.CLICK_PRIMARY_CTA, { origem });
  navigate('#lista-de-espera');
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#C5C7CB]/10">
      <div className="flex items-center z-[60]">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="relative flex items-center justify-center w-28 h-10 md:w-36 md:h-12 hover:opacity-90 transition-opacity">
          <img
            src="/assets/rebrand/logo-nexus-2026-nobg.png"
            alt="NEXUS 2026"
            className="h-[50px] md:h-[65px] object-contain"
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center gap-8 text-[15px] font-inter text-[#C5C7CB]">
        <a href="#about" onClick={(e) => { e.preventDefault(); navigate('/#about'); }} className="hover:text-[#E1121F] transition-colors">Quem somos</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); navigate('/manifesto'); }} className="hover:text-[#E1121F] transition-colors font-bold text-[#F5F5F7] flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#E1121F]" /> Manifesto
        </a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); navigate('/#depoimentos'); }} className="hover:text-[#E1121F] transition-colors">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); navigate('/#lista-de-espera'); }} className="hover:text-[#E1121F] transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); navigate('/galeria'); }} className="hover:text-[#E1121F] transition-colors">Galeria</a>

        <div className="flex items-center gap-6 pl-6 ml-2 border-l border-[#C5C7CB]/15">
          <div className="flex items-center gap-2 bg-[#E1121F]/15 border border-[#E1121F]/30 px-3 py-1.5 rounded-full text-xs font-bold text-[#E1121F]">
            <Star size={14} className="fill-[#E1121F]" />
            <span>Nota 9,3 · Pós-Evento</span>
          </div>

          <button onClick={() => goToListaVip('header_desktop')} className="bg-[#E1121F] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#A00D18] transition-colors text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(225,18,31,0.3)]">
            Lista VIP 2ª Edição
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center gap-4 z-[60]">
        <div className="flex items-center gap-1.5 bg-[#E1121F]/15 border border-[#E1121F]/30 px-2.5 py-1 rounded-full text-xs font-bold text-[#E1121F]">
          <Star size={12} className="fill-[#E1121F]" />
          <span>Nota 9,3</span>
        </div>

        <button className="p-2 text-[#F5F5F7]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#0B0B0D] flex flex-col items-center justify-center gap-7 text-xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/'); }} className="hover:text-[#E1121F] transition-colors text-[#F5F5F7]">Início</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/manifesto'); }} className="text-[#E1121F] font-extrabold flex items-center gap-2">
          <Sparkles size={18} /> Manifesto do Ecossistema
        </a>
        <a href="#about" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#about'); }} className="hover:text-[#E1121F] transition-colors text-[#F5F5F7]">Quem somos</a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#depoimentos'); }} className="hover:text-[#E1121F] transition-colors text-[#F5F5F7]">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#lista-de-espera'); }} className="hover:text-[#E1121F] transition-colors text-[#F5F5F7]">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/galeria'); }} className="hover:text-[#E1121F] transition-colors text-[#F5F5F7]">Galeria</a>
        <button onClick={() => { setMobileMenuOpen(false); goToListaVip('header_mobile'); }} className="mt-2 bg-[#E1121F] text-white font-bold px-8 py-3 rounded-full hover:bg-[#A00D18] transition-colors text-sm uppercase tracking-wide">
          Lista VIP 2ª Edição
        </button>
      </div>
    </header>
  );
}
