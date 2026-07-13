import React from 'react';

// Símbolo Isolado da Ponte
export const NexusBridgeSymbol = ({ className, mainColor = "currentColor", accentColor = "#C8A96A" }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Base bridge line */}
    <path d="M10 50 L 90 50" stroke={mainColor} strokeWidth="6" strokeLinecap="round" />
    
    {/* Main Arch */}
    <path d="M15 50 C 15 50, 30 15, 50 15 C 70 15, 85 50, 85 50" stroke={mainColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Connecting pillars */}
    <path d="M35 50 L 35 30" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
    <path d="M65 50 L 65 30" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
    
    {/* Center node / connection point */}
    <circle cx="50" cy="15" r="5" fill={accentColor} />
  </svg>
);

// Logo Principal (Símbolo + NEXUS + Conexão de Verdade)
export const NexusLogoPrincipal = ({ className, textColor = "#F8F3EA", bridgeMainColor = "#F8F3EA", bridgeAccentColor = "#C8A96A" }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <NexusBridgeSymbol 
      className="w-[80px] h-[48px] md:w-[100px] md:h-[60px] mb-2" 
      mainColor={bridgeMainColor} 
      accentColor={bridgeAccentColor} 
    />
    <span 
      className="font-inter font-black tracking-[0.2em] leading-none mb-1"
      style={{ color: textColor, fontSize: 'clamp(28px, 5vw, 42px)' }}
    >
      NEXUS
    </span>
    <span 
      className="font-inter font-medium tracking-[0.3em] uppercase"
      style={{ color: bridgeAccentColor, fontSize: 'clamp(8px, 1.5vw, 11px)' }}
    >
      Conexão de Verdade
    </span>
  </div>
);

// Logo Horizontal Simplificada (Símbolo à esquerda + NEXUS)
export const NexusLogoHorizontal = ({ className, textColor = "#F8F3EA", bridgeMainColor = "#C8A96A", bridgeAccentColor = "#C8A96A" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <NexusBridgeSymbol 
      className="h-full w-auto" 
      mainColor={bridgeMainColor} 
      accentColor={bridgeAccentColor} 
    />
    <span 
      className="font-inter font-black tracking-[0.2em] leading-none mt-1"
      style={{ color: textColor, fontSize: 'inherit' }}
    >
      NEXUS
    </span>
  </div>
);
