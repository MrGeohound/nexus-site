import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function RebrandTransition({ onStateChange }) {
  // stages: 'old' (0s-1s) | 'popup' (1s-2.4s) | 'rebranded' (2.4s+)
  const [stage, setStage] = useState('old');

  useEffect(() => {
    // Certifica-se que começa no modo antigo
    document.body.classList.remove('rebranded');
    if (onStateChange) onStateChange('old');

    // Momento 2 (1.0s): Aparece o Pop-up "Forjando a Nova Identidade"
    const timer1 = setTimeout(() => {
      setStage('popup');
    }, 1000);

    // Momento 3 (2.4s): Ativa a nova identidade Platinum & Black
    const timer2 = setTimeout(() => {
      setStage('rebranded');
      document.body.classList.add('rebranded');
      if (onStateChange) onStateChange('rebranded');
    }, 2400);

    // Esconde o pop-up totalmente após 3.2s
    const timer3 = setTimeout(() => {
      setStage('completed');
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (stage === 'completed') return null;

  return (
    <>
      {/* Momento 2 & 3: Pop-up Central de Transição (1s até 3.2s) */}
      {(stage === 'popup' || stage === 'rebranded') && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 transition-all duration-500">
          <div className="bg-[#0B0B0D] border-2 border-[#C5C7CB]/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_60px_rgba(197,199,203,0.25)] relative overflow-hidden animate-scale-up">
            
            {/* Top Platinum Metal Bar */}
            <div className="h-[3px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F]"></div>

            {/* Icon & Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#C5C7CB]/10 border border-[#C5C7CB]/30 flex items-center justify-center mx-auto mb-5 text-[#C5C7CB]">
              <Sparkles size={28} className="animate-spin-slow" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1121F]/15 border border-[#E1121F]/40 text-[#E1121F] text-[10px] font-black uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F] animate-ping"></span>
              Pulso NEXUS 2026
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[#F5F5F7] tracking-tight mb-2">
              FORJANDO A NOVA IDENTIDADE
            </h3>

            <p className="text-xs md:text-sm text-[#C5C7CB] leading-relaxed mb-4">
              Transicionando o ecossistema para o acabamento <strong className="text-white">Platinum Metal & Black</strong>.
            </p>

            {/* Progress indicator */}
            <div className="w-full bg-[#050505] h-1.5 rounded-full overflow-hidden border border-[#C5C7CB]/20">
              <div 
                className={`h-full bg-gradient-to-r from-[#C5C7CB] via-[#F5F5F7] to-[#E1121F] transition-all duration-1000 ${
                  stage === 'rebranded' ? 'w-full' : 'w-1/2'
                }`}
              ></div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
