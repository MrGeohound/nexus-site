import React, { useEffect, useState } from 'react';
import { hasDecision, setConsent } from '../lib/consent.js';
import { FEATURES } from '../config';
import { Link } from '../lib/router.jsx';

// Banner LGPD — sem caixas pré-marcadas. Padrão = não rastrear.
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (FEATURES.consentBanner && !hasDecision()) setShow(true);
  }, []);

  if (!show) return null;

  const decide = (accepted) => {
    setConsent(accepted);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-[#C8A96A]/30 bg-[#12333A]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-4">
        <p className="flex-1 text-sm leading-relaxed text-[#F8F3EA]/80">
          Usamos cookies para medir a performance do site e melhorar sua
          experiência. Você decide.{' '}
          <Link
            to="/privacidade"
            className="font-semibold text-[#C8A96A] underline underline-offset-2"
          >
            Saiba mais
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide(false)}
            className="rounded-full border border-[#F8F3EA]/20 px-4 py-2 text-sm font-semibold text-[#F8F3EA]/80 transition-colors hover:bg-[#F8F3EA]/10"
          >
            Recusar
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-full bg-[#B86B4B] px-5 py-2 text-sm font-bold text-[#F8F3EA] transition-colors hover:bg-[#9F573E]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
