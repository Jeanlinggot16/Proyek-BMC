// app/not-found-client.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFoundClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cahaya latar merah redup */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(204,17,17,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ilustrasi benang putus */}
      <svg
        width="180"
        height="120"
        viewBox="0 0 180 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0ms',
          marginBottom: '32px',
        }}
        aria-hidden="true"
      >
        <path d="M 10 60 C 30 55, 50 65, 70 60" stroke="#CC1111" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M 110 60 C 130 58, 150 70, 170 80" stroke="#CC1111" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="90" cy="60" r="4" fill="#CC1111" opacity="0.3" />
        <circle cx="83" cy="60" r="2" fill="#CC1111" opacity="0.5" />
        <circle cx="97" cy="60" r="2" fill="#CC1111" opacity="0.5" />
        <path d="M 78 57 C 75 50, 72 48, 70 44" stroke="#CC1111" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
        <path d="M 82 56 C 80 49, 79 47, 78 42" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M 98 57 C 101 50, 104 48, 106 44" stroke="#CC1111" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
        <path d="M 102 58 C 104 51, 106 49, 108 44" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>

      <div
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 100ms',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#CC1111',
            marginBottom: '16px',
          }}
        >
          Benang Terputus — 404
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            fontFamily: 'serif',
            color: '#F5F5F5',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '16px',
          }}
        >
          Halaman Ini Belum{' '}
          <span style={{ color: '#CC1111' }}>Terrajut</span>
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#9A9AA5',
            lineHeight: 1.8,
            maxWidth: '420px',
            margin: '0 auto 40px',
          }}
        >
          Seperti benang yang terlepas dari tenunan, halaman yang kamu cari belum ada
          atau telah berpindah tempat. Tidak apa-apa — mari kembali ke jalur bersama.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            className="bmc-shine"
            style={{
              background: '#CC1111',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 0 24px rgba(204,17,17,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#AA0A0A';
              e.currentTarget.style.boxShadow = '0 0 36px rgba(204,17,17,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#CC1111';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(204,17,17,0.3)';
            }}
          >
            Kembali ke Beranda &rarr;
          </Link>

          <Link
            href="/program"
            style={{
              background: 'none',
              border: '1px solid rgba(212,175,55,0.25)',
              color: '#D4AF37',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)')}
          >
            Jelajahi Program
          </Link>
        </div>
      </div>
    </div>
  );
}