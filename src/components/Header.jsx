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
        ? 'bg-[#0B0B0D]/95 border-[#C5C7CB]/15 text-[#F5F5F7]' 
        : 'bg-[#12333A]/95 border-[#F8F3EA]/10 text-[#F8F3EA]'
    }`}>
      <div className="flex items-center z-[60]">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center justify-start hover:opacity-90 transition-opacity">
          <img
            src="/assets/rebrand/logo-nexus-principal.png"
            alt="NEXUS — Conexão de Verdade"
            className="h-[40px] md:h-[50px] w-auto object-contain"
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className={`hidden lg:flex items-center gap-8 text-[15px] font-inter ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#F8F3EA]/80'}`}>
        <a href="/hub" onClick={(e) => { e.preventDefault(); navigate('/hub'); }} className="hover:text-white transition-colors">Quem somos</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); navigate('/manifesto'); }} className="hover:text-white transition-colors font-bold flex items-center gap-1.5 text-[#F5F5F7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]" title="Pulso NEXUS"></span> Manifesto
        </a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); navigate('/#depoimentos'); }} className="hover:text-white transition-colors">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); navigate('/#lista-de-espera'); }} className="hover:text-white transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); navigate('/galeria'); }} className="hover:text-white transition-colors">Galeria</a>

        <div className={`flex items-center gap-6 pl-6 ml-2 border-l ${isRebranded ? 'border-[#C5C7CB]/20' : 'border-[#F8F3EA]/10'}`}>
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
            isRebranded 
              ? 'bg-[#C5C7CB]/10 border border-[#C5C7CB]/30 text-[#F5F5F7]' 
              : 'bg-[#C8A96A]/15 border border-[#C8A96A]/30 text-[#C8A96A]'
          }`}>
            <Star size={13} className={isRebranded ? "fill-[#C5C7CB] text-[#C5C7CB]" : "fill-[#C8A96A]"} />
            <span>Nota 9,3 · Pós-Evento</span>
          </div>

          <button 
            onClick={() => goToListaVip('header_desktop')} 
            className={`font-black px-6 py-2.5 rounded-full transition-all text-xs uppercase tracking-wider ${
              isRebranded 
                ? 'bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F] text-[#050505] hover:from-white hover:to-[#C5C7CB] shadow-[0_0_20px_rgba(197,199,203,0.25)]' 
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
            ? 'bg-[#C5C7CB]/10 border border-[#C5C7CB]/30 text-[#F5F5F7]' 
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
        <a href="/" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/'); }} className="hover:text-[#C5C7CB] transition-colors">Início</a>
        <a href="/hub" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/hub'); }} className="hover:text-[#C5C7CB] transition-colors">Quem somos</a>
        <a href="/manifesto" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/manifesto'); }} className="text-[#F5F5F7] font-extrabold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E1121F]"></span> Manifesto do Ecossistema
        </a>
        <a href="#depoimentos" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#depoimentos'); }} className="hover:text-[#C5C7CB] transition-colors">Depoimentos</a>
        <a href="#lista-de-espera" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/#lista-de-espera'); }} className="hover:text-[#C5C7CB] transition-colors">2ª Edição VIP</a>
        <a href="/galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/galeria'); }} className="hover:text-[#C5C5C7] transition-colors">Galeria</a>
        <button onClick={() => { setMobileMenuOpen(false); goToListaVip('header_mobile'); }} className="mt-2 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F] text-[#050505] font-black px-8 py-3 rounded-full text-sm uppercase tracking-wide">
          Lista VIP 2ª Edição
        </button>
      </div>
    </header>
  );
}
