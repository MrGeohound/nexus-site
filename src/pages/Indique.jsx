import React, { useState } from 'react';
import { MessageCircle, Link2, Check } from 'lucide-react';
import { EVENT } from '../config';
import { waLink, MSG_INDICACAO } from '../lib/whatsapp.js';
import { trackShare } from '../lib/analytics.js';
import { Link } from '../lib/router.jsx';

export default function Indique() {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${EVENT.siteUrl}/?utm_source=indicacao&utm_medium=referral&utm_campaign=indique`;
  const wa = waLink(MSG_INDICACAO);
  const linkedin = `https://www.linkedin.com/sharing/share-offarticle?url=${encodeURIComponent(shareUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare('link');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignora */
    }
  };

  return (
    <main className="min-h-screen bg-[#12333A] px-6 py-16 text-[#F8F3EA] lg:px-[10%]">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
          Indicação
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
          Quem deveria estar nessa sala com você?
        </h1>
        <p className="mb-10 text-[#F8F3EA]/70">
          As melhores conexões acontecem quando as pessoas certas estão no mesmo
          lugar. Convide alguém estratégico para o NEXUS.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('whatsapp')}
            className="flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-bold text-[#0b3d24] transition-opacity hover:opacity-90"
          >
            <MessageCircle size={20} /> Compartilhar no WhatsApp
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('linkedin')}
            className="flex items-center justify-center gap-3 rounded-full bg-[#0A66C2] px-6 py-4 font-bold text-white transition-opacity hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM7.5 8H12v2.2h.07c.63-1.2 2.17-2.47 4.47-2.47 4.78 0 5.66 3.15 5.66 7.24V24h-5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24h-5z"/></svg> Compartilhar no LinkedIn
          </a>
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-3 rounded-full border border-[#C8A96A] px-6 py-4 font-bold text-[#F8F3EA] transition-colors hover:bg-[#C8A96A] hover:text-[#12333A]"
          >
            {copied ? <Check size={20} /> : <Link2 size={20} />}
            {copied ? 'Link copiado!' : 'Copiar link de convite'}
          </button>
        </div>

        <div className="mt-10 rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
            Mensagem sugerida
          </p>
          <p className="text-sm leading-relaxed text-[#F8F3EA]/70">{MSG_INDICACAO}</p>
        </div>

        <div className="mt-10">
          <Link to="/#pricing" className="text-sm font-semibold text-[#C8A96A] underline">
            Ainda não garantiu a sua? Ver ingressos
          </Link>
        </div>
      </div>
    </main>
  );
}
