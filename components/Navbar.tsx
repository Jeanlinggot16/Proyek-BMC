'use client';

// components/navbar.tsx
// BMC MANADO — Navbar Level 3 "Prestige"
// Fitur: scroll-aware · active link · mobile full-screen overlay · magnetic CTA · logo shimmer

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/* ─── KONFIGURASI NAVIGASI ────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/program', label: 'Program' },
  { href: '/daftar',  label: 'Daftar' },
  { href: '/kontak',  label: 'Kontak' },
];

/* ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname          = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [logoError,   setLogoError]   = useState(false);
  const [isMounted,   setIsMounted]   = useState(false);

  // Ref untuk magnetic button
  const ctaRef   = useRef<HTMLAnchorElement>(null);
  const magOffset = useRef({ x: 0, y: 0 });

  /* ── Mount ── */
  useEffect(() => { setIsMounted(true); }, []);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Tutup mobile menu saat route berubah ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ── Kunci scroll body saat mobile menu terbuka ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Magnetic CTA button ── */
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el   = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.35;
    const dy   = (e.clientY - cy) * 0.35;
    magOffset.current = { x: dx, y: dy };
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  };

  const handleCtaMouseLeave = () => {
    const el = ctaRef.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0) scale(1)';
    magOffset.current  = { x: 0, y: 0 };
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          NAVBAR BAR
      ════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(6, 6, 6, 0.85)'
            : 'rgba(6, 6, 6, 0)',
          backdropFilter:       scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(31, 31, 31, 0.8)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0, 0, 0, 0.4)'
            : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── LOGO ── */}
          <LogoMark
            isMounted={isMounted}
            logoError={logoError}
            setLogoError={setLogoError}
            isActive={pathname === '/'}
          />

          {/* ── DESKTOP LINKS ── */}
          <DesktopLinks pathname={pathname} />

          {/* ── DESKTOP CTA ── */}
          <Link
            ref={ctaRef}
            href="/daftar"
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="hidden md:inline-flex items-center gap-1.5 relative overflow-hidden
                       bg-[#CC1111] text-white text-[11px] font-bold tracking-[0.1em]
                       uppercase px-5 py-2.5 rounded-full
                       transition-colors duration-300 hover:bg-[#AA0A0A]"
            style={{
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 0 20px rgba(204,17,17,0.3)',
            }}
          >
            {/* Shimmer sweep saat hover */}
            <span
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-bar 1.5s linear infinite',
              }}
              aria-hidden="true"
            />
            <span className="relative z-10">Gabung</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>

          {/* ── HAMBURGER (mobile) ── */}
          <HamburgerButton
            open={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          />
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
      ════════════════════════════════════════════════════════ */}
      <MobileOverlay open={mobileOpen} pathname={pathname} />
    </>
  );
}

/* ─── SUB-KOMPONEN: LOGO ──────────────────────────────────────────────────── */
function LogoMark({
  isMounted,
  logoError,
  setLogoError,
  isActive,
}: {
  isMounted:    boolean;
  logoError:    boolean;
  setLogoError: (v: boolean) => void;
  isActive:     boolean;
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label="BMC Manado — Beranda"
    >
      {/* Logo image / infinity fallback */}
      <span
        className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden
                   transition-all duration-500 group-hover:scale-110"
        style={{ background: 'rgba(204,17,17,0.1)', border: '1px solid rgba(204,17,17,0.2)' }}
      >
        {isMounted && !logoError ? (
          <img
            src="/logo-bmc.png"
            alt=""
            onError={() => setLogoError(true)}
            className="h-5 w-auto object-contain"
          />
        ) : (
          <span
            className="text-[#CC1111] text-lg font-serif leading-none
                       transition-all duration-500 group-hover:text-[#D4AF37]"
          >
            ∞
          </span>
        )}

        {/* Shimmer sweep on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(212,175,55,0.15) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className="text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300
                     group-hover:text-[#CC1111]"
          style={{ fontFamily: 'var(--font-sans)', color: '#F5F5F5' }}
        >
          BMC
        </span>
        <span
          className="text-[9px] tracking-[0.15em] uppercase"
          style={{ color: '#52525B' }}
        >
          Manado
        </span>
      </span>
    </Link>
  );
}

/* ─── SUB-KOMPONEN: DESKTOP LINKS ─────────────────────────────────────────── */
function DesktopLinks({ pathname }: { pathname: string }) {
  return (
    <ul className="hidden md:flex items-center gap-8" role="list">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive =
          href === '/'
            ? pathname === '/'
            : pathname.startsWith(href);

        return (
          <li key={href}>
            <Link
              href={href}
              className="relative group text-[11px] font-semibold tracking-[0.12em] uppercase
                         transition-colors duration-300"
              style={{ color: isActive ? '#F5F5F5' : '#52525B' }}
            >
              {label}

              {/* Underline indicator */}
              <span
                className="absolute -bottom-0.5 left-0 h-px transition-all duration-400 rounded-full"
                style={{
                  width:      isActive ? '100%' : '0%',
                  background: isActive
                    ? 'linear-gradient(90deg, #CC1111, #D4AF37)'
                    : '#CC1111',
                  opacity: isActive ? 1 : 0,
                }}
                aria-hidden="true"
              />

              {/* Hover underline (semua link non-active) */}
              {!isActive && (
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#CC1111]
                             group-hover:w-full transition-all duration-400 rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ─── SUB-KOMPONEN: HAMBURGER BUTTON ──────────────────────────────────────── */
function HamburgerButton({
  open,
  onClick,
}: {
  open:    boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Tutup menu' : 'Buka menu'}
      aria-expanded={open}
      className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5
                 rounded-lg transition-colors duration-300 hover:bg-white/5"
    >
      {/* Bar atas */}
      <span
        className="block h-px w-5 bg-[#F5F5F5] rounded-full transition-all duration-400"
        style={{
          transformOrigin: 'center',
          transform: open
            ? 'translateY(4px) rotate(45deg)'
            : 'translateY(0) rotate(0)',
        }}
      />
      {/* Bar tengah */}
      <span
        className="block h-px bg-[#F5F5F5] rounded-full transition-all duration-300"
        style={{
          width:   open ? '0px' : '20px',
          opacity: open ? 0 : 1,
        }}
      />
      {/* Bar bawah */}
      <span
        className="block h-px w-5 bg-[#F5F5F5] rounded-full transition-all duration-400"
        style={{
          transformOrigin: 'center',
          transform: open
            ? 'translateY(-4px) rotate(-45deg)'
            : 'translateY(0) rotate(0)',
        }}
      />
    </button>
  );
}

/* ─── SUB-KOMPONEN: MOBILE OVERLAY ───────────────────────────────────────── */
function MobileOverlay({
  open,
  pathname,
}: {
  open:     boolean;
  pathname: string;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          background:    open ? 'rgba(6,6,6,0.98)' : 'rgba(6,6,6,0)',
          backdropFilter: open ? 'blur(32px)' : 'none',
          pointerEvents: open ? 'all' : 'none',
          opacity:       open ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Overlay Panel */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-between p-8 pt-24 pb-12"
        style={{ pointerEvents: open ? 'all' : 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Links */}
        <nav>
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map(({ href, label }, idx) => {
              const isActive =
                href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href);

              return (
                <li
                  key={href}
                  style={{
                    opacity:    open ? 1 : 0,
                    transform:  open ? 'translateX(0)' : 'translateX(-24px)',
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? idx * 60 + 100 : 0}ms,
                                 transform 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? idx * 60 + 100 : 0}ms`,
                  }}
                >
                  <Link
                    href={href}
                    className="group flex items-baseline gap-4 py-4 border-b
                               transition-colors duration-300"
                    style={{ borderColor: 'rgba(31,31,31,0.6)' }}
                  >
                    {/* Nomor urut */}
                    <span
                      className="text-[10px] font-mono w-6 shrink-0 transition-colors duration-300
                                 group-hover:text-[#CC1111]"
                      style={{ color: '#2A2A2A' }}
                    >
                      0{idx + 1}
                    </span>

                    {/* Label */}
                    <span
                      className="transition-colors duration-300 group-hover:text-[#CC1111]"
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'clamp(2rem, 8vw, 3rem)',
                        fontWeight:    600,
                        letterSpacing: '-0.02em',
                        lineHeight:    1,
                        color: isActive ? '#F5F5F5' : '#3A3A3A',
                      }}
                    >
                      {label}
                    </span>

                    {/* Arrow indicator saat active */}
                    {isActive && (
                      <span
                        className="text-[#CC1111] text-sm ml-auto"
                        aria-label="Halaman aktif"
                      >
                        ←
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer overlay */}
        <div
          style={{
            opacity:    open ? 1 : 0,
            transform:  open ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.6s ease ${open ? '500ms' : '0ms'},
                         transform 0.6s ease ${open ? '500ms' : '0ms'}`,
          }}
        >
          {/* CTA mobile */}
          <Link
            href="/daftar"
            className="block w-full text-center bg-[#CC1111] hover:bg-[#AA0A0A]
                       text-white text-xs font-bold tracking-[0.12em] uppercase
                       py-4 rounded-2xl mb-8 transition-colors duration-300"
            style={{ boxShadow: '0 0 30px rgba(204,17,17,0.25)' }}
          >
            Gabung Komunitas →
          </Link>

          {/* Tagline */}
          <p
            className="text-center text-[10px] tracking-[0.25em] uppercase"
            style={{ color: '#2A2A2A' }}
          >
            Berdamai · Bertumbuh · Berkarya
          </p>
        </div>
      </div>
    </>
  );
}