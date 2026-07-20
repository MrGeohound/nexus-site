import React from 'react';
import Header from '../components/Header';
import HeroV2 from '../components/HeroV2';
import About from '../components/About';
import TargetAudience from '../components/TargetAudience';
import Schedule from '../components/Schedule';
import Speakers from '../components/Speakers';
import Organizadores from '../components/Organizadores';
import Sponsors from '../components/Sponsors';
import Pricing from '../components/Pricing';
import LeadCapture from '../components/LeadCapture';
import Location from '../components/Location';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import useScrollDepth from '../lib/useScrollDepth.js';

export default function HomeV2() {
  useScrollDepth();
  return (
    <>
      <Header />
      <HeroV2 />
      <About />
      <TargetAudience />
      <Schedule />
      <Speakers />
      <Organizadores />
      <Sponsors />
      <Pricing source="v2" />
      <LeadCapture />
      <Location />
      <Faq />
      <Cta source="v2" />
      <Footer />
      <StickyCta source="v2" />
    </>
  );
}
