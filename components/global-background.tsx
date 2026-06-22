'use client';

import React from 'react';

interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  className?: string;
}

const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 21,
  gradientFrom = 'rgba(204, 17, 17, 0.15)', // Merah prestisius khas BMC transparan
  gradientTo = 'transparent',
  animationDuration = 4, // Durasi diperlambat agar terasa tenang & tidak mendisrupsi bacaan
  className = '',
}) => {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 25;
    
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.3);
    
    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBarGlobal {
          0% { transform: scaleY(var(--initial-scale)); opacity: 0.12; }
          50% { opacity: 0.32; }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.75)); opacity: 0.12; }
        }
      `}</style>
      
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Layer gradasi gelap untuk memastikan teks di atasnya tetap kontras tinggi */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/30 to-[#060606] z-10" />
        
        <div 
          className="flex h-full px-6 md:px-12 gap-3"
          style={{
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            // Memberi pendaran emas mewah di area ujung kiri dan kanan luar
            const isEdge = index < 3 || index > numBars - 4;
            const finalGradientFrom = isEdge 
              ? 'rgba(212, 175, 55, 0.08)' 
              : gradientFrom;

            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to bottom, ${finalGradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${height / 100})`,
                  transformOrigin: 'top',
                  transition: 'transform 0.8s ease-in-out',
                  animation: `pulseBarGlobal ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.15}s`,
                  boxSizing: 'border-box',
                  // @ts-ignore
                  '--initial-scale': height / 100,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#060606]">
      {/* 1. Dynamic Gradient Bars */}
      <GradientBars numBars={21} className="opacity-80" />

      {/* 2. Static Loom Grid Lines (Jaring Benang Tipis Vertikal) */}
      <div className="absolute inset-0 flex justify-between px-6 md:px-12 pointer-events-none z-10">  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/60 via-zinc-800/10 to-zinc-900/40"></div>  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/5 to-zinc-900/30 hidden sm:block"></div>  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/60 via-zinc-800/10 to-zinc-900/40"></div>  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/5 to-zinc-900/30 hidden sm:block"></div>  
        
        {/* Benang Merah Utama di Tengah dengan pendaran denyut nadi */}  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/40 via-[#CC1111]/40 to-zinc-900/40 relative">  
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-2/3 bg-gradient-to-b from-[#CC1111] via-transparent to-transparent opacity-30 blur-[1px]"></div>  
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#CC1111]/30 to-transparent animate-pulse"></div>  
        </div>  
        
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/40 via-zinc-800/5 to-zinc-900/30 hidden sm:block"></div>  
        <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900/60 via-zinc-800/10 to-zinc-900/40"></div>  
      </div>  
    </div>
  );
}