import React from 'react';
import { SOCIAL, CONTACT } from '../config';
import { Link } from '../lib/router.jsx';
import { trackWhatsappClick } from '../lib/analytics.js';
import { waLink } from '../lib/whatsapp.js';

export default function Footer({ isRebranded = true }) {
  return (
    <footer className={`py-12 px-6 lg:px-[10%] relative z-10 border-t transition-colors duration-700 ${
      isRebranded 
        ? 'bg-[#050505] border-[#C5C7CB]/10 text-[#9A9AA0]' 
        : 'bg-[#12333A] border-[#F8F3EA]/10 text-[#F8F3EA]/60'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to="/">
          <img
            src={isRebranded ? "/assets/rebrand/logo-nexus-principal.png" : "/assets/logo-nexus-2.png"}
            alt="NEXUS"
            className="w-[200px] md:w-[280px] h-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
          />
        </Link>

        <div className="text-sm font-inter text-center md:text-left">
          &copy; 2026 NEXUS - Conexão de Verdade. Todos os direitos reservados.
          <div className="mt-2 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link to="/manifesto" className={`font-bold hover:underline transition-colors ${isRebranded ? 'text-[#C5C7CB]' : 'text-[#C8A96A]'}`}>
              Manifesto do Ecossistema
            </Link>
            <Link to="/privacidade" className="hover:text-[#F5F5F7] transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/indique" className="hover:text-[#F5F5F7] transition-colors">
              Indicar alguém
            </Link>
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[#F5F5F7] transition-colors">
                Contato
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {SOCIAL.instagram && (
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#C5C7CB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          )}
          {SOCIAL.linkedin && (
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#C5C7CB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          )}
          {CONTACT.whatsappNumero && (
            <a href={waLink('Olá! Tenho uma dúvida sobre o NEXUS.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackWhatsappClick('footer')} className="hover:text-[#C5C7CB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.3z"/></svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
