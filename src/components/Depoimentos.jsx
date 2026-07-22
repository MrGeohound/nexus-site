import React from 'react';
import { TESTIMONIALS } from '../config/testimonials.js';

// Prova social real. Enquanto não houver depoimentos consentidos, não renderiza.
export default function Depoimentos() {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  return (
    <section id="depoimentos" className="bg-[#12333A] px-6 py-24 lg:px-[10%]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
            Quem viveu, conta
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#F8F3EA] md:text-5xl">
            O que dizem sobre o NEXUS
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6"
            >
              <blockquote className="mb-5 text-[#F8F3EA]/85 leading-relaxed">
                “{t.texto}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {t.foto ? (
                  <img src={t.foto} alt={t.nome} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A96A]/15 text-sm font-bold text-[#C8A96A]">
                    {t.nome?.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[#F8F3EA]">{t.nome}</p>
                  {t.empresa && <p className="text-xs text-[#F8F3EA]/50">{t.empresa}</p>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
