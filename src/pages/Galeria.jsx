import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Play, Download, Search, X, Check, ArrowLeft, Loader2, Share2,
} from 'lucide-react';
import { EVENT, CONTACT } from '../config';
import { VIDEOS } from '../config/videos.js';
import {
  loadManifest, resolveUrls, saveGate, gateLiberado, getGate,
} from '../lib/videos.js';
import { submitLead } from '../lib/leads.js';
import { track } from '../lib/analytics.js';
import { navigate } from '../lib/router.jsx';

const inputCls =
  'w-full rounded-xl border border-[#F8F3EA]/15 bg-[#12333A] px-4 py-3 text-[#F8F3EA] placeholder-[#F8F3EA]/40 outline-none focus:border-[#C8A96A]';

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || '';
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// --- Modal do player ---------------------------------------------------------
function Player({ item, source, onClose, onDownload }) {
  const { kind, stream, embed, poster } = resolveUrls(item, source);
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-11 right-0 flex items-center gap-1 text-sm text-[#F8F3EA]/80 hover:text-[#F8F3EA]"
        >
          <X size={20} /> Fechar
        </button>

        <div className="overflow-hidden rounded-2xl border border-[#F8F3EA]/10 bg-black shadow-2xl">
          <div className="relative aspect-[9/16] max-h-[72vh] w-full bg-black">
            {kind === 'video' ? (
              <video
                src={stream}
                poster={poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <iframe
                src={embed}
                title={`Clipe ${item.id}`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span className="text-sm text-[#F8F3EA]/50">
            Clipe #{item.seq} · NEXUS 23/07
          </span>
          <button
            onClick={() => onDownload(item)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#F8F3EA] transition-colors hover:bg-[#9F573E]"
          >
            <Download size={18} /> Baixar este vídeo
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Modal do gate de contato ------------------------------------------------
function GateModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', consent: false });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.nome.trim() || (!form.whatsapp.trim() && !form.email.trim())) {
      setError('Preencha seu nome e um contato (WhatsApp ou e-mail).');
      return;
    }
    if (!form.consent) {
      setError('É preciso aceitar o uso dos dados para continuar.');
      return;
    }
    setStatus('sending');
    // Guarda localmente antes de tudo, para não bloquear a experiência.
    saveGate({ nome: form.nome, whatsapp: form.whatsapp, email: form.email });
    try {
      await submitLead({ ...form, origem: 'galeria-videos' });
    } catch {
      /* mesmo se o envio falhar, o gate local já foi salvo */
    }
    track('galeria_lead', { origem: 'galeria-videos' });
    setStatus('done');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-[#C8A96A]/25 bg-[#12333A] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Fechar" className="float-right text-[#F8F3EA]/50 hover:text-[#F8F3EA]">
          <X size={20} />
        </button>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">Galeria NEXUS</p>
        <h2 className="mb-2 text-2xl font-extrabold text-[#F8F3EA]">Só falta um passo</h2>
        <p className="mb-5 text-sm text-[#F8F3EA]/60">
          Diga quem é você para liberar os downloads. É rápido — e a gente avisa você
          em primeira mão sobre a próxima edição.
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className={inputCls} placeholder="Seu nome" value={form.nome} onChange={(e) => set('nome', e.target.value)} autoFocus />
          <input className={inputCls} placeholder="WhatsApp (com DDD)" inputMode="tel" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
          <input className={inputCls} placeholder="E-mail" inputMode="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#C8A96A]/20 bg-[#C8A96A]/[0.05] p-3 text-xs text-[#F8F3EA]/80">
            <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#C8A96A]" />
            <span>
              Autorizo o NEXUS a usar meus dados para contato sobre próximas edições e
              produtos, conforme a{' '}
              <a href="/privacidade" className="text-[#C8A96A] underline">Política de Privacidade</a>.
            </span>
          </label>
          {error && <p className="text-sm text-[#E5896B]">{error}</p>}
          <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B86B4B] px-6 py-3.5 font-bold uppercase tracking-widest text-[#F8F3EA] transition-colors hover:bg-[#9F573E] disabled:opacity-60">
            {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            {status === 'sending' ? 'Liberando...' : 'Liberar downloads'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Card do vídeo -----------------------------------------------------------
function VideoCard({ item, source, onOpen, onDownload }) {
  const { poster } = resolveUrls(item, source);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-[#F8F3EA]/10 bg-[#0e2a30]">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-[#F8F3EA]/5" />}
      <img
        src={poster}
        alt={`Clipe ${item.seq} do NEXUS`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <button
        onClick={() => onOpen(item)}
        aria-label={`Assistir clipe ${item.seq}`}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A96A] text-[#12333A] shadow-lg">
          <Play size={26} className="ml-0.5" fill="currentColor" />
        </span>
      </button>
      <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-bold text-[#F8F3EA]/90">
        #{item.seq}
      </span>
      <button
        onClick={() => onDownload(item)}
        aria-label={`Baixar clipe ${item.seq}`}
        className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#12333A]/80 text-[#F8F3EA] backdrop-blur transition-colors hover:bg-[#B86B4B]"
      >
        <Download size={16} />
      </button>
    </div>
  );
}

// --- Página ------------------------------------------------------------------
export default function Galeria() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(VIDEOS.pageSize);
  const [player, setPlayer] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const pendingRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    track('galeria_view');
    loadManifest().then(setManifest).catch((e) => setError(String(e.message || e)));
  }, []);

  const source = manifest?.source || 'drive';
  const videos = manifest?.videos || [];

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return videos;
    return videos.filter(
      (v) => v.id.includes(q) || String(v.seq) === q,
    );
  }, [videos, query]);

  useEffect(() => { setVisible(VIDEOS.pageSize); }, [query]);

  // Rolagem infinita.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible((v) => Math.min(v + VIDEOS.pageSize, filtered.length));
      }
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  const doDownload = (item) => {
    const { download } = resolveUrls(item, source);
    track('galeria_download', { id: item.id });
    // Conta o download no servidor (não bloqueia o download em si).
    try {
      const payload = JSON.stringify({ id: item.id });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-download', new Blob([payload], { type: 'application/json' }));
      } else {
        fetch('/api/track-download', { method: 'POST', body: payload, keepalive: true, headers: { 'Content-Type': 'application/json' } });
      }
    } catch { /* ignora */ }
    triggerDownload(download, `NEXUS_${item.id}.mp4`);
  };

  const requestDownload = (item) => {
    if (gateLiberado()) return doDownload(item);
    pendingRef.current = item;
    setGateOpen(true);
  };

  const onGateSuccess = () => {
    setGateOpen(false);
    const item = pendingRef.current;
    pendingRef.current = null;
    if (item) doDownload(item);
  };

  const shareWhatsApp = () => {
    const msg = `Saiu a galeria de vídeos do ${EVENT.nome}! Reviva o evento e baixe seus momentos: ${EVENT.siteUrl}/galeria`;
    track('galeria_share', { canal: 'whatsapp' });
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  const total = manifest?.count ?? videos.length;
  const jaTem = getGate();

  return (
    <main className="min-h-screen bg-[#12333A] px-5 pb-24 pt-10 text-[#F8F3EA] lg:px-[7%]">
      {/* Cabeçalho */}
      <div className="mx-auto max-w-6xl">
        <button onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-sm text-[#F8F3EA]/60 hover:text-[#C8A96A]">
          <ArrowLeft size={16} /> Voltar ao site
        </button>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
              {EVENT.nome} · 23/07
            </p>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{VIDEOS.titulo}</h1>
            <p className="mt-3 max-w-xl text-[#F8F3EA]/60">{VIDEOS.subtitulo}</p>
          </div>
          <button onClick={shareWhatsApp} className="inline-flex items-center gap-2 self-start rounded-full border border-[#C8A96A] px-5 py-2.5 text-sm font-bold text-[#F8F3EA] transition-colors hover:bg-[#C8A96A] hover:text-[#12333A]">
            <Share2 size={16} /> Compartilhar galeria
          </button>
        </div>

        {/* Barra de busca + contagem */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F3EA]/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputMode="numeric"
              placeholder="Buscar por número do clipe"
              className={`${inputCls} pl-10`}
            />
          </div>
          <p className="text-sm text-[#F8F3EA]/50">
            {filtered.length === total
              ? `${total} vídeos`
              : `${filtered.length} de ${total} vídeos`}
            {jaTem && <span className="ml-2 text-[#C8A96A]">· downloads liberados</span>}
          </p>
        </div>
      </div>

      {/* Grade */}
      <div className="mx-auto mt-8 max-w-6xl">
        {error && (
          <p className="rounded-xl border border-[#E5896B]/30 bg-[#E5896B]/10 p-4 text-sm text-[#E5896B]">
            Não foi possível carregar a galeria agora. Tente recarregar a página.
          </p>
        )}

        {!manifest && !error && (
          <div className="flex items-center justify-center gap-2 py-20 text-[#F8F3EA]/50">
            <Loader2 className="animate-spin" size={20} /> Carregando galeria...
          </div>
        )}

        {manifest && filtered.length === 0 && (
          <p className="py-20 text-center text-[#F8F3EA]/50">
            Nenhum clipe encontrado para “{query}”.
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
          {filtered.slice(0, visible).map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              source={source}
              onOpen={setPlayer}
              onDownload={requestDownload}
            />
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />
        {manifest && visible < filtered.length && (
          <div className="flex justify-center py-6">
            <button onClick={() => setVisible((v) => v + VIDEOS.pageSize)} className="rounded-full border border-[#F8F3EA]/20 px-6 py-2.5 text-sm text-[#F8F3EA]/70 hover:border-[#C8A96A] hover:text-[#F8F3EA]">
              Carregar mais
            </button>
          </div>
        )}
      </div>

      {/* Rodapé de ajuda */}
      <div className="mx-auto mt-12 max-w-6xl rounded-2xl border border-[#F8F3EA]/10 bg-[#F8F3EA]/[0.03] p-5 text-sm text-[#F8F3EA]/60">
        Não encontrou você em algum momento? Fale com a gente no WhatsApp{' '}
        <a href={`https://wa.me/${CONTACT.whatsappNumero}`} target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] underline">
          {CONTACT.whatsappNumero.replace(/^55/, '')}
        </a>{' '}
        que ajudamos a localizar. Ao publicar, marque <strong className="text-[#F8F3EA]">@siganexus</strong>.
      </div>

      {player && (
        <Player
          item={player}
          source={source}
          onClose={() => setPlayer(null)}
          onDownload={requestDownload}
        />
      )}
      {gateOpen && (
        <GateModal onClose={() => setGateOpen(false)} onSuccess={onGateSuccess} />
      )}
    </main>
  );
}
