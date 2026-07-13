import React from 'react';
import { EVENT, CONTACT } from '../config';
import { Link } from '../lib/router.jsx';
import { getConsent, setConsent } from '../lib/consent.js';

export default function Privacidade() {
  const consent = getConsent();

  return (
    <main className="min-h-screen bg-[#F8F3EA] px-6 py-16 text-[#12333A] lg:px-[10%]">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm font-semibold text-[#B86B4B] underline">
          ← Voltar
        </Link>
        <h1 className="mb-2 mt-4 text-3xl font-extrabold md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mb-8 text-sm text-[#12333A]/50">
          {EVENT.nome} — última atualização: julho de 2026
        </p>

        <div className="space-y-6 leading-relaxed text-[#12333A]/80">
          <p>
            Esta página descreve como tratamos os dados coletados no site do
            NEXUS, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#12333A]">Dados que coletamos</h2>
            <p>
              Coletamos apenas os dados que você nos fornece voluntariamente
              (como nome, WhatsApp, e-mail e empresa) e dados de navegação
              anônimos usados para medir a performance do site, quando você
              autoriza o uso de cookies.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#12333A]">Como usamos</h2>
            <p>
              Utilizamos seus dados para enviar informações sobre o evento,
              confirmar sua participação e melhorar sua experiência. Não vendemos
              seus dados. O compartilhamento de informações de perfil entre
              participantes ocorre apenas com autorização explícita.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#12333A]">Cookies e medição</h2>
            <p>
              Scripts de análise e marketing só são carregados após o seu
              consentimento. Você pode alterar sua decisão a qualquer momento
              abaixo.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm">
                Status atual:{' '}
                <strong>
                  {consent?.analytics ? 'Cookies aceitos' : 'Cookies recusados'}
                </strong>
              </span>
              <button
                onClick={() => { setConsent(!consent?.analytics); window.location.reload(); }}
                className="rounded-full border border-[#12333A]/20 px-4 py-1.5 text-sm font-semibold hover:bg-[#12333A]/5"
              >
                {consent?.analytics ? 'Revogar consentimento' : 'Aceitar cookies'}
              </button>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#12333A]">Seus direitos</h2>
            <p>
              Você pode solicitar acesso, correção ou exclusão dos seus dados,
              além de revogar consentimentos, pelo e-mail{' '}
              <a className="text-[#B86B4B] underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
