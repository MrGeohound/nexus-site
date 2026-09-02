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
    <section id="lista-de-espera" className="relative z-10 border-t border-[#C5C7CB]/10 bg-[#050505] px-6 py-24 lg:px-[10%]">
      <div className="mx-auto max-w-5xl">
        <div id="pricing" className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E1121F]/40 bg-[#E1121F]/10 text-[#E1121F] font-bold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} /> 1ª Edição Encerrada · 2ª Edição em Breve
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#F5F5F7] md:text-5xl">
            Lista de Espera VIP —{' '}
            <span className="bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB] bg-clip-text text-transparent">2ª Edição NEXUS</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#C5C7CB]">
            A 1ª edição esgotou rapidamente. Cadastre-se gratuitamente abaixo para receber o aviso de abertura antes do público geral e garantir desconto exclusivo de Lote 1.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* VIP Benefits Box */}
          <div className="lg:col-span-5 rounded-3xl border border-[#E1121F]/40 bg-[#0B0B0D] p-8 text-[#F5F5F7] flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#E1121F] to-[#A00D18]"></div>
            <div>
              <div className="mb-6 inline-block rounded-full bg-[#E1121F]/20 border border-[#E1121F]/40 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#E1121F]">
                Vantagens da Lista VIP
              </div>
              <h3 className="mb-6 text-2xl font-bold">Por que se cadastrar agora?</h3>
              
              <ul className="space-y-4 text-sm text-[#C5C7CB]">
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#E1121F]" />
                  <span><strong>Acesso Antecipado:</strong> Link de compra liberado 24h antes do lançamento oficial.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#E1121F]" />
                  <span><strong>Condição Exclusiva Lote 1:</strong> Garantia do menor valor de ingresso.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-[#E1121F]" />
                  <span><strong>Curadoria de Conexões:</strong> Atendimento direto com a equipe para alinhamento de perfil de networking.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C5C7CB]/10 flex items-center gap-2 text-xs text-[#9A9AA0]">
              <ShieldCheck size={16} className="text-[#E1121F]" />
              <span>Seus dados estão 100% seguros. Não enviamos spam.</span>
            </div>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7 rounded-3xl border border-[#C5C7CB]/20 bg-[#0B0B0D] p-8 md:p-10 flex flex-col justify-center shadow-xl">
            {status === 'done' ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E1121F]/20 text-[#E1121F]">
                  <Check size={32} />
                </div>
                <h3 className="mb-2 text-2xl font-extrabold text-[#F5F5F7]">Você está na Lista VIP!</h3>
                <p className="text-[#C5C7CB] max-w-md mx-auto">
                  Confirmamos sua inscrição. Assim que a data da 2ª Edição for anunciada, enviaremos o link exclusivo diretamente no seu WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#F5F5F7] mb-2">Preencha seus dados para entrar na fila:</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C5C7CB] mb-1">Nome Completo *</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={onChange}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-[#C5C7CB]/20 bg-[#050505] px-4 py-3 text-[#F5F5F7] placeholder-[#9A9AA0] outline-none focus:border-[#E1121F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C5C7CB] mb-1">WhatsApp (com DDD) *</label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={onChange}
                    placeholder="(85) 99999-9999"
                    inputMode="tel"
                    className="w-full rounded-xl border border-[#C5C7CB]/20 bg-[#050505] px-4 py-3 text-[#F5F5F7] placeholder-[#9A9AA0] outline-none focus:border-[#E1121F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C5C7CB] mb-1">Empresa / Cargo (opcional)</label>
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={onChange}
                    placeholder="Sua empresa ou área de atuação"
                    className="w-full rounded-xl border border-[#C5C7CB]/20 bg-[#050505] px-4 py-3 text-[#F5F5F7] placeholder-[#9A9AA0] outline-none focus:border-[#E1121F]"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-2 text-xs text-[#9A9AA0] pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={onChange}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#E1121F]"
                  />
                  <span>Autorizo o NEXUS a me avisar via WhatsApp e e-mail sobre a abertura da 2ª Edição.</span>
                </label>

                {error && <p className="text-sm font-semibold text-[#E1121F]">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E1121F] px-8 py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#A00D18] shadow-[0_0_25px_rgba(225,18,31,0.4)] disabled:opacity-60 mt-2"
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
