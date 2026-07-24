// FILE: components/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OfficialBMCLogo from '@/components/ui/OfficialBMCLogo';
import { cn } from '@/lib/utils';
import { getNearestEvent } from '@/constants/communityData';

type SubItem = { href: string; label: string };
type NavItem = {
  label: string;
  href?: string;
  children?: SubItem[];
  cta?: boolean;
};

// Menata ulang menu navigasi: "Donasi" menjadi menu biasa, "Gabung" menjadi tombol CTA paling kanan
const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Kegiatan',
    children: [
      { href: '/kegiatan/jadwal', label: 'Jadwal Terdekat' },
      { href: '/kegiatan', label: 'Kalender Kegiatan' },
      { href: '/kegiatan/cara-ikut', label: 'Cara Ikut' },
    ],
  },
  {
    label: 'Tentang',
    children: [
      { href: '/tentang/visi-misi', label: 'Visi & Misi' },
      { href: '/tentang/nilai', label: 'Nilai Inti' },
      { href: '/tentang/tim', label: 'Struktur Tim' },
      { href: '/tentang/faq', label: 'FAQ' },
      { href: '/kontak', label: 'Hubungi Kami' },
    ],
  },
  {
    label: 'Arsip',
    children: [{ href: '/arsip', label: 'Dokumentasi Kegiatan' }],
  },
  { label: 'Donasi', href: '/donasi' },
  { label: 'Gabung', href: '/daftar', cta: true },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const lastScrollY = useRef(0);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  const nearestEvent = getNearestEvent();

  const isActivePath = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const isItemActive = (item: NavItem) => {
    if (item.href) return isActivePath(item.href);
    if (item.children?.length) return item.children.some((c) => isActivePath(c.href));
    return false;
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (mobileMenuOpen) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      if (y < 120) {
        setHidden(false);
      } else if (y > lastScrollY.current + 6) {
        setHidden(true);
      } else if (y < lastScrollY.current - 6) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(e.target as Node)) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const hasActiveBanner = nearestEvent && showBanner;

  return (
    <>
      {/* 1. BANNER ANNOUNCEMENT SOROTAN (Fixed di Paling Atas) */}
      {hasActiveBanner && (
        <div className="fixed top-0 left-0 right-0 z-[10000] h-[40px] bg-[#111111] border-b border-white/10 text-white text-[11px] sm:text-xs px-4 flex items-center justify-between">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-base" role="img" aria-label="calendar">🗓️</span>
              <p className="truncate font-medium text-white/90">
                <span className="font-bold text-white">{nearestEvent.nama}</span> — {nearestEvent.tanggal}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/kegiatan/jadwal"
                className="bg-[#C0392B] hover:bg-[#A93226] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all"
              >
                LIHAT DETAIL
              </Link>
              <button
                onClick={() => setShowBanner(false)}
                className="text-white/60 hover:text-white text-sm p-1 transition-colors"
                aria-label="Tutup Banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADER FLOATING NAVBAR (Posisi top menyesuaikan apakah banner aktif atau tidak) */}
      <header
        className={cn(
          'fixed left-0 right-0 z-[9999] px-4 py-3 sm:px-6 sm:py-4',
          'transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          hasActiveBanner ? 'top-[40px]' : 'top-0',
          hidden ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'
        )}
      >
        {/* Container Utama: Menyatukan semua bagian ke dalam satu baris horizontal terpusat */}
        <div
          className={cn(
            'max-w-6xl mx-auto w-full flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 rounded-full',
            'backdrop-blur-xl border border-white/8 transition-[background,box-shadow] duration-300',
            scrolled ? 'bg-[#0A0A0A]/85 shadow-[0_10px_36px_rgba(0,0,0,0.55)]' : 'bg-[#0D0D0D]/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          )}
        >
          {/* SISI KIRI: Logo Terintegrasi */}
          <Link
            href="/"
            onClick={() => {
              setMobileMenuOpen(false);
              setOpenDesktopDropdown(null);
            }}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606] rounded-full p-1"
          >
            <OfficialBMCLogo height={30} animated={true} />
          </Link>

          {/* SISI TENGAH: Menu Navigasi Berbaris Rapi (Hanya Tampil di Desktop) */}
          <nav
            ref={desktopNavRef}
            className="hidden md:flex items-center justify-center gap-1.5 flex-1 mx-4"
          >
            {NAV_ITEMS.filter(item => !item.cta).map((item) => {
              const isActive = isItemActive(item);
              const hasChildren = !!item.children?.length;
              const isOpen = openDesktopDropdown === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDesktopDropdown((prev) => (prev === item.label ? null : item.label))}
                      className={cn(
                        'flex items-center gap-1 text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase',
                        'px-2.5 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap transition-colors duration-300',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]',
                        isActive ? 'text-[#F5F5F5]' : 'text-[#A1A1AA] hover:text-white'
                      )}
                    >
                      {item.label}
                      <span className={cn('text-[9px] transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0')}>▾</span>
                    </button>

                    {isOpen && (
                      <div
                        className="absolute top-[120%] left-1/2 -translate-x-1/2 min-w-[240px] rounded-2xl p-2 z-[10010]"
                        style={{
                          background: 'rgba(10,10,10,0.98)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                          animation: 'panelDropIn 0.25s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        {item.children!.map((sub) => {
                          const subActive = isActivePath(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpenDesktopDropdown(null)}
                              className={cn(
                                'block rounded-xl px-3 py-2.5 text-[11px] font-semibold tracking-[0.04em] no-underline transition-colors',
                                subActive ? 'text-[#D4AF37] bg-white/5' : 'text-[#E8E6E0] hover:bg-white/5'
                              )}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    'text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase',
                    'px-2.5 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap no-underline transition-colors duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]',
                    isActive ? 'text-[#F5F5F5]' : 'text-[#A1A1AA] hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* SISI KANAN: Tombol Gabung (CTA) Paling Kanan */}
          <div className="flex items-center gap-2">
            {NAV_ITEMS.filter(item => item.cta).map((item) => (
              <Link
                key={item.label}
                href={item.href!}
                className="hidden md:inline-flex bg-[#C0392B] text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase px-5 py-2.5 rounded-full text-white no-underline whitespace-nowrap shadow-[0_0_16px_rgba(192,57,43,0.35)] transition-all duration-300 hover:bg-[#A93226] hover:shadow-[0_0_22px_rgba(192,57,43,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]"
              >
                {item.label} 👋
              </Link>
            ))}

            {/* Hamburger Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="bmc-mobile-panel"
              className="flex md:hidden items-center justify-center text-[#E8E6E0] text-lg cursor-pointer rounded-full w-9 h-9 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Backdrop Mobile Panel */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[10000]"
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', animation: 'overlayFade 0.3s ease' }}
          />
        )}

        {/* Mobile Drawer Panel */}
        {mobileMenuOpen && (
          <div
            id="bmc-mobile-panel"
            role="dialog"
            aria-label="Menu navigasi"
            className="fixed top-[74px] left-4 right-4 sm:left-6 sm:right-6 z-[10001] rounded-2xl overflow-hidden md:hidden"
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              animation: 'panelDropIn 0.35s cubic-bezier(0.16,1,0.3,1)',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="relative z-[1] flex flex-col py-2">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = isItemActive(item);
                const hasChildren = !!item.children?.length;

                if (item.cta && item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-3 my-2 rounded-full bg-[#C0392B] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white no-underline"
                      style={{
                        animation: 'panelItemIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
                        animationDelay: `${0.04 * idx + 0.05}s`,
                      }}
                    >
                      {item.label} 👋
                    </Link>
                  );
                }

                if (hasChildren) {
                  const isOpen = openMobileAccordion === item.label;
                  return (
                    <div
                      key={item.label}
                      className="border-b border-white/5"
                      style={{
                        animation: 'panelItemIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
                        animationDelay: `${0.04 * idx + 0.05}s`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenMobileAccordion((prev) => (prev === item.label ? null : item.label))}
                        className={cn(
                          'w-full flex items-center justify-between px-5 py-3.5 text-left font-serif text-sm',
                          isActive ? 'text-[#D4AF37]' : 'text-[#E8E6E0]'
                        )}
                      >
                        <span>{item.label}</span>
                        <span className={cn('text-xs transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0')}>▾</span>
                      </button>

                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
                      >
                        <div className="pb-2">
                          {item.children!.map((sub) => {
                            const subActive = isActivePath(sub.href);
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  'block px-8 py-2.5 text-[12px] no-underline',
                                  subActive ? 'text-[#D4AF37]' : 'text-[#B4B4BD]'
                                )}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'border-b border-white/5 px-5 py-3.5 font-serif text-sm no-underline',
                      isActive ? 'text-[#D4AF37]' : 'text-[#E8E6E0]'
                    )}
                    style={{
                      animation: 'panelItemIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
                      animationDelay: `${0.04 * idx + 0.05}s`,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div
              className="relative z-[1] text-center py-3 text-[9px] font-bold tracking-[0.3em] uppercase text-[#D4AF37]"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              Berdamai • Bertumbuh • Berkarya
            </div>
          </div>
        )}
      </header>
    </>
  );
}