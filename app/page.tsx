'use client';

// app/page.tsx
// BMC MANADO — Portal Web Interaktif "Prestige Ultra" SPA v2.5
// Pembaruan: Perbaikan TypeScript (Deklarasi ProgramViewProps) & Pembersihan Format Teks Tebal (Strong Tags)

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── TYPES & INTERFACES ─────────────────────────────────────────── */
type PageID = 'home' | 'tentang' | 'program' | 'daftar' | 'kontak' | 'saran';

interface Slide {
  eyebrow: string;
  title: string;
  highlight: string;
  desc: string;
  ctaPage: PageID;
  ctaLabel: string;
}

interface ProgramItem {
  code: string;
  name: string;
  freq: 'MINGGUAN' | 'TAHUNAN';
  schedule: string;
  focus: string;
  desc: string;
  color: 'red' | 'gold' | 'rose';
  activities: string[];
  imgUrl: string; 
}

interface TeamItem {
  abbr: string;
  fullName: string;
  tagline: string;
  identity: string;
  responsibilities: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  color: 'red' | 'gold';
}

interface FAQItem {
  q: string;
  a: string;
}

interface TentangViewProps {
  navigateTo: (page: PageID) => void;
  fadeUp: (visible: boolean, delay?: number) => React.CSSProperties;
}

/* MENAMBAHKAN DEFINISI PROGRAMVIEWPROPS YANG HILANG */
interface ProgramViewProps {
  navigateTo: (page: PageID) => void;
  fadeUp: (visible: boolean, delay?: number) => React.CSSProperties;
}

/* ─── CALIBRATED OFFICIAL LOGO COMPONENT (EXACT SPA v2.2 ALIGNMENT) ─── */
function OfficialBMCLogo({ height = 48, animated = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'inline-flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        height: `${height}px`,
        overflow: 'visible'
      }}
    >
      <svg 
        height="100%" 
        viewBox="0 0 400 130" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', width: 'auto' }}
      >
        <defs>
          <linearGradient id="officialRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="40%" stopColor="#CC1111" />
            <stop offset="70%" stopColor="#FF3333" />
            <stop offset="100%" stopColor="#A30000" />
          </linearGradient>

          <filter id="mGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isHovered ? "10" : "4"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path 
          d="M 45 15 L 85 15 C 105 15, 115 25, 115 38 C 115 48, 108 54, 98 57 C 110 60, 118 68, 118 82 C 118 96, 105 105, 85 105 L 45 105 Z M 67 33 L 67 51 L 82 51 C 90 51, 94 47, 94 42 C 94 37, 90 33, 82 33 Z M 67 67 L 67 87 L 84 87 C 92 87, 97 82, 97 77 C 97 72, 92 67, 84 67 Z" 
          fill="#E8E6E0" 
          style={{ transition: 'fill 0.3s' }}
        />

        <path 
          d="M 133 60 C 133 32, 150 16, 168 16 C 182 16, 193 30, 200 48 C 207 30, 218 16, 232 16 C 250 16, 267 32, 267 60 C 267 88, 250 104, 232 104 C 218 104, 207 90, 200 72 C 193 90, 182 104, 168 104 C 150 104, 133 88, 133 60 Z M 155 60 C 155 77, 161 86, 168 86 C 176 86, 185 72, 192 60 C 185 48, 176 34, 168 34 C 161 34, 155 43, 155 60 Z M 245 60 C 245 43, 239 34, 232 34 C 224 34, 215 48, 208 60 C 215 72, 224 86, 232 86 C 239 86, 245 77, 245 60 Z" 
          fill="url(#officialRedGradient)" 
          filter="url(#mGlow)"
          style={{ 
            transition: 'all 0.5s ease',
            transformOrigin: '200px 60px'
          }}
        />

        {animated && (
          <path 
            d="M 133 60 C 133 32, 150 16, 168 16 C 182 16, 193 30, 200 48 C 207 30, 218 16, 232 16 C 250 16, 267 32, 267 60 C 267 88, 250 104, 232 104 C 218 104, 207 90, 200 72 C 193 90, 182 104, 168 104 C 150 104, 133 88, 133 60 Z" 
            fill="none"
            stroke="#FF5555"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="20 180"
            className="bmc-logo-trace"
          />
        )}

        <path 
          d="M 362 36 C 355 22, 342 14, 325 14 C 300 14, 282 33, 282 60 C 282 87, 300 106, 325 106 C 342 106, 355 98, 362 84 L 342 74 C 338 82, 333 87, 325 87 C 313 87, 304 76, 304 60 C 304 44, 313 33, 325 33 C 333 33, 338 38, 342 46 Z" 
          fill="#E8E6E0" 
          style={{ transition: 'fill 0.3s' }}
        />

        <text
          x="203"
          y="124"
          fill="#E8E6E0"
          fontSize="14px"
          fontWeight="700"
          letterSpacing="0.378em"
          textAnchor="middle"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase',
            opacity: isHovered ? 1 : 0.82,
            transition: 'all 0.3s ease'
          }}
        >
          BENANG MERAH COMMUNITY
        </text>
      </svg>
    </div>
  );
}

/* ─── DATA CONSTANTS ─────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    eyebrow: 'BENANG MERAH COMMUNITY · MANADO',
    title: 'Ruang Aman untuk',
    highlight: 'Bertemu & Berdialog',
    desc: 'Komunitas lintas iman, budaya, dan kehidupan di Sulawesi Utara yang merajut perjumpaan, penerimaan, dan kebersamaan menjadi satu kesatuan yang utuh.',
    ctaPage: 'daftar',
    ctaLabel: 'Gabung Komunitas →',
  },
  {
    eyebrow: 'PROSES KREATIF PEMUDA',
    title: 'Merawat Potensi Lewat',
    highlight: 'Dialog & Seni',
    desc: 'Melalui TENUN dan ANYAMAN, kami memberi ruang bagi anak muda dari berbagai latar untuk mengekspresikan diri, berpikir kritis, dan merintis karya bersama.',
    ctaPage: 'program',
    ctaLabel: 'Eksplor Program →',
  },
  {
    eyebrow: 'AKSI NYATA & KOLABORASI',
    title: 'Dari Pertumbuhan Pribadi',
    highlight: 'Menuju Dampak Sosial',
    desc: 'Melalui RAJUT dan SIMPUL, kami merajut persaudaraan sejati lewat aksi sosial konkret dan merayakan keberagaman di tengah masyarakat Bumi Nyiur Melambai.',
    ctaPage: 'tentang',
    ctaLabel: 'Kenali Filosofi Kami →',
  },
];

const STATS = [
  { value: '5+', label: 'Program Aktif' },
  { value: '7', label: 'Divisi Inti' },
  { value: '∞', label: 'Proses Rajut' },
  { value: '3', label: 'Pilar Utama' },
];

const FRIEND_VALUES = [
  {
    letter: 'F',
    word: 'Friendly',
    sub: 'Ramah & Terbuka',
    desc: 'Setiap orang disambut sebagai manusia, bukan dinilai dari atribut atau latar belakangnya. Kehangatan adalah pintu masuk utama komunitas ini.',
  },
  {
    letter: 'R',
    word: 'Ruang Aman',
    sub: 'Bebas Rasa Takut',
    desc: 'Setiap orang berhak merasa diterima, didengar, dan dihormati tanpa tekanan dogma atau penghakiman. BMC adalah tempat bicara yang jujur.',
  },
  {
    letter: 'I',
    word: 'Intimate',
    sub: 'Relasi yang Tulus',
    desc: 'Bukan sekadar relasi sosial yang dangkal, tetapi proses saling mengenal secara mendalam, saling menjaga, dan menumbuhkan persaudaraan sejati.',
  },
  {
    letter: 'E',
    word: 'Enjoyable',
    sub: 'Penuh Sukacita',
    desc: 'Proses bertumbuh dan berkarya dijalani dengan riang gembira dan antusiasme tinggi. Komunitas ini hangat, menyegarkan, dan menghidupkan.',
  },
  {
    letter: 'N',
    word: 'Nusantara',
    sub: 'Menghargai Keberagaman',
    desc: 'Iman, budaya, suku, dan latar belakang dipandang sebagai kekayaan warna benang. Perbedaan adalah ruang belajar bersama, bukan ancaman.',
  },
  {
    letter: 'D',
    word: 'Daya Cipta',
    sub: 'Kreatif & Berdampak',
    desc: 'Setiap anggota didorong untuk melahirkan karya kreatif dan memberi kontribusi konkret bagi sekelilingnya. Ide dirawat hingga menjadi buah aksi.',
  },
];

const PROGRAMS: ProgramItem[] = [
  {
    code: 'TENUN',
    name: 'TENUN',
    freq: 'MINGGUAN',
    schedule: 'Sabtu, Minggu ke-2 setiap bulan',
    focus: 'Diskusi Lintas Iman & Isu Sosial',
    desc: 'Menyatukan benang-benang pemikiran yang berbeda menjadi satu kain pemahaman utuh — dialog sehat yang membedah buku, film, dan diskursus sosial kontemporer.',
    color: 'red',
    activities: ['Bedah literatur & isu hangat', 'Dialog lintas iman & worldview', 'Sesi tanya pakar & tokoh inspiratif'],
    imgUrl: '/tenun.jpg'
  },
  {
    code: 'ANYAMAN',
    name: 'ANYAMAN',
    freq: 'MINGGUAN',
    schedule: 'Sabtu, Minggu ke-4 setiap bulan',
    focus: 'Eksplorasi Seni & Potensi Kreatif',
    desc: 'Merawat dan merangkai serat potensi individu secara sadar dan konsisten. Wadah ekspresi seni, penulisan, musik, hingga pengembangan soft skills pemuda.',
    color: 'gold',
    activities: ['Workshop penulisan kreatif & musik', 'Sesi public speaking & storytelling', 'Pameran karya seni alternatif mandiri'],
    imgUrl: '/anyaman.jpg'
  },
  {
    code: 'RAJUT',
    name: 'RAJUT',
    freq: 'TAHUNAN',
    schedule: 'Agenda Festival Tahunan',
    focus: 'Karya Kolektif & Panggung Publik',
    desc: 'Karya besar berskala luas hasil kolaborasi seluruh elemen komunitas. Menghadirkan festival seni, pameran budaya, dan ruang kolaboratif di Manado.',
    color: 'rose',
    activities: ['Pementasan seni kolaboratif multi-genre', 'Eksibisi anyaman karya anggota', 'Kolaborasi UMKM & komunitas lokal'],
    imgUrl: '/rajut.jpeg'
  },
  {
    code: 'TFT',
    name: 'Training For Trainers (TFT)',
    freq: 'TAHUNAN',
    schedule: 'Program Pembinaan Intensif',
    focus: 'Kaderisasi & Fasilitator Kelompok',
    desc: 'Program regenerasi dan peningkatan kapasitas untuk mencetak fasilitator handal yang mampu merawat ruang aman serta nilai-nilai dasar BMC.',
    color: 'red',
    activities: ['Pelatihan fasilitasi kelompok kecil', 'Pendalaman metode dialog asertif', 'Manajemen konflik & dinamika kelompok'],
    imgUrl: '/tft.jpeg'
  },
  {
    code: 'SIMPUL',
    name: 'SIMPUL',
    freq: 'TAHUNAN',
    schedule: 'Hari Raya Keagamaan',
    focus: 'Silaturahmi & Solidaritas Sosial',
    desc: 'Mengikat erat simpul persaudaraan lintas iman pada momen hari besar (seperti Idul Fitri dan Natal) lewat aksi sosial konkret dan kunjungan kehangatan.',
    color: 'gold',
    activities: ['Aksi sosial berbagi berkah hari raya', 'Silaturahmi ke rumah-rumah ibadah', 'Malam refleksi perdamaian lintas iman'],
    imgUrl: '/simpul.jpeg'
  },
];

const TEAMS: TeamItem[] = [
  { 
    abbr: 'CATAT', 
    fullName: 'Catatan Administrasi Tertata', 
    tagline: 'Mencatat setiap langkah sejarah', 
    identity: 'Penjaga arsip, data, dan dokumentasi tulisan komunitas.',
    responsibilities: ['Mengelola basis data keanggotaan BMC', 'Menulis notulensi berharga di setiap sesi dialog', 'Menyusun laporan berkala perkembangan komunitas', 'Mengarsipkan, menyortir, dan meneruskan saran & kritik masuk']
  },
  { 
    abbr: 'CUAN', 
    fullName: 'Catatan Uang, Anggaran & Neraca', 
    tagline: 'Cermat menghitung, bijak mengelola', 
    identity: 'Penjaga integritas finansial dan kemandirian ekonomi.',
    responsibilities: ['Menyusun anggaran program kerja secara transparan', 'Mengelola kas masuk-keluar and donasi publik', 'Merancang inisiatif pencarian dana kreatif']
  },
  { 
    abbr: 'GERCEP', 
    fullName: 'Gerak Cepat Eksekusi Program', 
    tagline: 'Cepat bergerak, tepat bertindak', 
    identity: 'Tim taktis lapangan, penanggung jawab kelancaran acara.',
    responsibilities: ['Mempersiapkan logistik dan tempat pelaksanaan sesi', 'Mengoordinasikan jalannya acara dari awal hingga akhir', 'Menjadi tim respon cepat jika terjadi kendala teknis']
  },
  { 
    abbr: 'PELUK', 
    fullName: 'Peduli, Layanan, Untuk Komunitas', 
    tagline: 'Merangkul, menjaga, menguatkan', 
    identity: 'Jantung kehangatan emosional dan ruang aman psikologis.',
    responsibilities: ['Menyambut dan membimbing anggota baru agar nyaman', 'Memperhatikan kesejahteraan emosional sesama rekan', 'Menengahi dan meresolusi gesekan internal secara empatik']
  },
  { 
    abbr: 'JALIN', 
    fullName: 'Jaringan dan Lintas Interaksi', 
    tagline: 'Menghubungkan simpul kebaikan eksternal', 
    identity: 'Duta luar pembangun jembatan kemitraan strategis.',
    responsibilities: ['Membangun relasi dengan komunitas, akademisi, dan media', 'Mengundang pembicara tamu eksternal yang inspiratif', 'Menjembatani kolaborasi aksi sosial dengan pihak luar']
  },
  { 
    abbr: 'RACIK', 
    fullName: 'Rancang Kreatif', 
    tagline: 'Merancang ide, melahirkan makna', 
    identity: 'Dapur kurasi konten dialog dan modul pembelajaran.',
    responsibilities: ['Merancang tema diskusi bulanan untuk TENUN', 'Menyusun kurikulum aktivitas kreatif untuk ANYAMAN', 'Membaca dan memetakan tren isu sosial yang perlu diangkat']
  },
  { 
    abbr: 'LENSA', 
    fullName: 'Liputan, Editing, Narasi, Sosial Media, Arsip', 
    tagline: 'Menangkap cerita, menyebarkan inspirasi', 
    identity: 'Wajah visual dan narator kisah perjalanan BMC.',
    responsibilities: ['Mengambil dokumentasi foto dan video berkualitas premium', 'Mengelola aset publikasi di seluruh platform sosial media', 'Menulis narasi reflektif yang menginspirasi khalayak luas']
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Di BMC saya menemukan apa yang tidak saya dapatkan di bangku kuliah: sebuah ruang aman untuk berbicara jujur tentang kecemasan saya, didengarkan tanpa dihakimi, dan diajak bersama-sama merintis aksi sosial nyata.',
    author: 'Rionaldo',
    role: 'Mahasiswa & Anggota BMC sejak 2024',
    initials: 'R',
    color: 'red',
  },
  {
    quote: 'Awalnya saya ragu berdialog lintas iman karena takut menyinggung sensitivitas teologis. Namun di program TENUN, semua dibicarakan dengan keterbukaan luar biasa, kehangatan, dan rasa hormat yang sangat tulus.',
    author: 'Siti Sarah',
    role: 'Pegiat Komunitas & Alumnus TFT',
    initials: 'SS',
    color: 'gold',
  },
  {
    quote: 'BMC mengajarkan saya bahwa berkarya bukan soal panggung ketenaran individu, melainkan bagaimana benang potensi saya yang rapuh bisa dirajut bersama teman-teman menjadi jaring pengaman sosial.',
    author: 'Gaby Lombone',
    role: 'Kreator Konten & Koordinator RACIK',
    initials: 'GL',
    color: 'red',
  }
];

const FAQS: FAQItem[] = [
  {
    q: 'Apakah Benang Merah Community terikat dengan organisasi keagamaan atau politik tertentu?',
    a: 'Sama sekali tidak. BMC adalah komunitas inovatif, inklusif, dan non-partisan. Kami berfokus sepenuhnya pada dialog kemanusyaan, pertumbuhan karakter anak muda, serta kolaborasi sosial lintas iman dan latar belakang budaya.'
  },
  {
    q: 'Siapa saja yang boleh bergabung ke dalam komunitas ini?',
    a: 'Siapa pun Anda! Kami menyambut hangat anak muda, mahasiswa, pekerja kreatif, pegiat sosial, akademisi, dan seluruh warga Manado/Sulawesi Utara tanpa memandang agama, kepercayaan, etnis, gender, maupun status sosial.'
  },
  {
    q: 'Apakah ada biaya pendaftaran atau iuran bulanan untuk anggota?',
    a: 'Seluruh kegiatan reguler kami seperti diskusi TENUN dan kelas ANYAMAN bersifat 100% gratis. Komunitas ini didukung secara swadaya oleh para anggota, donatur independen yang selaras dengan nilai kami, serta unit usaha kreatif mandiri.'
  },
  {
    q: 'Bagaimana cara berkontribusi di dalam kepengurusan atau divisi operasional?',
    a: 'Setiap tahun, kami mengadakan program pembinaan fasilitator (TFT). Anggota aktif yang telah mengikuti proses dasar dapat mendaftarkan diri untuk bergabung ke dalam 7 Divisi Kerja (CATAT, CUAN, GERCEP, PELUK, JALIN, RACIK, LENSA).'
  }
];

const PROG_COLOR = {
  red:  { tag: '#CC1111', tagBg: 'rgba(204,17,17,0.10)', border: 'rgba(204,17,17,0.25)', dot: '#CC1111', glow: 'rgba(204,17,17,0.12)', bgGrad: 'linear-gradient(135deg, #1A0505 0%, #0D0505 100%)' },
  gold: { tag: '#D4AF37', tagBg: 'rgba(212,175,55,0.10)', border: 'rgba(212,175,55,0.25)', dot: '#D4AF37', glow: 'rgba(212,175,55,0.08)', bgGrad: 'linear-gradient(135deg, #1A1505 0%, #0D0A05 100%)' },
  rose: { tag: '#FB7185', tagBg: 'rgba(251,113,133,0.10)', border: 'rgba(251,113,133,0.25)', dot: '#FB7185', glow: 'rgba(251,113,133,0.08)', bgGrad: 'linear-gradient(135deg, #1F0D11 0%, #0D0507 100%)' },
};

function ProgramCardImage({ program, isHovered }: { program: ProgramItem; isHovered: boolean }) {
  const [imageError, setImageError] = useState(false);
  const c = PROG_COLOR[program.color];

  return (
    <div style={{
      width: '100%',
      height: '180px',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '20px',
      position: 'relative',
      background: '#090909',
      border: `1px solid ${isHovered ? c.border : 'rgba(255,255,255,0.05)'}`,
      transition: 'border-color 0.4s ease'
    }}>
      {!imageError ? (
        <img
          src={program.imgUrl}
          alt={`Dokumentasi program ${program.name} BMC Manado`}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: c.bgGrad,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10%" x2="100%" y2="90%" stroke={c.tag} strokeWidth="1" />
            <line x1="100%" y1="10%" x2="0" y2="90%" stroke={c.tag} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="30" stroke={c.tag} strokeWidth="1" fill="none" />
          </svg>
          
          <span style={{ fontSize: '24px', filter: 'grayscale(30%)', zIndex: 1 }}>📸</span>
          <div style={{ zIndex: 1 }}>
            <span style={{ 
              display: 'block', 
              fontSize: '10px', 
              fontWeight: 700, 
              color: c.tag, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              Dokumentasi {program.name}
            </span>
            <span style={{ display: 'block', fontSize: '9px', color: '#52525B' }}>
              Simpan file di: public{program.imgUrl}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function InteractiveWeaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const threads = [
      { yOffset: 0.3, speed: 0.008, amplitude: 35, frequency: 0.005, color: 'rgba(204, 17, 17, 0.35)', width: 2 },
      { yOffset: 0.4, speed: 0.012, amplitude: 25, frequency: 0.008, color: 'rgba(212, 175, 55, 0.25)', width: 1.5 },
      { yOffset: 0.5, speed: 0.006, amplitude: 45, frequency: 0.004, color: 'rgba(204, 17, 17, 0.2)', width: 1 },
      { yOffset: 0.6, speed: 0.01, amplitude: 30, frequency: 0.007, color: 'rgba(212, 175, 55, 0.3)', width: 2 },
      { yOffset: 0.7, speed: 0.007, amplitude: 40, frequency: 0.006, color: 'rgba(251, 113, 133, 0.15)', width: 1.2 }
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      t += 0.5;

      threads.forEach((thread) => {
        ctx.beginPath();
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width;

        const baseHeight = height * thread.yOffset;

        for (let x = 0; x < width; x += 4) {
          let y = baseHeight + Math.sin(x * thread.frequency + t * thread.speed) * thread.amplitude;

          if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
            const dx = x - mouse.x;
            const dist = Math.sqrt(dx * dx + (y - mouse.y) * (y - mouse.y));
            if (dist < 180) {
              const pull = (180 - dist) / 180;
              y += (mouse.y - y) * pull * 0.45;
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 1,
      }}
    />
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Divider({ gold = false }: { gold?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: '1px',
        background: gold
          ? 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25) 50%, transparent)'
          : 'rgba(255,255,255,0.05)',
        margin: '0',
      }}
    />
  );
}

function SectionLabel({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: gold ? '#D4AF37' : '#CC1111',
        marginBottom: '14px',
      }}
    >
      {children}
    </span>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageID>('home');
  const [activeSlide, setActiveSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<PageID | null>(null);
  
  const timerRef = useRef<any>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 7000);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    startTimer();
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToSlide = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveSlide(idx);
    startTimer();
  };

  const navigateTo = (page: PageID) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const fadeUp = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <main className="min-h-screen bg-[#060606] text-[#E8E6E0] overflow-hidden relative font-sans selection:bg-[#CC1111] selection:text-white">
      
      <header 
        className="bmc-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: 'rgba(6,6,6,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <button 
          onClick={() => navigateTo('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <OfficialBMCLogo height={48} animated={true} />
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {(['home', 'tentang', 'program', 'daftar', 'kontak', 'saran'] as PageID[]).map((page) => {
            const isActive = currentPage === page;
            const isHovered = hoveredNav === page;
            
            // Perbaikan TypeScript: Memberikan anotasi String agar aman saat runtime NextJS
            const label: string = page === 'saran' ? 'saran & kritik' : page;

            if (page === 'daftar') {
              return (
                <button
                  key={page}
                  onClick={() => navigateTo('daftar')}
                  style={{
                    background: isActive ? '#CC1111' : 'rgba(204, 17, 17, 0.1)',
                    border: '1px solid rgba(204, 17, 17, 0.3)',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '8px 20px',
                    borderRadius: '100px',
                    color: isActive ? '#FFF' : '#CC1111',
                    marginLeft: '12px',
                    marginRight: '8px',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#CC1111';
                    e.currentTarget.style.color = '#FFF';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(204, 17, 17, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(204, 17, 17, 0.1)';
                      e.currentTarget.style.color = '#CC1111';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  Gabung →
                </button>
              );
            }

            return (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                onMouseEnter={() => setHoveredNav(page)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '10px 16px',
                  color: isActive ? '#D4AF37' : isHovered ? '#CC1111' : '#A1A1AA',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative',
                }}
              >
                {label}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '16px',
                      right: '16px',
                      height: '2px',
                      background: '#D4AF37',
                      borderRadius: '100px',
                      boxShadow: '0 0 10px rgba(212,175,55,0.6)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </header>

      <div style={{ height: '70px' }} />

      <div style={{ minHeight: 'calc(100vh - 70px)' }}>
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} goToSlide={goToSlide} activeSlide={activeSlide} mounted={mounted} fadeUp={fadeUp} />}
        {currentPage === 'tentang' && <TentangView navigateTo={navigateTo} fadeUp={fadeUp} />}
        {currentPage === 'program' && <ProgramView navigateTo={navigateTo} fadeUp={fadeUp} />}
        {currentPage === 'daftar' && <DaftarView />}
        {currentPage === 'kontak' && <KontakView />}
        {currentPage === 'saran' && <SaranView />}
      </div>

      <Divider />
      <footer
        style={{
          background: '#040404',
          padding: '64px 24px 48px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <OfficialBMCLogo height={52} animated={true} />
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginTop: '24px',
              marginBottom: '24px',
            }}
          >
            Berdamai &bull; Bertumbuh &bull; Berkarya
          </div>
          <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.8, marginBottom: '32px' }}>
            Benang Merah Community Manado adalah ruang dialog inklusif bagi pemuda Sulawesi Utara untuk merajut persaudaraan sejati, merawat potensi kreasi, dan berkolaborasi menciptakan aksi nyata.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '36px' }}>
            <button 
              onClick={() => navigateTo('tentang')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Tentang Kami
            </button>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <button 
              onClick={() => navigateTo('program')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Program
            </button>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <button 
              onClick={() => navigateTo('saran')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Saran &amp; Kritik
            </button>
            <span style={{ color: 'rgba(255,255,255,0.05)' }}>|</span>
            <button 
              onClick={() => navigateTo('daftar')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Bergabung
            </button>
          </div>
          <p style={{ fontSize: '11px', color: '#3F3F46' }}>
            &copy; {new Date().getFullYear()} Benang Merah Community Manado. Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        @keyframes logoTraceAnimation {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .bmc-logo-trace {
          animation: logoTraceAnimation 4.5s linear infinite;
        }

        header:not(.bmc-header),
        nav:not(.bmc-header nav),
        div[class*="Navbar"],
        div[class*="header"],
        iframe-nav {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          height: 0 !important;
          overflow: hidden !important;
        }

        body {
          margin-top: 0 !important;
        }
      `}</style>
    </main>
  );
}

interface HomeViewProps {
  navigateTo: (page: PageID) => void;
  goToSlide: (idx: number) => void;
  activeSlide: number;
  mounted: boolean;
  fadeUp: (visible: boolean, delay?: number) => React.CSSProperties;
}

function HomeView({ navigateTo, goToSlide, activeSlide, mounted, fadeUp }: HomeViewProps) {
  const { ref: statsRef, visible: statsVisible } = useScrollReveal();
  const { ref: introRef, visible: introVisible } = useScrollReveal();
  const { ref: progTeaserRef, visible: progTeaserVisible } = useScrollReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section aria-label="Halaman Beranda">
      
      <div 
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px 24px',
          overflow: 'hidden'
        }}
      >
        <InteractiveWeaveCanvas />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(900px, 120vw)',
            height: '460px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(204,17,17,0.08) 0%, transparent 70%)',
            filter: 'blur(64px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="max-w-4xl w-full text-center" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'rgba(204,17,17,0.08)',
              border: '1px solid rgba(204,17,17,0.2)',
              marginBottom: '32px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
              pointerEvents: 'auto'
            }}
          >
            <span
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CC1111', animation: 'pulse 2s infinite' }}
              aria-hidden="true"
            />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#CC1111', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              PROSES RAJUT LINTAS IMAN &middot; MANADO, SULUT
            </span>
          </div>

          <div style={{ position: 'relative', minHeight: 'clamp(240px, 45vw, 300px)', marginBottom: '32px' }}>
            {SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlide;
              return (
                <div
                  key={idx}
                  aria-hidden={!isCurrent}
                  style={{
                    position: isCurrent ? 'relative' : 'absolute',
                    inset: 0,
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                    transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: isCurrent ? 'auto' : 'none'
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#D4AF37',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      marginBottom: '18px',
                    }}
                  >
                    {slide.eyebrow}
                  </span>
                  <h1
                    style={{
                      fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      color: '#F5F5F5',
                      fontFamily: 'serif',
                      letterSpacing: '-0.02em',
                      marginBottom: '18px',
                    }}
                  >
                    {slide.title}
                    <br />
                    <span style={{ color: '#CC1111', textShadow: '0 0 30px rgba(204,17,17,0.2)' }}>{slide.highlight}</span>
                  </h1>
                  <p
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
                      color: '#71717A',
                      maxWidth: '640px',
                      margin: '20px auto 0',
                      lineHeight: 1.8,
                    }}
                  >
                    {slide.desc}
                  </p>

                  <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '14px' }}>
                    <button
                      onClick={() => navigateTo(slide.ctaPage)}
                      style={{
                        background: '#CC1111',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '16px 36px',
                        borderRadius: '100px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 0 30px rgba(204,17,17,0.35)',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#AA0A0A';
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(204,17,17,0.5)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#CC1111';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(204,17,17,0.35)';
                      }}
                    >
                      {slide.ctaLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex justify-center items-center gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.6s ease 0.4s',
              pointerEvents: 'auto'
            }}
          >
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                style={{
                  height: '4px',
                  width: idx === activeSlide ? '32px' : '8px',
                  borderRadius: '100px',
                  background: idx === activeSlide ? '#CC1111' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                  padding: 0,
                  boxShadow: idx === activeSlide ? '0 0 10px rgba(204,17,17,0.5)' : 'none',
                }}
              />
            ))}
          </div>

        </div>

        <div 
          style={{ 
            position: 'absolute', 
            bottom: '24px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.5
          }}
        >
          <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Gulir Kebawah</span>
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, #CC1111, transparent)' }} />
        </div>
      </div>

      <Divider />
      <div
        ref={statsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#060606',
              padding: '40px 24px',
              textAlign: 'center',
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`
            }}
          >
            <div
              style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#F5F5F5',
                fontFamily: 'serif',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              {s.value.includes('∞') ? (
                <span style={{ color: '#CC1111' }}>∞</span>
              ) : (
                <>
                  <span style={{ color: '#F5F5F5' }}>{s.value.replace('+', '')}</span>
                  {s.value.includes('+') && <span style={{ color: '#CC1111' }}>+</span>}
                </>
              )}
            </div>
            <div style={{ fontSize: '10px', color: '#52525B', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <Divider />

      <section
        ref={introRef}
        style={{
          padding: '96px 24px',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Siapa Kami?</SectionLabel>
            <h2
              style={{
                ...fadeUp(introVisible, 80),
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#F5F5F5',
                fontFamily: 'serif',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                marginBottom: '24px',
              }}
            >
              Komunitas yang Merajut <br />
              <span style={{ color: '#CC1111' }}>Persaudaraan Lintas Batas</span>
            </h2>
            <p style={{ ...fadeUp(introVisible, 160), fontSize: '14px', color: '#A1A1AA', lineHeight: 1.85, marginBottom: '20px' }}>
              Benang Merah Community lahir dari sebuah kepedulian tulus di Manado: bahwa di tengah dunia yang terpolarisasi, persaudaraan sejati bukan didapat dengan menghapus perbedaan, melainkan dengan <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>merajutnya</strong>.
            </p>
            <p style={{ ...fadeUp(introVisible, 240), fontSize: '14px', color: '#71717A', lineHeight: 1.8, marginBottom: '32px' }}>
              Kami memfasilitasi ruang dialog sehat tanpa sekat dogma dan kecurigaan. Kami percaya bahwa lewat perjumpaan, kita bisa berdamai secara utuh, bertumbuh secara sadar, dan berkarya secara konsisten.
            </p>
            <div style={{ ...fadeUp(introVisible, 320) }}>
              <button
                onClick={() => navigateTo('tentang')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#D4AF37',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(212,175,55,0.3)',
                  paddingBottom: '4px',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
              >
                Pelajari Filosofi &amp; Visi Kami &rarr;
              </button>
            </div>
          </div>

          <div 
            style={{ 
              ...fadeUp(introVisible, 200),
              background: 'linear-gradient(135deg, #0D0D0D 0%, #121212 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '36px',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '32px', opacity: 0.1, fontFamily: 'serif' }}>∞</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F5', marginBottom: '20px', fontFamily: 'serif' }}>Tiga pilar Perjalanan</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px', listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>☮️</span>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#CC1111', letterSpacing: '0.08em' }}>BERDAMAI (Visi)</h4>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.6 }}>Pemulihan relasi secara utuh dan tulus dengan Tuhan, diri sendiri, sesama, dan alam semesta.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>🌱</span>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em' }}>BERTUMBUH (Misi)</h4>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.6 }}>Menumbuhkan kedewasaan berpikir kritis, kematangan emosi, dan mengenali potensi diri.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>✨</span>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FB7185', letterSpacing: '0.08em' }}>BERKARYA (Aksi)</h4>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.6 }}>Meluapkan hasil pertumbuhan ke dalam kreasi nyata yang bertanggung jawab bagi publik.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Divider />
      <section
        ref={progTeaserRef}
        style={{
          padding: '96px 24px',
          background: 'rgba(255,255,255,0.01)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <SectionLabel gold>Program Utama Kami</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>
              Kegiatan Merajut Kebersamaan
            </h2>
            <p style={{ fontSize: '14px', color: '#71717A', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Setiap program kerja kami dirancang secara sadar untuk menstimulasi dialog cerdas, kepekaan sosial, dan ekspresi seni pemuda Sulawesi Utara.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {PROGRAMS.slice(0, 3).map((p, i) => {
              const c = PROG_COLOR[p.color];
              const [hovered, setHovered] = useState(false);
              return (
                <article
                  key={p.code}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    background: '#0D0D0D',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '32px',
                    opacity: progTeaserVisible ? 1 : 0,
                    transform: progTeaserVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
                    position: 'relative',
                  }}
                >
                  <ProgramCardImage program={p} isHovered={hovered} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: c.tag, letterSpacing: '0.12em' }}>{p.focus}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, background: c.tagBg, border: `1px solid ${c.border}`, padding: '4px 10px', borderRadius: '100px', color: c.tag }}>{p.freq}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'serif', marginBottom: '12px' }}>{p.name}</h3>
                  <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7, marginBottom: '24px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#D4AF37' }}>Jadwal:</span>
                    <span style={{ fontSize: '11px', color: '#A1A1AA' }}>{p.schedule}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => navigateTo('program')}
              style={{
                background: 'none',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
                padding: '14px 32px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'}
            >
              Lihat Seluruh Detail Program →
            </button>
          </div>
        </div>
      </section>

      <Divider />
      <section style={{ padding: '96px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>Suara Dari Anggota</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '40px' }}>
            Suara Pertumbuhan Bersama
          </h2>

          <div style={{ position: 'relative', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {TESTIMONIALS.map((t, idx) => {
              const isCurrent = idx === activeTestimonial;
              return (
                <div
                  key={idx}
                  style={{
                    position: isCurrent ? 'relative' : 'absolute',
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: isCurrent ? 'auto' : 'none'
                  }}
                >
                  <blockquote style={{ fontSize: '18px', fontStyle: 'italic', color: '#D4AF37', lineHeight: 1.8, marginBottom: '24px', fontFamily: 'serif' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color === 'red' ? 'rgba(204,17,17,0.15)' : 'rgba(212,175,55,0.15)', color: t.color === 'red' ? '#CC1111' : '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                      {t.initials}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8E6E0' }}>{t.author}</div>
                      <div style={{ fontSize: '11px', color: '#52525B' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '32px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i === activeTestimonial ? '#CC1111' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Divider />
      <section
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(204,17,17,0.04) 50%, transparent)',
          padding: '96px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SectionLabel>Mari Bertumbuh</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>
            Siap Merajut Helai Benang Anda?
          </h2>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.8, marginBottom: '40px' }}>
            Kami selalu menyediakan tempat duduk ekstra dan cangkir kopi hangat bagi siapa pun yang bersedia berdialog secara asertif di Manado.
          </p>
          <button
            onClick={() => navigateTo('daftar')}
            style={{
              background: '#CC1111',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '16px 44px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(204,17,17,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#AA0A0A';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(204,17,17,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#CC1111';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(204,17,17,0.3)';
            }}
          >
            Isi Formulir Bergabung &rarr;
          </button>
        </div>
      </section>
    </section>
  );
}

function TentangView({ navigateTo, fadeUp }: TentangViewProps) {
  const { ref: storyRef, visible: storyVisible } = useScrollReveal();
  const { ref: friendRef, visible: friendVisible } = useScrollReveal();
  const { ref: structureRef, visible: structureVisible } = useScrollReveal();
  const [selectedTeam, setSelectedTeam] = useState<TeamItem | null>(null);

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Tentang Kami">
      
      <div ref={storyRef} style={{ marginBottom: '88px' }}>
        <SectionLabel>Kisah Kami</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '24px', lineHeight: 1.15 }}>
          Sejarah &amp; Impian <br />
          <span style={{ color: '#CC1111' }}>Benang Merah Community</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.85 }}>
            <p style={{ marginBottom: '20px' }}>
              Benang Merah lahir dari kesadaran pahit bahwa banyak permasalahan sosial berawal dari <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>relasi yang rusak</strong>. Hubungan manusia yang terpecah karena dogma keras, kesalahpahaman latar belakang suku/agama, dan minimnya ruang dialog sehat bagi pemuda.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Diinisiasi di Manado, Sulawesi Utara, kami mengadopsi metafora <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>Tenun dan Rajut</strong>. Setiap manusia diibaratkan satu helai benang yang rapuh dan tak berbentuk jika sendirian. Namun, jika benang-benang itu dikumpulkan, dirawat, dan dirajut dalam proses yang sabar, maka akan melahirkan karya anyaman persaudaraan yang luar biasa indah.
            </p>
          </div>
          <div style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '20px' }}>
              Kami tidak berambisi menyeragamkan warna helai benang. Warna merah, emas, hitam, dan putih harus tetap dipertahankan sebagai keunikan fitrah individu. Yang kami upayakan adalah merajut agar mereka saling bertemu, bersilangan secara harmonis, dan saling menguatkan struktur sosial kemasyarakatan.
            </p>
            <p style={{ fontStyle: 'italic', borderLeft: '3px solid #CC1111', paddingLeft: '16px', color: '#D4AF37' }}>
              &ldquo;Berdamai bukan berarti kehilangan jati diri pribadi. Berdamai adalah merayakan jati diri Anda, sembari menaruh rasa hormat yang mutlak bagi jati diri sesama manusia.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <Divider gold />

      <div style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <SectionLabel gold>Filosofi Identitas Visual</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>
            Simbol Rajutan Makna Resmi
          </h2>
          <p style={{ fontSize: '14px', color: '#71717A', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Logo resmi <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>BMC Manado</strong> (seperti yang terlihat pada berkas <span style={{ fontStyle: 'italic' }}>LOGO 2.jpeg</span>) kini telah ditingkatkan dengan penyelarasan geometris presisi dan animasi <span style={{ fontStyle: 'italic' }}>glow tracing</span> yang mengalir menyusuri kelokan benang merah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div style={{ 
            background: 'radial-gradient(circle at center, #121212 0%, #080808 100%)',
            border: '1px solid rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '48px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '320px',
            position: 'relative',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '9px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em' }}>OFFICIAL VERIFIED</div>
            <OfficialBMCLogo height={96} animated={true} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#E8E6E0', marginBottom: '8px' }}>
                Huruf B &amp; C (Berdamai &amp; Berkarya)
              </h4>
              <p style={{ fontSize: '12.5px', color: '#71717A', lineHeight: 1.6 }}>
                Dicetak dengan huruf sans-serif putih solid, bersih, dan kokoh. Melambangkan fondasi yang kuat, kesucian niat, dan keterbukaan tanpa kompromi untuk merangkul segala golongan pemuda di Sulawesi Utara.
              </p>
            </div>

            <div style={{ background: '#0D0D0D', border: '1px solid rgba(204,17,17,0.15)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#CC1111', marginBottom: '8px' }}>
                Pita Infinity Merah "M" (Bertumbuh)
              </h4>
              <p style={{ fontSize: '12.5px', color: '#71717A', lineHeight: 1.6 }}>
                Simbol utama pergerakan kami yang membentuk huruf "M" sekaligus simpul tak terhingga ($\infty$). Kini dilengkapi dengan jalur cahaya mengalir yang berpulsasi lembut, merepresentasikan rajutan relasi kemanusiaan yang senantiasa dinamis dan berkesinambungan.
              </p>
            </div>

            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '8px' }}>
                Symmetry &amp; Subtitle Alignment
              </h4>
              <p style={{ fontSize: '12.5px', color: '#71717A', lineHeight: 1.6 }}>
                Kalibrasi visual menjamin jarak antara huruf B-M dan M-C sejajar seimbang 30 piksel. Teks sub-judul dibingkai presisi di bagian bawah sehingga menyatu sempurna dengan lebar logo, menciptakan stabilitas visual yang solid.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Divider />

      <div style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel>Tiga Pilar Perjalanan</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif' }}>Filosofi Gerakan Kami</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.03)', borderTop: '4px solid #CC1111', padding: '36px', borderRadius: '16px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>☮️</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'serif', color: '#CC1111', marginBottom: '12px' }}>1. BERDAMAI</h3>
            <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7 }}>
              Ini adalah hulu dari segala proses. Pemulihan relasi secara komprehensif. Pertama, berdamai dengan Sang Pencipta. Kedua, berdamai dengan diri sendiri (menyelesaikan kecemasan, dendam, dan ego internal). Ketiga, berdamai dengan sesama (mengakui hak hidup perbedaan), dan berdamai dengan alam ekologi.
            </p>
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.03)', borderTop: '4px solid #D4AF37', padding: '36px', borderRadius: '16px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>🌱</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '12px' }}>2. BERTUMBUH</h3>
            <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7 }}>
              Berdamai yang pasif tidak akan membawa perubahan. Kita dituntut untuk bertumbuh. Kami merawat iman yang dewasa secara intelektual, mengasah kemampuan berpikir logis dan kritis, membangun komunikasi asertif bebas amarah, serta memupuk kematangan karakter agar menjadi pribadi yang berdaya guna.
            </p>
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.03)', borderTop: '4px solid #FB7185', padding: '36px', borderRadius: '16px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>✨</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'serif', color: '#FB7185', marginBottom: '12px' }}>3. BERKARYA</h3>
            <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7 }}>
              Ini adalah muara dari kedewasaan diri. Buah nyata dari sebuah pertumbuhan karakter. Karya adalah dedikasi produktif, bentuk nyata dari kecintaan kita kepada sesama manusia. Hasil karya dapat diwujudkan dalam tulisan, musik, festival kebudayaan, aksi kerelawanan sosial, dan advokasi kemanusiaan.
            </p>
          </div>
        </div>
      </div>

      <Divider />

      <div ref={friendRef} style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel gold>Nilai Inti Komunitas</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>F.R.I.E.N.D</h2>
          <p style={{ fontSize: '14px', color: '#71717A', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Enam pilar sikap dasar yang melandasi setiap gerak langkah relasi internal dan publik di Benang Merah Community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {FRIEND_VALUES.map((f, i) => (
            <div
              key={f.letter}
              style={{
                background: '#0D0D0D',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '16px',
                padding: '28px',
                opacity: friendVisible ? 1 : 0,
                transform: friendVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`
              }}
            >
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#CC1111', fontFamily: 'serif', lineHeight: 1, marginBottom: '12px' }}>{f.letter}</div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{f.word}</h3>
              <div style={{ fontSize: '11px', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{f.sub}</div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />
              <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider gold />

      <div ref={structureRef} style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel>Sistem Tata Kelola</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>
            Tim Operasional Penggerak
          </h2>
          <p style={{ fontSize: '14px', color: '#71717A', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Komunitas dikendalikan secara transparan oleh anak muda melalui 7 Divisi Kerja yang terintegrasi saling melengkapi. **Klik tombol tim untuk membaca deskripsi tugas.**
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(204,17,17,0.04)', border: '1px solid rgba(204,17,17,0.2)', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#CC1111', letterSpacing: '0.12em', display: 'block', marginBottom: '4px' }}>KOMPAS UTAMA</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F5F5F5' }}>Dewan Pembina &amp; Ketua Tim Inti</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {TEAMS.map((t, i) => {
                const isSelected = selectedTeam?.abbr === t.abbr;
                return (
                  <button
                    key={t.abbr}
                    onClick={() => setSelectedTeam(t)}
                    style={{
                      background: isSelected ? '#CC1111' : '#0D0D0D',
                      border: `1px solid ${isSelected ? '#CC1111' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '12px',
                      padding: '16px 12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      opacity: structureVisible ? 1 : 0,
                      transform: structureVisible ? 'translateY(0)' : 'translateY(16px)',
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#FFF' : '#CC1111', display: 'block', letterSpacing: '0.08em' }}>{t.abbr}</span>
                    <span style={{ fontSize: '9px', color: isSelected ? 'rgba(255,255,255,0.7)' : '#52525B', textTransform: 'uppercase', letterSpacing: '0.02em', display: 'block', marginTop: '4px' }}>{t.fullName.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '340px' }}>
            {selectedTeam ? (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#CC1111', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }}>DIVISI: {selectedTeam.abbr}</span>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#F5F5F5', fontFamily: 'serif', marginBottom: '4px' }}>{selectedTeam.fullName}</h3>
                <p style={{ fontSize: '12px', color: '#D4AF37', fontStyle: 'italic', marginBottom: '20px' }}>&ldquo;{selectedTeam.tagline}&rdquo;</p>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '20px' }} />
                <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.7, marginBottom: '20px' }}>{selectedTeam.identity}</p>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#E8E6E0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Tugas Pokok Divisi:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0 }}>
                  {selectedTeam.responsibilities.map((r, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px', color: '#71717A', lineHeight: 1.6 }}>
                      <span style={{ color: '#CC1111', marginTop: '2px' }}>✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#52525B', margin: 'auto 0' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>💡</span>
                <p style={{ fontSize: '13px' }}>Silakan pilih salah satu Divisi di sebelah kiri untuk melihat detail tugas operasional, kontribusi, dan perannya dalam merajut BMC Manado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}

function ProgramView({ navigateTo, fadeUp }: ProgramViewProps) {
  const [filterType, setFilterType] = useState<'SEMUA' | 'MINGGUAN' | 'TAHUNAN'>('SEMUA');
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (filterType === 'SEMUA') return true;
    return p.freq === filterType;
  });

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Program Kerja">
      
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <SectionLabel>Kurikulum Komunitas</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '16px' }}>
          Program Kerja <span style={{ color: '#CC1111' }}>BMC</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#71717A', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          Setiap aktivitas kami susun secara konsisten untuk merawat karakter kritis, melatih empati, dan mengasah daya ekspresi pemuda.
        </p>

        <div style={{ display: 'inline-flex', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '100px', marginTop: '36px' }}>
          {(['SEMUA', 'MINGGUAN', 'TAHUNAN'] as const).map((type) => {
            const isActive = filterType === type;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  background: isActive ? '#CC1111' : 'transparent',
                  color: isActive ? '#FFF' : '#A1A1AA',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '8px 24px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '64px' }}>
        {filteredPrograms.map((p, i) => {
          const c = PROG_COLOR[p.color];
          const [hovered, setHovered] = useState(false);

          return (
            <article
              key={p.code}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: '#0D0D0D',
                border: hovered ? `1px solid ${c.border}` : '1px solid rgba(255,255,255,0.04)',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                animation: 'fadeIn 0.6s',
                transition: 'border-color 0.4s ease'
              }}
            >
              <div>
                <ProgramCardImage program={p} isHovered={hovered} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: c.tag, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.focus}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, background: c.tagBg, border: `1px solid ${c.border}`, padding: '4px 10px', borderRadius: '100px', color: c.tag }}>{p.freq}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#F5F5F5', marginBottom: '12px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.7, marginBottom: '24px' }}>{p.desc}</p>
              </div>

              <div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '10px', fontWeight: 700, color: '#E8E6E0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Rencana Kegiatan Inti:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                  {p.activities.map((act, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#A1A1AA', lineHeight: 1.6 }}>
                      <span style={{ color: c.tag }}>✦</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                  <span style={{ color: '#52525B' }}>Waktu Pelaksanaan:</span>
                  <span style={{ color: '#D4AF37', fontWeight: 600 }}>{p.schedule}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}

function DaftarView() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telp: '',
    asal: '',
    kesibukan: '',
    alasan: '',
    komitmen: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.nama || !formData.email || !formData.telp)) {
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.komitmen) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section style={{ padding: '64px 24px', maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Formulir Bergabung">
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <SectionLabel>Komitmen Bersama</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '12px' }}>
          Formulir <span style={{ color: '#CC1111' }}>Bergabung</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.7 }}>
          Proses pendaftaran anggota Benang Merah Community Manado. Isi formulir dengan jujur dan tulus.
        </p>
      </div>

      <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '36px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0', animation: 'fadeIn 0.6s' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>🎉</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '12px' }}>Selamat Bergabung!</h3>
            <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.8, marginBottom: '24px' }}>
              Data pendaftaran atas nama **{formData.nama}** telah kami terima secara aman di dalam sistem arsip. Fasilitator dari Tim **PELUK** akan menghubungi Anda via WhatsApp ({formData.telp}) dalam waktu maksimal 2x24 jam untuk mengirimkan undangan perjumpaan perdana.
            </p>
            <div style={{ background: 'rgba(204,17,17,0.05)', border: '1px solid rgba(204,17,17,0.15)', padding: '16px', borderRadius: '12px', fontSize: '12px', color: '#A1A1AA', lineHeight: 1.6 }}>
              Sampai bertemu di sesi **TENUN** minggu depan! Persiapkan diri Anda untuk perjumpaan dan dialog yang hangat.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', left: '10%', right: '10%', height: '1px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 1 ? '#CC1111' : '#0D0D0D', border: `1px solid ${step >= 1 ? '#CC1111' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#FFF' }}>1</span>
                <span style={{ fontSize: '9px', color: step >= 1 ? '#E8E6E0' : '#52525B', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '8px' }}>Identitas</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 2 ? '#CC1111' : '#060606', border: `1px solid ${step >= 2 ? '#CC1111' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: step >= 2 ? '#FFF' : '#52525B' }}>2</span>
                <span style={{ fontSize: '9px', color: step >= 2 ? '#E8E6E0' : '#52525B', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '8px' }}>Eksplorasi</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 3 ? '#CC1111' : '#060606', border: `1px solid ${step >= 3 ? '#CC1111' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: step >= 3 ? '#FFF' : '#52525B' }}>3</span>
                <span style={{ fontSize: '9px', color: step >= 3 ? '#E8E6E0' : '#52525B', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '8px' }}>Komitmen</span>
              </div>
            </div>

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.4s' }}>
                <div>
                  <label htmlFor="nama" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Nama Lengkap</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rionaldo Lombone"
                    required
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@email.com"
                    required
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="telp" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Nomor WhatsApp</label>
                  <input
                    type="tel"
                    id="telp"
                    name="telp"
                    value={formData.telp}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081234567890"
                    required
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.nama || !formData.email || !formData.telp}
                    style={{ 
                      background: '#CC1111', 
                      color: '#FFF', 
                      border: 'none', 
                      borderRadius: '100px', 
                      padding: '14px 32px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase', 
                      cursor: 'pointer',
                      opacity: (!formData.nama || !formData.email || !formData.telp) ? 0.5 : 1
                    }}
                  >
                    Selanjutnya &rarr;
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.4s' }}>
                <div>
                  <label htmlFor="asal" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Asal / Domisili di Sulawesi Utara</label>
                  <input
                    type="text"
                    id="asal"
                    name="asal"
                    value={formData.asal}
                    onChange={handleInputChange}
                    placeholder="Contoh: Tikala, Manado / Kakaskasen, Tomohon"
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="kesibukan" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Kesibukan Saat Ini</label>
                  <input
                    type="text"
                    id="kesibukan"
                    name="kesibukan"
                    value={formData.kesibukan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Mahasiswa Unsrat / Pekerja Kreatif Lepas"
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="alasan" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Mengapa Tertarik Bergabung di BMC?</label>
                  <textarea
                    id="alasan"
                    name="alasan"
                    value={formData.alasan}
                    onChange={handleInputChange}
                    placeholder="Bagikan pemikiran, keresahan, atau apa yang ingin Anda eksplorasi bersama kami..."
                    rows={4}
                    style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    style={{ background: 'transparent', color: '#A1A1AA', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '14px 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    &larr; Kembali
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{ background: '#CC1111', color: '#FFF', border: 'none', borderRadius: '100px', padding: '14px 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Selanjutnya &rarr;
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s' }}>
                <div style={{ background: 'rgba(204,17,17,0.03)', border: '1px solid rgba(204,17,17,0.15)', padding: '24px', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#CC1111', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Piagam Komitmen Anggota</h4>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.7, marginBottom: '10px' }}>
                    1. **Saling Menghargai Ruang Aman:** Berkomitmen menjaga relasi yang tulus, tidak memaksakan dogma, dan tidak menghakimi latar belakang anggota lain.
                  </p>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.7, marginBottom: '10px' }}>
                    2. **Kehadiran Aktif:** Berusaha meluangkan waktu secara tulus untuk hadir di dalam diskusi bulanan (TENUN/ANYAMAN) demi kelangsungan relasi komunitas.
                  </p>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.7 }}>
                    3. **Kolaborasi Kreatif:** Siap bahu-membahu dalam merajut karya nyata demi perdamaian yang inklusif di Sulawesi Utara.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox"
                    id="komitmen"
                    name="komitmen"
                    checked={formData.komitmen}
                    onChange={handleCheckboxChange}
                    style={{ marginTop: '3px', cursor: 'pointer' }}
                    required
                  />
                  <label htmlFor="komitmen" style={{ fontSize: '12px', color: '#A1A1AA', lineHeight: 1.6, cursor: 'pointer' }}>
                    Saya memahami dan dengan tulus menyetujui seluruh Piagam Komitmen Anggota Benang Merah Community Manado demi menjaga kualitas ruang aman bersama.
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    style={{ background: 'transparent', color: '#A1A1AA', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '14px 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    &larr; Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.komitmen}
                    style={{ 
                      background: '#CC1111', 
                      color: '#FFF', 
                      border: 'none', 
                      borderRadius: '100px', 
                      padding: '14px 32px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase', 
                      cursor: 'pointer', 
                      boxShadow: '0 0 20px rgba(204,17,17,0.3)',
                      opacity: !formData.komitmen ? 0.5 : 1
                    }}
                  >
                    Kirim Pendaftaran ✓
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function KontakView() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [msgData, setMsgData] = useState({ nama: '', pesan: '' });

  const toggleFAQ = (idx: number) => {
    setExpandedFAQ(prev => (prev === idx ? null : idx));
  };

  const handleMsgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgData.nama || !msgData.pesan) return;
    setMessageSubmitted(true);
  };

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Hubungi Kami">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div>
          <SectionLabel>Teras Komunitas</SectionLabel>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '20px', lineHeight: 1.15 }}>
            Pintu Kontak <br />
            <span style={{ color: '#CC1111' }}>Selalu Terbuka</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.8, marginBottom: '36px' }}>
            Apakah Anda memiliki pertanyaan administratif, tawaran kolaborasi, atau sekadar ingin menyapa? Kami dengan senang hati akan merespons pesan Anda.
          </p>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            {messageSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0', animation: 'fadeIn 0.5s' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>✉️</span>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#D4AF37', marginBottom: '8px' }}>Pesan Terkirim!</h4>
                <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.6 }}>
                  Terima kasih, **{msgData.nama}**. Kami telah mencatat pesan Anda dan tim **JALIN** akan segera membalasnya sesegera mungkin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMsgSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label htmlFor="msg-nama" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Nama Lengkap / Komunitas</label>
                    <input
                      type="text"
                      id="msg-nama"
                      value={msgData.nama}
                      onChange={e => setMsgData(prev => ({ ...prev, nama: e.target.value }))}
                      placeholder="Contoh: Rionaldo Lombone"
                      required
                      style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="msg-text" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Pesan Anda</label>
                    <textarea
                      id="msg-text"
                      value={msgData.pesan}
                      onChange={e => setMsgData(prev => ({ ...prev, pesan: e.target.value }))}
                      placeholder="Tuliskan pesan Anda secara lengkap di sini..."
                      rows={4}
                      required
                      style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', color: '#FFF', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ width: '100%', background: '#CC1111', color: '#FFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 15px rgba(204,17,17,0.2)' }}
                  >
                    Kirim Pesan &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '12px', color: '#A1A1AA' }}>
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
                <div
                  key={i}
                  style={{
                    background: '#0D0D0D',
                    border: `1px solid ${isExpanded ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.04)'}`,
                    borderRadius: '12px',
                    padding: '20px 24px',
                    transition: 'all 0.35s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: isExpanded ? '#D4AF37' : '#E8E6E0', lineHeight: 1.4, transition: 'color 0.3s' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: isExpanded ? '#D4AF37' : '#52525B', transition: 'all 0.3s' }}>{isExpanded ? '−' : '+'}</span>
                  </button>

                  <div
                    style={{
                      maxHeight: isExpanded ? '200px' : '0',
                      opacity: isExpanded ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      fontSize: '13px',
                      color: '#71717A',
                      lineHeight: 1.7,
                      marginTop: isExpanded ? '14px' : '0'
                    }}
                  >
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

function SaranView() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kegiatan / Diskusi');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kontak: '',
    isi: ''
  });

  const categories = [
    'Kegiatan / Diskusi',
    'Kenyamanan Ruang Aman',
    'Fasilitator & Pengurus',
    'Administrasi / CATAT',
    'Usulan Ide Baru',
    'Lainnya'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isi.trim()) return;
    setSubmitted(true);
  };

  return (
    <section style={{ padding: '64px 24px', maxWidth: '750px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Kotak Saran dan Kritik">
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <SectionLabel>Tindakan Evaluasi</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '12px' }}>
          Kotak <span style={{ color: '#CC1111' }}>Saran &amp; Kritik</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
          Suara Anda adalah rajutan benang berharga untuk menyempurnakan langkah kami. Sampaikan kritik, evaluasi, atau gagasan inovatif demi kemajuan ruang aman bersama.
        </p>
      </div>

      <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', padding: '40px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0', animation: 'fadeIn 0.6s' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>📥</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '12px' }}>
              Masukan Diterima dengan Hangat!
            </h3>
            <p style={{ fontSize: '13.5px', color: '#A1A1AA', lineHeight: 1.8, marginBottom: '24px', maxWidth: '550px', margin: '0 auto 24px' }}>
              Terima kasih telah meluangkan waktu berharga Anda untuk menulis saran ini. Masukan Anda mengenai kategori **{selectedCategory}** {isAnonymous ? 'yang dikirim secara Anonim ' : ''}telah diarsip dengan aman di dalam sistem kami.
            </p>
            <div style={{ background: 'rgba(204,17,17,0.03)', border: '1px solid rgba(204,17,17,0.15)', padding: '20px', borderRadius: '12px', fontSize: '12.5px', color: '#71717A', lineHeight: 1.7, textAlign: 'left', marginBottom: '32px' }}>
              <strong style={{ color: '#CC1111', display: 'block', marginBottom: '6px' }}>Alur Evaluasi Internal:</strong>
              Setiap masukan yang masuk akan disortir dan ditranskrip langsung oleh **Tim CATAT (Catatan Administrasi)** tanpa mengubah esensi aslinya. Masukan tersebut kemudian akan dibawa langsung ke meja rapat bulanan bersama Koordinator Inti dan Dewan Pembina untuk dicarikan solusi konkret serta perbaikan sistemik.
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ nama: '', kontak: '', isi: '' });
                setIsAnonymous(false);
              }}
              style={{
                background: 'none',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
                padding: '12px 28px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'}
            >
              Kirim Saran Lain &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Kategori Masukan
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          background: isSelected ? 'rgba(204,17,17,0.15)' : 'transparent',
                          border: `1px solid ${isSelected ? '#CC1111' : 'rgba(255,255,255,0.06)'}`,
                          borderRadius: '100px',
                          padding: '8px 16px',
                          color: isSelected ? '#CC1111' : '#71717A',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Informasi Pengirim
                  </span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11px', color: '#D4AF37' }}>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    Kirim secara Anonim (Rahasia)
                  </label>
                </div>

                {!isAnonymous ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ animation: 'fadeIn 0.3s' }}>
                    <div>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Nama Lengkap / Inisial"
                        style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="kontak"
                        value={formData.kontak}
                        onChange={handleInputChange}
                        placeholder="WhatsApp / Email (Opsional)"
                        style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#FFF', outline: 'none' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', color: '#52525B', fontStyle: 'italic', animation: 'fadeIn 0.3s' }}>
                    Identitas Anda disembunyikan sepenuhnya. Komunitas menghargai kenyamanan dan hak privasi Anda dalam memberikan kritik yang jujur.
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="isi" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Isi Saran, Kritik &amp; Evaluasi *
                </label>
                <textarea
                  id="isi"
                  name="isi"
                  value={formData.isi}
                  onChange={handleInputChange}
                  placeholder="Utarakan evaluasi, kritik tajam, atau ide terobosan Anda demi kebaikan ruang dialog kita bersama..."
                  rows={6}
                  required
                  style={{ width: '100%', background: '#060606', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#FFF', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <button
                type="submit"
                disabled={!formData.isi.trim()}
                style={{
                  background: '#CC1111',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(204,17,17,0.3)',
                  transition: 'all 0.3s ease',
                  opacity: !formData.isi.trim() ? 0.5 : 1
                }}
                onMouseEnter={e => {
                  if (formData.isi.trim()) {
                    e.currentTarget.style.background = '#AA0A0A';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(204,17,17,0.45)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#CC1111';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(204,17,17,0.3)';
                }}
              >
                Kirim Masukan ke Evaluasi Tim &rarr;
              </button>

            </div>
          </form>
        )}
      </div>

    </section>
  );
}