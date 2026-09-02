import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { navigate } from '../lib/router.jsx';
import { track } from '../lib/analytics.js';
import { SOCIAL, CONTACT } from '../config';
import { waLink } from '../lib/whatsapp.js';

export default function Manifesto() {
  useEffect(() => {
    track('view_manifesto');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] font-inter selection:bg-[#E1121F] selection:text-white relative">
      {/* Top Platinum Gradient Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] via-68%-[#979A9F] to-[#D9DADC] z-[200] opacity-90"></div>

      <Header />

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center relative pt-32 pb-16 px-6 bg-[radial-gradient(120%_80%_at_50%_30%,rgba(225,18,31,0.12),transparent_60%),radial-gradient(90%_45%_at_50%_112%,rgba(197,199,203,0.06),transparent_62%)]">
        
        <div className="text-[12px] md:text-[13px] tracking-[0.32em] uppercase text-[#E3E4E6] font-extrabold mb-6 flex items-center gap-2 justify-center">
          O Ecossistema <span className="inline-block w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-[#E1121F]"></span>
        </div>

        <img 
          src="/assets/rebrand/logo-nexus-2026-nobg.png" 
          alt="NEXUS 2026" 
          className="w-full max-w-[480px] md:max-w-[620px] h-auto mx-auto mb-6 filter drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        />

        <p className="text-xl md:text-2xl text-[#D7D7DC] max-w-2xl mx-auto leading-relaxed font-light mt-4">
          Conexões de verdade constroem coisas maiores. <br />
          <strong className="font-bold text-[#F5F5F7]">Aproximamos experiência, ambição e oportunidade para que negócios e pessoas avancem juntos.</strong>
        </p>

        <div className="w-[120px] h-[2px] my-8 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC] rounded-full opacity-90 mx-auto"></div>

        <a 
          href="#manifesto-text" 
          className="text-xs uppercase tracking-[0.25em] text-[#9A9AA0] flex flex-col items-center gap-2 hover:text-[#F5F5F7] transition-colors"
        >
          Role para explorar
          <span className="w-[1px] h-[34px] bg-gradient-to-b from-[#E1121F] to-transparent animate-pulse"></span>
        </a>
      </section>

      {/* ========================================================================= */}
      {/* MANIFESTO STATEMENT                                                       */}
      {/* ========================================================================= */}
      <section id="manifesto-text" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#C5C7CB]/15">
        <div className="text-xs font-black uppercase tracking-[0.3em] text-[#C5C7CB] mb-4 flex items-center gap-2">
          NEXUS Marca-Mãe <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#E1121F]"></span>
        </div>

        <p className="text-2xl md:text-4xl font-light text-[#E7E7EA] leading-snug mb-8">
          Criar conexões de verdade entre pessoas que constroem. Ser uma <b className="font-bold text-white">referência nacional em conexões empresariais de alta confiança</b>, formando um ecossistema onde as relações gerem conhecimento, oportunidades e construções que <span className="text-[#E1121F] font-semibold">não aconteceriam de forma isolada</span>.
        </p>

        {/* 6 Os Valores Inegociáveis */}
        <div className="mt-16">
          <div className="w-[76px] h-[4px] bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#979A9F] rounded-full mb-6"></div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F7] tracking-tight mb-8">
            Os 6 Valores do Ecossistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#E1121F]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#E1121F] mb-1">01. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Conexão de verdade</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Não colecionamos contatos. Construímos relações baseadas em confiança, presença e interesse genuíno.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#E1121F]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#E1121F] mb-1">02. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Verdade antes da aparência</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Preferimos conversas reais a discursos perfeitos. Experiências, erros, dúvidas e aprendizados têm espaço aqui.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#E1121F]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#E1121F] mb-1">03. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Ambição que constrói</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Acreditamos em crescer, prosperar e querer mais — desde que esse crescimento também gere valor ao redor.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#E1121F]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#E1121F] mb-1">04. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Decisão gera movimento</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Boas ideias sem ação continuam sendo apenas ideias. Valorizamos quem assume responsabilidade, decide e executa.
              </p>
            </div>

            <div className="bg-[#0b0b0d] border border-[#C5C7CB]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[#E1121F]/50 transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] to-[#C5C7CB]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#E1121F] mb-1">05. Valor</div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Reciprocidade multiplica valor</h3>
              <p className="text-sm text-[#9A9AA0] leading-relaxed">
                Uma comunidade se fortalece quando seus membros entram pensando não apenas no que podem encontrar, mas também no que podem oferecer.
              </p>
            </div>

            {/* Valor 6 Platinum Highlight */}
            <div className="bg-gradient-to-br from-[#0f0f11] to-[#08080a] border-2 border-[#C5C7CB]/50 rounded-2xl p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(197,199,203,0.1)] hover:border-[#E1121F] transition-all">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C5C7CB] mb-1">06. Acabamento Platinum</div>
              <h3 className="text-lg font-extrabold text-white mb-2">Confiança é forjada</h3>
              <p className="text-sm text-[#C5C7CB] leading-relaxed">
                Assim como o aço, relações fortes são construídas sob tempo, consistência e adversidade. Credibilidade não se declara; se conquista.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3 PILARES DO ECOSSISTEMA                                                   */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-[#0b0b0d] border-t border-b border-[#C5C7CB]/20 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E3E4E6] flex items-center gap-2 mb-3">
              <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#E1121F]"></span>
              Três Pilares, Um Só Ecossistema
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
              A Estrutura do NEXUS
            </h2>
            <p className="text-[#C5C7CB] text-lg mt-4">
              Cada braço do ecossistema tem um papel claro e uma razão para existir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PILLAR 1 */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#C5C7CB]/30 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#E1121F]/60 transition-all shadow-xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-principal.png" alt="NEXUS Conexão de Verdade" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#C5C7CB] mb-2 flex items-center gap-1.5">
                  <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#E1121F]"></span>
                  O Encontro
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS | Conexão de Verdade</h3>
                <p className="text-xs text-[#E1121F] font-bold uppercase tracking-wider mb-4">“Onde o ecossistema se encontra.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  A porta de entrada e grande celebração. Encontros memoráveis que tiram empresários de suas bolhas e transformam presença física em conversas e oportunidades reais.
                </p>
              </div>
              <div className="border-t border-[#C5C7CB]/10 pt-4 text-[11px] text-[#C5C7CB] font-semibold">
                Valores: Intencionalidade · Curadoria · Presença · Hospitalidade · Experiência
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#C5C7CB]/30 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#E1121F]/60 transition-all shadow-xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F1F2F3] via-[#C5C7CB] to-[#D9DADC]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-talks.png" alt="NEXUS Talks" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#C5C7CB] mb-2 flex items-center gap-1.5">
                  <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#E1121F]"></span>
                  A Conversa · Braço Editorial
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS TALKS</h3>
                <p className="text-xs text-[#C5C7CB] font-bold uppercase tracking-wider mb-4">“Conversas que valem a mesa.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  Conversas sobre negócios, carreira e decisões que normalmente acontecem quando as câmeras estão desligadas. Histórias autênticas de quem está efetivamente construindo.
                </p>
              </div>
              <div className="border-t border-[#C5C7CB]/10 pt-4 text-[11px] text-[#C5C7CB] font-semibold">
                Valores: Curiosidade · Franqueza · Profundidade · Pluralidade · Leveza · Humanidade
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#08080a] border border-[#E1121F]/40 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#E1121F] transition-all shadow-2xl flex flex-col justify-between">
              <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#E1121F] to-[#A00D18]"></div>
              <div>
                <div className="h-20 flex items-center mb-6">
                  <img src="/assets/rebrand/logo-nexus-sessions.png" alt="NEXUS Sessions" className="max-h-16 w-auto object-contain" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#E1121F] mb-2 flex items-center gap-1.5">
                  <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#E1121F]"></span>
                  O Clube · Pertencimento
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NEXUS SESSIONS</h3>
                <p className="text-xs text-[#E1121F] font-bold uppercase tracking-wider mb-4">“Onde conexões viram relações.”</p>
                <p className="text-sm text-[#9A9AA0] leading-relaxed mb-6">
                  Ambiente recorrente e de confiança onde empresários compartilham desafios, trocam repertório e geram oportunidades. Aqui, <strong>qualidade &gt; volume</strong>.
                </p>
              </div>
              <div className="border-t border-[#E1121F]/20 pt-4 text-[11px] text-[#E1121F] font-semibold">
                Valores: Confiança · Reciprocidade · Curadoria · Consistência · Generosidade · Proximidade
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* JORNADA DO ECOSSISTEMA                                                    */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E3E4E6] flex items-center gap-2 mb-3">
            <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#E1121F]"></span>
            Como se conectam
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
            A Jornada do Membro
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#E1121F]">01 · Evento</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2">Revela conexões</h4>
            <p className="text-sm text-[#9A9AA0] leading-relaxed">
              O encontro presencial cria vínculos reais e revela quem tem tudo a ver com quem.
            </p>
          </div>

          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#E1121F]">02 · Sessions</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2">Mantém vivas</h4>
            <p className="text-sm text-[#9A9AA0] leading-relaxed">
              O clube transforma esses encontros pontuais em relacionamento contínuo e negócios.
            </p>
          </div>

          <div className="border border-[#C5C7CB]/20 rounded-2xl p-6 bg-[#0a0a0c] relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#E1121F]">03 · Talks</span>
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
      {/* CTA SECTION                                                               */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 text-center bg-[radial-gradient(120%_90%_at_50%_0%,rgba(225,18,31,0.15),transparent_55%),#0b0b0d] border-t border-[#C5C7CB]/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E3E4E6] mb-4">
            Vamos construir juntos <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#E1121F]"></span>
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
              className="inline-flex items-center gap-2 bg-[#E1121F] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#A00D18] hover:-translate-y-0.5 transition-all shadow-[0_0_25px_rgba(225,18,31,0.4)]"
            >
              Falar no WhatsApp
            </a>

            <button 
              onClick={() => navigate('#lista-de-espera')}
              className="inline-flex items-center gap-2 border border-[#C5C7CB]/30 text-[#E3E4E6] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:border-[#E1121F] hover:text-white transition-all"
            >
              Entrar na Lista VIP
            </button>
          </div>

          <p className="text-xs text-[#9A9AA0] mt-8">Fortaleza/CE</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
