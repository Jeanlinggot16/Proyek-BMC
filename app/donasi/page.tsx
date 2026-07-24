// FILE: app/donasi/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface DonationTier {
  amount: number;
  label: string;
}

interface PhotoSlide {
  src: string;
  title: string;
  caption: string;
}

const DONATION_TIERS: DonationTier[] = [
  { amount: 25000, label: 'Rp 25.000' },
  { amount: 50000, label: 'Rp 50.000' },
  { amount: 100000, label: 'Rp 100.000' },
  { amount: 250000, label: 'Rp 250.000' },
  { amount: 500000, label: 'Rp 500.000' },
];

const PAYMENT_METHODS = [
  { id: 'bca', name: 'Transfer BCA (Manual Verifikasi)', type: 'Bank' },
];

// Nomor WhatsApp Admin JALIN/BMC (Format 62xxx tanpa Tanda +/0)
const WA_ADMIN_NUMBER = '6282280530981'; // Silakan ganti dengan nomor WA asli Admin BMC

const ACTIVITY_SLIDES: PhotoSlide[] = [
  {
    src: '/tenun new.jpeg',
    title: 'Ruang Dialog TENUN',
    caption: 'Perjumpaan hangat dan diskusi lintas iman antar pemuda di Manado.',
  },
  {
    src: '/diskusi.jpg',
    title: 'Kehangatan Berbagi Cerita',
    caption: 'Mendengarkan dengan tulus tanpa prasangka dan penghakiman.',
  },
  {
    src: '/Peace Camp.jpeg',
    title: 'Peace Camp & Pembinaan',
    caption: 'Kaderisasi dan melatih pemuda merawat ruang aman bersama.',
  },
  {
    src: '/anyaman.JPG',
    title: 'Eksplorasi Seni ANYAMAN',
    caption: 'Wadah ekspresi kreatif dan merawat potensi bakat anak muda.',
  },
  {
    src: '/rajut.jpeg',
    title: 'Aksi Kolaboratif RAJUT',
    caption: 'Merajut persaudaraan lewat festival seni dan panggung publik.',
  },
  {
    src: '/simpul.jpeg',
    title: 'Solidaritas SIMPUL',
    caption: 'Berbagi kebahagiaan dan silaturahmi di momen hari besar keagamaan.',
  },
];

function SectionLabel({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className={`inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${
        gold ? 'text-[#D4AF37]' : 'text-[#C0392B]'
      }`}
    >
      // {children} \\
    </span>
  );
}

function BmcButton({
  children,
  variant = 'solid',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'outline' }) {
  const base = 'relative inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 overflow-hidden cursor-pointer text-xs px-6 py-3';
  const styles = {
    solid: 'bg-[#C0392B] text-white hover:bg-[#A93226] border border-transparent shadow-[0_0_20px_rgba(192,57,43,0.3)] hover:shadow-[0_0_32px_rgba(192,57,43,0.55)]',
    outline: 'bg-transparent text-[#E8E6E0] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/[0.02]',
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function DonasiPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod] = useState<string>('bca');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorNote, setDonorNote] = useState<string>('');
  const [isAnon, setIsAnon] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  // State & Ref untuk Slider Foto Kegiatan
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % ACTIVITY_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + ACTIVITY_SLIDES.length) % ACTIVITY_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) || 0 : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 10000) {
      alert('Minimal donasi adalah Rp 10.000');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1000);
  };

  // Fungsi mengarahkan langsung ke WhatsApp dengan pesan terformat
  const handleConfirmWhatsApp = () => {
    const nameText = isAnon ? 'Anonim' : (donorName || 'Sahabat BMC');
    const message = `Halo Tim JALIN Benang Merah Community,

Saya ingin mengonfirmasi transfer donasi dengan rincian berikut:

📌 *Rincian Donasi:*
• Nama: ${nameText}
• Email: ${donorEmail || '-'}
• Nominal: Rp ${finalAmount.toLocaleString('id-ID')}
• Metode: Transfer Bank BCA (8895444151 a.n. FERDY ANUGRAH)
• Catatan/Pesan: "${donorNote || '-'}"

Berikut saya lampirkan bukti transfernya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
  };

  const resetForm = () => {
    setStep(1);
    setCustomAmount('');
    setSelectedAmount(100000);
    setDonorName('');
    setDonorEmail('');
    setDonorNote('');
    setIsAnon(false);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 relative z-10 animate-fadeIn text-[#F5F5F5]">
      
      {/* SECTION 1: HEADER & HERO SLIDER FOTO TERANG */}
      <section className="max-w-4xl mx-auto mb-16 text-center">
        <SectionLabel>Gotong Royong Kebudayaan</SectionLabel>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Dukung Benang Merah
        </h1>
        <p className="text-xs sm:text-sm text-[#B8B8C0] max-w-2xl mx-auto mb-8 leading-relaxed">
          Benang Merah Community menghubungkan kawan-kawan muda lintas iman dan budaya melalui ruang dialog kritis, literasi gratis, serta aksi kebudayaan mandiri di Manado.
        </p>

        {/* CONTAINER SLIDER FOTO TERANG */}
        <div 
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#100E0C] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black/40">
            {ACTIVITY_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  idx === currentSlide
                    ? 'opacity-100 translate-x-0 scale-100'
                    : idx < currentSlide
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-6 right-6 text-left pointer-events-none z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-0.5">
                    {slide.title}
                  </span>
                  <p className="text-xs text-[#E8E6E0] font-medium truncate">
                    {slide.caption}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={prevSlide}
              aria-label="Foto Sebelumnya"
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-w-resize focus:outline-none"
              title="Klik area kiri untuk foto sebelumnya"
            />

            <button
              onClick={nextSlide}
              aria-label="Foto Berikutnya"
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-e-resize focus:outline-none"
              title="Klik area kanan untuk foto berikutnya"
            />
          </div>

          <div className="absolute bottom-3 right-6 flex items-center gap-1.5 z-30 pointer-events-none">
            {ACTIVITY_SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === currentSlide
                    ? 'w-5 bg-[#D4AF37]'
                    : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: NARASI & GALERI FOTO MINI */}
      <section className="bg-[#100E0C] border border-white/5 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto mb-16 shadow-glow-warm">
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Mengapa kami butuh bantuanmu?
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B8C0] leading-relaxed mb-6">
            Donasi yang Anda berikan sangat penting bagi keberlanjutan operasional Benang Merah Community. Dengan dukungan Anda, kami dapat menyediakan ruang diskusi dan kelas belajar secara gratis, memungkinkan komunitas pemuda, peneliti, dan seniman lokal untuk terhubung, berkolaborasi, serta menjalankan aksi kebudayaan mereka. Kontribusi Anda memainkan peran utama dalam membangun jembatan dialog lintas iman dan menciptakan ekosistem inklusif di Sulawesi Utara.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
              <img src="/tenun new.jpeg" alt="TENUN Dialog" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
              <img src="/diskusi.jpg" alt="Diskusi Kelompok" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
              <img src="/Peace Camp.jpeg" alt="Peace Camp" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORM DONASI & INFORMASI */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-4xl mx-auto mb-16 items-start">
        
        <div className="lg:col-span-7">
          <div className="bg-[#100E0C] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-glow-red">
            
            {step === 1 ? (
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif text-xl font-bold text-white">Formulir Dukungan Finansial</h3>
                  <p className="text-xs text-[#B8B8C0] mt-1">Isi formulir dengan aman. Dukungan Anda dijaga penuh akuntabilitasnya.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Pilih Nominal Donasi</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {DONATION_TIERS.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => handleAmountSelect(tier.amount)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          selectedAmount === tier.amount && !customAmount
                            ? 'bg-[#C0392B]/20 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-[#0A0806] border-white/5 hover:border-white/20 text-[#E8E6E0]'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="custom-amount" className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Atau Masukkan Nominal Lain (Min. Rp 10.000)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-xs text-[#787886] font-bold">Rp</span>
                    <input
                      id="custom-amount"
                      type="text"
                      placeholder="Contoh: 150.000"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full bg-[#0A0806] text-[#F5F5F5] placeholder-[#787886] border border-white/8 rounded-xl pl-10 pr-4 py-3.5 text-xs transition-all duration-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 placeholder-bmc"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Metode Pembayaran</label>
                  <div className="grid grid-cols-1 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className="p-3.5 rounded-xl border flex items-center justify-between text-xs bg-white/[0.02] border-[#D4AF37] text-white"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-[#D4AF37]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          </span>
                          <span className="font-semibold">{method.name}</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-[#787886]">{method.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="donor-name" className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Nama Lengkap</label>
                    <input
                      id="donor-name"
                      type="text"
                      disabled={isAnon}
                      placeholder="Contoh: Rionaldo Lombone"
                      value={isAnon ? 'Anonim' : donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full bg-[#0A0806] text-[#F5F5F5] placeholder-[#787886] border border-white/8 rounded-xl px-4 py-3.5 text-xs transition-all duration-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 placeholder-bmc disabled:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="donor-email" className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Alamat Email</label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      placeholder="Contoh: rionaldo@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full bg-[#0A0806] text-[#F5F5F5] placeholder-[#787886] border border-white/8 rounded-xl px-4 py-3.5 text-xs transition-all duration-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 placeholder-bmc"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="is-anon"
                    type="checkbox"
                    checked={isAnon}
                    onChange={(e) => setIsAnon(e.target.checked)}
                    className="w-4 h-4 accent-[#C0392B] rounded cursor-pointer"
                  />
                  <label htmlFor="is-anon" className="text-xs text-[#B8B8C0] select-none cursor-pointer">Sembunyikan nama saya di halaman donasi publik (Sumbang Anonim)</label>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="donor-note" className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">Pesan Dukungan / Catatan (Opsional)</label>
                  <textarea
                    id="donor-note"
                    rows={2}
                    placeholder="Tulis ucapan penyemangat untuk kawan-kawan komunitas..."
                    value={donorNote}
                    onChange={(e) => setDonorNote(e.target.value)}
                    className="w-full bg-[#0A0806] text-[#F5F5F5] placeholder-[#787886] border border-white/8 rounded-xl px-4 py-3.5 text-xs transition-all duration-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 placeholder-bmc"
                  />
                </div>

                <BmcButton type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Menyiapkan Instruksi...
                    </span>
                  ) : `Proses Dukungan Rp ${finalAmount.toLocaleString('id-ID')} →`}
                </BmcButton>
              </form>
            ) : (
              <div className="space-y-6 text-center py-4 animate-fadeIn">
                <span className="text-4xl block mb-2" aria-hidden="true">💫</span>
                <h4 className="text-xl font-bold text-[#D4AF37]">Instruksi Pembayaran Donasi</h4>
                <p className="text-xs text-[#B8B8C0] max-w-md mx-auto">
                  Terima kasih, <strong className="text-white">{isAnon ? 'Kawan Anonim' : (donorName || 'Sahabat BMC')}</strong>. Silakan selesaikan pembayaran sesuai detail berikut:
                </p>

                <div className="bg-[#0A0806] border border-white/5 rounded-2xl p-6 text-left max-w-sm mx-auto space-y-3">
                  <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-[#8A8A94]">Nominal Donasi:</span>
                    <strong className="text-white">Rp {finalAmount.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-[#8A8A94]">Metode:</span>
                    <span className="text-[#D4AF37] font-semibold uppercase">Transfer Bank BCA</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-[#8A8A94]">Email Konfirmasi:</span>
                    <span className="text-white truncate max-w-[180px]">{donorEmail || '-'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8A8A94]">Status:</span>
                    <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px]">Menunggu Pembayaran</span>
                  </div>
                </div>

                <div className="bg-[#0A0806] border border-[#D4AF37]/30 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-3 shadow-glow-warm">
                  <p className="text-xs text-white font-medium">Silakan transfer sesuai nominal ke rekening berikut:</p>
                  <div className="text-xs p-4 bg-black/60 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#8A8A94] text-[10px] uppercase font-bold tracking-wider">Bank Tujuan</span>
                      <span className="text-xs font-bold text-white bg-blue-600/30 text-blue-400 px-2 py-0.5 rounded">BCA</span>
                    </div>
                    <div>
                      <span className="text-[#8A8A94] text-[10px] uppercase font-bold tracking-wider block">Nomor Rekening</span>
                      <strong className="text-lg text-[#D4AF37] font-mono tracking-wider block mt-0.5">8895444151</strong>
                    </div>
                    <div>
                      <span className="text-[#8A8A94] text-[10px] uppercase font-bold tracking-wider block">Atas Nama</span>
                      <strong className="text-xs text-white block mt-0.5">FERDY ANUGRAH</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A0A0AA] italic leading-relaxed">
                    Klik tombol di bawah ini untuk mengirim bukti transfer langsung ke WhatsApp Admin JALIN.
                  </p>
                </div>

                <div className="flex gap-3 justify-center max-w-sm mx-auto mt-6">
                  <BmcButton variant="outline" onClick={resetForm} className="flex-1">
                    Ubah Donasi
                  </BmcButton>
                  <BmcButton variant="solid" onClick={handleConfirmWhatsApp} className="flex-1">
                    Konfirmasi via WA 💬
                  </BmcButton>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-[0.1em] text-[#D4AF37] uppercase">Pemanfaatan Alokasi Dana</h3>
            
            <div className="flex gap-3 items-start bg-[#100E0C]/50 border border-white/5 p-4 rounded-xl">
              <span className="text-lg mt-0.5" aria-hidden="true">📖</span>
              <div>
                <h4 className="text-xs font-bold text-white">Pengembangan Literasi & Buku</h4>
                <p className="text-[11px] text-[#A0A0AA] leading-relaxed mt-0.5">Penambahan koleksi buku kritis, sains, sastra, dan pengarsipan sejarah kebudayaan lokal Sulawesi Utara.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-[#100E0C]/50 border border-white/5 p-4 rounded-xl">
              <span className="text-lg mt-0.5" aria-hidden="true">🎙️</span>
              <div>
                <h4 className="text-xs font-bold text-white">Diskusi & Kelas Belajar Gratis</h4>
                <p className="text-[11px] text-[#A0A0AA] leading-relaxed mt-0.5">Penyediaan sarana dialog TENUN berkala, modul ajar mandiri, penulisan zine, dan konsumsi pemantik diskusi.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-[#100E0C]/50 border border-white/5 p-4 rounded-xl">
              <span className="text-lg mt-0.5" aria-hidden="true">🏡</span>
              <div>
                <h4 className="text-xs font-bold text-white">Operasional Sekretariat Bersama</h4>
                <p className="text-[11px] text-[#A0A0AA] leading-relaxed mt-0.5">Pemeliharaan ruang baca fisik yang nyaman, listrik, internet cepat, dan kopi saring ramah tamah.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SPONSORS & DONORS GRID */}
      <section className="bg-[#100E0C]/60 border border-white/5 rounded-3xl p-8 max-w-4xl mx-auto text-center">
        <SectionLabel gold>Apresiasi Kami</SectionLabel>
        <h2 className="font-serif text-2xl font-bold text-white mb-6">Kolektif & Lembaga Pendukung</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-60 hover:opacity-85 transition-opacity duration-300">
          <div className="flex flex-col items-center">
            <div className="h-10 flex items-center justify-center text-xs font-extrabold tracking-[0.25em] text-[#F5F5F5] font-serif uppercase">
              PARAGON<span className="text-[#C0392B]">CO</span>
            </div>
            <span className="text-[8px] text-[#8A8A94] uppercase tracking-widest mt-1">Sponsor Budaya</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-10 flex items-center justify-center text-xs font-bold text-[#F5F5F5] italic tracking-tight">
              PT MULTI SANDANG
            </div>
            <span className="text-[8px] text-[#8A8A94] uppercase tracking-widest mt-1">Sponsor Logistik</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-10 flex items-center justify-center text-xs font-serif font-black tracking-wider text-[#D4AF37]">
              KATUP KOLEKTIF
            </div>
            <span className="text-[8px] text-[#8A8A94] uppercase tracking-widest mt-1">Mitra Distribusi</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-10 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-[#F5F5F5]">
              MANADO_READS
            </div>
            <span className="text-[8px] text-[#8A8A94] uppercase tracking-widest mt-1">Jejaring Literasi</span>
          </div>
        </div>

        <div className="border-t border-white/5 mt-6 pt-5">
          <p className="text-[11px] text-[#B8B8C0]">Ingin menawarkan kerja sama kemitraan resmi, donasi buku masif, atau hibah fasilitas? <a href="/kontak" className="text-[#D4AF37] font-bold hover:underline">Hubungi Tim JALIN →</a></p>
        </div>
      </section>

    </main>
  );
}