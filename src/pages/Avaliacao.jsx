import React, { useEffect, useState } from 'react';
import { Check, ArrowRight, MessageCircle, Link2 } from 'lucide-react';
import { EVENT } from '../config';
import { submitSurvey } from '../lib/survey.js';
import { track } from '../lib/analytics.js';

const MARCOU = [
  'Conteúdo / palestras',
  'Conexões e networking',
  'Ambiente e experiência',
  'Happy hour (vinhos e finger foods)',
  'Organização',
];

// Convite à lista de espera da PRÓXIMA edição (sem data definida).
const SHARE_URL =
  'https://siganexus.com.br/?utm_source=indicacao&utm_medium=referral&utm_campaign=lista_espera';
const SHARE_MSG =
  'Participei do NEXUS — Conexão de Verdade, um encontro de conexões intencionais entre ' +
  'empresários, líderes e profissionais em Fortaleza. Vai ter nova edição! Entre na lista ' +
  'de espera para ser avisado(a) em primeira mão: ' + SHARE_URL;

export default function Avaliacao() {
  const [form, setForm] = useState({
    nota: null,
    marcou: [],
    conexao: '',
    depoimento: '',
    nome: '',
    empresa: '',
    instagram: '',
    linkedin: '',
    whatsapp: '',
    consentDepoimento: false,
    consentFoto: false,
    melhoria: '',
    proximaEdicao: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    track('survey_start', { page: 'avaliacao' });
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleMarcou = (item) =>
    setForm((f) => ({
      ...f,
      marcou: f.marcou.includes(item)
        ? f.marcou.filter((x) => x !== item)
        : [...f.marcou, item],
    }));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      track('share_event', { canal: 'link_lista' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignora */
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.nota === null) {
      setError('Por favor, dê uma nota de 0 a 10.');
      return;
    }
    setStatus('sending');
    await submitSurvey(form);
    setStatus('done');
    window.scrollTo(0, 0);
  };

  const inputCls =
    'w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]';

  if (status === 'done') {
    const wa = `https://wa.me/?text=${encodeURIComponent(SHARE_MSG)}`;
    return (
      <main className="min-h-screen bg-[#12333A] px-6 py-16 text-[#F8F3EA] lg:px-[10%]">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C8A96A]/15">
            <Check className="text-[#C8A96A]" size={32} />
          </div>
          <h1 className="mb-3 text-3xl font-extrabold">Obrigado pela sua avaliação! 🙌</h1>
          <p className="mb-8 text-[#F8F3EA]/70">
            Sua opinião ajuda a tornar o próximo NEXUS ainda melhor.
            {form.consentDepoimento && ' E obrigado por autorizar o uso do seu depoimento!'}
          </p>

          <div className="rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 text-left">
            <p className="mb-1 text-center font-bold text-[#F8F3EA]">Vai ter nova edição do NEXUS.</p>
            <p className="mb-5 text-center text-sm text-[#F8F3EA]/60">
              Quem deveria estar na próxima sala com você? Convide — eles entram na lista de
              espera e são avisados em primeira mão, assim que a data for definida.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('share_event', { canal: 'whatsapp_lista' })}
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-[#0b3d24] transition-opacity hover:opacity-90"
              >
                <MessageCircle size={18} /> Convidar no WhatsApp
              </a>
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 rounded-full border border-[#C8A96A] px-6 py-3 font-bold text-[#F8F3EA] transition-colors hover:bg-[#C8A96A] hover:text-[#12333A]"
              >
                {copied ? <Check size={18} /> : <Link2 size={18} />}
                {copied ? 'Link copiado!' : 'Copiar link de convite'}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#12333A] px-6 py-12 text-[#F8F3EA] lg:px-[10%]">
      <div className="mx-auto max-w-xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
          {EVENT.nome}
        </p>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight md:text-4xl">
          Como foi sua experiência?
        </h1>
        <p className="mb-8 text-[#F8F3EA]/60">
          Leva menos de 2 minutos. Seu retorno molda a próxima edição.
        </p>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* 1. NPS */}
          <div>
            <label className="mb-3 block font-semibold">
              De 0 a 10, o quanto você recomendaria o NEXUS a um colega ou parceiro?
            </label>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
              {Array.from({ length: 11 }, (_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set('nota', n)}
                  className={`aspect-square rounded-lg text-sm font-bold transition-colors ${
                    form.nota === n
                      ? 'bg-[#C8A96A] text-[#12333A]'
                      : 'bg-[#F8F3EA]/5 text-[#F8F3EA]/70 hover:bg-[#F8F3EA]/10'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* 2. O que marcou */}
          <div>
            <label className="mb-3 block font-semibold">O que mais te marcou hoje?</label>
            <div className="flex flex-wrap gap-2">
              {MARCOU.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMarcou(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    form.marcou.includes(item)
                      ? 'border-[#C8A96A] bg-[#C8A96A]/15 text-[#F8F3EA]'
                      : 'border-[#F8F3EA]/15 text-[#F8F3EA]/70 hover:border-[#C8A96A]/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Conexão */}
          <div>
            <label className="mb-3 block font-semibold">
              Você fez alguma conexão relevante hoje?
            </label>
            <div className="flex flex-wrap gap-2">
              {['Sim', 'Ainda é cedo', 'Não'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set('conexao', opt)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    form.conexao === opt
                      ? 'border-[#C8A96A] bg-[#C8A96A]/15'
                      : 'border-[#F8F3EA]/15 text-[#F8F3EA]/70 hover:border-[#C8A96A]/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Depoimento */}
          <div>
            <label className="mb-2 block font-semibold">
              Em uma frase, como você descreveria sua experiência no NEXUS?
            </label>
            <textarea
              value={form.depoimento}
              onChange={(e) => set('depoimento', e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="Ex.: Saí com 3 conversas que já viraram reunião..."
              className={inputCls}
            />
          </div>

          {/* 5-6. Identificação */}
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder="Seu nome" value={form.nome} onChange={(e) => set('nome', e.target.value)} />
            <input className={inputCls} placeholder="Empresa / cargo" value={form.empresa} onChange={(e) => set('empresa', e.target.value)} />
            <input className={inputCls} placeholder="WhatsApp (com DDD)" inputMode="tel" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
            <input className={inputCls} placeholder="Instagram (@) — opcional" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} />
            <input className={inputCls} placeholder="LinkedIn — opcional" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
          </div>

          {/* 7-8. Consentimento */}
          <div className="space-y-3 rounded-2xl border border-[#C8A96A]/20 bg-[#C8A96A]/[0.05] p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#F8F3EA]/80">
              <input type="checkbox" checked={form.consentDepoimento} onChange={(e) => set('consentDepoimento', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#C8A96A]" />
              <span>Autorizo o NEXUS a divulgar meu depoimento, nome e empresa em materiais de divulgação de futuras edições (site, redes e anúncios).</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#F8F3EA]/80">
              <input type="checkbox" checked={form.consentFoto} onChange={(e) => set('consentFoto', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#C8A96A]" />
              <span>Autorizo o uso da minha foto/imagem, caso registrada no evento.</span>
            </label>
          </div>

          {/* 9. Melhoria */}
          <div>
            <label className="mb-2 block font-semibold">
              O que podemos melhorar para a próxima edição?
            </label>
            <textarea
              value={form.melhoria}
              onChange={(e) => set('melhoria', e.target.value)}
              rows={2}
              maxLength={600}
              placeholder="Sua sugestão (uso interno)"
              className={inputCls}
            />
          </div>

          {/* 10. Próxima edição */}
          <div>
            <label className="mb-3 block font-semibold">Quer ser avisado da próxima edição?</label>
            <div className="flex flex-wrap gap-2">
              {['Sim, quero entrar na lista', 'Não'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set('proximaEdicao', opt)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    form.proximaEdicao === opt
                      ? 'border-[#C8A96A] bg-[#C8A96A]/15'
                      : 'border-[#F8F3EA]/15 text-[#F8F3EA]/70 hover:border-[#C8A96A]/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-[#E5896B]">{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-6 py-4 font-bold uppercase tracking-widest text-[#F8F3EA] transition-colors hover:bg-[#9F573E] disabled:opacity-60"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar avaliação'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}
