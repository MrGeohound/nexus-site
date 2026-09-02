import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { navigate } from '../lib/router.jsx';
import { track } from '../lib/analytics.js';
import { CONTACT } from '../config';
import { waLink } from '../lib/whatsapp.js';
import { Sparkles, Shield, Compass, Flame } from 'lucide-react';

export default function Manifesto() {
  useEffect(() => {
    document.body.classList.add('rebranded');
    track('view_manifesto');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] font-inter selection:bg-[#C5C7CB] selection:text-[#050505] relative">
      {/* Top Platinum Gradient Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] via-68%-[#979A9F] to-[#D9DADC] z-[200] opacity-90"></div>

      <Header isRebranded={true} />

      {/* ========================================================================= */}
      {/* HERO SECTION (Platinum Metal Elegance)                                    */}
      {/* ========================================================================= */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center relative pt-32 pb-16 px-6 bg-[radial-gradient(120%_80%_at_50%_25%,rgba(197,199,203,0.08),transparent_60%),#050505]">
        
        {/* Subtle Diamond Pin (Pulso NEXUS) */}
        <div className="text-[12px] md:text-[13px] tracking-[0.32em] uppercase text-[#C5C7CB] font-extrabold mb-6 flex items-center gap-2 justify-center">
          O Ecossistema 
          <span className="inline-block w-2 h-2 rounded-full bg-[#E1121F] shadow-[0_0_8px_#E1121F]"></span>
        </div>

        <img 
          src="/assets/rebrand/logo-nexus-principal.png" 
          alt="NEXUS 2026" 
          className="w-full max-w-[480px] md:max-w-[600px] h-auto mx-auto mb-6 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        />

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F5F7] max-w-4xl leading-tight mb-4">
          Conexões de verdade <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F]">
            construem coisas maiores.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#C5C7CB] max-w-2xl mx-auto leading-relaxed font-light mt-2">
          Aproximamos experiência, ambição e oportunidade para que negócios e pessoas avancem juntos.
        </p>

        {/* Platinum Hairline Divider */}
        <div className="w-[120px] h-[2px] my-8 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC] rounded-full opacity-80 mx-auto"></div>

        <a 
          href="#manifesto-content" 
          className="text-xs uppercase tracking-[0.25em] text-[#9A9AA0] flex flex-col items-center gap-2 hover:text-[#F5F5F7] transition-colors"
        >
          Explorar o Manifesto
          <span className="w-[1px] h-[34px] bg-gradient-to-b from-[#C5C7CB] to-transparent animate-pulse"></span>
        </a>
      </section>

      {/* ========================================================================= */}
      {/* 1. MARCA-MÃE (Missão, Visão e 6 Valores Platinum)                         */}
      {/* ========================================================================= */}
      <section id="manifesto-content" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#C5C7CB]/20">
        
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#C5C7CB] mb-4">
          NEXUS Marca-Mãe 
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
        </div>

        <p className="text-2xl md:text-4xl font-light text-[#E7E7EA] leading-snug mb-12">
          Criar conexões de verdade entre pessoas que constroem. Ser uma <b className="font-bold text-white">referência nacional em conexões empresariais de alta confiança</b>, formando um ecossistema onde as relações gerem conhecimento, oportunidades e construções que <span className="text-white font-semibold underline decoration-[#C5C7CB]/40">não aconteceriam de forma isolada</span>.
        </p>

        {/* Missão e Visão Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/20 rounded-3xl p-8 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
            <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#C5C7CB]/10 border border-[#C5C7CB]/20 flex items-center justify-center text-[#C5C7CB] mb-6">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F7] mb-3">Missão</h3>
            <p className="text-sm text-[#C5C7CB] leading-relaxed">
              Criar conexões de verdade entre pessoas que constroem, aproximando experiência, conhecimento, oportunidades e ambição para que negócios e pessoas avancem juntos.
            </p>
          </div>

          <div className="bg-[#0B0B0D] border border-[#C5C7CB]/20 rounded-3xl p-8 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
            <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#C5C7CB]/10 border border-[#C5C7CB]/20 flex items-center justify-center text-[#C5C7CB] mb-6">
              <Flame size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F7] mb-3">Visão</h3>
            <p className="text-sm text-[#C5C7CB] leading-relaxed">
              Ser uma referência nacional em conexões empresariais de alta confiança, formando um ecossistema onde as relações gerem conhecimento e oportunidades.
            </p>
          </div>
        </div>

        {/* 6 Valores Platinum Metal */}
        <div>
          <div className="w-[76px] h-[4px] bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F] rounded-full mb-6"></div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F7] tracking-tight mb-8 flex items-center gap-3">
            <Shield className="text-[#C5C7CB]" /> Os 6 Valores Inegociáveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">01. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Conexão de verdade</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Não colecionamos contatos. Construímos relações baseadas em confiança, presença e interesse genuíno.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">02. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Verdade antes da aparência</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Preferimos conversas reais a discursos perfeitos. Experiências, erros, dúvidas e aprendizados têm espaço aqui.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">03. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Ambição que constrói</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Acreditamos em crescer, prosperar e querer mais — desde que esse crescimento também gere valor ao redor.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">04. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Decisão gera movimento</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Boas ideias sem ação continuam sendo apenas ideias. Valorizamos quem assume responsabilidade, decide e executa.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#C5C7CB]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">05. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Reciprocidade multiplica valor</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Uma comunidade se fortalece quando seus membros entram pensando não apenas no que podem encontrar, mas no que podem oferecer.
              </p>
            </div>

            {/* Valor 6 Platinum Highlight */}
            <div className="bg-gradient-to-br from-[#0f0f11] to-[#08080a] border-2 border-[#C5C7CB]/60 rounded-2xl p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(197,199,203,0.15)] hover:border-white transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1 flex items-center gap-1.5">
                06. Valor Fundamental
                <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]" title="Pulso NEXUS"></span>
              </div>
              <h3 className="text-lg font-extrabold text-white mb-2">Confiança é forjada</h3>
              <p className="text-sm text-[#C5C7CB] leading-relaxed">
                Assim como o aço, relações fortes são construídas sob tempo, consistência e adversidade. Credibilidade não se declara; se conquista.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OS 3 PILARES DO ECOSSISTEMA (Platinum Metal Cards)                      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-[#0b0b0d] border-t border-b border-[#C5C7CB]/20 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#C5C7CB] flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
              Três Pilares · Um Só Ecossistema
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
              A Estrutura do NEXUS
            </h2>
            <p className="text-[#C5C7CB] text-lg mt-4">
              Cada braço do ecossistema tem um papel claro e uma razão para existir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PILLAR 1: EVENTO */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#C5C7CB]/30 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#C5C7CB] transition-all shadow-xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-principal.png" alt="NEXUS Conexão de Verdade" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#C5C7CB] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
                  O Encontro
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS | Conexão de Verdade</h3>
                <p className="text-xs text-[#C5C7CB] font-bold uppercase tracking-wider mb-4">“Onde o ecossistema se encontra.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  A porta de entrada e grande celebração. Encontros memoráveis que tiram empresários de suas bolhas e transformam presença física em conversas e oportunidades reais.
                </p>
              </div>
              <div className="border-t border-[#C5C7CB]/15 pt-4 text-[11px] text-[#C5C7CB] font-semibold">
                Valores: Intencionalidade · Curadoria · Presença · Hospitalidade · Experiência
              </div>
            </div>

            {/* PILLAR 2: TALKS */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#C5C7CB]/30 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#C5C7CB] transition-all shadow-xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-talks.png" alt="NEXUS Talks" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#C5C7CB] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5C7CB]"></span>
                  A Conversa · Braço Editorial
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS TALKS</h3>
                <p className="text-xs text-[#C5C7CB] font-bold uppercase tracking-wider mb-4">“Conversas que valem a mesa.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  Conversas sobre negócios, carreira e decisões que normalmente acontecem quando as câmeras estão desligadas. Histórias autênticas de quem está efetivamente construindo.
                </p>
              </div>
              <div className="border-t border-[#C5C7CB]/15 pt-4 text-[11px] text-[#C5C7CB] font-semibold">
                Valores: Curiosidade · Franqueza · Profundidade · Pluralidade · Leveza · Humanidade
              </div>
            </div>

            {/* PILLAR 3: SESSIONS */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#C5C7CB]/40 rounded-3xl p-8 hover:-translate-y-2 hover:border-white transition-all shadow-2xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-sessions.png" alt="NEXUS Sessions" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#C5C7CB] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
                  O Clube · Pertencimento
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS SESSIONS</h3>
                <p className="text-xs text-[#C5C7CB] font-bold uppercase tracking-wider mb-4">“Onde conexões viram relações.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  Ambiente recorrente e de confiança onde empresários compartilham desafios, trocam repertório e geram oportunidades. Aqui, <strong>qualidade &gt; volume</strong>.
                </p>
              </div>
              <div className="border-t border-[#C5C7CB]/15 pt-4 text-[11px] text-[#C5C7CB] font-semibold">
                Valores: Confiança · Reciprocidade · Curadoria · Consistência · Generosidade · Proximidade
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. JORNADA DO MEMBRO (CICLO)                                               */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#C5C7CB] flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
            Como se conectam
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
            A Jornada do Membro
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#C5C7CB]">01 · Evento</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2">Revela conexões</h4>
            <p className="text-sm text-[#9A9AA0] leading-relaxed">
              O encontro presencial cria vínculos reais e revela quem tem tudo a ver com quem.
            </p>
          </div>

          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#C5C7CB]">02 · Sessions</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2">Mantém vivas</h4>
            <p className="text-sm text-[#9A9AA0] leading-relaxed">
              O clube transforma esses encontros pontuais em relacionamento contínuo e negócios.
            </p>
          </div>

          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#C5C7CB]">03 · Talks</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2">Leva adiante</h4>
            <p className="text-sm text-[#9A9AA0] leading-relaxed">
              O braço editorial amplia o alcance, constrói autoridade e atrai gente nova para o ecossistema.
            </p>
          </div>

        </div>

        <p className="text-lg md:text-xl text-[#E7E7EA] max-w-4xl leading-relaxed">
          O resultado é um ciclo: o <b>evento</b> revela conexões, o <b>Sessions</b> as mantém vivas e o <b>Talks</b> leva a marca adiante, trazendo novas pessoas para a próxima edição.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 4. CTA SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 text-center bg-[#0b0b0d] border-t border-[#C5C7CB]/20 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#C5C7CB] mb-4 flex items-center justify-center gap-2">
            Vamos construir juntos <span className="w-1.5 h-1.5 rounded-full bg-[#E1121F]"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Quer levar sua marca para dentro do ecossistema NEXUS?
          </h2>
          <p className="text-[#9A9AA0] text-lg max-w-xl mx-auto mb-8">
            Inscreva-se na nossa Lista VIP ou fale diretamente com a nossa equipe.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a 
              href={waLink('Olá! Quero falar sobre parceria com o NEXUS.')}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E1121F] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#A00D18] hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(225,18,31,0.3)]"
            >
              Falar no WhatsApp
            </a>

            <button 
              onClick={() => navigate('#lista-de-espera')}
              className="inline-flex items-center gap-2 border border-[#C5C7CB]/40 text-[#F5F5F7] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:border-white hover:text-white transition-all"
            >
              Entrar na Lista VIP
            </button>
          </div>

          <p className="text-xs text-[#9A9AA0] mt-8">Fortaleza/CE</p>
        </div>
      </section>

      <Footer isRebranded={true} />
    </div>
  );
}
