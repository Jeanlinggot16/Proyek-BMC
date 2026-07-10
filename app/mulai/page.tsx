// app/mulai/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SharedComponents';

const STEPS = [
  {
    no: '01',
    accent: '#CC1111',
    title: 'Kenali Kami Dulu, Tanpa Tekanan',
    desc: 'Tidak perlu langsung mendaftar. Bacalah kisah dan filosofi kami. Pahami bahwa di sini kamu disambut sebagai manusia, bukan dinilai dari latar belakangmu.',
    cta: { label: 'Baca Filosofi Kami →', href: '/tentang' },
  },
  {
    no: '02',
    accent: '#D4AF37',
    title: 'Pilih Ruang yang Cocok Untukmu',
    desc: 'Suka berdiskusi? Mulai dari TENUN. Lebih suka berkarya seni? Coba ANYAMAN. Tidak ada pilihan yang salah, semua pintu terbuka lebar.',
    cta: { label: 'Lihat Program →', href: '/program' },
  },
  {
    no: '03',
    accent: '#FB7185',
    title: 'Datang & Rasakan Perjumpaannya',
    desc: 'Kegiatan reguler kami 100% gratis. Datang saja, duduk, dengarkan, dan bicaralah saat kamu siap. Kami selalu menyediakan cangkir kopi hangat untukmu.',
    cta: { label: 'Daftar Kehadiran →', href: '/daftar' },
  },
];

const FEARS = [
  {
    fear: '"Saya berbeda agama/latar belakang, apa saya diterima?"',
    answer: 'Justru perbedaanmu adalah warna benang yang kami hargai. BMC lintas iman, lintas budaya, dan non-partisan.',
  },
  {
    fear: '"Saya pemalu dan takut salah bicara."',
    answer: 'Tidak apa-apa hanya mendengarkan dulu. Tidak ada paksaan bicara, tidak ada penghakiman. Ruang ini aman.',
  },
  {
    fear: '"Saya tidak punya bakat khusus."',
    answer: 'Kamu tidak perlu jadi siapa-siapa untuk bergabung. Kehadiran dan ketulusanmu sudah cukup berharga.',
  },
  {
    fear: '"Apakah ada biaya?"',
    answer: 'Kegiatan reguler kami sepenuhnya gratis, didukung swadaya anggota dan donatur yang selaras nilai kami.',
  },
];

export default function MulaiPage() {
  const [openFear, setOpenFear] = useState<number | null>(null);

  return (
    <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Mulai dari Sini">
      {/* Sambutan */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <SectionLabel gold>Selamat Datang, Calon Sahabat</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '16px', lineHeight: 1.15 }}>
          Baru di Sini? <br />
          <span style={{ color: '#CC1111' }}>Mulai dari Sini.</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#B4B4BD', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
          Kami tahu, melangkah ke ruang baru itu butuh keberanian. Tenang saja, tidak ada yang perlu kamu khawatirkan. Mari kami pandu langkah pertamamu, pelan-pelan.
        </p>
      </div>

      {/* Tiga langkah */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '80px' }}>
        {STEPS.map((s) => (
          <div key={s.no} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderLeft: `4px solid ${s.accent}`, borderRadius: '16px', padding: '32px' }}>
            <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'serif', color: s.accent, lineHeight: 1 }}>{s.no}</div>
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, fontFamily: 'serif', color: '#F5F5F5', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.75, marginBottom: '18px' }}>{s.desc}</p>
              <Link href={s.cta.href} style={{ fontSize: '11px', fontWeight: 700, color: s.accent, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: `1px solid ${s.accent}55`, paddingBottom: '3px' }}>
                {s.cta.label}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Menjawab kekhawatiran */}
      <div style={{ marginBottom: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <SectionLabel>Tenangkan Hatimu</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 700, fontFamily: 'serif' }}>Mungkin Ini yang Kamu Cemaskan</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FEARS.map((f, i) => {
            const isOpen = openFear === i;
            return (
              <div key={i} style={{ background: '#0D0D0D', border: `1px solid ${isOpen ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.04)'}`, borderRadius: '12px', padding: '20px 24px', transition: 'all 0.35s ease' }}>
                <button onClick={() => setOpenFear(isOpen ? null : i)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: isOpen ? '#D4AF37' : '#E8E6E0', lineHeight: 1.4, fontStyle: 'italic' }}>{f.fear}</span>
                  <span style={{ fontSize: '18px', color: isOpen ? '#D4AF37' : '#8A8A94' }}>{isOpen ? '−' : '+'}</span>
                </button>
                <div style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', fontSize: '13.5px', color: '#B4B4BD', lineHeight: 1.7, marginTop: isOpen ? '14px' : '0' }}>
                  {f.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA akhir */}
      <div style={{ background: 'linear-gradient(135deg, rgba(204,17,17,0.06), rgba(212,175,55,0.04))', border: '1px solid rgba(204,17,17,0.15)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center' }}>
        <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>🤝</span>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '12px' }}>Sudah Siap Melangkah?</h2>
        <p style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.8, marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
          Tidak ada yang sempurna untuk memulai. Yang ada hanya keberanian untuk hadir. Kursi dan kopi hangat sudah menantimu.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/daftar" style={{ background: '#CC1111', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: '100px', boxShadow: '0 0 30px rgba(204,17,17,0.3)', textDecoration: 'none' }}>
            Gabung Komunitas →
          </Link>
          <Link href="/dinding" style={{ background: 'none', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none' }}>
            Sapa di Dinding Benang
          </Link>
        </div>
      </div>
    </section>
  );
}