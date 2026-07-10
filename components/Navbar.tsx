'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OfficialBMCLogo from '@/components/ui/OfficialBMCLogo';
import { cn } from '@/lib/utils';

type SubItem = { href: string; label: string };
type NavItem = {
  label: string;
  href?: string;
  children?: SubItem[];
  cta?: boolean;
};

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
    ],
  },
  {
    label: 'Arsip',
    children: [{ href: '/arsip', label: 'Dokumentasi Kegiatan' }],
  },
  { label: 'Gabung', href: '/daftar', cta: true },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const desktopNavRef = useRef<HTMLDivElement>(null);

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

  const pillClass = cn(
    'pointer-events-auto backdrop-blur-xl border border-white/8 transition-[background,box-shadow] duration-300',
    scrolled ? 'bg-[#0A0A0A]/78 shadow-[0_10px_36px_rgba(0,0,0,0.55)]' : 'bg-[#0D0D0D]/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between',
        'px-4 py-3 sm:px-6 sm:py-4',
        'pointer-events-none transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        hidden ? '-translate-y-[120%] opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        onClick={() => {
          setMobileMenuOpen(false);
          setOpenDesktopDropdown(null);
        }}
        className={cn(
          pillClass,
          'flex items-center px-3 py-2 rounded-full z-[10002] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]'
        )}
      >
        <OfficialBMCLogo height={32} animated={true} />
      </Link>

      {/* Desktop */}
      <nav
        ref={desktopNavRef}
        className={cn(pillClass, 'hidden md:flex relative items-center gap-1 p-1.5 rounded-full')}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = isItemActive(item);
          const hasChildren = !!item.children?.length;
          const isOpen = openDesktopDropdown === item.label;

          if (item.cta && item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative z-[1] ml-1 bg-[#CC1111] text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase px-3.5 py-2 lg:px-5 lg:py-2.5 rounded-full text-white no-underline whitespace-nowrap shadow-[0_0_16px_rgba(204,17,17,0.35)] transition-all duration-300 hover:bg-[#AA0A0A] hover:shadow-[0_0_22px_rgba(204,17,17,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]"
              >
                {item.label} →
              </Link>
            );
          }

          if (hasChildren) {
            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDesktopDropdown((prev) => (prev === item.label ? null : item.label))}
                  className={cn(
                    'relative z-[1] flex items-center gap-1 text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase',
                    'px-2.5 py-2 lg:px-4 lg:py-2.5 rounded-full whitespace-nowrap transition-colors duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]',
                    isActive ? 'text-[#F5F5F5]' : 'text-[#A1A1AA]'
                  )}
                >
                  {item.label}
                  <span className={cn('text-[10px] transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0')}>▾</span>
                </button>

                {isOpen && (
                  <div
                    className="absolute top-[110%] left-0 min-w-[240px] rounded-2xl p-2 z-[10010]"
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
                'relative z-[1] text-[10px] lg:text-[11px] font-bold tracking-[0.08em] lg:tracking-[0.12em] uppercase',
                'px-2.5 py-2 lg:px-4 lg:py-2.5 rounded-full whitespace-nowrap no-underline transition-colors duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]',
                isActive ? 'text-[#F5F5F5]' : 'text-[#A1A1AA]'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="bmc-mobile-panel"
        className={cn(
          pillClass,
          'flex md:hidden items-center justify-center text-[#E8E6E0] text-xl cursor-pointer rounded-full z-[10002]',
          'w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]'
        )}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="pointer-events-auto fixed inset-0 z-[10000]"
          onClick={() => setMobileMenuOpen(false)}
          style={{ background: 'rgba(0,0,0,0.4)', animation: 'overlayFade 0.3s ease' }}
        />
      )}

      {/* Mobile Panel */}
      {mobileMenuOpen && (
        <div
          id="bmc-mobile-panel"
          role="dialog"
          aria-label="Menu navigasi"
          className="pointer-events-auto fixed top-[68px] left-4 right-4 sm:left-6 sm:right-6 z-[10001] rounded-2xl overflow-hidden md:hidden"
          style={{
            background: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            animation: 'panelDropIn 0.35s cubic-bezier(0.16,1,0.3,1)',
            maxHeight: 'calc(100vh - 90px)',
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
                    className="mx-3 my-2 rounded-full bg-[#CC1111] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white no-underline"
                    style={{
                      animation: 'panelItemIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
                      animationDelay: `${0.04 * idx + 0.05}s`,
                    }}
                  >
                    {item.label} →
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
                        'w-full flex items-center justify-between px-5 py-3.5 text-left font-serif text-base',
                        isActive ? 'text-[#D4AF37]' : 'text-[#E8E6E0]'
                      )}
                    >
                      <span>{item.label}</span>
                      <span className={cn('text-sm transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0')}>▾</span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
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
                                'block px-8 py-2.5 text-[13px] no-underline',
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
                    'border-b border-white/5 px-5 py-3.5 font-serif text-base no-underline',
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
  );
}
