'use client';

import Link from 'next/link';

export default function ProgramPage() {
  const programs = [
    {
      title: "TENUN",
      schedule: "Sabtu, Minggu Kedua",
      focus: "Belajar Mendengar",
      desc: "Tenun adalah proses menyatukan benang-benang berbeda menjadi kain yang utuh dan bermakna — melambangkan dialog yang sehat di tengah perbedaan.",
      activities: "diskusi santai namun mendalam lintas iman, budaya, dan disiplin ilmu; bedah buku, film, atau artikel terkait isu sosial dan kemanusiaan; dialog bersama akademisi, praktisi, dan tokoh masyarakat."
    },
    {
      title: "ANYAMAN",
      schedule: "Sabtu, Minggu Keempat",
      focus: "Mengembangkan Potensi",
      desc: "Anyaman melambangkan proses membentuk diri secara sadar, konsisten, dan penuh kesabaran — setiap individu adalah benang yang sedang dirawat agar kuat dan bernilai.",
      activities: "seni (musik, puisi, rupa, fotografi, film pendek), public speaking & storytelling, refleksi diri dan ekspresi kreatif."
    },
    {
      title: "TFT (Training For Trainers)",
      schedule: "Program Tahunan",
      focus: "Belajar Memimpin",
      desc: "Pembinaan fasilitator dan calon penggerak komunitas, untuk menjaga kesinambungan nilai dan budaya BMC serta mempersiapkan pemimpin masa depan.",
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
      activities: "silaturahmi lintas iman pada momen Natal dan Lebaran — lewat perayaan bersama, doa dan refleksi, makan bersama, hingga kunjungan dan aksi sosial."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-12 font-sans flex flex-col justify-between">
      {}
      <nav className="max-w-4xl w-full mx-auto mb-16 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.location.href = '/'}>BMC MANADO</div>
        <div className="space-x-6 text-sm">
          <Link href="/" className="hover:text-[#CC1111] transition-colors">Home</Link>
          <Link href="/tentang" className="hover:text-[#CC1111] transition-colors">Tentang</Link>
          <Link href="/program" className="text-[#CC1111] font-semibold border-b-2 border-[#CC1111] pb-1">Program</Link>
          <Link href="/daftar" className="hover:text-[#CC1111] transition-colors">Daftar</Link>
          <Link href="/kontak" className="hover:text-[#CC1111] transition-colors">Kontak</Link>
        </div>
      </nav>

      {}
      <div className="max-w-4xl w-full mx-auto space-y-12 my-auto">
        <div className="text-center md:text-left space-y-4 animate-fadeIn">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">KEGIATAN KAMI</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Program Kerja BMC</h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Sama seperti proses menenun kain yang indah, setiap program kami dirancang secara sabar dan konsisten untuk merawat perdamaian dan potensi anak muda Manado.
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog, idx) => (
            <div 
              key={idx} 
              className="bg-[#121212] border border-zinc-800 p-8 rounded-3xl hover:border-[#CC1111] transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="text-[#CC1111] font-bold text-lg font-serif">{prog.title}</span>
                  <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/30 px-2.5 py-1 rounded-full uppercase font-semibold">{prog.schedule}</span>
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block mb-1">
                    🎯 {prog.focus}
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    {prog.desc}
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    <strong className="text-zinc-400">Aktivitas:</strong> {prog.activities}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl text-center space-y-4">
          <h3 className="font-serif text-xl font-bold">Tertarik ikut salah satu program di atas?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">Mari bergabung dan berproses bersama anak muda lainnya dari berbagai macam latar belakang di Manado.</p>
          <Link 
            href="/daftar" 
            className="inline-block bg-[#CC1111] hover:bg-[#AA0A0A] text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(204,17,17,0.2)]"
          >
            Yuk, Daftar Jadi Member BMC Dulu →
          </Link>
        </div>
      </div>

      {}
      <footer className="max-w-4xl w-full mx-auto mt-16 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
      </footer>
    </main>
  );
}