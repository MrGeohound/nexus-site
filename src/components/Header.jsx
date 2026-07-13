import React, { useState, useEffect } from 'react';
import { Menu, X, Clock } from 'lucide-react';
import { EVENT } from '../config';
import { track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

const goToPricing = (origem) => {
  track(EVENTS.CLICK_PRIMARY_CTA, { origem });
  navigate('#pricing');
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    // Data oficial do evento (config central)
    const targetDate = new Date(EVENT.dataInicioISO).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num) => num.toString().padStart(2, '0');

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
        <a href="#speakers" className="hover:text-[#C8A96A] transition-colors">Convidados</a>
        <a href="#schedule" className="hover:text-[#C8A96A] transition-colors">Programação</a>
        <a href="#pricing" className="hover:text-[#C8A96A] transition-colors">Ingressos</a>

        <div className="flex items-center gap-6 pl-6 ml-2 border-l border-[#F8F3EA]/10">
          <div className="flex items-center gap-3 bg-[#F8F3EA]/5 px-4 py-2 rounded-full border border-[#F8F3EA]/10">
            <Clock size={16} className="text-[#C8A96A] animate-pulse" />
            <div className="flex items-center gap-2 text-sm font-bold font-inter text-[#F8F3EA]">
              <span className="tabular-nums bg-[#C8A96A]/20 px-2 py-0.5 rounded text-[#C8A96A]">{formatNum(timeLeft.days)}d</span>
              <span className="text-[#F8F3EA]/30">:</span>
              <span className="tabular-nums bg-[#C8A96A]/20 px-2 py-0.5 rounded text-[#C8A96A]">{formatNum(timeLeft.hours)}h</span>
            </div>
          </div>

          <button onClick={() => goToPricing('header_desktop')} className="bg-[#B86B4B] text-[#F8F3EA] font-bold px-6 py-2.5 rounded-full hover:bg-[#9F573E] transition-colors text-sm uppercase tracking-wide">
            Garantir Vaga
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center gap-4 z-[60]">
        <div className="flex items-center gap-1.5 bg-[#F8F3EA]/5 px-3 py-1.5 rounded-full border border-[#F8F3EA]/10">
          <Clock size={14} className="text-[#C8A96A] animate-pulse" />
          <div className="flex items-center gap-1 text-xs font-bold font-inter text-[#F8F3EA]">
            <span className="tabular-nums text-[#C8A96A]">{formatNum(timeLeft.days)}d</span>
            <span className="tabular-nums text-[#C8A96A]">{formatNum(timeLeft.hours)}h</span>
          </div>
        </div>

        <button className="p-2 text-[#F8F3EA]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#12333A] flex flex-col items-center justify-center gap-8 text-2xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Quem somos</a>
        <a href="#speakers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Convidados</a>
        <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Programação</a>
        <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8A96A] transition-colors text-[#F8F3EA]">Ingressos</a>
        <button onClick={() => { setMobileMenuOpen(false); goToPricing('header_mobile'); }} className="mt-2 bg-[#B86B4B] text-[#F8F3EA] font-bold px-8 py-3 rounded-full hover:bg-[#9F573E] transition-colors text-base uppercase tracking-wide">
          Garantir Vaga
        </button>
      </div>
    </header>
  );
}
