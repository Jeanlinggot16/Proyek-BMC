'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DaftarPage() {
  const [formData, setFormData] = useState({
    nama: '',
    usia: '',
    whatsapp: '',
    asal: '',
    programMinat: [] as string[],
    alasan: '',
    sumberInfo: '',
    agreement: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const programOptions = ["TENUN", "ANYAMAN", "TFT", "RAJUT", "SIMPUL"];

  const handleCheckboxChange = (programName: string) => {
    if (formData.programMinat.includes(programName)) {
      setFormData({
        ...formData,
        programMinat: formData.programMinat.filter(item => item !== programName)
      });
    } else {
      setFormData({
        ...formData,
        programMinat: [...formData.programMinat, programName]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("Mohon centang persetujuan data terlebih dahulu.");
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-12 font-sans flex flex-col justify-between">
      {}
      <nav className="max-w-4xl w-full mx-auto mb-10 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.location.href = '/'}>BMC MANADO</div>
        <div className="space-x-6 text-sm">
          <Link href="/" className="hover:text-[#CC1111] transition-colors">Home</Link>
          <Link href="/tentang" className="hover:text-[#CC1111] transition-colors">Tentang</Link>
          <Link href="/program" className="hover:text-[#CC1111] transition-colors">Program</Link>
          <Link href="/daftar" className="text-[#CC1111] font-semibold border-b-2 border-[#CC1111] pb-1">Daftar</Link>
          <Link href="/kontak" className="hover:text-[#CC1111] transition-colors">Kontak</Link>
        </div>
      </nav>

      {}
      <div className="max-w-xl w-full mx-auto bg-[#121212] border border-zinc-800 p-8 rounded-3xl shadow-[0_0_50px_rgba(204,17,17,0.1)] my-auto">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Gabung Komunitas</h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bergabung dengan BMC berarti memilih untuk jadi bagian dari ruang yang merajut perdamaian, pertumbuhan, dan karya nyata di Manado.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama & Usia Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jean Linggot"
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Usia *</label>
                  <input
                    type="number"
                    required
                    placeholder="21"
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    value={formData.usia}
                    onChange={(e) => setFormData({ ...formData, usia: e.target.value })}
                  />
                </div>
              </div>

              {/* WA & Asal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08XXXXXXXXXX"
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sekolah / Kampus / Kerja *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: UNSRAT"
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    value={formData.asal}
                    onChange={(e) => setFormData({ ...formData, asal: e.target.value })}
                  />
                </div>
              </div>

              {}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Program yang Diminati (Boleh pilih +1)</label>
                <div className="flex flex-wrap gap-2">
                  {programOptions.map((prog) => {
                    const isSelected = formData.programMinat.includes(prog);
                    return (
                      <button
                        type="button"
                        key={prog}
                        onClick={() => handleCheckboxChange(prog)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${isSelected ? 'bg-red-950/40 text-red-400 border-[#CC1111]' : 'bg-[#1A1A1A] text-zinc-400 border-zinc-800 hover:bg-zinc-800'}`}
                      >
                        {prog}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alasan */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Alasan singkat ingin bergabung</label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan sedikit motivasimu..."
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors resize-none"
                  value={formData.alasan}
                  onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
                />
              </div>

              {/* Sumber Info */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Dari mana tahu BMC?</label>
                <input
                  type="text"
                  placeholder="Contoh: Instagram / Teman Kampus"
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                  value={formData.sumberInfo}
                  onChange={(e) => setFormData({ ...formData, sumberInfo: e.target.value })}
                />
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  id="agree"
                  className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#CC1111] focus:ring-[#CC1111]"
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                />
                <label htmlFor="agree" className="text-xs text-zinc-400 leading-relaxed cursor-pointer select-none">
                  Saya menyetujui bahwa data ini hanya digunakan untuk keperluan internal komunitas Benang Merah Manado. *
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CC1111] hover:bg-[#AA0A0A] disabled:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(204,17,17,0.25)] flex items-center justify-center gap-2"
              >
                {loading ? "Memproses..." : "Kirim Formulir Pendaftaran"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 bg-red-950/50 border border-[#CC1111] text-[#CC1111] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">✓</div>
            <h2 className="text-2xl font-bold mb-3">Pendaftaran Diterima!</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4 leading-relaxed">
              Halo <span className="text-white font-semibold">{formData.nama}</span>, terima kasih sudah mendaftar. Pengurus BMC akan menghubungi Anda melalui WhatsApp (<span className="text-[#D4AF37]">{formData.whatsapp}</span>) dalam waktu dekat!
            </p>
            <p className="text-[10px] text-zinc-500 max-w-xs mx-auto mb-8">
              Begitu bergabung, perjalananmu akan terus berproses — dimulai sebagai Public, lalu bertumbuh menjadi Agent, Inti, hingga bagian dari Dewan BMC.
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#1A1A1A] hover:bg-zinc-800 text-white font-semibold text-xs px-6 py-3 rounded-xl border border-zinc-800 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>

      <footer className="max-w-4xl w-full mx-auto mt-10 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
      </footer>
    </main>
  );
}