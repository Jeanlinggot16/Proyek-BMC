'use client';


// components/hero.tsx
// BMC MANADO — Hero Section Level 3 "Prestige"
// Fitur: typewriter · ambient glow · particle grid · parallax scroll · infinite marquee · stagger entry


import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


/* ─── KONFIGURASI ─────────────────────────────────────────────────────────── */
const TYPEWRITER_WORDS = [
  'Pemuda Manado',
  'Lintas Iman',
  'Lintas Budaya',
  'Agen Damai',
  'Kreator Muda',
];


const MARQUEE_ITEMS = [
  { text: 'Berdamai',   accent: false },
  { text: '·',         accent: true  },
  { text: 'Bertumbuh', accent: false },
  { text: '·',         accent: true  },
  { text: 'Berkarya',  accent: false },
  { text: '·',         accent: true  },
  { text: 'TENUN',     accent: true  },
  { text: '·',         accent: true  },
  { text: 'ANYAMAN',   accent: true  },
  { text: '·',         accent: true  },
  { text: 'RAJUT',     accent: true  },
  { text: '·',         accent: true  },
  { text: 'SIMPUL',    accent: true  },
  { text: '·',         accent: true  },
];


/* ─── HOOK: TYPEWRITER ────────────────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);


  useEffect(() => {
    const current = words[wordIdx];


    const delay = deleting
      ? speed / 2
      : charIdx === current.length
      ? pause
      : speed;


    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);


    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);


  return displayed;
}


/* ─── HOOK: PARALLAX SCROLL ───────────────────────────────────────────────── */
function useParallax(factor = 0.3) {
  const [offset, setOffset] = useState(0);


  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * factor);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor]);


  return offset;
}


/* ─── KOMPONEN: PARTICLE GRID ─────────────────────────────────────────────── */
function ParticleGrid() {
  // Grid titik statis dengan opacity acak — efek kedalaman tanpa JS berat
  const dots = Array.from({ length: 120 }, (_, i) => ({
    id:      i,
    x:       Math.round((i % 12) * (100 / 11)),
    y:       Math.round(Math.floor(i / 12) * (100 / 9)),
    opacity: [0.04, 0.06, 0.08, 0.03, 0.05][i % 5],
    size:    [1, 1.5, 1][i % 3],
    delay:   (i * 0.05) % 3,
  }));


  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {dots.map(d => (
          <circle
            key={d.id}
            cx={`${d.x}%`}
            cy={`${d.y}%`}
            r={d.size}
            fill="#CC1111"
            opacity={d.opacity}
            style={{
              animation: `pulse-dot ${2 + d.delay}s ease-in-out ${d.delay}s infinite alternate`,
            }}
          />
        ))}
      </svg>


      <style>{`
        @keyframes pulse-dot {
          from { opacity: var(--from, 0.03); }
          to   { opacity: calc(var(--from, 0.03) * 3); }
        }
      `}</style>
    </div>
  );
}


/* ─── KOMPONEN: AMBIENT GLOW BLOB ─────────────────────────────────────────── */
function AmbientGlow({ parallaxOffset }: { parallaxOffset: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Blob merah utama — parallax pelan */}
      <div
        style={{
          position:     'absolute',
          top:          '5%',
          left:         '50%',
          transform:    `translate(-50%, ${parallaxOffset * -0.4}px)`,
          width:        'min(900px, 120vw)',
          height:       '500px',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(204,17,17,0.09) 0%, transparent 70%)',
          filter:       'blur(40px)',
        }}
      />


      {/* Blob gold sekunder */}
      <div
        style={{
          position:     'absolute',
          top:          '30%',
          right:        '-10%',
          width:        '400px',
          height:       '300px',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
          filter:       'blur(60px)',
          transform:    `translateY(${parallaxOffset * -0.2}px)`,
        }}
      />


      {/* Vignette gelap di tepi */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(6,6,6,0.7) 100%)',
        }}
      />
    </div>
  );
}


/* ─── KOMPONEN: STAT ITEM ─────────────────────────────────────────────────── */
function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <div
      className="reveal text-center"
      data-delay={String(delay)}
    >
      <div
        className="text-2xl font-bold mb-0.5"
        style={{
          fontFamily:    'var(--font-display)',
          letterSpacing: '-0.02em',
          color:         '#F5F5F5',
        }}
      >
        {value}
      </div>
      <div
        className="text-[9px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: '#3A3A3A' }}
      >
        {label}
      </div>
    </div>
  );
}


/* ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────── */
export default function Hero() {
  const typewritten   = useTypewriter(TYPEWRITER_WORDS);
  const parallaxOffset = useParallax(0.25);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    // Delay kecil agar stagger animasi terlihat setelah hydration
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);


  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#060606' }}
    >
      {/* ── Latar belakang ── */}
      <ParticleGrid />
      <AmbientGlow parallaxOffset={parallaxOffset} />


      {/* ── Konten utama ── */}
      <div
        className="container-bmc relative z-10 section-padding flex flex-col justify-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Eyebrow */}
        <div
          className="mb-6"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(204,17,17,0.06)',
              border:     '1px solid rgba(204,17,17,0.2)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#CC1111' }}
              aria-hidden="true"
            />
            <span className="text-eyebrow tag-red">
              Komunitas Lintas Iman · Manado
            </span>
          </span>
        </div>


        {/* Heading utama */}
        <div
          className="mb-4"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          <h1
            className="text-white"
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(3rem, 9vw, 7.5rem)',
              fontWeight:    600,
              lineHeight:    0.92,
              letterSpacing: '-0.03em',
            }}
          >
            Untuk
          </h1>
        </div>


        {/* Typewriter line */}
        <div
          className="mb-8"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s',
          }}
        >
          <h2
            aria-live="polite"
            aria-atomic="true"
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(3rem, 9vw, 7.5rem)',
              fontWeight:    600,
              lineHeight:    0.92,
              letterSpacing: '-0.03em',
              color:         '#CC1111',
              minHeight:     '1.1em',
              display:       'flex',
              alignItems:    'center',
              gap:           '2px',
            }}
          >
            {typewritten}
            {/* Kursor kedip */}
            <span
              aria-hidden="true"
              style={{
                display:          'inline-block',
                width:            '3px',
                height:           '0.8em',
                background:       '#CC1111',
                marginLeft:       '2px',
                borderRadius:     '2px',
                animation:        'blink-cursor 1.1s ease-in-out infinite',
                verticalAlign:    'middle',
              }}
            />
          </h2>
        </div>


        {/* Deskripsi */}
        <div
          className="max-w-lg mb-12"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.44s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.44s',
          }}
        >
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize:   'clamp(0.875rem, 1.5vw, 1rem)',
              color:      '#52525B',
            }}
          >
            Benang Merah Community adalah ruang tulus bagi pemuda Manado yang
            percaya bahwa perbedaan adalah kekayaan — bukan penghalang. Kami
            belajar, berkarya, dan berdamai bersama.
          </p>
        </div>


        {/* CTA Buttons */}
        <div
          className="flex flex-wrap items-center gap-4 mb-20"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.56s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.56s',
          }}
        >
          <Link
            href="/daftar"
            className="btn-primary animate-pulse-glow"
          >
            Gabung Komunitas →
          </Link>
          <Link
            href="/program"
            className="btn-ghost"
          >
            Lihat Program
          </Link>
        </div>


        {/* Stats */}
        <div
          className="flex items-center gap-10 flex-wrap"
          style={{
            opacity:    mounted ? 1 : 0,
            transition: 'opacity 0.9s ease 0.7s',
          }}
        >
          {/* Garis pemisah kiri */}
          <div
            className="hidden md:block h-8 w-px"
            style={{ background: 'rgba(31,31,31,0.8)' }}
            aria-hidden="true"
          />


          <StatItem value="7+"   label="Tahun Berdiri"       delay={0} />
          <StatItem value="200+" label="Anggota Aktif"       delay={100} />
          <StatItem value="5"    label="Program Rutin"       delay={200} />
          <StatItem value="∞"    label="Benang yang Dirajut" delay={300} />
        </div>
      </div>


      {/* ── Infinite Marquee (bawah) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden z-10"
        style={{ borderTop: '1px solid rgba(31,31,31,0.4)' }}
        aria-hidden="true"
      >
        {/* Gradient fade kiri-kanan */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #060606, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #060606, transparent)' }}
        />


        {/* Track — dua set untuk seamless loop */}
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-5 text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap"
              style={{ color: item.accent ? '#CC1111' : '#1F1F1F' }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>


      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-14 right-8 md:right-12 z-10 flex flex-col items-center gap-2"
        style={{
          opacity:    mounted ? 0.4 : 0,
          transition: 'opacity 1s ease 1.2s',
        }}
        aria-hidden="true"
      >
        <span
          className="text-[8px] tracking-[0.3em] uppercase"
          style={{ color: '#3A3A3A', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 origin-top"
          style={{
            background: 'linear-gradient(180deg, #CC1111 0%, transparent 100%)',
            animation:  'scroll-line 2s ease-in-out infinite',
          }}
        />
      </div>


      {/* ── Keyframes inline ── */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }


        @keyframes scroll-line {
          0%   { transform: scaleY(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
