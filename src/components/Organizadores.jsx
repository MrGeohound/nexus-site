import React from 'react';
import { ORGANIZADORES } from '../config';

// Organizadores do NEXUS. Fotos e credenciais vêm de src/config/site.js.
export default function Organizadores() {
  return (
    <section id="organizadores" className="bg-[#12333A] px-6 py-24 lg:px-[10%]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
            Quem constrói o NEXUS
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#F8F3EA] md:text-5xl">
            Organização
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {ORGANIZADORES.map((o) => (
            <div
              key={o.nome}
              className="rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-6 text-center transition-colors hover:border-[#C8A96A]/30"
            >
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10">
                {o.foto ? (
                  <img src={o.foto} alt={o.nome} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-[#C8A96A]">
                    {o.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#F8F3EA]">{o.nome}</h3>
              {o.atuacao && (
                <p className="mt-1 text-sm font-semibold text-[#C8A96A]">{o.atuacao}</p>
              )}
              {o.credencial && (
                <p className="mt-1 text-xs text-[#F8F3EA]/50">{o.credencial}</p>
              )}
              {o.papel && (
                <p className="mt-3 text-sm text-[#F8F3EA]/60">{o.papel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
