import React from 'react';
import Header from '../components/Header';
import Hero from '../Hero';
import About from '../components/About';
import TargetAudience from '../components/TargetAudience';
import Schedule from '../components/Schedule';
import Speakers from '../components/Speakers';
import Organizadores from '../components/Organizadores';
import Testimonials from '../components/Testimonials';
import Sponsors from '../components/Sponsors';
import Pricing from '../components/Pricing';
import LeadCapture from '../components/LeadCapture';
import Location from '../components/Location';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import useScrollDepth from '../lib/useScrollDepth.js';

export default function Home() {
  useScrollDepth();
  return (
    <>
      <Header />
      <Hero />
      <About />
      <TargetAudience />
      <Schedule />
      <Speakers />
      <Organizadores />
      <Testimonials />
      <Sponsors />
      <Pricing />
      <LeadCapture />
      <Location />
      <Faq />
      <Cta />
      <Footer />
      <StickyCta />
    </>
  );
}
