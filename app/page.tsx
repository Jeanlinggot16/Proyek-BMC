'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Features from './components/Features';

// Helper lokal untuk penggabungan kelas utility tanpa import @/lib/utils
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// ==========================================
// 1. KOMPONEN BACKGROUND GRADIENT ANIMATION (MODIFIKASI BRANDING BMC)
// ==========================================
interface BackgroundGradientProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  interactive?: boolean;
}

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(6, 6, 6)",
  gradientBackgroundEnd = "rgb(10, 10, 10)",
  firstColor = "204, 11, 11",       // Merah BMC (#CC1111)
  secondColor = "212, 175, 55",     // Emas BMC (#D4AF37)
  thirdColor = "150, 0, 0",          // Merah Gelap
  fourthColor = "100, 50, 0",        // Emas Kecoklatan
  fifthColor = "244, 63, 94",        // Rose-500
  pointerColor = "212, 175, 55",     // Emas Pointer
  size = "60%",
  blendingValue = "screen",
  interactive = true,
}: BackgroundGradientProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", `rgb(${firstColor})`);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  // Menggerakkan pendaran secara halus mengikuti koordinat target
  useEffect(() => {
    let animationFrameId: number;
    function move() {
      if (!interactiveRef.current) return;
      setCurX((prev) => prev + (tgX - prev) / 15);
      setCurY((prev) => prev + (tgY - prev) / 15);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      animationFrameId = requestAnimationFrame(move);
    }
    move();
    return () => cancelAnimationFrame(animationFrameId);
  }, [tgX, tgY, curX, curY]);

  // Melacak pergerakan mouse secara global agar tetap interaktif meskipun ada lapisan konten di atasnya
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      setTgX(event.clientX - window.innerWidth / 2);
      setTgY(event.clientY - window.innerHeight / 2);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [interactive]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] pointer-events-none">
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className={cn(
          "gradients-container h-full w-full opacity-35 pointer-events-none",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(50px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center] animate-first opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.7)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)] animate-second opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.7)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+200px)] animate-third opacity-50`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.7)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-100px)] animate-fourth opacity-40`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.7)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)_calc(50%+400px)] animate-fifth opacity-60`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.7)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[250px] h-[250px] opacity-50`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. HALAMAN UTAMA (HOME) LENGKAP
// ==========================================
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState<string[]>(['Iman']);
  const [activeStory, setActiveStory] = useState(0);

  // Mencegah Hydration Mismatch dengan memastikan komponen ter-mount di browser sebelum merender gambar
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const threads = [
    { name: 'Iman', color: 'border-red-500 text-red-400 bg-red-950/20' },
    { name: 'Suku', color: 'border-amber-500 text-amber-400 bg-amber-950/20' },
    { name: 'Seni', color: 'border-rose-500 text-rose-400 bg-rose-950/20' },
    { name: 'Kritik', color: 'border-yellow-600 text-yellow-500 bg-yellow-950/20' },
    { name: 'Kampus', color: 'border-red-400 text-red-300 bg-red-950/10' }
  ];

  const stories = [
    {
      name: "Rionaldo",
      role: "Agent - Manado",
      quote: "Dulu saya pikir dialog lintas iman itu kaku dan teologis sekali. Di BMC, kami membahasnya sambil ngopi, bedah film, dan tertawa bersama tanpa sekat kaku.",
      avatar: "R"
    },
    {
      name: "Siti Sarah",
      role: "Inti - Tomohon",
      quote: "Melihat bagaimana perbedaan dirawat di sini membuat saya sadar bahwa damai itu bukan sekadar tidak ada konflik, tapi merajut persaudaraan yang jujur.",
      avatar: "S"
    }
  ];

  const handleThreadToggle = (name: string) => {
    if (selectedThreads.includes(name)) {
      if (selectedThreads.length > 1) {
        setSelectedThreads(selectedThreads.filter(t => t !== name));
      }
    } else {
      setSelectedThreads([...selectedThreads, name]);
    }
  };

  return (
    <main className="min-h-screen bg-[#060606] text-[#F5F5F5] font-sans relative overflow-x-hidden">
      {/* BACKGROUND GRADIENT ANIMATION PREMIUM */}
      <BackgroundGradientAnimation />

      {/* STICKY GLASS NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#0A0A0A]/50 backdrop-blur-xl border-b border-zinc-900/60 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* LOGO DENGAN AUTOMATIC FALLBACK ANTI-HYDRATION ERROR */}
          <div className="font-bold text-lg tracking-tighter flex items-center gap-2">
            {!isMounted || logoError ? (
              <span className="text-[#CC1111] text-xl font-serif">∞</span>
            ) : (
              <img
                src="/logo-bmc.png"
                alt="Logo BMC"
                onError={() => setLogoError(true)}
                className="h-8 w-auto object-contain"
              />
            )}
            <span>BMC MANADO</span>
          </div>
          <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest">
            <Link href="/" className="text-[#CC1111] font-bold">Home</Link>
            <Link href="/tentang" className="hover:text-zinc-400 transition-colors">Tentang</Link>
            <Link href="/program" className="hover:text-zinc-400 transition-colors">Program</Link>
            <Link href="/daftar" className="hover:text-zinc-400 transition-colors">Daftar</Link>
            <Link href="/kontak" className="hover:text-zinc-400 transition-colors">Kontak</Link>
          </div>
          <Link 
            href="/daftar" 
            className="bg-[#CC1111] hover:bg-[#AA0A0A] text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-glow-red"
          >
            Gabung →
          </Link>
        </div>
      </nav>

      {/* HERO SECTION SINEMATIK */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-24 text-center relative z-10">
        <span className="animate-float bg-zinc-900/80 border border-zinc-800 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 inline-block shadow-glow-gold">
          📍 Ruang Aman Pemuda Manado
        </span>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-none font-serif">
          Satu Benang,<br />
          <span className="bg-gradient-to-r from-[#CC1111] via-[#D4AF37] to-[#CC1111] bg-clip-text text-transparent">
            Tak Terhingga Cerita
          </span>
        </h1>

        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Di sini, latar belakangmu bukan syarat untuk diterima. Iman, budaya, dan cerita yang berbeda tidak kami satukan — kami rajut, melampaui sekat yang memisahkan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
          <Link 
            href="/daftar" 
            className="w-full sm:w-auto bg-[#CC1111] hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-glow-red text-xs tracking-widest uppercase"
          >
            Rajut Langkahmu di BMC →
          </Link>
          <Link 
            href="/tentang" 
            className="w-full sm:w-auto bg-zinc-950/60 hover:bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold transition-all border border-zinc-800 text-xs tracking-widest uppercase"
          >
            Pelajari Filosofi Kami
          </Link>
        </div>

        {/* STATISTIK DENGAN BORDER EMAS TIPIS */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 backdrop-blur-sm">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white font-serif">50+</div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Anggota Aktif</div>
          </div>
          <div className="border-x border-zinc-900/80">
            <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] font-serif">5</div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Program Kerja</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white font-serif">100%</div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Ruang Aman</div>
          </div>
        </div>
      </section>

      {/* SEKSI TIGA PILAR UTAMA (FEATURES) */}
      <Features />

      {/* INTERACTIVE WEAVER SANDBOX SECTION (INTERAKSI GILA) */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-950 relative z-10">
        <div className="bg-[#121212]/30 border border-zinc-900 p-8 md:p-12 rounded-3xl space-y-8 relative overflow-hidden shadow-glow-red">
          <div className="text-center max-w-lg mx-auto">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">EKSPERIMEN VISUAL</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">Simulasikan Rajutanmu</h3>
            <p className="text-xs text-zinc-400 mt-2">Pilih benang latar belakang di bawah ini untuk melihat bagaimana kami merajut perbedaan menjadi harmoni.</p>
          </div>

          {/* Pemilih Benang */}
          <div className="flex justify-center gap-3 flex-wrap">
            {threads.map((t) => {
              const isSelected = selectedThreads.includes(t.name);
              return (
                <button
                  key={t.name}
                  onClick={() => handleThreadToggle(t.name)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                    isSelected 
                      ? `${t.color} border-opacity-100 scale-105 shadow-md` 
                      : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  🧵 Benang {t.name} {isSelected && '✓'}
                </button>
              );
            })}
          </div>

          {/* Kotak Visual Rajutan Dinamis */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900/80 text-center min-h-[160px] flex flex-col justify-center items-center relative">
            
            {/* SVG Garis Dinamis Berdasarkan Benang yang Dipilih */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-16" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                  d="M0,10 Q25,18 50,2 T100,10" 
                  fill="none" 
                  stroke={selectedThreads.includes('Iman') ? '#CC1111' : '#333333'} 
                  strokeWidth="0.8" 
                />
                <path 
                  d="M0,5 Q35,18 70,5 T100,15" 
                  fill="none" 
                  stroke={selectedThreads.includes('Suku') ? '#D4AF37' : '#333333'} 
                  strokeWidth="0.5" 
                />
                <path 
                  d="M0,15 Q20,2 60,18 T100,5" 
                  fill="none" 
                  stroke={selectedThreads.includes('Seni') ? '#F43F5E' : '#333333'} 
                  strokeWidth="0.6" 
                />
              </svg>
            </div>

            <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest mb-3 z-10">Hasil Rajutan</span>
            <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed font-sans z-10">
              {selectedThreads.length === 1 && `Ketika hanya ada benang "${selectedThreads[0]}", kita berdiri sendiri-sendiri tanpa jembatan dialog.`}
              {selectedThreads.length > 1 && `Merajut ${selectedThreads.join(' + ')} menghasilkan ruang dialog yang kokoh. Perbedaan tidak kami hilangkan — kami merangkulnya untuk membentuk persaudaraan sejati.`}
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP BERTUMBUH (THE GROWTH ROADMAP TIMELINE) */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-950/60 relative z-10">
        <div className="text-center mb-16">
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">ALUR PROSES</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">Tahapan Bertumbuh di BMC</h3>
        </div>

        <div className="relative border-l border-zinc-800 max-w-xl mx-auto space-y-12 pl-6 md:pl-8">
          
          {/* Node 1 */}
          <div className="relative group">
            <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-[#CC1111] group-hover:bg-[#CC1111] transition-all"></span>
            <div className="space-y-1.5">
              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">Tahap 1</span>
              <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#CC1111] transition-colors">Public</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Pintu gerbang awal. Pengunjung luar atau peserta diskusi santai mingguan yang baru pertama kali mengenal ruang aman kami.</p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="relative group">
            <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all"></span>
            <div className="space-y-1.5">
              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">Tahap 2</span>
              <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#D4AF37] transition-colors">Agent</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Anggota terdaftar yang mulai aktif berproses di dalam program Tenun, Anyaman, dan terlibat dalam karya-karya kolektif tahunan.</p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="relative group">
            <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-[#CC1111] group-hover:bg-[#CC1111] transition-all"></span>
            <div className="space-y-1.5">
              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">Tahap 3</span>
              <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#CC1111] transition-colors">Inti / Dewan</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Penggerak utama komunitas yang merawat kelangsungan nilai F.R.I.E.N.D, menjaga kultur ruang aman, dan memimpin inisiatif kemanusiaan.</p>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL DYNAMIC CAROUSEL */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-950/60 relative z-10">
        <div className="bg-[#121212]/20 border border-zinc-900 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-glow-gold">
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">CERITA MEREKA</span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">Suara Dari Sahabat BMC</h3>
            <p className="text-xs text-zinc-500">Kisah nyata dari kawan-kawan yang bertumbuh di Manado.</p>
            
            {/* Kontrol Manual */}
            <div className="flex gap-2 justify-center md:justify-start pt-4">
              <button 
                onClick={() => setActiveStory(activeStory === 0 ? 1 : 0)}
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-[#CC1111] bg-zinc-950 text-zinc-400 hover:text-white text-xs transition-colors"
              >
                ←
              </button>
              <button 
                onClick={() => setActiveStory(activeStory === 0 ? 1 : 0)}
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-[#CC1111] bg-zinc-950 text-zinc-400 hover:text-white text-xs transition-colors"
              >
                →
              </button>
            </div>
          </div>

          <div className="md:col-span-8 p-6 bg-zinc-950/70 border border-zinc-900 rounded-2xl min-h-[140px] flex flex-col justify-between animate-fadeIn">
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed italic">
              "{stories[activeStory].quote}"
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-8 h-8 bg-[#CC1111] text-white rounded-full flex items-center justify-center font-bold text-xs">
                {stories[activeStory].avatar}
              </div>
              <div>
                <h5 className="font-serif font-bold text-white text-xs">{stories[activeStory].name}</h5>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{stories[activeStory].role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINE EMAS DAN FOOTER */}
      <hr className="border-t border-[#D4AF37]/15 max-w-4xl w-full mx-auto my-12" />

      {/* FOOTER LENGKAP DENGAN LOGO ASLI */}
      <footer className="max-w-4xl w-full mx-auto text-center pb-12 z-10 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {!isMounted || logoError ? (
            <span className="text-[#CC1111] text-xl font-serif">∞</span>
          ) : (
            <img
              src="/logo-bmc.png"
              alt="Logo BMC"
              onError={() => setLogoError(true)}
              className="h-6 w-auto object-contain"
            />
          )}
          <span className="text-xs font-semibold tracking-wider text-white">BENANG MERAH COMMUNITY</span>
        </div>
        <div className="tracking-[0.4em] uppercase text-[10px] text-[#D4AF37] font-semibold mb-2">
          Berdamai • Bertumbuh • Berkarya
        </div>
        <div className="text-[9px] text-zinc-600">
          &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}