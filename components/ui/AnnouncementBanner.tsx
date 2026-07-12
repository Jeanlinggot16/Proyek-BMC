'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getNearestEvent, getLatestArchive } from '@/constants/communityData';
import { cn } from '@/lib/utils';

type BannerData = {
  type: 'event' | 'archive' | 'welcome';
  message: string;
  link: string;
  linkLabel: string;
};

const BANNER_HEIGHT = '44px';

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [bannerData, setBannerData] = useState<BannerData | null>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('bmc_banner_dismissed');
    if (isDismissed === 'true') {
      setDismissed(true);
      return;
    }

    const nearestEvent = getNearestEvent();
    const latestArchive = getLatestArchive();

    if (nearestEvent) {
      setBannerData({
        type: 'event',
        message: `📅 ${nearestEvent.nama} — ${nearestEvent.tanggal}`,
        link: '/kegiatan/jadwal',
        linkLabel: 'Lihat Detail',
      });
    } else if (latestArchive) {
      setBannerData({
        type: 'archive',
        message: `📖 Arsip terbaru: ${latestArchive.judul}`,
        link: `/arsip/${latestArchive.slug}`,
        linkLabel: 'Baca',
      });
    } else {
      setBannerData({
        type: 'welcome',
        message: '👋 Baru pertama ke sini? Kenalan yuk!',
        link: '/daftar',
        linkLabel: 'Gabung',
      });
    }

    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Sinkronkan tinggi banner ke CSS variable yang dibaca Navbar
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--bmc-banner-h',
      visible ? BANNER_HEIGHT : '0px'
    );

    // Jaga-jaga: kalau komponen unmount tanpa dismiss, reset variable
    return () => {
      document.documentElement.style.setProperty('--bmc-banner-h', '0px');
    };
  }, [visible]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('bmc_banner_dismissed', 'true');
    document.documentElement.style.setProperty('--bmc-banner-h', '0px');
  }, []);

  if (dismissed || !bannerData) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[10050] transition-all duration-400 ease-out-expo',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      )}
      style={{ height: BANNER_HEIGHT }}
    >
      <div className="h-full bg-gradient-to-r from-[#100E0C] via-[#141210] to-[#100E0C] border-b border-white/10 backdrop-blur-xl">
        <div className="h-full max-w-[1100px] mx-auto px-4 flex items-center justify-between gap-3">
          <p className="text-[11px] sm:text-[12px] text-[#E8E6E0] leading-relaxed flex-1 min-w-0 truncate">
            {bannerData.message}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={bannerData.link}
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full text-white no-underline bg-[#C0392B] hover:bg-[#A93226] transition-all duration-300"
              onClick={handleDismiss}
            >
              {bannerData.linkLabel}
            </Link>

            <button
              onClick={handleDismiss}
              aria-label="Tutup banner"
              className="w-6 h-6 flex items-center justify-center rounded-full text-[#A0A0AA] hover:text-[#E8E6E0] hover:bg-white/5 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}