// =============================================================================
// UTM & atribuição — captura, persistência e propagação
// -----------------------------------------------------------------------------
// - Captura utm_* / ref / fbclid / gclid ao entrar no site.
// - Persiste em localStorage (first-touch) e sessionStorage (last-touch).
// - Propaga para links externos (checkout Sympla) quando permitido.
// =============================================================================

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
];
const CLICK_IDS = ['fbclid', 'gclid'];
const FIRST_KEY = 'nexus_attr_first';
const LAST_KEY = 'nexus_attr_last';
const SESSION_KEY = 'nexus_session_id';

const safeParse = (raw) => {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const store = {
  get(area, key) {
    try {
      return area === 'local'
        ? window.localStorage.getItem(key)
        : window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(area, key, val) {
    try {
      const s = area === 'local' ? window.localStorage : window.sessionStorage;
      s.setItem(key, val);
    } catch {
      /* storage indisponível (modo privado etc.) — ignora silenciosamente */
    }
  },
};

// Gera/recupera um identificador anônimo de sessão.
export function getSessionId() {
  let id = store.get('session', SESSION_KEY);
  if (!id) {
    id =
      'sess_' +
      Date.now().toString(36) +
      '_' +
      Math.random().toString(36).slice(2, 10);
    store.set('session', SESSION_KEY, id);
  }
  return id;
}

// Lê os parâmetros de atribuição da URL atual.
function readFromUrl() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out = {};
  [...UTM_KEYS, ...CLICK_IDS].forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}

// Deve ser chamada uma vez no boot da aplicação.
export function initAttribution() {
  if (typeof window === 'undefined') return {};
  getSessionId();
  const current = readFromUrl();

  if (Object.keys(current).length > 0) {
    const withMeta = {
      ...current,
      landing_page: window.location.pathname,
      referrer: document.referrer || '',
      ts: new Date().toISOString(),
    };
    // first-touch: só grava se ainda não existir
    if (!store.get('local', FIRST_KEY)) {
      store.set('local', FIRST_KEY, JSON.stringify(withMeta));
    }
    // last-touch: sempre atualiza
    store.set('session', LAST_KEY, JSON.stringify(withMeta));
    return withMeta;
  }
  return getAttribution();
}

// Retorna a melhor atribuição disponível (last-touch > first-touch).
export function getAttribution() {
  const last = safeParse(store.get('session', LAST_KEY));
  const first = safeParse(store.get('local', FIRST_KEY));
  return {
    ...(first || {}),
    ...(last || {}),
    session_id: getSessionId(),
    landing_page:
      (last && last.landing_page) ||
      (first && first.landing_page) ||
      (typeof window !== 'undefined' ? window.location.pathname : ''),
    referrer:
      (first && first.referrer) ||
      (typeof document !== 'undefined' ? document.referrer : ''),
  };
}

// Só as chaves utm_*/ref (para anexar a URLs).
export function getUtmParams() {
  const attr = getAttribution();
  const out = {};
  [...UTM_KEYS, ...CLICK_IDS].forEach((k) => {
    if (attr[k]) out[k] = attr[k];
  });
  return out;
}

// Anexa os UTMs atuais a uma URL externa preservando params existentes.
export function appendUtm(url) {
  try {
    const u = new URL(url);
    const utm = getUtmParams();
    Object.entries(utm).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  } catch {
    return url;
  }
}

export default { initAttribution, getAttribution, getUtmParams, appendUtm, getSessionId };
