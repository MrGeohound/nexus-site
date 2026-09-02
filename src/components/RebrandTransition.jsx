import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function RebrandTransition() {
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    // Garante que o modo rebranded fique ativado no corpo
    document.body.classList.add('rebranded');

    const timer = setTimeout(() => {
      setBannerVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Soft Red Pulse Flash initial reveal */}
      <div 
        className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-1000 ${
          bannerVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,18,31,0.15)_0%,transparent_70%)] opacity-40"></div>
      </div>

      {/* Rebrand Badge Notification */}
      {bannerVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-md transition-all duration-500">
          <div className="bg-[#0B0B0D]/95 border border-[#E1121F] rounded-2xl p-4 shadow-[0_0_40px_rgba(225,18,31,0.5)] backdrop-blur-xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1121F]/20 border border-[#E1121F]/50 text-[#E1121F] text-[11px] font-black uppercase tracking-widest mb-1">
              <Sparkles size={12} className="animate-spin" /> Identidade Visual 2026 Ativa
            </div>
            <p className="text-xs text-[#C5C7CB] font-semibold">
              Ecossistema NEXUS em <strong className="text-white">Nexus Black, Red & Platinum</strong>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
