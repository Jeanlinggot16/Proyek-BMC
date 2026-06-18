import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-12 font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* Ornamen Pendaran Latar Belakang */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#CC1111]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar Atas */}
      <nav className="max-w-4xl w-full mx-auto flex justify-between items-center z-10">
        <div className="font-bold text-xl tracking-tighter cursor-pointer">BMC MANADO</div>
        <div className="space-x-6 text-sm">
          <Link href="/" className="text-[#CC1111] font-semibold border-b-2 border-[#CC1111] pb-1">Home</Link>
          <Link href="/tentang" className="hover:text-[#CC1111] transition-colors">Tentang</Link>
          <Link href="/program" className="hover:text-[#CC1111] transition-colors">Program</Link>
          <Link href="/daftar" className="hover:text-[#CC1111] transition-colors">Daftar</Link>
          <Link href="/kontak" className="hover:text-[#CC1111] transition-colors">Kontak</Link>
        </div>
      </nav>

      {/* Hero Section Premium (py-24 memberi ruang napas yang sangat lega) */}
      <div className="max-w-3xl w-full mx-auto text-center py-24 md:py-32 z-10 animate-fadeIn">
        
        {/* Slogan Badge yang Melayang Halus */}
        <span className="animate-float bg-red-950/40 text-red-400 border border-red-900/40 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 inline-block shadow-glow-red">
          📍 Ruang Aman Pemuda Manado
        </span>

        {/* Headline Judul Utama Filosofis */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-none font-serif">
          Satu Benang,<br />
          <span className="bg-gradient-to-r from-[#CC1111] via-[#D4AF37] to-[#CC1111] bg-clip-text text-transparent">
            Tak Terhingga Cerita
          </span>
        </h1>

        {/* Deskripsi Singkat yang Puitis */}
        <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Di sini, latar belakangmu bukan syarat untuk diterima. Iman, budaya, dan cerita yang berbeda tidak kami satukan — kami rajut menjadi satu makna yang utuh.
        </p>

        {/* Tombol CTA yang Menyala Emas-Merah saat Hover */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/daftar" 
            className="w-full sm:w-auto bg-[#CC1111] hover:bg-[#AA0A0A] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-glow-red hover:shadow-glow-gold text-center text-xs tracking-wider uppercase"
          >
            Rajut Langkahmu di BMC →
          </Link>
          <Link 
            href="/tentang" 
            className="w-full sm:w-auto bg-[#121212] hover:bg-zinc-900 text-white px-8 py-3.5 rounded-full font-bold transition-all border border-zinc-800 text-center text-xs tracking-wider uppercase"
          >
            Pelajari Program Kami
          </Link>
        </div>

        {/* Statistik Minimalis */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-20 pt-8 border-t border-zinc-900/60 text-center">
          <div>
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Anggota</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">5</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Program</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Ruang Aman</div>
          </div>
        </div>
      </div>

      {/* Garis Pembatas Tipis Emas Transparan Mewah sebelum Footer */}
      <hr className="border-t border-[#D4AF37]/15 max-w-4xl w-full mx-auto mb-12" />

      {/* Footer Minimalis dengan Tagline Wordmark Jarak Huruf Lebar */}
      <footer className="max-w-4xl w-full mx-auto text-center z-10">
        <div className="tracking-[0.3em] uppercase text-[10px] text-[#D4AF37] font-semibold mb-6">
          Berdamai • Bertumbuh • Berkarya
        </div>
        <div className="text-[10px] text-zinc-600">
          &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}