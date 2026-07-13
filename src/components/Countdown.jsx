import React, { useState, useEffect } from 'react';
import { EVENT } from '../config';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Data oficial do evento (config central)
    const targetDate = new Date(EVENT.dataInicioISO).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 mt-8">
      <div className="flex flex-col items-center liquid-glass rounded-xl w-16 md:w-20 py-3 md:py-4 border border-[#C8A96A]/20">
        <span className="text-2xl md:text-4xl font-black font-inter text-[#F8F3EA] tabular-nums leading-none tracking-tighter">{formatNumber(timeLeft.days)}</span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#C8A96A] mt-2 font-bold">Dias</span>
      </div>
      <span className="text-[#F8F3EA]/30 font-bold text-2xl -translate-y-2 animate-pulse">:</span>
      <div className="flex flex-col items-center liquid-glass rounded-xl w-16 md:w-20 py-3 md:py-4 border border-[#C8A96A]/20">
        <span className="text-2xl md:text-4xl font-black font-inter text-[#F8F3EA] tabular-nums leading-none tracking-tighter">{formatNumber(timeLeft.hours)}</span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#C8A96A] mt-2 font-bold">Hrs</span>
      </div>
      <span className="text-[#F8F3EA]/30 font-bold text-2xl -translate-y-2 animate-pulse">:</span>
      <div className="flex flex-col items-center liquid-glass rounded-xl w-16 md:w-20 py-3 md:py-4 border border-[#C8A96A]/20">
        <span className="text-2xl md:text-4xl font-black font-inter text-[#F8F3EA] tabular-nums leading-none tracking-tighter">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#C8A96A] mt-2 font-bold">Min</span>
      </div>
      <span className="text-[#F8F3EA]/30 font-bold text-2xl -translate-y-2 animate-pulse">:</span>
      <div className="flex flex-col items-center liquid-glass rounded-xl w-16 md:w-20 py-3 md:py-4 border border-[#C8A96A]/20">
        <span className="text-2xl md:text-4xl font-black font-inter text-[#C8A96A] tabular-nums leading-none tracking-tighter">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#C8A96A]/70 mt-2 font-bold">Seg</span>
      </div>
    </div>
  );
}
