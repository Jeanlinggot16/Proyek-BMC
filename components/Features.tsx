'use client';

// components/features.tsx
// BMC MANADO — Features / Tiga Pilar Level 3 "Prestige"
// Upgrade dari versi sebelumnya: glassmorphism · animated border · spotlight hover

import { useState, useRef, useCallback } from 'react';

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    title: 'Ruang Aman Bertumbuh',
    desc:  'Wadah tulus untuk berani berbicara, belajar dari kesalahan, dan mengekspresikan diri secara autentik tanpa takut dihakimi.',
    tag:   'SAFE SPACE',
    color: 'red' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#CC1111" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Wadah Nyata Berkarya',
    desc:  'Menyalurkan ide kreatif, musik, puisi, hingga film pendek menjadi karya kolektif nyata yang berdampak langsung bagi masyarakat Manado.',
    tag:   'REAL IMPACT',
    color: 'gold' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#D4AF37" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Rajutan Lintas Batas',
    desc:  'Merajut persaudaraan jujur lintas iman dan budaya dengan kesungguhan, melampaui sekat-sekat perbedaan teologis maupun sosial.',
    tag:   'GENUINE UNION',
    color: 'rose' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#FB7185" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

const COLOR_CONFIG = {
  red:  { glow: '#CC1111', border: 'rgba(204,17,17,0.4)',  spotlight: 'rgba(204,17,17,0.06)'  },
  gold: { glow: '#D4AF37', border: 'rgba(212,175,55,0.35)', spotlight: 'rgba(212,175,55,0.05)' },
  rose: { glow: '#FB7185', border: 'rgba(251,113,133,0.35)', spotlight: 'rgba(251,113,133,0.05)' },
};

/* ─── KOMPONEN KARTU PILAR ────────────────────────────────────────────────── */
function PilarCard({
  item,
  index,
}: {
  item:  typeof HIGHLIGHTS[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const c       = COLOR_CONFIG[item.color];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el   = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    setSpotPos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="reveal relative overflow-hidden"
      data-delay={String(index * 150)}
      style={{
        borderRadius: '20px',
        border:       `1px solid ${hovered ? c.border : 'rgba(31,31,31,0.8)'}`,
        background:   '#0F0F0F',
        padding:      '2rem',
        transition:   'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:    hovered
          ? `0 20px 40px rgba(0,0,0,0.5), 0 0 50px ${c.spotlight.replace('0.06', '0.15')}`
          : 'none',
      }}
    >
      {/* Spotlight radial gradient ikut kursor */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, ${c.spotlight}, transparent 65%)`,
          opacity:    hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Glow blob pojok */}
      <div
        aria-hidden="true"
        style={{
          position:  'absolute',
          top:       '-40px',
          right:     '-40px',
          width:     '100px',
          height:    '100px',
          borderRadius: '50%',
          background: c.glow,
          filter:    'blur(50px)',
          opacity:   hovered ? 0.15 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Konten */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5
                     transition-all duration-500"
          style={{
            background: hovered
              ? `rgba(${item.color === 'red' ? '204,17,17' : item.color === 'gold' ? '212,175,55' : '251,113,133'}, 0.1)`
              : 'rgba(26,26,26,0.8)',
            border: `1px solid ${hovered ? c.border : 'rgba(31,31,31,0.6)'}`,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {item.icon}
        </div>

        {/* Tag */}
        <span
          className="block text-[9px] font-bold tracking-[0.22em] uppercase mb-2 transition-colors duration-300"
          style={{ color: hovered ? c.glow : '#3A3A3A' }}
        >
          {item.tag}
        </span>

        {/* Title */}
        <h4
          className="text-xl font-bold mb-3 transition-colors duration-300"
          style={{
            fontFamily:    'var(--font-display)',
            letterSpacing: '-0.01em',
            color:         hovered ? '#F5F5F5' : '#C4C2BC',
          }}
        >
          {item.title}
        </h4>

        {/* Desc */}
        <p className="text-xs leading-relaxed" style={{ color: '#52525B' }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────── */
export default function Features() {
  return (
    <section className="section-padding relative z-10">

      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(204,17,17,0.04), transparent)',
        }}
      />

      <div className="container-bmc relative z-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-eyebrow tag-gold block mb-3 reveal">
            Tiga Pilar Utama
          </span>
          <h3 className="text-display-md text-white mb-4 reveal" data-delay="100">
            Mengapa Bertumbuh di BMC?
          </h3>
          <p className="text-body reveal" data-delay="200">
            Kami berkomitmen menjaga kultur ruang aman ini agar setiap langkah
            perubahan kecil yang Anda ambil terasa berharga dan bermakna.
          </p>
        </div>

        {/* Grid kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HIGHLIGHTS.map((item, idx) => (
            <PilarCard key={item.title} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}