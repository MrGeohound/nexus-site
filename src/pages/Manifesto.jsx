import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Sparkles, HeartHandshake, Compass, Users, Flame, Award, ArrowRight, MessageSquare, Repeat, Layers } from 'lucide-react';
import { track } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

export default function Manifesto() {
  useEffect(() => {
    // Forçar paleta Rebranded na página de manifesto
    document.body.classList.add('rebranded');
    track('view_manifesto');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] font-inter selection:bg-[#E1121F] selection:text-white">
      <Header />

      {/* ========================================================================= */}
      {/* HERO DO MANIFESTO                                                         */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 px-6 lg:px-[10%] overflow-hidden border-b border-[#C5C7CB]/10">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E1121F]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A00D18]/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E1121F]/40 bg-[#E1121F]/10 text-[#E1121F] font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Posicionamento Oficial do Ecossistema
          </div>

          <img 
            src="/assets/rebrand/logo-nexus-2026-nobg.png" 
            alt="NEXUS 2026" 
            className="w-[200px] md:w-[260px] mx-auto mb-8 object-contain filter drop-shadow-[0_0_20px_rgba(225,18,31,0.3)]"
          />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-[#F5F5F7]">
            Conexões de verdade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1121F] via-[#F5F5F7] to-[#C5C7CB]">
              construem coisas maiores.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-[#C5C7CB] max-w-3xl mx-auto leading-relaxed mb-8">
            Nós não colecionamos contatos. Nós aproximamos experiência, ambição e decisão para que negócios e pessoas avancem juntos.
          </p>

          <div className="flex justify-center gap-4">
            <a 
              href="#marca-mae" 
              className="inline-flex items-center gap-2 bg-[#E1121F] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#A00D18] transition-all shadow-[0_0_30px_rgba(225,18,31,0.4)]"
            >
              Conhecer o Manifesto <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 1. NEXUS — MARCA-MÃE                                                      */}
      {/* ========================================================================= */}
      <section id="marca-mae" className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#0B0B0D] border-b border-[#C5C7CB]/10">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-16">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E1121F]">NEXUS — Marca-Mãe</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-4">
              A Crença Fundamental
            </h2>
            <div className="w-20 h-1 bg-[#E1121F] rounded-full"></div>
          </div>

          {/* Missão e Visão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#050505] border border-[#C5C7CB]/15 rounded-3xl p-8 hover:border-[#E1121F]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#E1121F]/15 flex items-center justify-center text-[#E1121F] mb-6">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F7] mb-3">Missão</h3>
              <p className="text-[#C5C7CB] text-base leading-relaxed">
                Criar conexões de verdade entre pessoas que constroem, aproximando experiência, conhecimento, oportunidades e ambição para que negócios e pessoas avancem juntos.
              </p>
            </div>

            <div className="bg-[#050505] border border-[#C5C7CB]/15 rounded-3xl p-8 hover:border-[#E1121F]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#E1121F]/15 flex items-center justify-center text-[#E1121F] mb-6">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F7] mb-3">Visão</h3>
              <p className="text-[#C5C7CB] text-base leading-relaxed">
                Ser uma referência nacional em conexões empresariais de alta confiança, formando um ecossistema onde as relações gerem conhecimento, oportunidades e construções que não aconteceriam de forma isolada.
              </p>
            </div>
          </div>

          {/* Os 6 Valores NEXUS */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#F5F5F7] mb-8 flex items-center gap-3">
              <Shield className="text-[#E1121F]" /> Os 6 Valores Inegociáveis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Valor 1 */}
              <div className="bg-[#050505] border border-[#C5C7CB]/10 rounded-2xl p-6 hover:border-[#E1121F]/30 transition-all">
                <div className="text-xs font-black text-[#E1121F] uppercase mb-2">01. Valor</div>
                <h4 className="text-lg font-bold text-[#F5F5F7] mb-2">Conexão de verdade</h4>
                <p className="text-sm text-[#9A9AA0] leading-relaxed">
                  Não colecionamos contatos. Construímos relações baseadas em confiança, presença e interesse genuíno.
                </p>
              </div>

              {/* Valor 2 */}
              <div className="bg-[#050505] border border-[#C5C7CB]/10 rounded-2xl p-6 hover:border-[#E1121F]/30 transition-all">
                <div className="text-xs font-black text-[#E1121F] uppercase mb-2">02. Valor</div>
                <h4 className="text-lg font-bold text-[#F5F5F7] mb-2">Verdade antes da aparência</h4>
                <p className="text-sm text-[#9A9AA0] leading-relaxed">
                  Preferimos conversas reais a discursos perfeitos. Experiências, erros, dúvidas e aprendizados têm espaço aqui.
                </p>
              </div>

              {/* Valor 3 */}
              <div className="bg-[#050505] border border-[#C5C7CB]/10 rounded-2xl p-6 hover:border-[#E1121F]/30 transition-all">
                <div className="text-xs font-black text-[#E1121F] uppercase mb-2">03. Valor</div>
                <h4 className="text-lg font-bold text-[#F5F5F7] mb-2">Ambição que constrói</h4>
                <p className="text-sm text-[#9A9AA0] leading-relaxed">
                  Acreditamos em crescer, prosperar e querer mais — desde que esse crescimento também gere valor ao redor.
                </p>
              </div>

              {/* Valor 4 */}
              <div className="bg-[#050505] border border-[#C5C7CB]/10 rounded-2xl p-6 hover:border-[#E1121F]/30 transition-all">
                <div className="text-xs font-black text-[#E1121F] uppercase mb-2">04. Valor</div>
                <h4 className="text-lg font-bold text-[#F5F5F7] mb-2">Decisão gera movimento</h4>
                <p className="text-sm text-[#9A9AA0] leading-relaxed">
                  Boas ideias sem ação continuam sendo apenas ideias. Valorizamos quem assume responsabilidade, decide e executa.
                </p>
              </div>

              {/* Valor 5 */}
              <div className="bg-[#050505] border border-[#C5C7CB]/10 rounded-2xl p-6 hover:border-[#E1121F]/30 transition-all">
                <div className="text-xs font-black text-[#E1121F] uppercase mb-2">05. Valor</div>
                <h4 className="text-lg font-bold text-[#F5F5F7] mb-2">Reciprocidade multiplica valor</h4>
                <p className="text-sm text-[#9A9AA0] leading-relaxed">
                  Uma comunidade se fortalece quando seus membros entram pensando não apenas no que podem encontrar, mas também no que podem oferecer.
                </p>
              </div>

              {/* Valor 6 - PLATINUM DESTACADO */}
              <div className="bg-gradient-to-br from-[#050505] via-[#0B0B0D] to-[#1a1a22] border-2 border-[#C5C7CB]/40 rounded-2xl p-6 shadow-[0_0_25px_rgba(197,199,203,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#C5C7CB] text-[#050505] text-[10px] font-black uppercase tracking-widest">
                  Platinum Metal
                </div>
                <div className="text-xs font-black text-[#C5C7CB] uppercase mb-2">06. Valor Fundamental</div>
                <h4 className="text-lg font-bold text-platinum-gradient mb-2">Confiança é forjada</h4>
                <p className="text-sm text-[#C5C7CB] leading-relaxed">
                  Assim como o aço, relações fortes são construídas sob tempo, consistência e adversidade. Credibilidade não se declara; se conquista.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. ARQUITETURA DO ECOSSISTEMA (AS 3 VEIAS)                                */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E1121F]">Três Pilares · Uma Única História</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-4">
              A Arquitetura do Ecossistema
            </h2>
            <p className="text-[#C5C7CB] max-w-2xl mx-auto text-lg">
              Conheça as três frentes do NEXUS criadas para conectar, alimentar e criar raízes.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* VEIA 1: EVENTO */}
            <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1121F]/15 border border-[#E1121F]/40 text-[#E1121F] text-xs font-bold uppercase tracking-wider mb-3">
                    O Encontro
                  </div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F7]">NEXUS | Conexão de Verdade</h3>
                  <p className="text-lg italic text-red-gradient font-bold mt-1">“Onde o ecossistema se encontra.”</p>
                </div>

                <img src="/assets/rebrand/logo-nexus-principal.png" alt="NEXUS Conexão de Verdade" className="h-16 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#C5C7CB]/10 pt-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Missão do Evento</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Criar encontros memoráveis que tirem empresários e gestores de suas bolhas e transformem presença física em conversas, relações e oportunidades reais.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Visão do Evento</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Ser um dos encontros empresariais mais desejados e relevantes do país para quem busca conteúdo, relacionamento e oportunidades sem o networking superficial dos eventos tradicionais.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#E1121F] mb-4">Valores do Evento</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Intencionalidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Curadoria</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Presença</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Hospitalidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Experiência</div>
                </div>
              </div>
            </div>

            {/* VEIA 2: TALKS */}
            <div className="bg-[#0B0B0D] border border-[#C5C7CB]/15 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5C7CB]/15 border border-[#C5C7CB]/40 text-[#C5C7CB] text-xs font-bold uppercase tracking-wider mb-3">
                    A Conversa · Braço Editorial
                  </div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F7]">NEXUS TALKS</h3>
                  <p className="text-lg italic text-platinum-gradient font-bold mt-1">“Conversas que valem a mesa.”</p>
                </div>

                <img src="/assets/rebrand/logo-nexus-talks.png" alt="NEXUS Talks" className="h-16 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#C5C7CB]/10 pt-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Missão do Talks</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Colocar pessoas interessantes à mesa para ter as conversas sobre negócios, carreira, liderança, decisões e vida profissional que normalmente acontecem quando as câmeras estão desligadas.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Visão do Talks</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Tornar-se uma referência em conversas empresariais autênticas, aproximando a audiência das histórias, decisões e aprendizados de quem está efetivamente construindo.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5C7CB] mb-4">Valores do Talks</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Curiosidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Franqueza</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Profundidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Pluralidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Leveza</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#C5C7CB]/10 text-xs text-[#F5F5F7] font-semibold">Humanidade</div>
                </div>
              </div>
            </div>

            {/* VEIA 3: SESSIONS */}
            <div className="bg-[#0B0B0D] border border-[#E1121F]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(225,18,31,0.1)]">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1121F]/20 border border-[#E1121F]/50 text-[#E1121F] text-xs font-bold uppercase tracking-wider mb-3">
                    A Comunidade · O Clube
                  </div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F7]">NEXUS SESSIONS</h3>
                  <p className="text-lg italic text-red-gradient font-bold mt-1">“Onde conexões viram relações.”</p>
                </div>

                <img src="/assets/rebrand/logo-nexus-sessions.png" alt="NEXUS Sessions" className="h-16 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#C5C7CB]/10 pt-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Missão do Sessions</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Criar um ambiente recorrente e de confiança onde empresários e gestores possam compartilhar desafios, trocar repertório, construir relações e gerar oportunidades entre pessoas que também estão no jogo.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5C7CB] mb-2">Visão do Sessions (Qualidade &gt; Volume)</h4>
                  <p className="text-sm text-[#9A9AA0] leading-relaxed">
                    Construir uma das comunidades empresariais mais valiosas e confiáveis do país, reconhecida não pelo tamanho da base, mas pela qualidade das relações entre seus membros.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#E1121F] mb-4">Valores do Sessions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Confiança</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Reciprocidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Curadoria</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Consistência</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Generosidade</div>
                  <div className="bg-[#050505] p-3 rounded-xl border border-[#E1121F]/20 text-xs text-[#F5F5F7] font-semibold">Proximidade</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. LÓGICA COMERCIAL DO ECOSSISTEMA                                        */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 lg:px-[10%] relative z-10 bg-[#0B0B0D] border-t border-[#C5C7CB]/10">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E1121F]">Lógica de Funcionamento</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-10">
            A Jornada do Membro
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <div className="bg-[#050505] border border-[#C5C7CB]/15 rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#E1121F]/20 text-[#E1121F] font-black text-sm flex items-center justify-center mx-auto mb-4">1</div>
              <h4 className="text-lg font-bold text-[#F5F5F7] mb-1">Evento (Descoberta)</h4>
              <p className="text-xs text-[#9A9AA0]">Ponto de entrada e grande celebração para tirar empresários da bolha.</p>
            </div>

            <div className="bg-[#050505] border border-[#C5C7CB]/15 rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#E1121F]/20 text-[#E1121F] font-black text-sm flex items-center justify-center mx-auto mb-4">2</div>
              <h4 className="text-lg font-bold text-[#F5F5F7] mb-1">Talks (Relacionamento)</h4>
              <p className="text-xs text-[#9A9AA0]">Conteúdo contínuo e conversas reais que mantêm o ecossistema ativo.</p>
            </div>

            <div className="bg-[#050505] border border-[#C5C7CB]/15 rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#E1121F]/20 text-[#E1121F] font-black text-sm flex items-center justify-center mx-auto mb-4">3</div>
              <h4 className="text-lg font-bold text-[#F5F5F7] mb-1">Sessions (Pertencimento)</h4>
              <p className="text-xs text-[#9A9AA0]">Comunidade fechada e recorrente para criar raízes e gerar negócios.</p>
            </div>

          </div>

          <div className="bg-gradient-to-r from-[#050505] via-[#0B0B0D] to-[#050505] border border-[#E1121F]/30 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-[#F5F5F7] mb-4">
              Quer fazer parte da 2ª Edição ou entrar na Lista VIP do Sessions?
            </h3>
            <p className="text-sm text-[#C5C7CB] max-w-xl mx-auto mb-6">
              Inscreva-se na nossa lista oficial para receber atualizações exclusivas do ecossistema NEXUS.
            </p>
            <button 
              onClick={() => navigate('#lista-de-espera')}
              className="inline-flex items-center gap-2 bg-[#E1121F] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#A00D18] transition-all shadow-[0_0_25px_rgba(225,18,31,0.4)]"
            >
              Entrar na Lista VIP <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
