import React from 'react';
import { Network, Lock } from 'lucide-react';

export default function Networking() {
  return (
    <section id="networking" className="py-32 px-6 lg:px-[10%] relative z-10 bg-white overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5ed29c]/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-[#5ed29c]/10 p-4 rounded-2xl border border-[#5ed29c]/20">
            <Network size={48} className="text-[#5ed29c]" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-inter font-black mb-8 tracking-tight">
          Conexões que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ed29c] to-emerald-600">Importam</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-700 font-inter leading-relaxed mb-6">
          Esse evento é tão estratégico, que tem <strong className="text-slate-900">90% de chance</strong> da pessoa sentada ao seu lado ser um futuro cliente ou parceiro de negócios.
        </p>
        
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 mt-10 inline-flex items-center gap-4 max-w-2xl text-left backdrop-blur-sm">
          <Lock size={32} className="text-[#5ed29c] shrink-0" />
          <p className="text-slate-600 font-inter text-sm md:text-base leading-relaxed">
            Uma metodologia de networking misteriosa que revelaremos <strong className="text-slate-900">apenas para quem estiver presente</strong>. Esteja pronto para expandir sua rede de contatos.
          </p>
        </div>
      </div>
    </section>
  );
}
