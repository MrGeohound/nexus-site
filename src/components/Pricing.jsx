import { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { submitLead } from '../lib/leads.js';
import { CONTACT } from '../config';

export default function Pricing() {
  const [form, setForm] = useState({ nome: '', whatsapp: '', empresa: '', consent: true });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.nome.trim() || !form.whatsapp.trim()) {
      setError('Por favor, preencha seu nome e WhatsApp.');
      return;
    }
    if (!form.consent) {
      setError('É necessário autorizar o contato.');
      return;
    }
    setStatus('sending');
    const result = await submitLead({ ...form, origem: 'lista_de_espera_pos_evento' });
    if (!result.ok) {
      setStatus('idle');
      setError(`Não conseguimos enviar agora. Tente novamente ou escreva para ${CONTACT.email}.`);
      return;
    }
    setStatus('done');
  };

  return (
    <section id="lista-de-espera" className="relative z-10 border-y border-[#12333A]/5 bg-[#F8F3EA] px-6 py-24 lg:px-[10%]">
      <div className="mx-auto max-w-5xl">
        <div id="pricing" className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B86B4B]/30 bg-[#B86B4B]/10 text-[#B86B4B] font-bold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} /> 1ª Edição Encerrada · 2ª Edição em Breve
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#12333A] md:text-5xl">
            Lista de Espera VIP —{' '}
            <span className="bg-gradient-to-r from-[#B86B4B] to-[#C8A96A] bg-clip-text text-transparent">2ª Edição NEXUS</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#12333A]/70">
            A 1ª edição esgotou rapidamente. Cadastre-se gratuitamente abaixo para receber o aviso de abertura antes do público geral e garantir desconto exclusivo de Lote 1.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* VIP Benefits Box */}
          <div className="lg:col-span-5 rounded-3xl border border-[#C8A96A]/40 bg-[#12333A] p-8 text-[#F8F3EA] flex flex-col justify-between shadow-xl">
            <div>
              <div className="mb-6 inline-block rounded-full bg-[#C8A96A]/15 border border-[#C8A96A]/30 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#C8A96A]">
                Vantagens da Lista VIP
              </div>
              <h3 className="mb-6 text-2xl font-bold">Por que se cadastrar agora?</h3>
              
              <ul className="space-y-4 text-sm text-[#F8F3EA]/80">
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#C8A96A]" />
                  <span><strong>Acesso Antecipado:</strong> Link de compra liberado 24h antes do lançamento oficial.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#C8A96A]" />
                  <span><strong>Condição Exclusiva Lote 1:</strong> Garantia do menor valor de ingresso.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#C8A96A]" />
                  <span><strong>Curadoria de Conexões:</strong> Atendimento direto com a equipe para alinhamento de perfil de networking.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F8F3EA]/10 flex items-center gap-2 text-xs text-[#F8F3EA]/50">
              <ShieldCheck size={16} className="text-[#C8A96A]" />
              <span>Seus dados estão 100% seguros. Não enviamos spam.</span>
            </div>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7 rounded-3xl border border-[#C8A96A]/30 bg-[#E8D8BE]/40 p-8 md:p-10 flex flex-col justify-center">
            {status === 'done' ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12333A] text-[#C8A96A]">
                  <Check size={32} />
                </div>
                <h3 className="mb-2 text-2xl font-extrabold text-[#12333A]">Você está na Lista VIP!</h3>
                <p className="text-[#12333A]/70 max-w-md mx-auto">
                  Confirmamos sua inscrição. Assim que a data da 2ª Edição for anunciada, enviaremos o link exclusivo diretamente no seu WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#12333A] mb-2">Preencha seus dados para entrar na fila:</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12333A]/70 mb-1">Nome Completo *</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={onChange}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-[#12333A]/20 bg-white px-4 py-3 text-[#12333A] placeholder-[#12333A]/40 outline-none focus:border-[#B86B4B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12333A]/70 mb-1">WhatsApp (com DDD) *</label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={onChange}
                    placeholder="(85) 99999-9999"
                    inputMode="tel"
                    className="w-full rounded-xl border border-[#12333A]/20 bg-white px-4 py-3 text-[#12333A] placeholder-[#12333A]/40 outline-none focus:border-[#B86B4B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12333A]/70 mb-1">Empresa / Cargo (opcional)</label>
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={onChange}
                    placeholder="Sua empresa ou área de atuação"
                    className="w-full rounded-xl border border-[#12333A]/20 bg-white px-4 py-3 text-[#12333A] placeholder-[#12333A]/40 outline-none focus:border-[#B86B4B]"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-2 text-xs text-[#12333A]/70 pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={onChange}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#B86B4B]"
                  />
                  <span>Autorizo o NEXUS a me avisar via WhatsApp e e-mail sobre a abertura da 2ª Edição.</span>
                </label>

                {error && <p className="text-sm font-semibold text-[#B86B4B]">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-8 py-4 font-bold uppercase tracking-widest text-[#F8F3EA] transition-all hover:bg-[#9F573E] shadow-lg disabled:opacity-60 mt-2"
                >
                  <Send size={18} />
                  {status === 'sending' ? 'Garantindo sua vaga...' : 'Quero entrar na Lista VIP'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
