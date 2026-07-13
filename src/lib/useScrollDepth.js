// Hook: dispara scroll_25/50/75/90 uma única vez por sessão de página.
import { useEffect } from 'react';
import { track, EVENTS } from './analytics.js';

export default function useScrollDepth() {
  useEffect(() => {
    const marks = [
      [25, EVENTS.SCROLL_25],
      [50, EVENTS.SCROLL_50],
      [75, EVENTS.SCROLL_75],
      [90, EVENTS.SCROLL_90],
    ];
    const fired = new Set();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      marks.forEach(([threshold, evt]) => {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track(evt, { depth: threshold });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
