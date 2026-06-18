'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TentangPage() {
  const [activeValue, setActiveValue] = useState<string>('F');

  const values = {
    F: { title: "Friendly (Ramah Tanpa Pura-pura)", desc: "Setiap orang disambut hangat sebagai manusia utuh, bukan dinilai dari label sosial, iman, suku, maupun budaya yang dibawanya." },
    R: { title: "Ruang Aman (Tempat untuk Salah)", desc: "Wadah tulus untuk berbicara, berbuat salah, dan belajar bertumbuh bersama tanpa rasa takut dihakimi atau mendapat tekanan." },
    I: { title: "Intimate (Bukan Basa-basi)", desc: "Membangun relasi yang jujur, dekat, mendalam, dan transformatif — jauh melampaui basa-basi sosial yang dangkal." },
    E: { title: "Enjoyable (Tanpa Beban)", desc: "Suasana hangat yang membangkitkan tawa. Proses belajar, bertumbuh, dan berkarya dijalani dengan penuh sukacita." },
    N: { title: "Nusantara (Merayakan Perbedaan)", desc: "Menghargai keberagaman iman, budaya, dan suku di Indonesia khususnya Manado sebagai kekayaan yang merajut persaudaraan sejati." },
    D: { title: "Daya Cipta (Dampak Nyata)", desc: "Mendorong lahirnya ide kreatif kecil yang dirawat dengan kesungguhan hingga menjelma karya nyata yang berdampak luas bagi sesama." }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-12 font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Navbar Atas */}
      <nav className="max-w-4xl w-full mx-auto mb-16 flex justify-between items-center z-10">
        <div className="font-bold text-xl tracking-tighter">BMC MANADO</div>
        <div className="space-x-6 text-sm">
          <Link href="/" className="hover:text-[#CC1111] transition-colors">Home</Link>
          <Link href="/tentang" className="text-[#CC1111] font-semibold border-b-2 border-[#CC1111] pb-1">Tentang</Link>
          <Link href="/program" className="hover:text-[#CC1111] transition-colors">Program</Link>
          <Link href="/daftar" className="hover:text-[#CC1111] transition-colors">Daftar</Link>
          <Link href="/kontak" className="hover:text-[#CC1111] transition-colors">Kontak</Link>
        </div>
      </nav>

      {/* Konten Utama */}
      <div className="max-w-4xl w-full mx-auto space-y-20 my-auto z-10">
        
        {/* Cerita Kami */}
        <section className="animate-fadeIn space-y-6">
          <span className="text-[#CC1111] text-xs font-bold tracking-widest uppercase">SIAPA KAMI</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Mengenal Benang Merah</h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-sans">
            BMC bukan organisasi formal yang berjarak. Bukan pula komunitas kampus yang biasa-biasa saja. BMC adalah ruang aman yang dijaga dengan kesungguhan — tempat untuk bertemu, berdialog, belajar, dan berkarya bersama.
          </p>
        </section>

        {/* Cerita & Simbol Infinity */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-zinc-900/60">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#D4AF37] font-serif">Cerita Kami</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Benang Merah lahir dari kesadaran sederhana bahwa banyak luka manusia berawal dari relasi yang retak — dengan Tuhan, diri sendiri, sesama, dan alam semesta. Kami tidak hadir untuk menghapus perbedaan. Kami hadir untuk merajutnya kembali melalui relasi yang sehat, pertumbuhan yang dewasa, dan karya yang bertanggung jawab.
            </p>
          </div>
          <div className="space-y-4 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/40 shadow-glow-red">
            <h3 className="text-xl font-bold text-[#CC1111] font-serif flex items-center gap-2">
              <span className="animate-float text-2xl">∞</span> Makna Benang Merah & Simbol $ \infty $
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Benang Merah melambangkan proses merajut: perjumpaan, penerimaan, dan kebersamaan. Perbedaan tidak dihilangkan — ia dirajut menjadi satu kesatuan yang utuh. Bentuk infinity ($ \infty $) menegaskan bahwa relasi, pertumbuhan, dan pemulihan adalah perjalanan panjang yang terus dijaga dan diperjuangkan — hari demi hari.
            </p>
          </div>
        </section>

        {/* Nilai Inti F.R.I.E.N.D - Tab System Premium */}
        <section className="bg-[#121212]/50 border border-zinc-800/60 p-8 rounded-3xl space-y-8 shadow-glow-gold">
          <div className="text-center">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">PRINSIP UTAMA</span>
            <h3 className="text-2xl font-bold text-[#D4AF37] font-serif mt-1">Nilai Inti Kami — F.R.I.E.N.D</h3>
            <p className="text-xs text-zinc-400 mt-2">Klik tiap huruf di bawah ini untuk melihat komitmen dasar kami</p>
          </div>
          
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {Object.keys(values).map((key) => (
              <button
                key={key}
                onClick={() => setActiveValue(key)}
                className={`w-12 h-12 rounded-xl text-lg font-bold font-serif transition-all ${
                  activeValue === key 
                    ? 'bg-[#CC1111] text-white scale-110 shadow-glow-red' 
                    : 'bg-[#1A1A1A] text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="text-center p-6 bg-zinc-950/70 rounded-2xl border border-zinc-900 min-h-[100px] flex flex-col justify-center animate-fadeIn">
            <h4 className="font-bold text-white mb-2 text-sm md:text-base font-serif">{values[activeValue as keyof typeof values].title}</h4>
            <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-sans">{values[activeValue as keyof typeof values].desc}</p>
          </div>
        </section>
      </div>

      {/* Garis Pembatas Tipis Emas Transparan Mewah sebelum Footer */}
      <hr className="border-t border-[#D4AF37]/15 max-w-4xl w-full mx-auto my-12" />

      {/* Footer */}
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