// app/saran/page.tsx
'use client';

import { useState } from 'react';
import { SectionLabel, LoadingSpinner } from '@/components/ui/SharedComponents';

export default function SaranPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kegiatan / Diskusi');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ nama: '', kontak: '', isi: '' });

  const categories = ['Kegiatan / Diskusi', 'Kenyamanan Ruang Aman', 'Fasilitator & Pengurus', 'Administrasi / CATAT', 'Usulan Ide Baru', 'Lainnya'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isi.trim()) return;

    setIsLoading(true);
    try {
      const payload = {
        formType: 'saran',
        kategori: selectedCategory,
        anonim: isAnonymous,
        nama: isAnonymous ? 'Anonim' : formData.nama,
        kontak: isAnonymous ? '-' : formData.kontak,
        isi: formData.isi,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Gagal mengirim saran ke database.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi error pengiriman data.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = { width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#FFF', outline: 'none' } as const;

  return (
    <section style={{ padding: '64px 24px', maxWidth: '750px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Kotak Saran dan Kritik">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <SectionLabel>Tindakan Evaluasi</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '12px' }}>
          Kotak <span style={{ color: '#CC1111' }}>Saran &amp; Kritik</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
          Suara Anda adalah rajutan benang berharga untuk menyempurnakan langkah kami. Sampaikan kritik, evaluasi, atau gagasan inovatif demi kemajuan ruang aman bersama.
        </p>
      </div>

      <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', padding: '40px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0', animation: 'fadeIn 0.6s' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>📥</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '12px' }}>Masukan Diterima dengan Hangat!</h3>
            <p style={{ fontSize: '13.5px', color: '#B4B4BD', lineHeight: 1.8, maxWidth: '550px', margin: '0 auto 24px' }}>
              Terima kasih telah meluangkan waktu berharga Anda untuk menulis saran ini. Masukan Anda mengenai kategori <strong>{selectedCategory}</strong>{' '}
              {isAnonymous ? 'yang dikirim secara Anonim ' : ''}telah diarsip dengan aman di dalam sistem kami.
            </p>
            <div style={{ background: 'rgba(204,17,17,0.03)', border: '1px solid rgba(204,17,17,0.15)', padding: '20px', borderRadius: '12px', fontSize: '12.5px', color: '#9A9AA5', lineHeight: 1.7, textAlign: 'left', marginBottom: '32px' }}>
              <strong style={{ color: '#CC1111', display: 'block', marginBottom: '6px' }}>Alur Evaluasi Internal:</strong>
              Setiap masukan yang masuk akan disortir dan ditranskrip langsung oleh <strong>Tim CATAT (Catatan Administrasi)</strong> tanpa mengubah esensi aslinya. Masukan tersebut kemudian akan dibawa langsung ke meja rapat bulanan bersama Koordinator Inti dan Dewan Pembina untuk dicarikan solusi konkret serta perbaikan sistemik.
            </div>
            <button onClick={() => { setSubmitted(false); setFormData({ nama: '', kontak: '', isi: '' }); setIsAnonymous(false); }} style={{ background: 'none', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', padding: '12px 28px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              Kirim Saran Lain &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Kategori Masukan</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} style={{ background: isSelected ? 'rgba(204,17,17,0.15)' : 'transparent', border: `1px solid ${isSelected ? '#CC1111' : 'rgba(255,255,255,0.06)'}`, borderRadius: '100px', padding: '8px 16px', color: isSelected ? '#CC1111' : '#9A9AA5', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Informasi Pengirim</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11px', color: '#D4AF37' }}>
                    <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} style={{ cursor: 'pointer' }} />
                    Kirim secara Anonim (Rahasia)
                  </label>
                </div>

                {!isAnonymous ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Nama Lengkap / Inisial" style={inputStyle} />
                    </div>
                    <div>
                      <input type="text" name="kontak" value={formData.kontak} onChange={handleInputChange} placeholder="WhatsApp / Email (Opsional)" style={inputStyle} />
                    </div>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', color: '#8A8A94', fontStyle: 'italic' }}>
                    Identitas Anda disembunyikan sepenuhnya. Komunitas menghargai kenyamanan dan hak privasi Anda dalam memberikan kritik yang jujur.
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="isi" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#B4B4BD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Isi Saran, Kritik &amp; Evaluasi *</label>
                <textarea id="isi" name="isi" value={formData.isi} onChange={handleInputChange} placeholder="Utarakan evaluasi, kritik tajam, atau ide terobosan Anda demi kebaikan ruang dialog kita bersama..." rows={6} required style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
              </div>

              <button type="submit" disabled={!formData.isi.trim() || isLoading} style={{ background: '#CC1111', color: '#FFF', border: 'none', borderRadius: '100px', padding: '16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 20px rgba(204,17,17,0.3)', transition: 'all 0.3s ease', opacity: !formData.isi.trim() || isLoading ? 0.5 : 1 }}>
                {isLoading ? <LoadingSpinner /> : 'Kirim Masukan ke Evaluasi Tim →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
