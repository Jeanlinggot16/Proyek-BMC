'use client';

import { useState, useRef, useCallback } from 'react';
import { SectionLabel } from '@/components/ui/SharedComponents';
import { PageHero } from '@/components/ui/PageHero';
import { BmcButton } from '@/components/ui/BmcButton';
import { cn } from '@/lib/utils';

/* ─── Constants ─── */
const STEP_LABELS = ['Perkenalan', 'Cerita Kamu', 'Komitmen'] as const;

const INITIAL_FORM_DATA = {
  nama: '',
  email: '',
  telp: '',
  asal: '',
  kesibukan: '',
  alasan: '',
  komitmen: false,
};

type FormData = typeof INITIAL_FORM_DATA;

/* ─── StepIndicator ─────────────────────────────────────────────────────── */
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between mb-8 sm:mb-10 relative" role="list" aria-label="Tahapan formulir">
      <div className="absolute top-3.5 left-[10%] right-[10%] h-px z-0 bg-white/5" aria-hidden="true" />

      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const isActive = currentStep >= n;
        const isCompleted = currentStep > n;

        return (
          <div key={label} className="flex flex-col items-center z-[1]" aria-current={currentStep === n ? 'step' : undefined}>
            <span
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300',
                isActive
                  ? 'bg-[#C0392B] border-[#C0392B] text-white shadow-[0_0_12px_rgba(192,57,43,0.4)]'
                  : 'bg-[#0A0806] border-white/10 text-[#A0A0AA]'
              )}
              style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
              {isCompleted ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                n
              )}
            </span>

            <span
              className={cn(
                'text-[9px] font-bold tracking-[0.05em] uppercase mt-2 transition-colors duration-300',
                isActive ? 'text-[#E8E6E0]' : 'text-[#A0A0AA]'
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── ErrorAlert ────────────────────────────────────────────────────────── */
function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mb-5 p-3.5 rounded-lg text-xs text-[#FFB3B3] leading-relaxed bg-[#C0392B]/8 border border-[#C0392B]/25 flex items-start gap-2.5"
    >
      <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/* ─── SuccessScreen ─────────────────────────────────────────────────────── */
function SuccessScreen({ formData }: { formData: FormData }) {
  return (
    <div className="text-center py-8 animate-fadeIn">
      {/* Foto member tersenyum — bukan ikon abstrak */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
        <img
          src="/arthur.JPG"
          alt="Anggota komunitas tersenyum"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37] mb-3">
        Senang Bertemu Kamu, {formData.nama.split(' ')[0]}!
      </h3>
      
      <p className="text-[13px] sm:text-sm text-[#B8B8C0] leading-relaxed mb-5 max-w-md mx-auto">
        Kami sudah menerima data kamu dengan aman. Tim fasilitator kami akan menghubungi kamu lewat{' '}
        <strong className="text-[#E8E6E0]">WhatsApp ({formData.telp})</strong> dalam 1-2 hari ke depan untuk ngobrol santai dan mengundang kamu ke sesi perkenalan.
      </p>

      {/* Info box hangat */}
      <div className="p-5 rounded-xl text-xs text-[#B8B8C0] leading-relaxed bg-[#D4AF37]/[0.04] border border-[#D4AF37]/20 max-w-md mx-auto">
        <p className="mb-2 font-bold text-[#D4AF37] text-[11px] tracking-[0.08em] uppercase">
          Sambil menunggu, kamu bisa:
        </p>
        <ul className="space-y-1.5 list-none p-0 text-left">
          <li className="flex gap-2">
            <span className="text-[#D4AF37]">☕</span>
            <span>Datang langsung ke kedai kopi tempat kami biasa ngumpul — tanya saja di WhatsApp</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#D4AF37]">📖</span>
            <span>Baca cerita & arsip diskusi kami di halaman <a href="/arsip" className="text-[#D4AF37] underline hover:text-[#E8C547]">Arsip</a></span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#D4AF37]">💬</span>
            <span>Kenalan dengan anggota lain lewat grup WhatsApp — link akan dikirim setelah verifikasi</span>
          </li>
        </ul>
      </div>

      {/* Pesan penutup */}
      <p className="text-[11px] text-[#A0A0AA] mt-5 italic">
        Kami sudah menyiapkan tempat duduk dan kopi hangat untukmu. Sampai jumpa! 🎉
      </p>
    </div>
  );
}

/* ─── FormInput ─────────────────────────────────────────────────────────── */
function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  rows = 4,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}) {
  const baseInputClass = cn(
    'w-full bg-[#0A0806] border border-white/8 rounded-xl px-4 py-3.5 text-[13px] text-[#E8E6E0] placeholder:text-[#787886] outline-none transition-all duration-300',
    'hover:border-white/15',
    'focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 focus:bg-[#0F0D0A]'
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold text-[#B8B8C0] tracking-[0.06em] uppercase mb-2"
      >
        {label}
        {required && <span className="text-[#C0392B] ml-1" aria-hidden="true">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={cn(baseInputClass, 'resize-y min-h-[100px]')}
          aria-required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseInputClass}
          aria-required={required}
        />
      )}
    </div>
  );
}

/* ─── KOMPONEN UTAMA ────────────────────────────────────────────────────── */
export default function DaftarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    },
    []
  );

  const step1Valid = !!(formData.nama.trim() && formData.email.trim() && formData.telp.trim());

  const handleNextStep = useCallback(() => {
    if (step === 1 && !step1Valid) {
      setErrorMsg('Lengkapi nama, email, dan nomor WhatsApp dulu ya. Biar kami bisa kenalan dengan kamu!');
      return;
    }
    setErrorMsg(null);
    setStep((prev) => Math.min(prev + 1, 3));
  }, [step, step1Valid]);

  const handlePrevStep = useCallback(() => {
    setErrorMsg(null);
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.komitmen) {
        setErrorMsg('Centang dulu komitmennya ya. Ini penting buat menjaga ruang aman kita bersama.');
        return;
      }

      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;

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
          if (liveRegionRef.current) {
            liveRegionRef.current.textContent = 'Pendaftaran berhasil! Kami akan menghubungi kamu segera.';
          }
        } else {
          setErrorMsg('Waduh, gagal kirim nih. Coba periksa koneksi internet kamu, atau ulangi beberapa saat lagi.');
        }
      } catch (err) {
        console.error('Submit error:', err);
        setErrorMsg('Ada gangguan jaringan. Jangan khawatir — coba lagi sebentar ya.');
      } finally {
        setIsLoading(false);
        isSubmittingRef.current = false;
      }
    },
    [formData]
  );

  return (
    <main className="relative z-10 px-5 py-12 sm:px-6 sm:py-16 max-w-[720px] mx-auto" aria-label="Formulir Bergabung">
      {/* Hero Header — bahasa lebih hangat */}
      <PageHero
        label="Gabung Yuk"
        title="Jadi Bagian dari"
        highlight="Benang Merah"
        description="Ngobrol santai dulu, isi data singkat, dan kami akan menghubungimu untuk kenalan. Tanpa biaya, tanpa formalitas berlebihan."
      />

      {/* Container utama */}
      <div className="rounded-2xl p-6 sm:p-9 bg-[#100E0C] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Live region untuk screen reader */}
        <div ref={liveRegionRef} aria-live="polite" aria-atomic="true" className="sr-only" />

        {/* Foto anggota di atas form — biar langsung terasa manusiawi */}
        {!submitted && (
          <div className="flex items-center gap-4 mb-7 p-4 rounded-xl bg-[#0A0806] border border-white/5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/20 shrink-0">
              <img src="/arthur.JPG" alt="Anggota tersenyum" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[12px] text-[#E8E6E0] italic leading-relaxed">
                &ldquo;Dulu saya juga isi form ini. Sekarang BMC jadi rumah kedua. Santai aja — kami ramah kok!&rdquo;
              </p>
              <p className="text-[10px] text-[#A0A0AA] mt-1">— Arthur, anggota sejak 2023</p>
            </div>
          </div>
        )}

        {submitted ? (
          <SuccessScreen formData={formData} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <StepIndicator currentStep={step} />

            {errorMsg && <ErrorAlert message={errorMsg} />}

            {/* ─── STEP 1: Perkenalan ─────────────────────────────────── */}
            {step === 1 && (
              <fieldset className="flex flex-col gap-5 border-none p-0">
                <legend className="sr-only">Perkenalan Diri</legend>

                <p className="text-[12px] text-[#B8B8C0] leading-relaxed -mb-1">
                  Hai! Kenalan dulu yuk. Data ini cuma buat kami bisa hubungi kamu — bukan buat disebar.
                </p>

                <FormInput
                  label="Nama Lengkap"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Nama panggilan juga boleh"
                  required
                />
                <FormInput
                  label="Alamat Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="nama@email.com"
                  required
                />
                <FormInput
                  label="Nomor WhatsApp"
                  id="telp"
                  name="telp"
                  type="tel"
                  value={formData.telp}
                  onChange={handleInputChange}
                  placeholder="0812-3456-7890"
                  required
                />

                <div className="flex justify-end mt-3">
                  <BmcButton type="button" onClick={handleNextStep} disabled={!step1Valid} aria-disabled={!step1Valid}>
                    Lanjut Cerita →
                  </BmcButton>
                </div>
              </fieldset>
            )}

            {/* ─── STEP 2: Cerita Kamu ────────────────────────────────── */}
            {step === 2 && (
              <fieldset className="flex flex-col gap-5 border-none p-0">
                <legend className="sr-only">Cerita Kamu</legend>

                <p className="text-[12px] text-[#B8B8C0] leading-relaxed -mb-1">
                  Ceritain sedikit tentang kamu. Gak perlu formal — isi aja sejujurnya.
                </p>

                <FormInput
                  label="Asal / Domisili"
                  id="asal"
                  name="asal"
                  value={formData.asal}
                  onChange={handleInputChange}
                  placeholder="Contoh: Tikala, Manado / Kakaskasen, Tomohon"
                />
                <FormInput
                  label="Kesibukan Saat Ini"
                  id="kesibukan"
                  name="kesibukan"
                  value={formData.kesibukan}
                  onChange={handleInputChange}
                  placeholder="Mahasiswa / Bekerja / Freelance / Masih cari arah"
                />
                <FormInput
                  label="Kenapa Tertarik Gabung BMC?"
                  id="alasan"
                  name="alasan"
                  value={formData.alasan}
                  onChange={handleInputChange}
                  placeholder="Ceritain keresahan, harapan, atau apa pun yang bikin kamu klik halaman ini..."
                  isTextarea
                  rows={4}
                />

                <div className="flex justify-between mt-3 gap-3">
                  <BmcButton type="button" variant="ghost" onClick={handlePrevStep}>
                    ← Kembali
                  </BmcButton>
                  <BmcButton type="button" onClick={handleNextStep}>
                    Lanjut Komitmen →
                  </BmcButton>
                </div>
              </fieldset>
            )}

            {/* ─── STEP 3: Komitmen ──────────────────────────────────── */}
            {step === 3 && (
              <fieldset className="flex flex-col gap-6 border-none p-0">
                <legend className="sr-only">Piagam Komitmen</legend>

                <p className="text-[12px] text-[#B8B8C0] leading-relaxed">
                  Sebelum gabung, baca dulu komitmen kita. Ini penting buat jaga ruang aman bersama. Tenang — bukan kontrak legal, cuma kesepakatan hati.
                </p>

                {/* Piagam Card — lebih hangat */}
                <div className="p-5 sm:p-6 rounded-xl bg-[#C0392B]/[0.03] border border-[#C0392B]/15">
                  <h4 className="text-xs font-bold text-[#FF6B6B] tracking-[0.06em] uppercase mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Yang Kami Percaya Bersama
                  </h4>
                  <ul className="space-y-3 list-none p-0">
                    {[
                      {
                        title: 'Saling Jaga Ruang Aman',
                        desc: 'Kami setuju untuk tidak menghakimi, tidak memaksakan keyakinan, dan mendengarkan dengan hati terbuka.',
                      },
                      {
                        title: 'Hadir dengan Tulus',
                        desc: 'Kami berusaha meluangkan waktu untuk ngumpul rutin — karena persaudaraan butuh ketemu, bukan cuma chat.',
                      },
                      {
                        title: 'Berkarya Bareng',
                        desc: 'Kami percaya bahwa dialog yang sehat bisa melahirkan karya nyata untuk Manado dan sekitarnya.',
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-xs text-[#B8B8C0] leading-relaxed">
                        <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">{i + 1}.</span>
                        <span>
                          <strong className="text-[#E8E6E0]">{item.title}:</strong>{' '}
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checkbox Komitmen — bahasa lebih cair */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="komitmen"
                    name="komitmen"
                    checked={formData.komitmen}
                    onChange={handleCheckboxChange}
                    className="mt-0.5 cursor-pointer w-4 h-4 rounded accent-[#C0392B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#100E0C]"
                    required
                    aria-required="true"
                  />
                  <label htmlFor="komitmen" className="text-xs text-[#B8B8C0] leading-relaxed cursor-pointer select-none">
                    Saya setuju dan siap ikut menjaga ruang aman ini bersama teman-teman di Benang Merah Community.
                  </label>
                </div>

                <div className="flex justify-between mt-3 gap-3">
                  <BmcButton type="button" variant="ghost" onClick={handlePrevStep} disabled={isLoading}>
                    ← Kembali
                  </BmcButton>
                  <BmcButton
                    type="submit"
                    disabled={!formData.komitmen || isLoading}
                    aria-disabled={!formData.komitmen || isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      'Gabung Sekarang 🎉'
                    )}
                  </BmcButton>
                </div>
              </fieldset>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
