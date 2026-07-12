// components/ui/ScrollThread.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ScrollThread() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Total panjang jalur benang (path) untuk perhitungan dash
  const PATH_LENGTH = 1000;
  const dashOffset = PATH_LENGTH * (1 - progress);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block" // ⚡ Menyembunyikan benang pada mobile & tablet, hanya tampil di desktop (≥1024px)
      style={{
        position: 'fixed',
        top: '70px',
        right: 0,
        height: 'calc(100vh - 70px)',
        width: '40px',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      <svg
        width="40"
        height="100%"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="scrollThreadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CC1111" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>

        {/* Jejak samar latar belakang */}
        <path
          d="M 20 0 C 8 80, 32 160, 20 240 C 8 320, 32 400, 20 480 C 8 560, 32 640, 20 720 C 8 800, 32 880, 20 1000"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Benang yang merajut mengikuti scroll */}
        <path
          d="M 20 0 C 8 80, 32 160, 20 240 C 8 320, 32 400, 20 480 C 8 560, 32 640, 20 720 C 8 800, 32 880, 20 1000"
          stroke="url(#scrollThreadGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={dashOffset}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(204,17,17,0.5))',
            transition: 'stroke-dashoffset 0.15s linear',
          }}
        />

        {/* Simpul/jarum di ujung benang yang sedang dirajut */}
        <circle
          cx="20"
          cy={1000 * progress}
          r="4"
          fill="#D4AF37"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
            transition: 'cy 0.15s linear',
          }}
        />
      </svg>
    </div>
  );
}