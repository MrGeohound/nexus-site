import React, { useState } from 'react';
import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { submitLead } from '../lib/leads.js';
import { waLink, MSG_DUVIDA } from '../lib/whatsapp.js';
import { trackWhatsappClick, track, EVENTS } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';
import { CONTACT, FEATURES } from '../config';

// Captura secundária de leads (quem ainda não vai comprar agora).
// Não compete com o CTA principal — fica em seção própria, tom calmo.
export default function LeadCapture() {
  const [form, setForm] = useState({ nome: '', whatsapp: '', empresa: '', consent: false });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');

  if (!FEATURES.leadCapture) return null;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.nome.trim() || !form.whatsapp.trim()) {
      setError('Preencha nome e WhatsApp.');
      return;
    }
    if (!form.consent) {
      setError('É necessário autorizar o contato.');
      return;
    }
    setStatus('sending');
    await submitLead({ ...form, origem: 'landing_lead_section' });
    setStatus('done');
  };

  const wa = waLink(MSG_DUVIDA);

  return (
    <section id="duvidas" className="bg-[#12333A] px-6 py-20 lg:px-[10%]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-8 md:p-10">
        {status === 'done' ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A96A]/15">
              <Check className="text-[#C8A96A]" size={28} />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#F8F3EA]">
              Recebemos seu contato.
            </h3>
            <p className="mb-8 text-[#F8F3EA]/70">
              Em breve enviaremos os detalhes do NEXUS. Se preferir, garanta sua
              vaga agora — elas são limitadas.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => {
                  track(EVENTS.CLICK_PRIMARY_CTA, { origem: 'lead_success' });
                  navigate('#pricing');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-6 py-3 font-bold uppercase tracking-wide text-[#F8F3EA] transition-colors hover:bg-[#9F573E] sm:w-auto"
              >
                Ver ingressos <ArrowRight size={18} />
              </button>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('lead_success')}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C8A96A] px-6 py-3 font-bold uppercase tracking-wide text-[#F8F3EA] transition-colors hover:bg-[#C8A96A] hover:text-[#12333A] sm:w-auto"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
                Ainda em dúvida?
              </p>
              <h3 className="mb-3 text-2xl font-bold leading-tight text-[#F8F3EA] md:text-3xl">
                Receba os detalhes do NEXUS antes de decidir.
              </h3>
              <p className="text-[#F8F3EA]/60">
                Deixe seu contato e enviamos a programação, os valores e o aviso
                de virada de lote. Sem spam.
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('lead_section')}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C8A96A] hover:underline"
              >
                <MessageCircle size={16} /> Prefiro falar no WhatsApp
              </a>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <input
                name="nome"
                value={form.nome}
                onChange={onChange}
                placeholder="Seu nome"
                autoComplete="name"
                className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
              />
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={onChange}
                placeholder="WhatsApp (com DDD)"
                inputMode="tel"
                autoComplete="tel"
                className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
              />
              <input
                name="empresa"
                value={form.empresa}
                onChange={onChange}
                placeholder="Empresa ou atuação (opcional)"
                autoComplete="organization"
                className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
              />
              <label className="flex cursor-pointer items-start gap-2 text-xs text-[#F8F3EA]/60">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#C8A96A]"
                />
                <span>
                  Autorizo o NEXUS a entrar em contato por WhatsApp e e-mail
                  sobre o evento (LGPD).
                </span>
              </label>
              {error && <p className="text-sm text-[#E5896B]">{error}</p>}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-6 py-3 font-bold uppercase tracking-wide text-[#12333A] transition-colors hover:bg-[#b8965a] disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Quero receber os detalhes'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
