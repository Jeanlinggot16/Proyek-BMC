'use client';

import React, { useState, useEffect } from 'react';

// Jenis Data untuk Program
interface Program {
  title: string;
  focus: string;
  type: 'Bulanan' | 'Tahunan';
  desc: string;
  details: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'F' | 'R' | 'I' | 'E' | 'N' | 'D'>('F');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    whatsapp: '',
    origin: '',
    programs: [] as string[],
    reason: '',
    source: '',
    agreement: false
  });

  // Salin Kontak ke Clipboard
  const copyToClipboard = (text: string, type: string) => {
    // Menggunakan execCommand sebagai fallback aman untuk iFrame
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Nilai F.R.I.E.N.D
  const friendValues = {
    F: { title: 'Friendly (Ramah & Terbuka)', desc: 'Setiap orang disambut hangat sebagai manusia seutuhnya, tanpa memandang latar belakang iman, suku, maupun budaya.' },
    R: { title: 'Ruang Aman', desc: 'Sebuah wadah tulus untuk bertemu, berbicara, bercerita, dan bertumbuh bersama tanpa rasa takut dihakimi atau mendapat tekanan.' },
    I: { title: 'Intimate (Bermakna)', desc: 'Membangun relasi yang jujur, dekat, mendalam, dan transformatif—bukan sekadar interaksi sosial yang dangkal.' },
    E: { title: 'Enjoyable (Suka Cita)', desc: 'Suasana hangat yang membangkitkan semangat. Proses belajar, bertumbuh, dan berkarya dijalani dengan penuh sukacita.' },
    N: { title: 'Nusantara', desc: 'Menghargai keberagaman iman, budaya, dan suku di Indonesia khususnya Manado sebagai kekayaan yang merajut persatuan.' },
    D: { title: 'Daya Cipta', desc: 'Mendorong lahirnya ide kreatif, karya seni, aksi nyata, dan berbagai inisiatif positif yang berdampak luas bagi sesama.' }
  };

  // Daftar Program
  const programs: Program[] = [
    { title: 'TENUN', focus: 'Sabtu, Minggu Kedua', type: 'Bulanan', desc: 'Fokus: Belajar Mendengar', details: 'Proses menyatukan benang-benang berbeda menjadi kain yang utuh melambangkan dialog sehat lintas iman, budaya, dan disiplin ilmu melalui bedah buku, film, dan diskusi interaktif.' },
    { title: 'ANYAMAN', focus: 'Sabtu, Minggu Keempat', type: 'Bulanan', desc: 'Fokus: Mengembangkan Potensi', details: 'Proses membentuk diri secara sadar dan sabar lewat eksplorasi ekspresi kreatif seperti musik, puisi, fotografi, seni rupa, hingga pengembangan public speaking.' },
    { title: 'TFT (Training For Trainers)', focus: 'Program Tahunan', type: 'Tahunan', desc: 'Fokus: Belajar Memimpin', details: 'Pembinaan intensif bagi calon penggerak dan fasilitator komunitas untuk menjaga nilai-nilai luhur BMC serta mempersiapkan pemimpin masa depan.' },
    { title: 'RAJUT', focus: 'Program Tahunan', type: 'Tahunan', desc: 'Fokus: Menciptakan Dampak', details: 'Karya kolektif tahunan sebagai buah dari proses konsisten, meliputi pameran/pentas seni budaya, kolaborasi UMKM lokal, hingga penggalangan dana sosial.' },
    { title: 'SIMPUL', focus: 'Program Tahunan', type: 'Tahunan', desc: 'Fokus: Merawat Persaudaraan', details: 'Silaturahmi lintas iman yang hangat pada momen besar keagamaan seperti Natal dan Lebaran melalui makan bersama, refleksi doa, dan aksi bakti sosial.' }
  ];

  const [programFilter, setProgramFilter] = useState<'Semua' | 'Bulanan' | 'Tahunan'>('Semua');

  const filteredPrograms = programFilter === 'Semua' 
    ? programs 
    : programs.filter(p => p.type === programFilter);

  // Penanganan Submit Form Pendaftaran
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.agreement) {
      alert('Mohon lengkapi nama, nomor WhatsApp, dan centang persetujuan.');
      return;
    }
    setFormSubmitted(true);
  };

  const toggleProgramSelection = (title: string) => {
    if (formData.programs.includes(title)) {
      setFormData({ ...formData, programs: formData.programs.filter(p => p !== title) });
    } else {
      setFormData({ ...formData, programs: [...formData.programs, title] });
    }
  };

  // Fungsi Scroll Halus
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen font-sans selection:bg-[#CC1111] selection:text-white overflow-x-hidden">
      
      {/* 1. STICKY NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-900 z-50 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#CC1111] to-[#D4AF37] flex items-center justify-center font-bold text-[#F5F5F5] shadow-lg shadow-[#CC1111]/20">
              <span className="text-xl font-serif">∞</span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wider block leading-none">BENANG MERAH</span>
              <span className="text-[10px] tracking-[0.2em] text-[#D4AF37] block">COMMUNITY</span>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection('beranda')} className="hover:text-[#CC1111] transition-colors">Beranda</button>
            <button onClick={() => scrollToSection('tentang')} className="hover:text-[#CC1111] transition-colors">Tentang Kami</button>
            <button onClick={() => scrollToSection('program')} className="hover:text-[#CC1111] transition-colors">Program</button>
            <button onClick={() => scrollToSection('pendaftaran')} className="hover:text-[#CC1111] transition-colors">Daftar</button>
            <button onClick={() => scrollToSection('kontak')} className="hover:text-[#CC1111] transition-colors">Kontak</button>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => scrollToSection('pendaftaran')}
            className="bg-[#CC1111] hover:bg-[#D4AF37] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          >
            Gabung Sekarang
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="beranda" className="min-h-screen pt-28 flex flex-col justify-center items-center relative px-6 text-center overflow-hidden">
        {/* Dekorasi Garis Benang Merah Abstrak */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,40 Q25,15 50,70 T100,30" fill="none" stroke="#CC1111" strokeWidth="0.5" strokeDasharray="1,1" />
            <path d="M0,60 Q35,80 65,30 T100,70" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#CC1111]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#CC1111] animate-ping"></span>
            <span>Ruang Aman Pemuda Manado</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight font-serif text-[#F5F5F5] leading-tight">
            Satu Benang,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC1111] via-red-500 to-[#D4AF37]">
              Banyak Cerita
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Benang Merah Community (BMC) — ruang aman lintas latar belakang untuk anak muda Manado yang ingin berdamai, bertumbuh, dan berkarya bersama.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => scrollToSection('pendaftaran')}
              className="w-full sm:w-auto bg-[#CC1111] hover:bg-[#b00e0e] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#CC1111]/30"
            >
              Gabung Jadi Bagian dari BMC →
            </button>
            <button 
              onClick={() => scrollToSection('tentang')}
              className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-[#F5F5F5] font-semibold px-8 py-4 rounded-full transition-all"
            >
              Pelajari Kami
            </button>
          </div>
        </div>

        {/* Highlight 3 Poin */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 border-t border-zinc-900 pt-12 z-10">
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-900 text-center hover:border-[#CC1111]/40 transition-all duration-500 group">
            <div className="w-12 h-12 rounded-full bg-[#CC1111]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#CC1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">Ruang Aman Dialog</h3>
            <p className="text-zinc-400 text-sm">Wadah hangat untuk saling mendengar, memahami, dan bertumbuh melampaui perbedaan.</p>
          </div>
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-900 text-center hover:border-[#D4AF37]/40 transition-all duration-500 group">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 .364l-.707 .707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">Wadah Kreativitas</h3>
            <p className="text-zinc-400 text-sm">Saluran bebas untuk mengekspresikan bakat seni, bertukar ide cerdas, dan melahirkan aksi nyata.</p>
          </div>
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-900 text-center hover:border-[#CC1111]/40 transition-all duration-500 group">
            <div className="w-12 h-12 rounded-full bg-[#CC1111]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#CC1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">Lintas Iman & Budaya</h3>
            <p className="text-zinc-400 text-sm">Menyatukan pemuda beragam latar belakang dalam jalinan persaudaraan yang tulus di Manado.</p>
          </div>
        </div>
      </section>

      {/* 3. TENTANG KAMI */}
      <section id="tentang" className="py-24 bg-zinc-950 relative px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Cerita Kami & Simbol Infinity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#CC1111] font-bold tracking-widest text-xs uppercase block">MENGENAL BMC</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white">Berdamai • Bertumbuh • Berkarya</h2>
              
              <div className="h-1 w-20 bg-gradient-to-r from-[#CC1111] to-[#D4AF37]"></div>
              
              <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                <strong>Benang Merah</strong> bukan organisasi formal yang kaku ataupun sekadar komunitas kampus biasa. Kami adalah sebuah ruang aman profesional—tempat untuk berkumpul, berdialog, belajar, dan merajut kembali kehidupan.
              </p>
              
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                Banyak persoalan hidup berawal dari relasi yang rusak—dengan Tuhan, diri sendiri, sesama, dan alam ciptaan. Kami tidak hadir untuk menyeragamkan perbedaan, melainkan merajutnya melalui relasi sehat yang mendewasakan dan karya yang bertanggung jawab.
              </p>
            </div>

            {/* Visualisasi Simbol Infinity */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-[#0A0A0A] p-8 rounded-3xl border border-zinc-800 text-center relative group overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 py-8 flex flex-col items-center">
                
                {/* SVG Infinity Animasi */}
                <svg className="w-40 h-20 text-[#CC1111] filter drop-shadow-[0_0_15px_rgba(204,17,17,0.4)] animate-pulse" viewBox="0 0 100 50">
                  <path 
                    d="M 25 25 C 10 5, 5 45, 25 45 C 45 45, 55 5, 75 5 C 95 5, 90 45, 75 45 C 55 45, 45 5, 25 5 C 5 5, 10 45, 25 25 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h3 className="font-serif font-bold text-2xl text-[#D4AF37] mt-8 mb-3">Makna Simbol Infinity (∞)</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  Relasi, pertumbuhan, dan pemulihan adalah proses yang tak berbatas. Perdamaian bukan hanya sekadar momen sementara, melainkan perjalanan panjang yang diperjuangkan bersama.
                </p>
              </div>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900 hover:border-[#CC1111]/30 transition-all">
              <span className="text-[#CC1111] font-bold text-4xl font-serif block mb-4">01</span>
              <h3 className="font-serif font-bold text-xl text-white mb-3">Berdamai (Visi)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Mewujudkan pemulihan relasi yang utuh dan harmonis—dengan Tuhan, dengan diri sendiri, sesama manusia, serta seluruh alam semesta yang dihidupi dalam tindakan nyata sehari-hari.
              </p>
            </div>
            
            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] font-bold text-4xl font-serif block mb-4">02</span>
              <h3 className="font-serif font-bold text-xl text-white mb-3">Bertumbuh (Misi)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Melangkah menuju kedewasaan iman (termasuk melalui ruang dialog Islam & Kristen) dan nilai kemanusiaan, dengan mengasah cara berpikir kritis, komunikasi asertif, serta menggali potensi diri.
              </p>
            </div>

            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900 hover:border-[#CC1111]/30 transition-all">
              <span className="text-[#CC1111] font-bold text-4xl font-serif block mb-4">03</span>
              <h3 className="font-serif font-bold text-xl text-white mb-3">Berkarya (Misi)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Mengejawantahkan hasil pertumbuhan batin menjadi aksi produktif yang memiliki nilai tambah, sebagai perwujudan konkret dari iman, karakter dewasa, serta kontribusi nyata bagi bumi.
              </p>
            </div>
          </div>

          {/* Nilai Inti F.R.I.E.N.D - SISTEM TAB INTERAKTIF */}
          <div className="bg-[#0A0A0A] p-8 sm:p-12 rounded-3xl border border-zinc-900 shadow-inner">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">BUDAYA KAMI</span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold mt-2">Nilai Inti F.R.I.E.N.D</h3>
              <p className="text-zinc-400 text-sm mt-2">Prinsip dasar yang kami rawat dan pegang teguh dalam setiap perkumpulan dan relasi harian.</p>
            </div>

            {/* Tombol Karakter Huruf */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
              {(Object.keys(friendValues) as Array<keyof typeof friendValues>).map((char) => (
                <button
                  key={char}
                  onClick={() => setActiveTab(char)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl font-serif font-bold text-lg sm:text-2xl transition-all duration-300 flex items-center justify-center ${
                    activeTab === char 
                      ? 'bg-[#CC1111] text-white scale-110 shadow-lg shadow-[#CC1111]/30 border-none' 
                      : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Kotak Info Aktif */}
            <div className="bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-900 max-w-2xl mx-auto text-center transition-all duration-500 animate-fadeIn min-h-[150px] flex flex-col justify-center">
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#D4AF37] mb-3">
                {friendValues[activeTab].title}
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {friendValues[activeTab].desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROGRAM KAMI */}
      <section id="program" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Filter */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div className="space-y-4">
              <span className="text-[#CC1111] font-bold tracking-widest text-xs uppercase block">AGENDA KEGIATAN</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white">Rajutan Kegiatan BMC</h2>
              <p className="text-zinc-400 text-sm max-w-lg">Temukan ruang bertumbuh yang paling sesuai dengan kebutuhan ekspresi jiwa, kepemimpinan, dan perjalanan imanmu.</p>
            </div>

            {/* Filter Buttons */}
            <div className="inline-flex bg-zinc-900 p-1.5 rounded-full border border-zinc-800 self-start">
              {(['Semua', 'Bulanan', 'Tahunan'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProgramFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                    programFilter === filter 
                      ? 'bg-[#CC1111] text-white shadow-md' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Program Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((p, index) => (
              <div 
                key={index} 
                className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 hover:border-[#CC1111]/30 transition-all duration-300 flex flex-col justify-between group h-full shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-[#D4AF37] font-semibold tracking-wider uppercase">
                      {p.focus}
                    </span>
                    <span className="text-zinc-600 text-xs font-semibold uppercase">{p.type}</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-white mb-2 group-hover:text-[#CC1111] transition-colors">
                    {p.title}
                  </h3>
                  <h4 className="font-sans font-medium text-sm text-zinc-400 italic mb-4">{p.desc}</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">{p.details}</p>
                </div>
                
                <button 
                  onClick={() => scrollToSection('pendaftaran')}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-[#CC1111] hover:bg-[#CC1111]/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center mt-auto"
                >
                  Ikuti Program Ini
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FORMULIR PENDAFTARAN */}
      <section id="pendaftaran" className="py-24 bg-zinc-950 px-6 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-3xl mx-auto z-10 relative">
          <div className="text-center mb-12 space-y-3">
            <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">REGISTRASI</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold">Gabung Jadi Member BMC</h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
              Perjalananmu dimulai dari sini. Pilih peranmu untuk berdamai, bertumbuh, dan berkarya nyata di Manado.
            </p>
          </div>

          <div className="bg-[#0A0A0A] rounded-3xl border border-zinc-900 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Animasi Success State */}
            {formSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 text-4xl">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-3xl text-white">Pendaftaran Berhasil!</h3>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                    Terima kasih, <strong>{formData.name}</strong>! Data pendaftaranmu telah terkirim. Pengurus BMC akan segera menghubungimu melalui WhatsApp (+{formData.whatsapp}).
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '', age: '', whatsapp: '', origin: '', programs: [], reason: '', source: '', agreement: false
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                >
                  Daftarkan Member Lain
                </button>
              </div>
            ) : (
              // Formulir Sebenarnya (Styling Premium)
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 block">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Michael Wang" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    />
                  </div>

                  {/* Usia */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 block">Usia *</label>
                    <input 
                      type="number" 
                      required
                      placeholder="Contoh: 21" 
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* No WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 block">No. WhatsApp Aktif *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Contoh: 628512802xxxx" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    />
                  </div>

                  {/* Institusi */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 block">Sekolah / Kampus / Pekerjaan *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Universitas Sam Ratulangi" 
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                    />
                  </div>
                </div>

                {/* Minat Program */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 block">Program yang ingin Diikuti (Pilih minimal satu)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {['TENUN', 'ANYAMAN', 'TFT', 'RAJUT', 'SIMPUL'].map((prog) => {
                      const isSelected = formData.programs.includes(prog);
                      return (
                        <button
                          type="button"
                          key={prog}
                          onClick={() => toggleProgramSelection(prog)}
                          className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                            isSelected 
                              ? 'bg-[#CC1111]/15 text-[#CC1111] border-[#CC1111]' 
                              : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                          }`}
                        >
                          {prog}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alasan Ingin Bergabung */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 block">Alasan Singkat Ingin Bergabung</label>
                  <textarea 
                    rows={3}
                    placeholder="Tulis alasan atau harapanmu bergabung dengan keluarga besar BMC..."
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors resize-none"
                  />
                </div>

                {/* Sumber Informasi */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 block">Dari mana kamu mengetahui BMC?</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Instagram / Teman Kampus" 
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC1111] transition-colors"
                  />
                </div>

                {/* Checkbox Persetujuan */}
                <div className="flex items-start space-x-3 pt-2">
                  <input 
                    type="checkbox" 
                    required
                    id="agree"
                    checked={formData.agreement}
                    onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                    className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#CC1111] focus:ring-[#CC1111]"
                  />
                  <label htmlFor="agree" className="text-xs text-zinc-400 leading-relaxed cursor-pointer select-none">
                    Saya menyetujui bahwa data ini hanya digunakan untuk keperluan koordinasi internal komunitas Benang Merah.
                  </label>
                </div>

                {/* Tombol Kirim */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#CC1111] to-[#b00e0e] hover:to-[#D4AF37] font-semibold text-sm text-white transition-all duration-500 transform hover:scale-[1.01] shadow-lg shadow-[#CC1111]/20 mt-4"
                >
                  Kirim Pendaftaran Member →
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* 6. KONTAK & FOOTER */}
      <section id="kontak" className="py-24 px-6 relative bg-[#0A0A0A]">
        
        {/* Glow Effect */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CC1111]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Teks Deskripsi */}
            <div className="space-y-6">
              <span className="text-[#CC1111] font-bold tracking-widest text-xs uppercase block">HUBUNGI KAMI</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">Mari Rajut Kerja Sama</h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                Punya pertanyaan seputar program, tertarik untuk berkolaborasi, atau sekadar ingin mengenal lebih dekat dengan pengurus kami di Manado? Silakan pilih kanal komunikasi di bawah ini.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/6285128020325" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-zinc-900 hover:bg-emerald-500/10 border border-zinc-800 hover:border-emerald-500/50 px-6 py-3 rounded-full text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition-all"
                >
                  <span>Chat di WhatsApp</span>
                  <span className="text-emerald-500">→</span>
                </a>
                <a 
                  href="https://www.instagram.com/benangmerahcommunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-zinc-900 hover:bg-[#CC1111]/10 border border-zinc-800 hover:border-[#CC1111]/50 px-6 py-3 rounded-full text-xs font-semibold text-zinc-300 hover:text-[#CC1111] transition-all"
                >
                  <span>Ikuti Instagram</span>
                  <span className="text-[#CC1111]">→</span>
                </a>
              </div>
            </div>

            {/* Kotak Kontak Interaktif */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card WhatsApp */}
              <div 
                onClick={() => copyToClipboard('+62 851-2802-0325', 'whatsapp')}
                className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-[#CC1111]/30 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mb-4 text-[#D4AF37]">
                    🗪
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-1">WhatsApp</h4>
                  <p className="text-zinc-400 text-sm">+62 851-2802-0325</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-6 block">
                  {copiedText === 'whatsapp' ? 'Tersalin!' : 'Klik untuk Salin'}
                </span>
              </div>

              {/* Card Email */}
              <div 
                onClick={() => copyToClipboard('benangmerahcommunity@gmail.com', 'email')}
                className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-[#CC1111]/30 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mb-4 text-[#D4AF37]">
                    ✉
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-1">Email Resmi</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm truncate">benangmerahcommunity@gmail.com</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-6 block">
                  {copiedText === 'email' ? 'Tersalin!' : 'Klik untuk Salin'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bawah */}
          <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#CC1111] to-[#D4AF37] flex items-center justify-center font-bold text-xs">
                ∞
              </div>
              <div>
                <span className="font-serif font-bold text-sm tracking-wider block">BENANG MERAH COMMUNITY</span>
                <span className="text-[9px] text-zinc-500 block">MANADO, INDONESIA</span>
              </div>
            </div>

            <div className="flex space-x-6 text-xs text-zinc-500">
              <span>Berdamai</span>
              <span>•</span>
              <span>Bertumbuh</span>
              <span>•</span>
              <span>Berkarya</span>
            </div>

            <p className="text-xs text-zinc-600 text-center md:text-right">
              &copy; {new Date().getFullYear()} Benang Merah Community. All rights reserved.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}