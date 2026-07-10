// app/program/[code]/not-found.tsx
import Link from 'next/link';

export default function ProgramNotFound() {
  return (
    <section style={{ padding: '120px 24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>🧶</span>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '12px' }}>
        Program Tidak <span style={{ color: '#CC1111' }}>Ditemukan</span>
      </h1>
      <p style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.7, marginBottom: '32px' }}>
        Helai program yang kamu cari belum terajut di sini. Mari kembali dan jelajahi program-program kami yang tersedia.
      </p>
      <Link href="/program" style={{ background: '#CC1111', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none', display: 'inline-block' }}>
        &larr; Kembali ke Daftar Program
      </Link>
    </section>
  );
}