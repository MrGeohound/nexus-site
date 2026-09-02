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
import HomeV2 from './pages/HomeV2';
import HomeV3 from './pages/HomeV3';
import Avaliacao from './pages/Avaliacao';
import Galeria from './pages/Galeria';
import Manifesto from './pages/Manifesto';
import RebrandTransition from './components/RebrandTransition';

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
    case '/v2':
      return <HomeV2 />;
    case '/v3':
      return <HomeV3 />;
    case '/avaliacao':
      return <Avaliacao />;
    case '/galeria':
      return <Galeria />;
    case '/manifesto':
      return <Manifesto />;
    default:
      return (
        <>
          <RebrandTransition />
          <Home />
        </>
      );
  }
}

function App() {
  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden font-inter">
      <RouterProvider>
        <Routes />
        <ConsentBanner />
      </RouterProvider>
    </div>
  );
}

export default App;
