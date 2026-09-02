import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function RebrandTransition({ onTransitionComplete }) {
  const [stage, setStage] = useState('idle'); // idle | morphing | rebranded
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // Inicia a transição de rebranding após 1.5s de permanência na página
    const timer1 = setTimeout(() => {
      setStage('morphing');
      setBannerVisible(true);
      document.body.classList.add('rebranded');
    }, 1500);

    const timer2 = setTimeout(() => {
      setBannerVisible(false);
      setStage('rebranded');
      if (onTransitionComplete) onTransitionComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onTransitionComplete]);

  return (
    <>
      {/* Red Light Pulse & Sweep Flash during transition */}
      <div 
        className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-1000 ${
          stage === 'morphing' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E1121F]/20 via-[#A00D18]/30 to-[#E1121F]/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#E1121F_0%,transparent_70%)] opacity-30"></div>
      </div>

      {/* Rebrand Announcement Banner Overlay */}
      {bannerVisible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-xl animate-bounce-short">
          <div className="bg-[#0B0B0D]/95 border-2 border-[#E1121F] rounded-2xl p-5 shadow-[0_0_50px_rgba(225,18,31,0.6)] backdrop-blur-xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1121F]/20 border border-[#E1121F]/50 text-[#E1121F] text-xs font-black uppercase tracking-widest mb-2">
              <Sparkles size={14} className="animate-spin" /> REBRANDING OFFICIAL 2026
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[#F5F5F7] tracking-tight mb-1">
              EVOLUÇÃO DO ECOSSISTEMA NEXUS
            </h3>

            <p className="text-xs md:text-sm text-[#C5C7CB]">
              Nova identidade visual ativada: <strong className="text-[#E1121F]">Nexus Black</strong>, <strong className="text-[#E1121F]">Nexus Red</strong> & <strong className="text-[#C5C7CB]">Platinum Metal</strong>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
