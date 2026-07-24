// FILE: components/PopupSorotan.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SorotanData {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  imageSrc?: string;
  ctaText: string;
  ctaLink: string;
}

// Data Konten Iklan / Sorotan Khusus
const SOROTAN_IKLAN: SorotanData = {
  badge: 'PROGRAM UNGULAN',
  title: 'TENUN Agustus 2026',
  subtitle: 'Stop Bullying & Merawat Ruang Aman',
  description: 'Mari bergabung dalam ruang dialog inklusif pemuda Manado. Suarakan gagasanmu dan jadilah bagian dari perubahan positif!',
  imageSrc: '/tenun new.jpeg', // Bisa diganti dengan banner/foto iklan kamu
  ctaText: 'Daftar Sekarang 👋',
  ctaLink: '/kegiatan/jadwal',
};

export default function PopupSorotan() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Cek apakah pengunjung sudah pernah menutup pop-up dalam sesi ini
    const hasSeenPopup = sessionStorage.getItem('bmc_popup_seen');
    
    if (!hasSeenPopup) {
      // Beri jeda sedikit (800ms) setelah halaman dimuat agar animasi muncul dengan mulus
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Simpan penanda di browser agar tidak muncul lagi di sesi ini
    sessionStorage.setItem('bmc_popup_seen', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      
      {/* Container Modal Iklan/Sorotan */}
      <div 
        className="relative w-full max-w-lg bg-[#0F0D0B] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup (Pojok Kanan Atas) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 flex items-center justify-center text-sm font-bold transition-all"
          aria-label="Tutup Sorotan"
        >
          ✕
        </button>

        {/* Gambar Banner Sorotan (Jika ada) */}
        {SOROTAN_IKLAN.imageSrc && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-black/50">
            <img
              src={SOROTAN_IKLAN.imageSrc}
              alt={SOROTAN_IKLAN.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B] via-transparent to-transparent" />
            
            {/* Badge Label */}
            <span className="absolute top-4 left-4 bg-[#C0392B] text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-md">
              {SOROTAN_IKLAN.badge}
            </span>
          </div>
        )}

        {/* Konten Teks Sorotan */}
        <div className="p-6 sm:p-8 text-center space-y-4">
          {!SOROTAN_IKLAN.imageSrc && (
            <span className="inline-block bg-[#C0392B] text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-md mb-2">
              {SOROTAN_IKLAN.badge}
            </span>
          )}

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {SOROTAN_IKLAN.title}
            </h3>
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mt-1">
              {SOROTAN_IKLAN.subtitle}
            </p>
          </div>

          <p className="text-xs text-[#B8B8C0] leading-relaxed max-w-sm mx-auto">
            {SOROTAN_IKLAN.description}
          </p>

          {/* Tombol Aksi CTA & Opsi Nanti Saja */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href={SOROTAN_IKLAN.ctaLink}
              onClick={handleClose}
              className="w-full sm:w-auto bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(192,57,43,0.4)] hover:shadow-[0_0_28px_rgba(192,57,43,0.7)] transition-all text-center"
            >
              {SOROTAN_IKLAN.ctaText}
            </Link>
            
            <button
              onClick={handleClose}
              className="text-xs text-[#8A8A94] hover:text-white transition-colors py-2 px-4"
            >
              Nanti Saja
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}