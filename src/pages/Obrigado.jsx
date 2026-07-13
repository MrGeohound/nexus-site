import React, { useEffect, useState } from 'react';
import { CalendarPlus, MessageCircle, Share2, Check, ArrowRight } from 'lucide-react';
import { EVENT, CONTACT } from '../config';
import { googleCalendarUrl, downloadIcs } from '../lib/calendar.js';
import { waLink } from '../lib/whatsapp.js';
import { submitOnboarding } from '../lib/leads.js';
import { track, EVENTS, trackWhatsappClick } from '../lib/analytics.js';
import { Link, navigate } from '../lib/router.jsx';

export default function Obrigado() {
  const [form, setForm] = useState({
    nome: '', empresa: '', cargo: '', oferece: '', procura: '',
    conhecer: '', instagram: '', linkedin: '', whatsapp: '',
    acessibilidade: '', restricoes: '', consent: false,
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    track(EVENTS.ONBOARDING_START, { page: 'obrigado' });
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await submitOnboarding(form);
    setStatus('done');
  };

  const l = EVENT.local;

  return (
    <main className="min-h-screen bg-[#12333A] px-6 py-16 text-[#F8F3EA] lg:px-[10%]">
      <div className="mx-auto max-w-3xl">
        {/* Confirmação */}
        <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
          <span className="h-px w-8 bg-[#C8A96A]" /> Próximos passos
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
          Sua vaga está a um passo de ser confirmada.
        </h1>
        <p className="mb-2 text-[#F8F3EA]/75">
          Assim que o pagamento for aprovado pela Sympla, você receberá o
          ingresso e a confirmação por e-mail. <strong>Verifique sua caixa de
          entrada e o spam.</strong>
        </p>
        <p className="mb-8 text-sm text-[#F8F3EA]/50">
          Ainda não finalizou a compra?{' '}
          <Link to="/#pricing" className="text-[#C8A96A] underline">
            Voltar para os ingressos
          </Link>
          .
        </p>

        {/* Resumo do evento */}
        <div className="mb-8 grid gap-4 rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C8A96A]">Data</p>
            <p className="font-semibold">{EVENT.dataExtenso}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C8A96A]">Horário</p>
            <p className="font-semibold">{EVENT.horario}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C8A96A]">Local</p>
            <p className="font-semibold">{l.nome}</p>
            <p className="text-sm text-[#F8F3EA]/60">{l.endereco}, {l.cidade}/{l.estado}</p>
          </div>
        </div>

        {/* Ações */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.ADD_TO_CALENDAR, { tipo: 'google' })}
            className="flex items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-5 py-3 font-bold text-[#F8F3EA] transition-colors hover:bg-[#9F573E]"
          >
            <CalendarPlus size={18} /> Adicionar ao Google Agenda
          </a>
          <button
            onClick={() => { track(EVENTS.ADD_TO_CALENDAR, { tipo: 'ics' }); downloadIcs(); }}
            className="flex items-center justify-center gap-2 rounded-full border border-[#C8A96A] px-5 py-3 font-bold text-[#F8F3EA] transition-colors hover:bg-[#C8A96A] hover:text-[#12333A]"
          >
            <CalendarPlus size={18} /> Baixar .ics
          </button>
          {CONTACT.whatsappNumero && (
            <a
              href={waLink('Acabei de garantir minha vaga no NEXUS! Como faço para receber as próximas orientações?')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('obrigado')}
              className="flex items-center justify-center gap-2 rounded-full border border-[#F8F3EA]/20 px-5 py-3 font-bold text-[#F8F3EA] transition-colors hover:bg-[#F8F3EA]/10"
            >
              <MessageCircle size={18} /> Suporte no WhatsApp
            </a>
          )}
        </div>

        {/* Onboarding */}
        {status === 'done' ? (
          <div className="rounded-2xl border border-[#C8A96A]/30 bg-[#C8A96A]/[0.06] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A96A]/15">
              <Check className="text-[#C8A96A]" size={28} />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Perfil recebido!</h2>
            <p className="mb-6 text-[#F8F3EA]/70">
              Essas informações ajudam a organização a preparar conexões mais
              relevantes para você no dia.
            </p>
            <button
              onClick={() => navigate('/indique')}
              className="inline-flex items-center gap-2 rounded-full bg-[#B86B4B] px-6 py-3 font-bold uppercase tracking-wide text-[#F8F3EA] hover:bg-[#9F573E]"
            >
              <Share2 size={18} /> Indicar quem deveria estar lá
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 md:p-8">
            <h2 className="mb-1 text-2xl font-bold">Complete seu perfil de conexão</h2>
            <p className="mb-6 text-sm text-[#F8F3EA]/60">
              Opcional, mas recomendado. Usamos para entender o perfil dos
              participantes. Seus dados não são divulgados sem autorização.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['nome', 'Seu nome', 'text'],
                ['empresa', 'Empresa', 'text'],
                ['cargo', 'Cargo ou atuação', 'text'],
                ['whatsapp', 'WhatsApp', 'tel'],
                ['instagram', 'Instagram (@)', 'text'],
                ['linkedin', 'LinkedIn', 'text'],
              ].map(([name, ph, type]) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={onChange}
                  placeholder={ph}
                  className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
                />
              ))}
            </div>

            <div className="mt-4 grid gap-4">
              {[
                ['oferece', 'O que você oferece / faz'],
                ['procura', 'Que soluções ou parcerias você procura'],
                ['conhecer', 'Que tipo de pessoa gostaria de conhecer'],
              ].map(([name, ph]) => (
                <textarea
                  key={name}
                  name={name}
                  value={form[name]}
                  onChange={onChange}
                  placeholder={ph}
                  rows={2}
                  className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
                />
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="acessibilidade"
                  value={form.acessibilidade}
                  onChange={onChange}
                  placeholder="Necessidades de acessibilidade (opcional)"
                  className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
                />
                <input
                  name="restricoes"
                  value={form.restricoes}
                  onChange={onChange}
                  placeholder="Restrições alimentares (opcional)"
                  className="w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2 text-xs text-[#F8F3EA]/60">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#C8A96A]"
              />
              <span>
                Autorizo o compartilhamento das informações relevantes do meu
                perfil com a organização para facilitar conexões no evento.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-6 py-3 font-bold uppercase tracking-wide text-[#12333A] transition-colors hover:bg-[#b8965a] disabled:opacity-60 sm:w-auto"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar meu perfil'}
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
