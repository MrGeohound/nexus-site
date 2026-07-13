import React, { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router.jsx';
import { initAttribution } from './lib/utm.js';
import { initConsent } from './lib/consent.js';
import { trackViewEvent } from './lib/analytics.js';
import ConsentBanner from './components/ConsentBanner';
import Home from './pages/Home';
import Obrigado from './pages/Obrigado';
import Indique from './pages/Indique';
import Privacidade from './pages/Privacidade';

function Routes() {
  const { path } = useRouter();

  useEffect(() => {
    // Boot: captura de atribuição (UTM) e reinicialização de consentimento.
    initAttribution();
    initConsent();
    trackViewEvent();
  }, []);

  switch (path) {
    case '/obrigado':
      return <Obrigado />;
    case '/indique':
      return <Indique />;
    case '/privacidade':
      return <Privacidade />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden bg-[#12333A] font-inter text-[#F8F3EA]">
      <RouterProvider>
        <Routes />
        <ConsentBanner />
      </RouterProvider>
    </div>
  );
}

export default App;
