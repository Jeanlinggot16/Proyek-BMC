// app/dinding/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SAMPLE_THREADS, THREAD_COLOR, ThreadItem } from '@/constants/threadsData';
import { SectionLabel, LoadingSpinner } from '@/components/ui/SharedComponents';

const STORAGE_KEY = 'bmc_threads_local';
const COLORS: Array<'red' | 'gold' | 'rose'> = ['red', 'gold', 'rose'];

export default function DindingPage() {
  const [threads, setThreads] = useState<ThreadItem[]>(SAMPLE_THREADS);
  const [pesan, setPesan] = useState('');
  const [nama, setNama] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [justSent, setJustSent] = useState(false);

  // Muat kiriman lokal (localStorage) lalu gabung dengan data contoh
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const local: ThreadItem[] = JSON.parse(raw);
        setThreads([...local, ...SAMPLE_THREADS]);
      }
    } catch {
      // abaikan jika localStorage tidak tersedia
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesan.trim()) return;

    setIsLoading(true);

    const newThread: ThreadItem = {
      id: `local_${Date.now()}`,
      pesan: pesan.trim(),
      nama: nama.trim() || 'Anonim',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    // 1) Kirim ke Spreadsheet (pola sama seperti form daftar/saran)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'thread',
          nama: newThread.nama,
          pesan: newThread.pesan,
          color: newThread.color,
        }),
      });
    } catch (err) {
      // Walau gagal kirim ke server, helai tetap tampil lokal agar pengalaman mulus
      console.error('Gagal mengirim thread ke server:', err);
    }

    // 2) Simpan & tampilkan secara lokal
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const local: ThreadItem[] = raw ? JSON.parse(raw) : [];
      const updated = [newThread, ...local];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // abaikan
    }

    setThreads((prev) => [newThread, ...prev]);
    setPesan('');
    setNama('');
    setIsLoading(false);
    setJustSent(true);
    setTimeout(() => setJustSent(false), 4000);
  };

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Dinding Benang">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <SectionLabel gold>Ruang Perjumpaan</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '12px' }}>
          Dinding <span style={{ color: '#CC1111' }}>Benang</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#B4B4BD', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
          Tinggalkan satu helai benangmu, sepatah harapan, refleksi, atau sapaan. Setiap helai dirajut bersama menjadi anyaman persaudaraan kita.
        </p>
      </div>

      {/* Form helai benang */}
      <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '20px', padding: '32px', maxWidth: '640px', margin: '0 auto 56px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="pesan" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Helai Benangmu *
              </label>
              <textarea
                id="pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tuliskan harapan, refleksi, atau sapaan singkatmu..."
                rows={3}
                maxLength={180}
                required
                style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
              />
              <div style={{ textAlign: 'right', fontSize: '10px', color: '#8A8A94', marginTop: '4px' }}>{pesan.length}/180</div>
            </div>
            <div>
              <label htmlFor="nama" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Nama (boleh dikosongkan untuk Anonim)
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama atau inisialmu"
                style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
              />
            </div>
            <button
              type="submit"
              disabled={!pesan.trim() || isLoading}
              style={{ background: '#CC1111', color: '#FFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 20px rgba(204,17,17,0.3)', opacity: !pesan.trim() || isLoading ? 0.5 : 1, transition: 'all 0.3s ease' }}
            >
              {isLoading ? <LoadingSpinner /> : 'Rajut Helai Benangku →'}
            </button>
            {justSent && (
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#D4AF37', animation: 'fadeIn 0.5s' }}>
                Terima kasih, helaimu telah terajut di dinding ini. 🧵
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Anyaman helai */}
      <div style={{ columnGap: '16px', columnWidth: '280px' }}>
        {threads.map((t) => {
          const c = THREAD_COLOR[t.color] || THREAD_COLOR.red;
          return (
            <div
              key={t.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.accent}`,
                borderRadius: '12px',
                padding: '20px 22px',
                animation: 'fadeIn 0.6s',
              }}
            >
              <p style={{ fontSize: '14px', color: '#E8E6E0', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '14px', fontFamily: 'serif' }}>
                &ldquo;{t.pesan}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.accent }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: c.accent }}>{t.nama}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}