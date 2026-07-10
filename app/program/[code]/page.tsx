// app/program/[code]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROGRAMS, PROG_COLOR } from '@/constants/data';
import { SectionLabel, ProgramCardImage } from '@/components/ui/SharedComponents';

export default function ProgramDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const program = PROGRAMS.find((p) => p.code.toLowerCase() === code.toLowerCase());

  if (!program) {
    notFound();
  }

  const p = program!;
  const c = PROG_COLOR[p.color] || PROG_COLOR.red;
  const others = PROGRAMS.filter((x) => x.code !== p.code);

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label={`Detail Program ${p.name}`}>
      <div style={{ marginBottom: '32px', fontSize: '12px', color: '#8A8A94' }}>
        <Link href="/program" style={{ color: '#B4B4BD', textDecoration: 'none' }}>Program</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: c.tag }}>{p.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '64px' }}>
        <div>
          <span style={{ fontSize: '9px', fontWeight: 700, background: c.tagBg, border: `1px solid ${c.border}`, padding: '5px 12px', borderRadius: '100px', color: c.tag, letterSpacing: '0.12em' }}>
            {p.freq}
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, fontFamily: 'serif', margin: '20px 0 12px', lineHeight: 1.1 }}>
            <span style={{ color: c.tag }}>{p.name}</span>
          </h1>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>{p.focus}</p>
          <p style={{ fontSize: '15px', color: '#B4B4BD', lineHeight: 1.85 }}>{p.desc}</p>
        </div>

        <div>
          <ProgramCardImage program={p} isHovered={false} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '24px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#8A8A94', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Waktu Pelaksanaan</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#E8E6E0' }}>{p.schedule}</span>
        </div>
        <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '24px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#8A8A94', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Frekuensi</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: c.tag }}>{p.freq}</span>
        </div>
        <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '24px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#8A8A94', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Kode Program</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#E8E6E0' }}>{p.code}</span>
        </div>
      </div>

      <div style={{ background: '#0D0D0D', border: `1px solid ${c.border}`, borderRadius: '16px', padding: '36px', marginBottom: '56px' }}>
        <SectionLabel>Rencana Kegiatan Inti</SectionLabel>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, marginTop: '8px' }}>
          {p.activities.map((act, idx) => (
            <li key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', fontSize: '14px', color: '#B4B4BD', lineHeight: 1.6 }}>
              <span style={{ color: c.tag, fontSize: '16px', marginTop: '1px' }}>✦</span>
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <p style={{ fontSize: '14px', color: '#9A9AA5', marginBottom: '20px', lineHeight: 1.7 }}>
          Tertarik mengikuti <strong style={{ color: '#E8E6E0' }}>{p.name}</strong>? Bergabunglah bersama kami dan mulai merajut helai benangmu.
        </p>
        <Link href="/daftar" style={{ background: '#CC1111', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '100px', boxShadow: '0 0 30px rgba(204,17,17,0.3)', textDecoration: 'none', display: 'inline-block' }}>
          Daftar Sekarang &rarr;
        </Link>
      </div>

      <div>
        <SectionLabel gold>Jelajahi Program Lain</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '8px' }}>
          {others.map((o) => {
            const oc = PROG_COLOR[o.color] || PROG_COLOR.red;
            return (
              <Link
                key={o.code}
                href={`/program/${o.code.toLowerCase()}`}
                style={{ background: '#0D0D0D', border: `1px solid ${oc.border}`, borderRadius: '12px', padding: '18px 16px', textAlign: 'center', textDecoration: 'none', display: 'block' }}
              >
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: oc.tag, letterSpacing: '0.06em' }}>{o.code}</span>
                <span style={{ display: 'block', fontSize: '9px', color: '#8A8A94', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{o.freq}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
