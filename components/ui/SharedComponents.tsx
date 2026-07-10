// components/ui/SharedComponents.tsx
'use client';

import { useState, ReactNode } from 'react';
import { ProgramItem, PROG_COLOR } from '@/constants/data';

export function Divider({ gold = false }: { gold?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: '1px',
        background: gold
          ? 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25) 50%, transparent)'
          : 'rgba(255,255,255,0.05)',
        margin: '0',
      }}
    />
  );
}

export function LoadingSpinner() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px', color: '#FFF' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Mengirim...</span>
    </div>
  );
}

export function SectionLabel({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: gold ? '#D4AF37' : '#CC1111',
        marginBottom: '14px',
      }}
    >
      {children}
    </span>
  );
}

export function ProgramCardImage({ program, isHovered }: { program: ProgramItem; isHovered: boolean }) {
  const [imageError, setImageError] = useState(false);
  const c = PROG_COLOR[program.color] || PROG_COLOR.red;

  return (
    <div
      style={{
        width: '100%',
        height: '180px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '20px',
        position: 'relative',
        background: '#090909',
        border: `1px solid ${isHovered ? c.border : 'rgba(255,255,255,0.05)'}`,
        transition: 'border-color 0.4s ease',
      }}
    >
      {!imageError ? (
        <img
          src={program.imgUrl}
          alt={`Dokumentasi program ${program.name} BMC Manado`}
          onError={() => setImageError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: c.bgGrad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10%" x2="100%" y2="90%" stroke={c.tag} strokeWidth="1" />
            <line x1="100%" y1="10%" x2="0" y2="90%" stroke={c.tag} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="30" stroke={c.tag} strokeWidth="1" fill="none" />
          </svg>
          <span style={{ fontSize: '24px', filter: 'grayscale(30%)', zIndex: 1 }}>📸</span>
          <div style={{ zIndex: 1 }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: c.tag, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Dokumentasi {program.name}
            </span>
            <span style={{ display: 'block', fontSize: '9px', color: '#8A8A94' }}>
              Simpan file di: public{program.imgUrl}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
