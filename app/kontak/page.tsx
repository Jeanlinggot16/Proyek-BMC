'use client';

import { useState } from 'react';


// 1. Section Label
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

// 2. Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Mengirim...</span>
    </div>
  );
}


// 3. Page Hero
function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative text-center max-w-3xl mx-auto mb-12 sm:mb-16 mt-6">
      {/* Decorative Warm Backglow */}
      <div className="absolute -inset-10 bg-[#C0392B]/10 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F5] mb-4">
        {title}
      </h1>
      <div className="w-16 h-[2px] bg-[#C0392B] mx-auto mb-6" />
      <p className="text-sm sm:text-base text-[#B8B8C0] leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

// 4. BmcButton with Shine and Hover Animations
interface BmcButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  shine?: boolean;
}

function BmcButton({
  children,
  variant = 'solid',
  size = 'md',
  shine = false,
  className = '',
  ...props
}: BmcButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 overflow-hidden cursor-pointer';

  const sizeStyles = {
    sm: 'text-[10px] px-4 py-2',
    md: 'text-[11px] px-6 py-3',
    lg: 'text-xs px-8 py-4',
  };

  const variantStyles = {
    solid:
      'bg-[#C0392B] text-white hover:bg-[#A93226] border border-transparent shadow-[0_0_20px_rgba(192,57,43,0.3)] hover:shadow-[0_0_32px_rgba(192,57,43,0.55)]',
    outline:
      'bg-transparent text-[#E8E6E0] border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/[0.02]',
  };

  const shineClass = shine ? 'bmc-shine' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${shineClass} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}


// 5. Form Input & Textarea
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextarea?: boolean;
  rows?: number;
}

function FormInput({ label, id, isTextarea = false, rows = 4, className = '', ...props }: FormInputProps) {
  const inputClass = `w-full bg-[#0A0806] text-[#F5F5F5] placeholder-[#787886] border border-white/8 rounded-xl px-4 py-3.5 text-xs transition-all duration-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 placeholder-bmc ${className}`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] font-bold tracking-[0.1em] text-[#B8B8C0] uppercase">
        {label}
      </label>
      {isTextarea ? (
        <textarea id={id} rows={rows} className={inputClass} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className={inputClass} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}

// 6. Form Error Alert
function FormErrorAlert({ message }: { message: string }) {
  return (
    <div className="bg-[#C0392B]/15 border border-[#C0392B]/40 rounded-xl p-4 flex items-start gap-3">
      <span className="text-[#FF6B6B] text-sm mt-0.5" aria-hidden="true">⚠️</span>
      <p className="text-[11.5px] text-[#FF6B6B] leading-relaxed">{message}</p>
    </div>
  );
}


const LOCAL_FAQS = [
  {
    q: 'Apa itu Benang Merah Community (BMC)?',
    a: 'BMC adalah wadah perjumpaan lintas disiplin, komunitas belajar mandiri, dan kolektif kreatif di Manado yang berfokus pada dialog, literasi, seni, dan kebudayaan.'
  },
  {
    q: 'Bagaimana cara mendaftar menjadi anggota aktif?',
    a: 'Anda bisa mendaftar secara online melalui halaman "Gabung" di website ini atau mengunjungi sekretariat kami secara langsung saat program TENUN berlangsung.'
  },
  {
    q: 'Apakah semua diskusi dan pameran seni di BMC berbayar?',
    a: 'Tidak. Sebagian besar program rutin kami, seperti diskusi bulanan TENUN dan ruang berbagi literasi, gratis dan terbuka untuk semua kalangan umum.'
  },
  {
    q: 'Bagaimana prosedur menawarkan kerja sama kolaborasi?',
    a: 'Sangat mudah! Anda dapat mengisi formulir kontak di halaman ini atau mengirimkan surat kemitraan resmi langsung ke email jalin.bmc@gmail.com.'
  }
];

const SOCIAL_ACCOUNTS = [
  {
    name: 'Instagram',
    handle: '@benangmerahcommunity',
    desc: 'Update kegiatan terdekat, dokumentasi keseruan live, dan info pendaftaran.',
    link: 'https://www.instagram.com/benangmerahcommunity?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    color: '#E1306C',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: 'Benang Merah Community',
    desc: 'Rekaman penuh diskusi TENUN, pertunjukan seni, dan podcast perjumpaan.',
    link: 'https://youtube.com',
    color: '#FF0000',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.556A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@bmcmanado',
    desc: 'Refleksi singkat, cuplikan games seru, dan momen hangat ngopi bersama.',
    link: 'https://tiktok.com',
    color: '#00F2FE',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.47-.36-.9-.78-1.27-1.25-.09 1.7-.1 3.4-.11 5.1-.03 2.1-.53 4.24-1.78 5.89-1.46 1.95-3.86 3.14-6.31 3.13-2.61.05-5.18-1.12-6.72-3.23-1.61-2.14-2.07-5.06-1.23-7.62.8-2.52 2.87-4.57 5.43-5.26 1.13-.31 2.3-.39 3.47-.23v4.07c-.9-.23-1.89-.13-2.73.32-.98.51-1.67 1.52-1.85 2.63-.33 1.63.53 3.39 2.01 4.11.96.48 2.08.47 3.02-.06 1.05-.57 1.7-1.71 1.74-2.91.04-3.15.02-6.3.02-9.45z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+62 812-3456-7890',
    desc: 'Hubungi representatif tim JALIN untuk tanya jawab langsung dan konfirmasi.',
    link: 'https://wa.me/6285128020325',
    color: '#25D366',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.006 14.054.981 11.443.981c-5.438 0-9.863 4.371-9.867 9.801-.001 1.734.457 3.426 1.329 4.937L1.875 21.9l6.305-1.631c1.54.896 3.11 1.365 4.467 1.365zm8.125-6.539c-.244-.121-1.442-.705-1.666-.786-.223-.081-.385-.121-.547.121-.162.242-.627.787-.769.948-.142.161-.284.181-.527.06-1.129-.567-1.944-.979-2.715-2.28-.2-.34.2-.316.572-1.053.06-.121.03-.227-.015-.316-.045-.089-.385-.929-.527-1.272-.139-.333-.279-.288-.385-.293-.1-.005-.213-.005-.325-.005-.112 0-.294.041-.447.206-.152.166-.58.567-.58 1.384s.6 1.616.684 1.732c.084.115 1.18 1.79 2.859 2.505.4.172.711.275.955.351.402.127.768.109 1.057.066.322-.048 1.442-.584 1.646-1.149.204-.565.204-1.049.142-1.149-.061-.101-.223-.162-.467-.283z" />
      </svg>
    ),
  },
];


export default function KontakPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [msgData, setMsgData] = useState({ nama: '', pesan: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleFAQ = (idx: number) => {
    setExpandedFAQ((prev) => (prev === idx ? null : idx));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMsgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMsgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgData.nama.trim() || !msgData.pesan.trim()) {
      setErrorMsg('Semua kolom wajib diisi agar pesan dapat kami terima dengan baik.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'kontak', ...msgData }),
      });

      if (response.ok) {
        setMessageSubmitted(true);
      } else {
        setErrorMsg('Gagal mengirim pesan. Silakan coba kembali beberapa saat lagi.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan jaringan. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10 animate-fadeIn text-[#F5F5F5]">
      
      {/* Page Hero Header */}
      <PageHero
        title="Hubungi JALIN"
        subtitle="Jaringan Layanan Informasi & Hubungan Benang Merah Community. Kirim pesan, tawarkan kerja sama kolaborasi, atau ajukan pertanyaan langsung di Manado."
      />

      {/* Grid Layout Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-8">
        
        {/* Kolom Kiri: Form Pesan & Informasi Sekretariat (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Card Form */}
          <div className="bg-[#100E0C] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/10 bmc-card-interactive">
            {messageSubmitted ? (
              <div className="text-center py-10 animate-fadeIn">
                <span className="text-4xl block mb-4" aria-hidden="true">✉️</span>
                <h4 className="text-lg font-bold text-[#D4AF37] mb-2">Pesan Berhasil Terkirim!</h4>
                <p className="text-xs text-[#B8B8C0] leading-relaxed max-w-sm mx-auto">
                  Terima kasih, <strong className="text-white">{msgData.nama}</strong>. Pesan Anda telah diarsipkan dengan aman. Tim <strong className="text-[#D4AF37]">JALIN</strong> akan merespons korespondensi Anda sesegera mungkin.
                </p>
                <div className="mt-6">
                  <BmcButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMessageSubmitted(false);
                      setMsgData({ nama: '', pesan: '' });
                    }}
                  >
                    Kirim Pesan Lain
                  </BmcButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleMsgSubmit} className="flex flex-col gap-5">
                <h3 className="font-serif text-lg font-bold text-[#F5F5F5] mb-1">
                  Kirim Pesan Langsung
                </h3>

                {errorMsg && <FormErrorAlert message={errorMsg} />}

                <FormInput
                  label="Nama Lengkap / Komunitas"
                  id="nama"
                  name="nama"
                  value={msgData.nama}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jean Linggot"
                  required
                />

                <FormInput
                  label="Pesan Anda"
                  id="pesan"
                  name="pesan"
                  value={msgData.pesan}
                  onChange={handleInputChange}
                  placeholder="Utarakan pertanyaan atau tawaran kolaborasi secara lengkap di sini..."
                  isTextarea
                  rows={4}
                  required
                />

                <div className="mt-2">
                  <BmcButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    shine
                  >
                    {isLoading ? <LoadingSpinner /> : 'Kirim Pesan →'}
                  </BmcButton>
                </div>
              </form>
            )}
          </div>

          {/* Card Alamat & Korespondensi Resmi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0D0D0D]/60 border border-white/5 rounded-xl p-5">
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.1em] uppercase block mb-2">
                Sekretariat
              </span>
              <p className="text-xs text-[#B8B8C0] leading-relaxed">
                Perum Buha Griya Permai blok H no. 8
              </p>
            </div>
            <div className="bg-[#0D0D0D]/60 border border-white/5 rounded-xl p-5">
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.1em] uppercase block mb-2">
                Korespondensi Surat
              </span>
              <p className="text-xs text-[#B8B8C0] leading-relaxed break-all">
                info@benangmerahcommunity.org<br />
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Medsos & FAQ (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Bagian Media Sosial Resmi */}
          <div>
            <SectionLabel gold>Akun Medsos BMC</SectionLabel>
            <h2 className="font-serif text-xl font-bold text-[#F5F5F5] mb-4">
              Rajut Interaksi di Dunia Digital
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_ACCOUNTS.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between bg-[#100E0C]/90 border border-white/5 rounded-xl p-4 hover:border-white/10 hover:bg-[#141210] transition-all duration-300 no-underline"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="p-1.5 rounded-lg text-white"
                      style={{ background: `${social.color}20`, color: social.color }}
                    >
                      {social.icon}
                    </span>
                    <span className="text-[11px] font-medium text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Kunjungi →
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#F5F5F5] tracking-wide mb-0.5">
                      {social.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#8A8A94] block mb-2">
                      {social.handle}
                    </span>
                    <p className="text-[11px] text-[#A0A0AA] leading-relaxed">
                      {social.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <SectionLabel>Pertanyaan FAQ</SectionLabel>
            <h2 className="font-serif text-xl font-bold text-[#F5F5F5] mb-4">
              Mungkin Ini yang Anda Cari
            </h2>

            <div className="flex flex-col gap-2.5">
              {LOCAL_FAQS.map((faq, i) => {
                const isExpanded = expandedFAQ === i;
                return (
                  <article
                    key={i}
                    className="bg-[#0D0D0D]/80 border border-white/5 rounded-xl p-4 transition-all duration-300"
                    style={{
                      borderColor: isExpanded ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(i)}
                      className="w-full flex justify-between items-center text-left gap-4 cursor-pointer"
                    >
                      <span
                        className="text-xs font-bold leading-relaxed transition-colors duration-300"
                        style={{ color: isExpanded ? '#D4AF37' : '#E8E6E0' }}
                      >
                        {faq.q}
                      </span>
                      <span
                        className="text-base font-bold transition-transform duration-300 select-none"
                        style={{ color: isExpanded ? '#D4AF37' : '#8A8A94' }}
                      >
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    
                    <div
                      className="overflow-hidden transition-all duration-300 text-[11.5px] text-[#9A9AA5] leading-relaxed"
                      style={{
                        maxHeight: isExpanded ? '200px' : '0',
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? '10px' : '0px',
                      }}
                    >
                      {faq.a}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}