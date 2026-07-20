import React from 'react';
import Header from '../components/Header';
import HeroV3 from '../components/HeroV3';
import TargetAudience from '../components/TargetAudience';
import Speakers from '../components/Speakers';
import Pricing from '../components/Pricing';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import useScrollDepth from '../lib/useScrollDepth.js';

export default function HomeV3() {
  useScrollDepth();
  return (
    <div className="bg-black text-[#F8F3EA]">
      <Header />
      <HeroV3 />
      
      <div className="py-12 bg-zinc-900 border-y border-[#C8A96A]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-wider text-[#C8A96A]">A Única Certeza do Mercado</h2>
          <p className="text-lg text-white/70">
            Enquanto você hesita, seus concorrentes estão fechando negócios nas mesas onde você não sentou.
          </p>
        </div>
      </div>

      <TargetAudience />
      <Speakers />
      <Pricing />
      <Cta />
      <Footer />
      <StickyCta />
    </div>
  );
}
