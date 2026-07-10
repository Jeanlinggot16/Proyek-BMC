// app/daftar/page.tsx
'use client';

import { useState, useRef } from 'react';
import { SectionLabel, LoadingSpinner } from '@/components/ui/SharedComponents';
import { PageHero } from '@/components/ui/PageHero';
import { BmcButton } from '@/components/ui/BmcButton';
import { cn } from '@/lib/utils';

const STEP_LABELS = ['Identitas', 'Eksplorasi', 'Komitmen'];

export default function DaftarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telp: '',
    asal: '',
    kesibukan: '',
    alasan: '',
    komitmen: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Pesan error ditampilkan inline, BUKAN lewat alert() browser
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const step1Valid = !!(formData.nama && formData.email && formData.telp);

  const handleNextStep = () => {
    if (step === 1 && !step1Valid) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.komitmen) return;

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'daftar', ...formData }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg('Gagal mengirim pendaftaran. Pastikan koneksi internet stabil, atau coba lagi dalam beberapa saat.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan jaringan saat mengirim data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = cn(
    'w-full bg-[#060606] border border-white/8 rounded-lg px-4 py-3.5 text-[13px] text-white outline-none transition-colors duration-200',
    'focus-visible:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40'
  );
  const labelClass = 'block text-[11px] font-bold text-[#B4B4BD] tracking-[0.08em] uppercase mb-2';

  const StepDot = ({ n, label }: { n: number; label: string }) => (
    <div className="flex flex-col items-center z-[1]" aria-current={step === n ? 'step' : undefined}>
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-300"
        style={{
          background: step >= n ? '#CC1111' : '#060606',
          border: `1px solid ${step >= n ? '#CC1111' : 'rgba(255,255,255,0.1)'}`,
          color: step >= n ? '#FFF' : '#8A8A94',
        }}
      >
        {step > n ? '✓' : n}
      </span>
      <span
        className="text-[9px] font-bold tracking-[0.05em] uppercase mt-2"
        style={{ color: step >= n ? '#E8E6E0' : '#8A8A94' }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative z-10 px-5 py-12 sm:px-6 sm:py-16 max-w-[700px] mx-auto" aria-label="Formulir Bergabung">
      <PageHero
        label="Komitmen Bersama"
        title="Formulir"
        highlight="Bergabung"
        description="Proses pendaftaran anggota Benang Merah Community Manado. Isi formulir dengan jujur dan tulus."
      />

      <div className="rounded-2xl p-6 sm:p-9" style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)' }}>
        {/* Live region untuk screen reader — mengumumkan status submit tanpa alert() */}
        <div ref={liveRegionRef} aria-live="polite" className="sr-only">
          {isLoading ? 'Sedang mengirim formulir...' : submitted ? 'Pendaftaran berhasil dikirim.' : errorMsg ?? ''}
        </div>

        {submitted ? (
          <div className="text-center py-6" style={{ animation: 'fadeIn 0.6s' }}>
            <span className="text-5xl block mb-5" aria-hidden="true">🎉</span>
            <h3 className="text-xl font-bold font-serif text-[#D4AF37] mb-3">Selamat Bergabung!</h3>
            <p className="text-[13px] text-[#9A9AA5] leading-[1.8] mb-6">
              Data pendaftaran atas nama <strong>{formData.nama}</strong> telah kami terima secara aman di dalam sistem arsip. Fasilitator dari Tim <strong>PELUK</strong> akan menghubungi Anda via WhatsApp ({formData.telp}) dalam waktu maksimal 2x24 jam untuk mengirimkan undangan perjumpaan perdana.
            </p>
            <div className="p-4 rounded-xl text-xs text-[#B4B4BD] leading-[1.6]" style={{ background: 'rgba(204,17,17,0.05)', border: '1px solid rgba(204,17,17,0.15)' }}>
              Sampai bertemu di sesi <strong>TENUN</strong> minggu depan! Persiapkan diri Anda untuk perjumpaan dan dialog yang hangat.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Step indicator */}
            <div className="flex justify-between mb-9 sm:mb-10 relative" role="list" aria-label="Tahapan formulir">
              <div className="absolute top-3.5 left-[10%] right-[10%] h-px z-0" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <StepDot n={1} label="Identitas" />
              <StepDot n={2} label="Eksplorasi" />
              <StepDot n={3} label="Komitmen" />
            </div>

            {/* Pesan error inline — menggantikan alert() */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-5 p-3.5 rounded-lg text-xs text-[#FF8A8A] leading-relaxed"
                style={{ background: 'rgba(204,17,17,0.08)', border: '1px solid rgba(204,17,17,0.25)' }}
              >
                {errorMsg}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="nama" className={labelClass}>Nama Lengkap</label>
                  <input
                    type="text" id="nama" name="nama" value={formData.nama} onChange={handleInputChange}
                    placeholder="Contoh: Rionaldo Lombone" required className={inputClass}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Alamat Email</label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                    placeholder="nama@email.com" required className={inputClass}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="telp" className={labelClass}>Nomor WhatsApp</label>
                  <input
                    type="tel" id="telp" name="telp" value={formData.telp} onChange={handleInputChange}
                    placeholder="Contoh: 081234567890" required className={inputClass}
                    aria-required="true"
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <BmcButton type="button" onClick={handleNextStep} disabled={!step1Valid} aria-disabled={!step1Valid}>
                    Selanjutnya &rarr;
                  </BmcButton>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="asal" className={labelClass}>Asal / Domisili di Sulawesi Utara</label>
                  <input
                    type="text" id="asal" name="asal" value={formData.asal} onChange={handleInputChange}
                    placeholder="Contoh: Tikala, Manado / Kakaskasen, Tomohon" className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="kesibukan" className={labelClass}>Kesibukan Saat Ini</label>
                  <input
                    type="text" id="kesibukan" name="kesibukan" value={formData.kesibukan} onChange={handleInputChange}
                    placeholder="Contoh: Mahasiswa Unsrat / Pekerja Kreatif Lepas" className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="alasan" className={labelClass}>Mengapa Tertarik Bergabung di BMC?</label>
                  <textarea
                    id="alasan" name="alasan" value={formData.alasan} onChange={handleInputChange}
                    placeholder="Bagikan pemikiran, keresahan, atau apa yang ingin Anda eksplorasi bersama kami..."
                    rows={4} className={cn(inputClass, 'resize-y')}
                  />
                </div>
                <div className="flex justify-between mt-3 gap-3">
                  <BmcButton type="button" variant="ghost" onClick={handlePrevStep}>
                    &larr; Kembali
                  </BmcButton>
                  <BmcButton type="button" onClick={handleNextStep}>
                    Selanjutnya &rarr;
                  </BmcButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="p-5 sm:p-6 rounded-xl" style={{ background: 'rgba(204,17,17,0.03)', border: '1px solid rgba(204,17,17,0.15)' }}>
                  <h4 className="text-xs font-bold text-[#FF5555] tracking-[0.08em] uppercase mb-3">Piagam Komitmen Anggota</h4>
                  <p className="text-xs text-[#9A9AA5] leading-[1.7] mb-2.5">1. <strong>Saling Menghargai Ruang Aman:</strong> Berkomitmen menjaga relasi yang tulus, tidak memaksakan dogma, dan tidak menghakimi latar belakang anggota lain.</p>
                  <p className="text-xs text-[#9A9AA5] leading-[1.7] mb-2.5">2. <strong>Kehadiran Aktif:</strong> Berusaha meluangkan waktu secara tulus untuk hadir di dalam diskusi bulanan (TENUN/ANYAMAN) demi kelangsungan relasi komunitas.</p>
                  <p className="text-xs text-[#9A9AA5] leading-[1.7]">3. <strong>Kolaborasi Kreatif:</strong> Siap bahu-membahu dalam merajut karya nyata demi perdamaian yang inklusif di Sulawesi Utara.</p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox" id="komitmen" name="komitmen" checked={formData.komitmen} onChange={handleCheckboxChange}
                    className="mt-0.5 cursor-pointer w-4 h-4 accent-[#CC1111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
                    required
                  />
                  <label htmlFor="komitmen" className="text-xs text-[#B4B4BD] leading-[1.6] cursor-pointer">
                    Saya memahami dan dengan tulus menyetujui seluruh Piagam Komitmen Anggota Benang Merah Community Manado demi menjaga kualitas ruang aman bersama.
                  </label>
                </div>

                <div className="flex justify-between mt-3 gap-3">
                  <BmcButton type="button" variant="ghost" onClick={handlePrevStep} disabled={isLoading}>
                    &larr; Kembali
                  </BmcButton>
                  <BmcButton
                    type="submit"
                    disabled={!formData.komitmen || isLoading}
                    aria-disabled={!formData.komitmen || isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : 'Kirim Pendaftaran ✓'}
                  </BmcButton>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}