'use client';

import { useState, useEffect, useRef } from 'react';

// =========================================================================
// HELPER UTILITY & MOCK COMPONENT
// =========================================================================
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// ==========================================
// 1. KOMPONEN BACKGROUND GRADIENT ANIMATION (PREMIUM GLASS-LIQUID)
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
        <div className="absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-first opacity-60"></div>
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.7)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-second opacity-60"></div>
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.7)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+200px)] animate-third opacity-50"></div>
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.7)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-100px)] animate-fourth opacity-40"></div>
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.7)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)_calc(50%+400px)] animate-fifth opacity-60"></div>
        {interactive && (
          <div ref={interactiveRef} className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.7)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[250px] h-[250px] opacity-50"></div>
        )}
      </div>
    </div>
  );
};


// ==========================================
// 2. KOMPONEN PILAR UTAMA (FEATURES)
// ==========================================
const FeaturesComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlights = [
    {
      title: "Ruang Aman Bertumbuh",
      desc: "Wadah tulus untuk berani berbicara, belajar dari kesalahan, dan mengekspresikan diri secara autentik tanpa takut dihakimi.",
      tag: "SAFE SPACE",
      icon: (
        <svg className="w-6 h-6 text-[#CC1111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Wadah Nyata Berkarya",
      desc: "Menyalurkan ide kreatif, musik, puisi, hingga film pendek menjadi karya kolektif nyata yang berdampak langsung bagi masyarakat Manado.",
      tag: "REAL IMPACT",
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Rajutan Lintas Batas",
      desc: "Merajut persaudaraan jujur lintas iman dan budaya dengan kesungguhan, melampaui sekat-sekat perbedaan teologis maupun sosial.",
      tag: "GENUINE UNION",
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {highlights.map((item, idx) => {
        const isHovered = hoveredIndex === idx;
        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "p-8 rounded-2xl bg-zinc-950/40 border transition-all duration-500 cursor-default relative overflow-hidden",
              isHovered ? 'border-[#CC1111]/60 shadow-glow-red -translate-y-2' : 'border-zinc-900/60'
            )}
          >
            <div 
              className={cn(
                "absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500",
                isHovered ? 'opacity-20' : 'opacity-0',
                idx === 0 ? 'bg-[#CC1111]' : idx === 1 ? 'bg-[#D4AF37]' : 'bg-rose-500'
              )}
            />
            <div className="space-y-4 relative z-10">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300", isHovered ? 'bg-zinc-900 scale-110' : 'bg-zinc-950')}>
                {item.icon}
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 block uppercase">{item.tag}</span>
                <h4 className="text-lg font-bold text-white font-serif">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// 3. KOMPONEN KARTU PROGRAM
// ==========================================
const ProgramCard = ({ title, desc, tag }: { title: string, desc: string, tag: string }) => {
  return (
    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900 hover:border-[#CC1111] transition-all shadow-xl group">
      <span className="text-[#CC1111] text-xs font-bold uppercase tracking-widest">{tag}</span>
      <h3 className="text-xl font-bold mt-2 mb-3 text-white font-serif">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
};


// ==========================================
// 4. MAIN APP WITH EMBEDDED STATE ROUTER
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedThreads, setSelectedThreads] = useState<string[]>(['Iman']);
  const [activeStory, setActiveStory] = useState(0);
  const [activeValue, setActiveValue] = useState<string>('F');

  // Form State
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

  // Auto-scroll to top on page change simulation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleThreadToggle = (name: string) => {
    if (selectedThreads.includes(name)) {
      if (selectedThreads.length > 1) {
        setSelectedThreads(selectedThreads.filter(t => t !== name));
      }
    } else {
      setSelectedThreads([...selectedThreads, name]);
    }
  };

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

  const bmcValues = {
    F: { title: "Friendly (Ramah Tanpa Pura-pura)", desc: "Setiap orang disambut hangat sebagai manusia utuh, bukan dinilai dari label sosial, iman, suku, maupun budaya yang dibawanya." },
    R: { title: "Ruang Aman (Tempat untuk Salah)", desc: "Wadah tulus untuk berbicara, berbuat salah, dan belajar bertumbuh bersama tanpa rasa takut dihakimi atau mendapat tekanan." },
    I: { title: "Intimate (Bukan Basa-basi)", desc: "Membangun relasi yang jujur, dekat, mendalam, dan transformatif — jauh melampaui basa-basi sosial yang dangkal." },
    E: { title: "Enjoyable (Tanpa Beban)", desc: "Suasana hangat yang membangkitkan tawa. Proses belajar, bertumbuh, dan berkarya dijalani dengan penuh sukacita." },
    N: { title: "Nusantara (Merayakan Perbedaan)", desc: "Menghargai keberagaman iman, budaya, dan suku di Indonesia khususnya Manado sebagai kekayaan yang merajut persaudaraan sejati." },
    D: { title: "Daya Cipta (Dampak Nyata)", desc: "Mendorong lahirnya ide kreatif kecil yang dirawat dengan kesungguhan hingga menjelma karya nyata yang berdampak luas bagi sesama." }
  };

  const programsData = [
    {
      title: "TENUN",
      schedule: "Sabtu, Minggu Kedua",
      focus: "Belajar Mendengar",
      desc: "Tenun adalah proses menyatukan benang-benang berbeda menjadi kain yang utuh dan bermakna — melambangkan dialog yang sehat di tengah perbedaan.",
      activities: "diskusi santai namun mendalam lintas iman, budaya, dan disiplin ilmu; bedah buku, film, atau artikel terkait isu sosial dan kemanusiaan."
    },
    {
      title: "ANYAMAN",
      schedule: "Sabtu, Minggu Keempat",
      focus: "Mengembangkan Potensi",
      desc: "Anyaman melambangkan proses membentuk diri secara sadar, konsisten, dan penuh kesabaran — setiap individu adalah benang yang sedang dirawat.",
      activities: "seni (musik, puisi, rupa, fotografi, film pendek), public speaking & storytelling, refleksi diri dan ekspresi kreatif."
    },
    {
      title: "TFT (Training For Trainers)",
      schedule: "Program Tahunan",
      focus: "Belajar Memimpin",
      desc: "Pembinaan fasilitator dan calon penggerak komunitas, untuk menjaga kesinambungan nilai dan budaya BMC.",
      activities: "Pelatihan fasilitator kelompok, kepemimpinan transformatif, manajemen komunitas, dan resolusi konflik sosial."
    },
    {
      title: "RAJUT",
      schedule: "Program Tahunan",
      focus: "Menciptakan Dampak",
      desc: "Karya kolektif hasil dari proses kecil yang konsisten — melambangkan aksi nyata dari pertumbuhan kedewasaan pemuda.",
      activities: "pentas seni budaya, workshop publik, kolaborasi dengan UMKM dan komunitas lokal, hingga penggalangan dana sosial."
    },
    {
      title: "SIMPUL",
      schedule: "Program Tahunan",
      focus: "Merawat Persaudaraan",
      desc: "Silaturahmi lintas iman pada momen besar keagamaan sebagai wujud nyata dari perdamaian yang inklusif.",
      activities: "silaturahmi lintas iman pada momen Natal dan Lebaran — lewat perayaan bersama, doa dan refleksi, serta aksi sosial."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleProgramToggle = (prog: string) => {
    setFormData(prev => ({
      ...prev,
      programMinat: prev.programMinat.includes(prog)
        ? prev.programMinat.filter(p => p !== prog)
        : [...prev.programMinat, prog]
    }));
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#F5F5F5] font-sans relative overflow-x-hidden selection:bg-[#CC1111] selection:text-white">
      {/* TERTANAM: KEYFRAME ANIMASI CSS GRADIENT SUPAYA BERJALAN SEMPURNA TANPA ERROR */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
        .animate-first { animation: moveInCircle 30s ease infinite; }
        .animate-second { animation: moveHorizontal 40s ease infinite; }
        .animate-third { animation: moveInCircle 35s linear infinite; }
        .animate-fourth { animation: moveVertical 25s ease infinite; }
        .animate-fifth { animation: moveHorizontal 35s ease infinite; }
        
        .shadow-glow-red { box-shadow: 0 0 40px rgba(204, 17, 17, 0.25); }
        .shadow-glow-gold { box-shadow: 0 0 40px rgba(212, 175, 55, 0.18); }
      `}} />

      {/* BACKGROUND GRADIENT ANIMATION */}
      <BackgroundGradientAnimation />

      {/* STICKY GLASS NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#0A0A0A]/55 backdrop-blur-xl border-b border-zinc-900/60 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="font-bold text-lg tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity bg-transparent border-none text-left"
          >
            <span className="text-[#CC1111] text-xl font-serif">∞</span> BMC MANADO
          </button>
          
          <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-semibold">
            <button onClick={() => setCurrentPage('home')} className={cn("transition-colors bg-transparent border-none cursor-pointer", currentPage === 'home' ? "text-[#CC1111]" : "text-zinc-400 hover:text-white")}>Home</button>
            <button onClick={() => setCurrentPage('tentang')} className={cn("transition-colors bg-transparent border-none cursor-pointer", currentPage === 'tentang' ? "text-[#CC1111]" : "text-zinc-400 hover:text-white")}>Tentang</button>
            <button onClick={() => setCurrentPage('program')} className={cn("transition-colors bg-transparent border-none cursor-pointer", currentPage === 'program' ? "text-[#CC1111]" : "text-zinc-400 hover:text-white")}>Program</button>
            <button onClick={() => setCurrentPage('daftar')} className={cn("transition-colors bg-transparent border-none cursor-pointer", currentPage === 'daftar' ? "text-[#CC1111]" : "text-zinc-400 hover:text-white")}>Daftar</button>
            <button onClick={() => setCurrentPage('kontak')} className={cn("transition-colors bg-transparent border-none cursor-pointer", currentPage === 'kontak' ? "text-[#CC1111]" : "text-zinc-400 hover:text-white")}>Kontak</button>
          </div>

          <button 
            onClick={() => setCurrentPage('daftar')} 
            className="bg-[#CC1111] hover:bg-[#AA0A0A] text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-glow-red hover:scale-105"
          >
            Gabung →
          </button>
        </div>
      </nav>

      {/* =========================================================================
          PAGE 1: BERANDA LAYOUT (SINEMATIK INTERAKTIF LENGKAP)
          ========================================================================= */}
      {currentPage === 'home' && (
        <div className="animate-fadeIn">
          {/* HERO */}
          <section className="max-w-5xl mx-auto px-6 pt-36 pb-24 text-center relative z-10">
            <span className="animate-float bg-zinc-900/80 border border-zinc-800 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 inline-block shadow-glow-gold">
              📍 Ruang Aman Pemuda Manado
            </span>

            <h1 className="text-4xl md:text-8xl font-bold tracking-tight mb-8 leading-none font-serif text-white">
              Satu Benang,<br />
              <span className="bg-gradient-to-r from-[#CC1111] via-[#D4AF37] to-[#CC1111] bg-clip-text text-transparent">
                Tak Terhingga Cerita
              </span>
            </h1>

            <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
              Di sini, latar belakangmu bukan syarat untuk diterima. Iman, budaya, dan cerita yang berbeda tidak kami satukan — kami rajut, melampaui sekat yang memisahkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
              <button 
                onClick={() => setCurrentPage('daftar')} 
                className="w-full sm:w-auto bg-[#CC1111] hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-glow-red text-xs tracking-widest uppercase"
              >
                Rajut Langkahmu di BMC →
              </button>
              <button 
                onClick={() => setCurrentPage('tentang')} 
                className="w-full sm:w-auto bg-zinc-950/60 hover:bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold transition-all border border-zinc-800 text-xs tracking-widest uppercase"
              >
                Pelajari Filosofi Kami
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 backdrop-blur-sm shadow-xl">
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

          {/* THREE PILARS COMPONENT */}
          <section className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900/40">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">TIGA PILAR UTAMA</span>
              <h3 className="text-3xl font-bold text-white font-serif mt-2">Mengapa Bertumbuh di BMC?</h3>
              <p className="text-xs text-zinc-400 mt-3">Komitmen kami menjaga kultur agar setiap langkah kecil Anda dihargai sepenuhnya.</p>
            </div>
            <FeaturesComponent />
          </section>

          {/* WEAVER SANDBOX */}
          <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-900/40 relative z-10">
            <div className="bg-[#121212]/30 border border-zinc-900 p-8 md:p-12 rounded-3xl space-y-8 relative overflow-hidden shadow-glow-red">
              <div className="text-center max-w-lg mx-auto">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">EKSPERIMEN VISUAL</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">Simulasikan Rajutanmu</h3>
                <p className="text-xs text-zinc-400 mt-2">Pilih benang latar belakang di bawah ini untuk melihat bagaimana perbedaan merajut harmoni.</p>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                {threads.map((t) => {
                  const isSelected = selectedThreads.includes(t.name);
                  return (
                    <button
                      key={t.name}
                      onClick={() => handleThreadToggle(t.name)}
                      className={cn(
                        "px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer",
                        isSelected ? `${t.color} border-opacity-100 scale-105 shadow-md` : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                      )}
                    >
                      🧵 Benang {t.name} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>

              <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900/80 text-center min-h-[160px] flex flex-col justify-center items-center relative">
                <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                  <svg className="w-full h-16" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q25,18 50,2 T100,10" fill="none" stroke={selectedThreads.includes('Iman') ? '#CC1111' : '#333333'} strokeWidth="0.8" />
                    <path d="M0,5 Q35,18 70,5 T100,15" fill="none" stroke={selectedThreads.includes('Suku') ? '#D4AF37' : '#333333'} strokeWidth="0.5" />
                    <path d="M0,15 Q20,2 60,18 T100,5" fill="none" stroke={selectedThreads.includes('Seni') ? '#F43F5E' : '#333333'} strokeWidth="0.6" />
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

          {/* TIMELINE */}
          <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-900/40 relative z-10">
            <div className="text-center mb-16">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">ALUR PROSES</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">Tahapan Bertumbuh di BMC</h3>
            </div>

            <div className="relative border-l border-zinc-800 max-w-xl mx-auto space-y-12 pl-6 md:pl-8">
              <div className="relative group">
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-[#CC1111] group-hover:bg-[#CC1111] transition-all"></span>
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">Tahap 1</span>
                  <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#CC1111] transition-colors">Public</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Pintu gerbang awal. Pengunjung luar atau peserta diskusi santai mingguan yang baru pertama kali mengenal ruang aman kami.</p>
                </div>
              </div>
              <div className="relative group">
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all"></span>
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">Tahap 2</span>
                  <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#D4AF37] transition-colors">Agent</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Anggota terdaftar yang mulai aktif berproses di dalam program Tenun, Anyaman, dan terlibat dalam karya-karya kolektif tahunan.</p>
                </div>
              </div>
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

          {/* TESTIMONI */}
          <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-900/40 relative z-10">
            <div className="bg-[#121212]/20 border border-zinc-900 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-glow-gold">
              <div className="md:col-span-4 space-y-3 text-center md:text-left">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">CERITA MEREKA</span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">Suara Dari Sahabat BMC</h3>
                <p className="text-xs text-zinc-500">Kisah nyata dari kawan-kawan yang bertumbuh di Manado.</p>
                <div className="flex gap-2 justify-center md:justify-start pt-4">
                  <button onClick={() => setActiveStory(activeStory === 0 ? 1 : 0)} className="w-8 h-8 rounded-full border border-zinc-800 hover:border-[#CC1111] bg-zinc-950 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer">←</button>
                  <button onClick={() => setActiveStory(activeStory === 0 ? 1 : 0)} className="w-8 h-8 rounded-full border border-zinc-800 hover:border-[#CC1111] bg-zinc-950 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer">→</button>
                </div>
              </div>
              <div className="md:col-span-8 p-6 bg-zinc-950/70 border border-zinc-900 rounded-2xl min-h-[140px] flex flex-col justify-between">
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed italic">"{stories[activeStory].quote}"</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-8 h-8 bg-[#CC1111] text-white rounded-full flex items-center justify-center font-bold text-xs">{stories[activeStory].avatar}</div>
                  <div>
                    <h5 className="font-serif font-bold text-white text-xs">{stories[activeStory].name}</h5>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{stories[activeStory].role}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          PAGE 2: TENTANG KAMI LAYOUT
          ========================================================================= */}
      {currentPage === 'tentang' && (
        <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-20 animate-fadeIn relative z-10">
          <section className="space-y-6">
            <span className="text-[#CC1111] text-xs font-bold tracking-widest uppercase">SIAPA KAMI</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Mengenal Benang Merah</h1>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-sans">
              BMC bukan organisasi formal yang berjarak. Bukan pula komunitas kampus yang biasa-biasa saja. BMC adalah ruang aman yang dijaga dengan kesungguhan — tempat untuk bertemu, berdialog, belajar, dan berkarya bersama.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-zinc-900/60">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#D4AF37] font-serif">Cerita Kami</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Benang Merah lahir dari kesadaran sederhana bahwa banyak luka manusia berawal dari relasi yang retak — dengan Tuhan, diri sendiri, sesama, dan alam semesta. Kami hadir untuk merajutnya kembali melalui relasi yang sehat, pertumbuhan yang dewasa, dan karya yang bertanggung jawab.
              </p>
            </div>
            <div className="space-y-4 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/40 shadow-glow-red">
              <h3 className="text-xl font-bold text-[#CC1111] font-serif flex items-center gap-2">
                <span className="animate-float text-2xl">∞</span> Makna Benang Merah & Simbol ∞
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Benang Merah melambangkan proses merajut: perjumpaan, penerimaan, dan kebersamaan. Perbedaan tidak dihilangkan — ia dirajut menjadi satu kesatuan yang utuh. Bentuk infinity (∞) menegaskan bahwa relasi, pertumbuhan, dan pemulihan adalah perjalanan panjang yang terus dijaga.
              </p>
            </div>
          </section>

          {/* TAB SYSTEM NILAI F.R.I.E.N.D */}
          <section className="bg-[#121212]/50 border border-zinc-800/60 p-8 rounded-3xl space-y-8 shadow-glow-gold">
            <div className="text-center">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">PRINSIP UTAMA</span>
              <h3 className="text-2xl font-bold text-[#D4AF37] font-serif mt-1">Nilai Inti Kami — F.R.I.E.N.D</h3>
              <p className="text-xs text-zinc-400 mt-2">Klik tiap huruf di bawah ini untuk melihat komitmen dasar kami</p>
            </div>
            
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
              {Object.keys(bmcValues).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveValue(key)}
                  className={cn(
                    "w-12 h-12 rounded-xl text-lg font-bold font-serif transition-all cursor-pointer",
                    activeValue === key ? 'bg-[#CC1111] text-white scale-110 shadow-glow-red' : 'bg-[#1A1A1A] text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="text-center p-6 bg-zinc-950/70 rounded-2xl border border-zinc-900 min-h-[100px] flex flex-col justify-center">
              <h4 className="font-bold text-white mb-2 text-sm md:text-base font-serif">{bmcValues[activeValue as keyof typeof bmcValues].title}</h4>
              <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-sans">{bmcValues[activeValue as keyof typeof bmcValues].desc}</p>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          PAGE 3: PROGRAM KAMI LAYOUT
          ========================================================================= */}
      {currentPage === 'program' && (
        <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-12 animate-fadeIn relative z-10">
          <div className="text-center md:text-left space-y-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">KEGIATAN KAMI</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Program Kerja BMC</h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Sama seperti proses menenun kain yang indah, setiap program kami dirancang secara sabar dan konsisten untuk merawat perdamaian dan potensi anak muda Manado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programsData.map((prog, idx) => (
              <div key={idx} className="bg-[#121212]/50 border border-zinc-800 p-8 rounded-3xl hover:border-[#CC1111] transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <span className="text-[#CC1111] font-bold text-lg font-serif">{prog.title}</span>
                    <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/30 px-2.5 py-1 rounded-full uppercase font-semibold">{prog.schedule}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block mb-1">🎯 {prog.focus}</span>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">{prog.desc}</p>
                    <p className="text-[11px] text-zinc-500 leading-relaxed"><strong className="text-zinc-400">Aktivitas:</strong> {prog.activities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Tertarik ikut salah satu program di atas?</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">Mari bergabung dan berproses bersama anak muda lainnya dari berbagai macam latar belakang di Manado.</p>
            <button 
              onClick={() => setCurrentPage('daftar')} 
              className="inline-block bg-[#CC1111] hover:bg-[#AA0A0A] text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-glow-red cursor-pointer"
            >
              Yuk, Daftar Jadi Member BMC Dulu →
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 4: DAFTAR MEMBER LAYOUT
          ========================================================================= */}
      {currentPage === 'daftar' && (
        <div className="max-w-xl mx-auto px-6 pt-36 pb-24 animate-fadeIn relative z-10">
          <div className="bg-[#121212]/80 border border-zinc-800 p-8 rounded-3xl shadow-[0_0_50px_rgba(204,17,17,0.1)] backdrop-blur-md">
            {!submitted ? (
              <>
                <div className="mb-8 text-center md:text-left">
                  <h1 className="text-3xl font-bold tracking-tight mb-2 text-white font-serif">Gabung Komunitas</h1>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Bergabung dengan BMC berarti memilih untuk jadi bagian dari ruang yang merajut perdamaian, pertumbuhan, dan karya nyata di Manado.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sekolah / Kerja *</label>
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

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Program yang Diminati (Boleh lebih dari 1)</label>
                    <div className="flex flex-wrap gap-2">
                      {["TENUN", "ANYAMAN", "TFT", "RAJUT", "SIMPUL"].map((prog) => {
                        const isSelected = formData.programMinat.includes(prog);
                        return (
                          <button
                            type="button"
                            key={prog}
                            onClick={() => handleProgramToggle(prog)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                              isSelected ? 'bg-red-950/40 text-red-400 border-[#CC1111]' : 'bg-[#1A1A1A] text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                            )}
                          >
                            {prog}
                          </button>
                        );
                      })}
                    </div>
                  </div>

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

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      id="agree"
                      className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#CC1111] focus:ring-[#CC1111] cursor-pointer"
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
                    className="w-full bg-[#CC1111] hover:bg-[#AA0A0A] disabled:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(204,17,17,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? "Memproses..." : "Kirim Formulir Pendaftaran"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-950/50 border border-[#CC1111] text-[#CC1111] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">✓</div>
                <h2 className="text-2xl font-bold mb-3 text-white font-serif">Pendaftaran Diterima!</h2>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4 leading-relaxed">
                  Halo <span className="text-white font-semibold">{formData.nama}</span>, terima kasih sudah mendaftar. Pengurus BMC akan menghubungi Anda melalui WhatsApp (<span className="text-[#D4AF37]">{formData.whatsapp}</span>) dalam waktu dekat!
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setCurrentPage('home'); }}
                  className="inline-block bg-[#1A1A1A] hover:bg-zinc-800 text-white font-semibold text-xs px-6 py-3 rounded-xl border border-zinc-800 transition-colors cursor-pointer"
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 5: KONTAK LAYOUT
          ========================================================================= */}
      {currentPage === 'kontak' && (
        <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn relative z-10">
          <div className="space-y-6 text-center md:text-left my-auto">
            <span className="text-[#CC1111] text-xs font-bold tracking-widest uppercase">HUBUNGI KAMI</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Mari Berkolaborasi</h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Punya pertanyaan, mau kolaborasi, atau sekadar mau kenal lebih jauh dengan keluarga besar BMC di Manado? Silakan hubungi kami.
            </p>
            <div className="pt-2 flex justify-center md:justify-start">
              <a 
                href="https://wa.me/6285128020325" 
                target="_blank" 
                className="bg-[#CC1111] hover:bg-[#AA0A0A] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-glow-red"
              >
                Chat WA Sekarang →
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex justify-between items-center group">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">WhatsApp</span>
                <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">+62 851-2802-0325</span>
              </div>
            </div>
            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex justify-between items-center group">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Email Resmi</span>
                <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">benangmerahcommunity@gmail.com</span>
              </div>
            </div>
            <a 
              href="https://www.instagram.com/benangmerahcommunity"
              target="_blank"
              className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex justify-between items-center group cursor-pointer block"
            >
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Instagram</span>
                <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">@benangmerahcommunity</span>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">Kunjungi →</span>
            </a>
          </div>
        </div>
      )}

      {/* LINE EMAS & GLOBAL FOOTER */}
      <hr className="border-t border-[#D4AF37]/15 max-w-4xl w-full mx-auto my-12" />
      <footer className="max-w-4xl w-full mx-auto text-center pb-12 relative z-10">
        <div className="tracking-[0.4em] uppercase text-[10px] text-[#D4AF37] font-semibold mb-4">
          Berdamai • Bertumbuh • Berkarya
        </div>
        <div className="text-[9px] text-zinc-600">
          &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}