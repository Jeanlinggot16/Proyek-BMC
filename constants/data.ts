// constants/data.ts
import { CSSProperties } from 'react';

/* ─── TYPES & INTERFACES ─── */
export type PageID = 'home' | 'tentang' | 'program' | 'daftar' | 'kontak' | 'saran';

export interface Slide {
  eyebrow: string;
  title: string;
  highlight: string;
  desc: string;
  ctaPage: PageID;
  ctaLabel: string;
}

export interface ProgramItem {
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

export interface TeamItem {
  abbr: string;
  fullName: string;
  tagline: string;
  identity: string;
  responsibilities: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  color: 'red' | 'gold';
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TentangViewProps {
  fadeUp: (visible: boolean, delay?: number) => CSSProperties;
}

export interface ProgramViewProps {
  fadeUp: (visible: boolean, delay?: number) => CSSProperties;
}

export interface HomeViewProps {
  goToSlide: (idx: number) => void;
  activeSlide: number;
  mounted: boolean;
  fadeUp: (visible: boolean, delay?: number) => CSSProperties;
}

/* ─── DATA CONSTANTS ─── */
export const SLIDES: Slide[] = [
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

export const STATS = [
  { value: '5+', label: 'Program Aktif' },
  { value: '7', label: 'Divisi Inti' },
  { value: '∞', label: 'Proses Rajut' },
  { value: '3', label: 'Pilar Utama' },
];

export const FRIEND_VALUES = [
  { letter: 'F', word: 'Friendly', sub: 'Ramah & Terbuka', desc: 'Setiap orang disambut sebagai manusia, bukan dinilai dari atribut atau latar belakangnya. Kehangatan adalah pintu masuk utama komunitas ini.' },
  { letter: 'R', word: 'Ruang Aman', sub: 'Bebas Rasa Takut', desc: 'Setiap orang berhak merasa diterima, didengar, dan dihormati tanpa tekanan dogma atau penghakiman. BMC adalah tempat bicara yang jujur.' },
  { letter: 'I', word: 'Intimate', sub: 'Relasi yang Tulus', desc: 'Bukan sekadar relasi sosial yang dangkal, tetapi proses saling mengenal secara mendalam, saling menjaga, dan menumbuhkan persaudaraan sejati.' },
  { letter: 'E', word: 'Enjoyable', sub: 'Penuh Sukacita', desc: 'Proses bertumbuh dan berkarya dijalani dengan riang gembira dan antusiasme tinggi. Komunitas ini hangat, menyegarkan, dan menghidupkan.' },
  { letter: 'N', word: 'Nusantara', sub: 'Menghargai Keberagaman', desc: 'Iman, budaya, suku, dan latar belakang dipandang sebagai kekayaan warna benang. Perbedaan adalah ruang belajar bersama, bukan ancaman.' },
  { letter: 'D', word: 'Daya Cipta', sub: 'Kreatif & Berdampak', desc: 'Setiap anggota didorong untuk melahirkan karya kreatif dan memberi kontribusi konkret bagi sekelilingnya. Ide dirawat hingga menjadi buah aksi.' },
];

export const PROGRAMS: ProgramItem[] = [
  { code: 'TENUN', name: 'TENUN', freq: 'MINGGUAN', schedule: 'Sabtu, Minggu ke-2 setiap bulan', focus: 'Diskusi Lintas Iman & Isu Sosial', desc: 'Menyatukan benang-benang pemikiran yang berbeda menjadi satu kain pemahaman utuh — dialog sehat yang membedah buku, film, dan diskursus sosial kontemporer.', color: 'red', activities: ['Bedah literatur & isu hangat', 'Dialog lintas iman & worldview', 'Sesi tanya pakar & tokoh inspiratif'], imgUrl: '/tenun.jpg' },
  { code: 'ANYAMAN', name: 'ANYAMAN', freq: 'MINGGUAN', schedule: 'Sabtu, Minggu ke-4 setiap bulan', focus: 'Eksplorasi Seni & Potensi Kreatif', desc: 'Merawat dan merangkai serat potensi individu secara sadar dan konsisten. Wadah ekspresi seni, penulisan, musik, hingga pengembangan soft skills pemuda.', color: 'gold', activities: ['Workshop penulisan kreatif & musik', 'Sesi public speaking & storytelling', 'Pameran karya seni alternatif mandiri'], imgUrl: '/anyaman.JPG' },
  { code: 'RAJUT', name: 'RAJUT', freq: 'TAHUNAN', schedule: 'Agenda Festival Tahunan', focus: 'Karya Kolektif & Panggung Publik', desc: 'Karya besar berskala luas hasil kolaborasi seluruh elemen komunitas. Menghadirkan festival seni, pameran budaya, dan ruang kolaboratif di Manado.', color: 'rose', activities: ['Pementasan seni kolaboratif multi-genre', 'Eksibisi anyaman karya anggota', 'Kolaborasi UMKM & komunitas lokal'], imgUrl: '/rajut.jpeg' },
  { code: 'Peace-Camp', name: 'Peace Camp', freq: 'TAHUNAN', schedule: 'Program Pembinaan Intensif', focus: 'Kaderisasi & Fasilitator Kelompok', desc: 'Program regenerasi dan peningkatan kapasitas untuk mencetak fasilitator handal yang mampu merawat ruang aman serta nilai-nilai dasar BMC.', color: 'red', activities: ['Pelatihan fasilitasi kelompok kecil', 'Pendalaman metode dialog asertif', 'Manajemen konflik & dinamika kelompok'], imgUrl: '/Peace Camp.jpeg' },
  { code: 'SIMPUL', name: 'SIMPUL', freq: 'TAHUNAN', schedule: 'Hari Raya Keagamaan', focus: 'Silaturahmi & Solidaritas Sosial', desc: 'Mengikat erat simpul persaudaraan lintas iman pada momen hari besar (seperti Idul Fitri dan Natal) lewat aksi sosial konkret dan kunjungan kehangatan.', color: 'gold', activities: ['Aksi sosial berbagi berkah hari raya', 'Silaturahmi ke rumah-rumah ibadah', 'Malam refleksi perdamaian lintas iman'], imgUrl: '/simpul.jpeg' },
];

export const TEAMS: TeamItem[] = [
  { abbr: 'CATAT', fullName: 'Catatan Administrasi Tertata', tagline: 'Mencatat setiap langkah sejarah', identity: 'Penjaga arsip, data, dan dokumentasi tulisan komunitas.', responsibilities: ['Mengelola basis data keanggotaan BMC', 'Menulis notulensi berharga di setiap sesi dialog', 'Menyusun laporan berkala perkembangan komunitas', 'Mengarsipkan, menyortir, dan meneruskan saran & kritik masuk'] },
  { abbr: 'CUAN', fullName: 'Catatan Uang, Anggaran & Neraca', tagline: 'Cermat menghitung, bijak mengelola', identity: 'Penjaga integritas finansial dan kemandirian ekonomi.', responsibilities: ['Menyusun anggaran program kerja secara transparan', 'Mengelola kas masuk-keluar dan donasi publik', 'Merancang inisiatif pencarian dana kreatif'] },
  { abbr: 'GERCEP', fullName: 'Gerak Cepat Eksekusi Program', tagline: 'Cepat bergerak, tepat bertindak', identity: 'Tim taktis lapangan, penanggung jawab kelancaran acara.', responsibilities: ['Mempersiapkan logistik dan tempat pelaksanaan sesi', 'Mengoordinasikan jalannya acara dari awal hingga akhir', 'Menjadi tim respon cepat jika terjadi kendala teknis'] },
  { abbr: 'PELUK', fullName: 'Peduli, Layanan, Untuk Komunitas', tagline: 'Merangkul, menjaga, menguatkan', identity: 'Jantung kehangatan emosional dan ruang aman psikologis.', responsibilities: ['Menyambut dan membimbing anggota baru agar nyaman', 'Memperhatikan kesejahteraan emosional sesama rekan', 'Menengahi dan meresolusi gesekan internal secara empatik'] },
  { abbr: 'JALIN', fullName: 'Jaringan dan Lintas Interaksi', tagline: 'Menghubungkan simpul kebaikan eksternal', identity: 'Duta luar pembangun jembatan kemitraan strategis.', responsibilities: ['Membangun relasi dengan komunitas, akademisi, dan media', 'Mengundang pembicara tamu eksternal yang inspiratif', 'Menjembatani kolaborasi aksi sosial dengan pihak luar'] },
  { abbr: 'RACIK', fullName: 'Rancang Kreatif', tagline: 'Merancang ide, melahirkan makna', identity: 'Dapur kurasi konten dialog dan modul pembelajaran.', responsibilities: ['Merancang tema diskusi bulanan untuk TENUN', 'Menyusun kurikulum aktivitas kreatif untuk ANYAMAN', 'Membaca dan memetakan tren isu sosial yang perlu diangkat'] },
  { abbr: 'LENSA', fullName: 'Liputan, Editing, Narasi, Sosial Media, Arsip', tagline: 'Menangkap cerita, menyebarkan inspirasi', identity: 'Wajah visual dan narator kisah perjalanan BMC.', responsibilities: ['Mengambil dokumentasi foto dan video berkualitas premium', 'Mengelola aset publikasi di seluruh platform sosial media', 'Menulis narasi reflektif yang menginspirasi khalayak luas'] },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'Di BMC saya menemukan apa yang tidak saya dapatkan di bangku kuliah: sebuah ruang aman untuk berbicara jujur tentang kecemasan saya, didengarkan tanpa dihakimi, dan diajak bersama-sama merintis aksi sosial nyata.', author: 'Ronaldo', role: 'sih paling inggirs yang multi talent', initials: 'R', color: 'red' },
  { quote: 'Awalnya saya ragu berdialog lintas iman karena takut menyinggung sensitivitas teologis. Namun di program TENUN, semua dibicarakan dengan keterbukaan luar biasa, kehangatan, dan rasa hormat yang sangat tulus.', author: 'Any', role: 'sih anak LENSA', initials: 'SS', color: 'gold' },
  { quote: 'BMC mengajarkan saya bahwa berkarya bukan soal panggung ketenaran individu, melainkan bagaimana benang potensi saya yang rapuh bisa dirajut bersama teman-teman menjadi jaring pengaman sosial.', author: 'Gaby', role: 'Koordinator RACIK', initials: 'GL', color: 'red' },
];

export const FAQS: FAQItem[] = [
  { q: 'Apakah Benang Merah Community terikat dengan organisasi keagamaan atau politik tertentu?', a: 'Sama sekali tidak. BMC adalah komunitas inovatif, inklusif, dan non-partisan. Kami berfokus sepenuhnya pada dialog kemanusiaan, pertumbuhan karakter anak muda, serta kolaborasi sosial lintas iman dan latar belakang budaya.' },
  { q: 'Siapa saja yang boleh bergabung ke dalam komunitas ini?', a: 'Siapa pun Anda! Kami menyambut hangat anak muda, mahasiswa, pekerja kreatif, pegiat sosial, akademisi, dan seluruh warga Manado/Sulawesi Utara tanpa memandang agama, kepercayaan, etnis, gender, maupun status sosial.' },
  { q: 'Apakah ada biaya pendaftaran atau iuran bulanan untuk anggota?', a: 'Seluruh kegiatan reguler kami seperti diskusi TENUN dan kelas ANYAMAN bersifat 100% gratis. Komunitas ini didukung secara swadaya oleh para anggota, donatur independen yang selaras dengan nilai kami, serta unit usaha kreatif mandiri.' },
  { q: 'Bagaimana cara berkontribusi di dalam kepengurusan atau divisi operasional?', a: 'Setiap tahun, kami mengadakan program pembinaan fasilitator (Peace Camp). Anggota aktif yang telah mengikuti proses dasar dapat mendaftarkan diri untuk bergabung ke dalam 7 Divisi Kerja (CATAT, CUAN, GERCEP, PELUK, JALIN, RACIK, LENSA).' },
];

export const PROG_COLOR = {
  red: { tag: '#CC1111', tagBg: 'rgba(204,17,17,0.10)', border: 'rgba(204,17,17,0.25)', dot: '#CC1111', glow: 'rgba(204,17,17,0.12)', bgGrad: 'linear-gradient(135deg, #1A0505 0%, #0D0505 100%)' },
  gold: { tag: '#D4AF37', tagBg: 'rgba(212,175,55,0.10)', border: 'rgba(212,175,55,0.25)', dot: '#D4AF37', glow: 'rgba(212,175,55,0.08)', bgGrad: 'linear-gradient(135deg, #1A1505 0%, #0D0A05 100%)' },
  rose: { tag: '#FB7185', tagBg: 'rgba(251,113,133,0.10)', border: 'rgba(251,113,133,0.25)', dot: '#FB7185', glow: 'rgba(251,113,133,0.08)', bgGrad: 'linear-gradient(135deg, #1F0D11 0%, #0D0507 100%)' },
};