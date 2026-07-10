// app/kontak/page.tsx
'use client';

import { useState } from 'react';
import { FAQS } from '@/constants/data';
import { SectionLabel, LoadingSpinner } from '@/components/ui/SharedComponents';

export default function KontakPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [msgData, setMsgData] = useState({ nama: '', pesan: '' });
  const [isLoading, setIsLoading] = useState(false);

  const toggleFAQ = (idx: number) => setExpandedFAQ((prev) => (prev === idx ? null : idx));

  const handleMsgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgData.nama || !msgData.pesan) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'kontak', ...msgData }),
      });

      if (response.ok) {
        setMessageSubmitted(true);
      } else {
        alert('Gagal mengirim pesan.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = { width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', color: '#FFF', outline: 'none' } as const;
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' } as const;

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Hubungi Kami">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
        <div>
          <SectionLabel>Teras Komunitas</SectionLabel>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '20px', lineHeight: 1.15 }}>
            Pintu Kontak <br />
            <span style={{ color: '#CC1111' }}>Selalu Terbuka</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.8, marginBottom: '36px' }}>
            Apakah Anda memiliki pertanyaan administratif, tawaran kolaborasi, atau sekadar ingin menyapa? Kami dengan senang hati akan merespons pesan Anda.
          </p>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            {messageSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0', animation: 'fadeIn 0.5s' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>✉️</span>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#D4AF37', marginBottom: '8px' }}>Pesan Terkirim!</h4>
                <p style={{ fontSize: '12px', color: '#9A9AA5', lineHeight: 1.6 }}>
                  Terima kasih, <strong>{msgData.nama}</strong>. Kami telah mencatat pesan Anda dan tim <strong>JALIN</strong> akan segera membalasnya sesegera mungkin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMsgSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label htmlFor="msg-nama" style={labelStyle}>Nama Lengkap / Komunitas</label>
                    <input type="text" id="msg-nama" value={msgData.nama} onChange={(e) => setMsgData((prev) => ({ ...prev, nama: e.target.value }))} placeholder="Contoh: Rionaldo Lombone" required style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="msg-text" style={labelStyle}>Pesan Anda</label>
                    <textarea id="msg-text" value={msgData.pesan} onChange={(e) => setMsgData((prev) => ({ ...prev, pesan: e.target.value }))} placeholder="Tuliskan pesan Anda secara lengkap di sini..." rows={4} required style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <button type="submit" disabled={isLoading} style={{ width: '100%', background: '#CC1111', color: '#FFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 15px rgba(204,17,17,0.2)' }}>
                    {isLoading ? <LoadingSpinner /> : 'Kirim Pesan →'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '12px', color: '#B4B4BD' }}>
            <div>
              <span style={{ color: '#D4AF37', fontWeight: 700, display: 'block', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '4px' }}>Sekretariat</span>
              <span>Jl. Piere Tendean, Boulevard, Manado, Sulut</span>
            </div>
            <div>
              <span style={{ color: '#D4AF37', fontWeight: 700, display: 'block', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '4px' }}>Korespondensi</span>
              <span>info@benangmerahcommunity.org</span>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel gold>Pertanyaan Umum</SectionLabel>
          <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'serif', marginBottom: '32px' }}>Pertanyaan FAQ</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, i) => {
              const isExpanded = expandedFAQ === i;
              return (
                <div key={i} style={{ background: '#0D0D0D', border: `1px solid ${isExpanded ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.04)'}`, borderRadius: '12px', padding: '20px 24px', transition: 'all 0.35s ease' }}>
                  <button onClick={() => toggleFAQ(i)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: isExpanded ? '#D4AF37' : '#E8E6E0', lineHeight: 1.4, transition: 'color 0.3s' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: isExpanded ? '#D4AF37' : '#8A8A94', transition: 'all 0.3s' }}>{isExpanded ? '−' : '+'}</span>
                  </button>
                  <div style={{ maxHeight: isExpanded ? '200px' : '0', opacity: isExpanded ? 1 : 0, overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', fontSize: '13px', color: '#9A9AA5', lineHeight: 1.7, marginTop: isExpanded ? '14px' : '0' }}>
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
