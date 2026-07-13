import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { OFFERS } from '../config';
import { startCheckout } from '../lib/checkout.js';
import { track, EVENTS } from '../lib/analytics.js';
import ScarcityBadge from './ScarcityBadge';

export default function Pricing() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            track(EVENTS.VIEW_PRICING);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="relative z-10 border-y border-[#12333A]/5 bg-[#F8F3EA] px-6 py-24 lg:px-[10%]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#12333A] md:text-5xl">
            Garanta sua presença no{' '}
            <span className="bg-gradient-to-r from-[#B86B4B] to-[#C8A96A] bg-clip-text text-transparent">NEXUS</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#12333A]/60">
            As vagas são limitadas para manter a qualidade das conversas, a proximidade entre os participantes e a experiência de networking real.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <ScarcityBadge variant="inline" />
        </div>

        <div className="mb-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {OFFERS.map((offer) => {
            const featured = offer.destaque;
            return (
              <div
                key={offer.id}
                className={
                  featured
                    ? 'relative transform rounded-3xl border border-[#C8A96A]/50 bg-[#12333A] p-8 shadow-2xl md:-translate-y-4 md:p-10'
                    : 'rounded-3xl border border-[#C8A96A]/30 bg-[#E8D8BE]/50 p-8 transition-all duration-300 hover:border-[#C8A96A]/60 md:p-10'
                }
              >
                {offer.selo && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B86B4B] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#F8F3EA]">
                    {offer.selo}
                  </div>
                )}

                <h3 className={`mb-2 text-2xl font-bold ${featured ? 'text-[#F8F3EA]' : 'text-[#12333A]'}`}>
                  {offer.nome}
                </h3>

                {offer.precoDe && (
                  <p className={`mb-4 text-sm line-through ${featured ? 'text-[#F8F3EA]/40' : 'text-[#12333A]/40'}`}>
                    De R$ {offer.precoDe}
                  </p>
                )}

                <div className="mb-2 flex items-baseline gap-2">
                  <span className={`text-2xl ${featured ? 'text-[#F8F3EA]/50' : 'text-[#12333A]/50'}`}>R$</span>
                  <span className={`text-5xl font-black tracking-tight ${featured ? 'text-[#F8F3EA]' : 'text-[#12333A]'}`}>
                    {offer.preco}
                  </span>
                  {offer.unidade && (
                    <span className={featured ? 'text-[#F8F3EA]/40' : 'text-[#12333A]/40'}>{offer.unidade}</span>
                  )}
                </div>

                <p className={`mb-8 text-sm uppercase tracking-widest ${featured ? 'text-[#F8F3EA]/50' : 'font-bold text-[#B86B4B]'}`}>
                  {offer.id === 'duplo' ? 'A partir de 2 ingressos' : 'NEXUS - Conexão de Verdade'}
                </p>

                <ul className="mb-10 space-y-4">
                  {offer.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <Check size={20} className={`mt-0.5 shrink-0 ${featured ? 'text-[#C8A96A]' : 'text-[#B86B4B]'}`} />
                      <span className={featured ? 'text-[#F8F3EA]/90' : 'text-[#12333A]/80'}>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => startCheckout(offer.id)}
                  className={
                    featured
                      ? 'block w-full rounded-full bg-[#B86B4B] py-4 text-center font-bold uppercase tracking-widest text-[#F8F3EA] shadow-lg transition-colors hover:bg-[#9F573E]'
                      : 'block w-full rounded-full border border-[#C8A96A] py-4 text-center font-bold uppercase tracking-widest text-[#12333A] transition-colors hover:bg-[#C8A96A]'
                  }
                >
                  {offer.id === 'duplo' ? 'Comprar Passe Duplo' : 'Comprar Ingresso'}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mx-auto max-w-lg text-center text-sm text-[#12333A]/40">
          Depois de garantir sua vaga, você receberá as informações do evento e orientações de chegada no seu e-mail.
        </p>
      </div>
    </section>
  );
}
