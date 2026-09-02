import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../Hero';
import About from '../components/About';
import Sponsors from '../components/Sponsors';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import RebrandTransition from '../components/RebrandTransition';
import useScrollDepth from '../lib/useScrollDepth.js';

export default function Home() {
  useScrollDepth();
  const [themeState, setThemeState] = useState('old'); // 'old' | 'rebranded'

  return (
    <>
      <RebrandTransition onStateChange={(state) => setThemeState(state)} />
      <Header isRebranded={themeState === 'rebranded'} />
      <Hero isRebranded={themeState === 'rebranded'} />
      <About />
      <Sponsors />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer isRebranded={themeState === 'rebranded'} />
      <StickyCta />
    </>
  );
}
