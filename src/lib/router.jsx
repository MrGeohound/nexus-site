// =============================================================================
// Router mínimo (sem dependência externa) — path-based com History API.
// Rotas: '/', '/obrigado', '/indique', '/privacidade'
// Requer fallback SPA no host (ver public/_redirects).
// =============================================================================
import { useEffect, useState, createContext, useContext } from 'react';
import { trackPageView } from './analytics.js';

const RouterCtx = createContext({ path: '/', navigate: () => {} });

export function useRouter() {
  return useContext(RouterCtx);
}

export function navigate(to) {
  if (typeof window === 'undefined') return;
  if (to.startsWith('#')) {
    // âncora na home
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/' + to);
    }
    const el = document.querySelector(to);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/',
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    trackPageView({ page_path: path });
  }, [path]);

  return (
    <RouterCtx.Provider value={{ path, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

// Link interno que usa o router.
export function Link({ to, children, ...rest }) {
  const onClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

export default RouterProvider;
