// app/program/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROGRAMS, PROG_COLOR } from '@/constants/data';
import useScrollReveal from '@/hooks/useScrollReveal';
import { SectionLabel, ProgramCardImage } from '@/components/ui/SharedComponents';

export default function ProgramPage() {
  const [filterType, setFilterType] = useState<'SEMUA' | 'MINGGUAN' | 'TAHUNAN'>('SEMUA');
  const { ref: headerRef } = useScrollReveal();

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (filterType === 'SEMUA') return true;
    return p.freq === filterType;
  });

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Program Kerja">
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <SectionLabel>Kurikulum Komunitas</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '16px' }}>
          Program Kerja <span style={{ color: '#CC1111' }}>BMC</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#9A9AA5', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          Setiap aktivitas kami susun secara konsisten untuk merawat karakter kritis, melatih empati, dan mengasah daya ekspresi pemuda.
        </p>

        <div style={{ display: 'inline-flex', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '100px', marginTop: '36px' }}>
          {(['SEMUA', 'MINGGUAN', 'TAHUNAN'] as const).map((type) => {
            const isActive = filterType === type;
            return (
              <button key={type} onClick={() => setFilterType(type)} style={{ background: isActive ? '#CC1111' : 'transparent', color: isActive ? '#FFF' : '#B4B4BD', border: 'none', borderRadius: '100px', padding: '8px 24px', cursor: 'pointer', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '64px' }}>
        {filteredPrograms.map((p) => {
          const c = PROG_COLOR[p.color] || PROG_COLOR.red;
          return (
            <Link
              key={p.code}
              href={`/program/${p.code.toLowerCase()}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <article style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', height: '100%', transition: 'border-color 0.4s ease, transform 0.4s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div>
                  <ProgramCardImage program={p} isHovered={false} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: c.tag, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.focus}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, background: c.tagBg, border: `1px solid ${c.border}`, padding: '4px 10px', borderRadius: '100px', color: c.tag }}>{p.freq}</span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#F5F5F5', marginBottom: '12px' }}>{p.name}</h3>
                  <p style={{ fontSize: '13px', color: '#9A9AA5', lineHeight: 1.7, marginBottom: '24px' }}>{p.desc}</p>
                </div>

                <div>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '20px' }} />
                  <h4 style={{ fontSize: '10px', fontWeight: 700, color: '#E8E6E0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Rencana Kegiatan Inti:</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                    {p.activities.map((act, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#B4B4BD', lineHeight: 1.6 }}>
                        <span style={{ color: c.tag }}>✦</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                    <span style={{ color: '#8A8A94' }}>Waktu Pelaksanaan:</span>
                    <span style={{ color: '#D4AF37', fontWeight: 600 }}>{p.schedule}</span>
                  </div>
                  <div style={{ marginTop: '20px', fontSize: '11px', fontWeight: 700, color: c.tag, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Lihat Detail Program &rarr;
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
