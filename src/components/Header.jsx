import React, { useState } from 'react';
import { Menu, X, Star, Sparkles } from 'lucide-react';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

const goToListaVip = (origem) => {
  track(EVENTS.CLICK_PRIMARY_CTA, { origem });
  navigate('#lista-de-espera');
};

export default function Header({ isRebranded = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md border-b transition-colors duration-700 ${
      isRebranded 
        ? 'bg-[#0B0B0D]/90 border-[#C5C7CB]/15 text-[#F5F5F7]' 
        : 'bg-[#12333A]/90 border-[#F8F3EA]/10 text-[#F8F3EA]'
    }`}>
      <div className="flex items-center z-[60]">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="relative flex items-center justify-center w-28 h-10 md:w-36 md:h-12 hover:opacity-90 transition-opacity">
          <img
            src={isRebranded ? "/assets/rebrand/logo-nexus-principal.png" : "/assets/logo-nexus-3.png"}
            alt="NEXUS"
            className={isRebranded ? "h-[45px] md:h-[55px] object-contain" : "absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110px] md:h-[140px] max-w-none object-contain pointer-events-none"}
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className={`hidden lg:flex items-center gap-8 text-[15px] font-inter ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#F8F3EA]/80'}`}>
        <a href="#about" onClick={(e) => { e.preventDefault(); navigate('/#about'); }} className="hover:text-[#E1121F] transition-colors">Quem somos</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); navigate('/manifesto'); }} className="hover:text-[#E1121F] transition-colors font-bold flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#E1121F]" /> Manifesto
        </a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); navigate('/#depoimentos'); }} className="hover:text-[#E1121F] transition-colors">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); navigate('/#lista-de-espera'); }} className="hover:text-[#E1121F] transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); navigate('/galeria'); }} className="hover:text-[#E1121F] transition-colors">Galeria</a>

        <div className={`flex items-center gap-6 pl-6 ml-2 border-l ${isRebranded ? 'border-[#C5C7CB]/20' : 'border-[#F8F3EA]/10'}`}>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
            isRebranded 
              ? 'bg-[#C5C7CB]/10 border border-[#C5C7CB]/30 text-[#C5C7CB]' 
              : 'bg-[#C8A96A]/15 border border-[#C8A96A]/30 text-[#C8A96A]'
          }`}>
            <Star size={14} className={isRebranded ? "fill-[#C5C7CB]" : "fill-[#C8A96A]"} />
            <span>Nota 9,3 · Pós-Evento</span>
          </div>

          <button 
            onClick={() => goToListaVip('header_desktop')} 
            className={`font-bold px-6 py-2.5 rounded-full transition-all text-xs uppercase tracking-wider ${
              isRebranded 
                ? 'bg-[#E1121F] text-white hover:bg-[#A00D18] shadow-[0_0_20px_rgba(225,18,31,0.3)]' 
                : 'bg-[#B86B4B] text-[#F8F3EA] hover:bg-[#9F573E]'
            }`}
          >
            Lista VIP 2ª Edição
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center gap-4 z-[60]">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
          isRebranded 
            ? 'bg-[#C5C7CB]/10 border border-[#C5C7CB]/30 text-[#C5C7CB]' 
            : 'bg-[#C8A96A]/15 border border-[#C8A96A]/30 text-[#C8A96A]'
        }`}>
          <Star size={12} className={isRebranded ? "fill-[#C5C7CB]" : "fill-[#C8A96A]"} />
          <span>Nota 9,3</span>
        </div>

        <button className={`p-2 ${isRebranded ? 'text-[#F5F5F7]' : 'text-[#F8F3EA]'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 text-xl transition-all duration-300 ${
        isRebranded ? 'bg-[#0B0B0D] text-[#F5F5F7]' : 'bg-[#12333A] text-[#F8F3EA]'
      } ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/'); }} className="hover:text-[#E1121F] transition-colors">Início</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/manifesto'); }} className="text-[#E1121F] font-extrabold flex items-center gap-2">
          <Sparkles size={18} /> Manifesto do Ecossistema
        </a>
        <a href="#about" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#about'); }} className="hover:text-[#E1121F] transition-colors">Quem somos</a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#depoimentos'); }} className="hover:text-[#E1121F] transition-colors">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#lista-de-espera'); }} className="hover:text-[#E1121F] transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/galeria'); }} className="hover:text-[#E1121F] transition-colors">Galeria</a>
        <button onClick={() => { setMobileMenuOpen(false); goToListaVip('header_mobile'); }} className="mt-2 bg-[#E1121F] text-white font-bold px-8 py-3 rounded-full hover:bg-[#A00D18] transition-colors text-sm uppercase tracking-wide">
          Lista VIP 2ª Edição
        </button>
      </div>
    </header>
  );
}
