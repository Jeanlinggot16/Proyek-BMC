'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KontakPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-12 font-sans flex flex-col justify-between">
      {}
      <nav className="max-w-4xl w-full mx-auto mb-16 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.location.href = '/'}>BMC MANADO</div>
        <div className="space-x-6 text-sm">
          <Link href="/" className="hover:text-[#CC1111] transition-colors">Home</Link>
          <Link href="/tentang" className="hover:text-[#CC1111] transition-colors">Tentang</Link>
          <Link href="/program" className="hover:text-[#CC1111] transition-colors">Program</Link>
          <Link href="/daftar" className="hover:text-[#CC1111] transition-colors">Daftar</Link>
          <Link href="/kontak" className="text-[#CC1111] font-semibold border-b-2 border-[#CC1111] pb-1">Kontak</Link>
        </div>
      </nav>

      {}
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 my-auto items-center animate-fadeIn">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-[#CC1111] text-xs font-bold tracking-widest uppercase">HUBUNGI KAMI</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Mari Berkolaborasi</h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto md:mx-0">
            Punya pertanyaan, mau kolaborasi, atau sekadar mau kenal lebih jauh dengan keluarga besar BMC di Manado? Silakan hubungi kami.
          </p>
          <div className="pt-2 flex justify-center md:justify-start gap-4">
            <a 
              href="https://wa.me/6285128020325" 
              target="_blank" 
              className="bg-[#CC1111] hover:bg-[#AA0A0A] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-[0_0_20px_rgba(204,17,17,0.2)]"
            >
              Chat WA Sekarang →
            </a>
          </div>
        </div>

        {}
        <div className="space-y-4">
          {/* Card WhatsApp */}
          <div 
            onClick={() => copyToClipboard('+6285128020325', 'whatsapp')}
            className="p-6 bg-[#121212] border border-zinc-800 rounded-2xl cursor-pointer hover:border-[#CC1111] transition-all flex justify-between items-center group"
          >
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">WhatsApp</span>
              <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">+62 851-2802-0325</span>
            </div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">
              {copiedText === 'whatsapp' ? 'Tersalin!' : 'Klik untuk Salin'}
            </span>
          </div>

          {/* Card Email */}
          <div 
            onClick={() => copyToClipboard('benangmerahcommunity@gmail.com', 'email')}
            className="p-6 bg-[#121212] border border-zinc-800 rounded-2xl cursor-pointer hover:border-[#CC1111] transition-all flex justify-between items-center group"
          >
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Email Resmi</span>
              <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">benangmerahcommunity@gmail.com</span>
            </div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">
              {copiedText === 'email' ? 'Tersalin!' : 'Klik untuk Salin'}
            </span>
          </div>

          {/* Card Instagram */}
          <a 
            href="https://www.instagram.com/benangmerahcommunity"
            target="_blank"
            className="p-6 bg-[#121212] border border-zinc-800 rounded-2xl block hover:border-[#CC1111] transition-all flex justify-between items-center group"
          >
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Instagram</span>
              <span className="text-sm font-bold text-white group-hover:text-[#CC1111] transition-colors">@benangmerahcommunity</span>
            </div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">Kunjungi →</span>
          </a>
        </div>
      </div>

      {}
      <footer className="max-w-4xl w-full mx-auto mt-16 text-center text-xs text-zinc-600">
        <div className="mb-4 text-zinc-500 flex justify-center gap-4">
          <span>Berdamai</span><span>•</span><span>Bertumbuh</span><span>•</span><span>Berkarya</span>
        </div>
        &copy; {new Date().getFullYear()} Benang Merah Community Manado. All Rights Reserved.
      </footer>
    </main>
  );
}