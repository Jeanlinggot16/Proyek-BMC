// components/Footer.tsx
'use client';

import Link from 'next/link';
import OfficialBMCLogo from '@/components/ui/OfficialBMCLogo';
import { Divider } from '@/components/ui/SharedComponents';

export default function Footer() {
  const linkStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    color: '#B4B4BD',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
  };

  return (
    <>
      <Divider />
      <footer style={{ background: '#040404', padding: '64px 24px 48px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <OfficialBMCLogo height={52} animated={true} />
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#D4AF37', marginTop: '24px', marginBottom: '24px' }}>
            Berdamai &bull; Bertumbuh &bull; Berkarya
          </div>
          <p style={{ fontSize: '13px', color: '#8A8A94', lineHeight: 1.8, marginBottom: '32px' }}>
            Benang Merah Community Manado adalah ruang dialog inklusif bagi pemuda Sulawesi Utara untuk merajut persaudaraan sejati, merawat potensi kreasi, dan berkolaborasi menciptakan aksi nyata.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <Link href="/mulai" style={linkStyle}>Mulai di Sini</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/tentang" style={linkStyle}>Tentang Kami</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/program" style={linkStyle}>Program</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/dinding" style={linkStyle}>Dinding Benang</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/kontak" style={linkStyle}>Kontak</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/saran" style={linkStyle}>Saran &amp; Kritik</Link>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <Link href="/daftar" style={linkStyle}>Bergabung</Link>
          </div>
          <p style={{ fontSize: '11px', color: '#3F3F46' }}>
            &copy; {new Date().getFullYear()} Benang Merah Community Manado. Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </footer>
    </>
  );
}