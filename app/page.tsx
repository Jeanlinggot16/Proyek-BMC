'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { SLIDES, STATS, PROGRAMS, TESTIMONIALS, PROG_COLOR } from '@/constants/data';
import { getNearestEvent, getLatestArchive, getRecentArchives } from '@/constants/communityData';
import useScrollReveal from '@/hooks/useScrollReveal';
import useCountUp from '@/hooks/useCountUp';
import InteractiveWeaveCanvas from '@/components/ui/InteractiveWeaveCanvas';
import { Divider, SectionLabel, ProgramCardImage } from '@/components/ui/SharedComponents';
import { cn } from '@/lib/utils';

/* ─── Sub-komponen StatItem ─────────────────────────────────────────────── */
function StatItem({ value, label, delay, start }: { value: string; label: string; delay: number; start: boolean }) {
  const isInfinity = value.includes('∞');
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.includes('+') ? '+' : '';
  const counted = useCountUp(isNaN(numericPart) ? 0 : numericPart, 1600, start);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-7 sm:px-6 sm:py-10 bg-[#0A0806] transition-all duration-800 ease-out-expo',
        start ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] font-serif tracking-tight mb-1">
        {isInfinity ? (
          <span className="text-[#C0392B]">∞</span>
        ) : (
          <>
            <span className="text-[#F5F5F5]">{counted}</span>
            {suffix && <span className="text-[#C0392B]">{suffix}</span>}
          </>
        )}
      </div>
      <div className="text-[9px] sm:text-[10px] text-[#A0A0AA] tracking-[0.12em] uppercase font-bold">
        {label}
      </div>
    </div>
  );
}

/* ─── Sub-komponen Kartu Dokumentasi (homepage) ─────────────────────────── */
function DocCard({ item, delay, visible }: { item: ReturnType<typeof getRecentArchives>[number]; delay: number; visible: boolean }) {
  const hasFoto = item.foto && item.foto.length > 0;

  return (
    <Link
      href={`/arsip/${item.slug}`}
      className={cn(
        'group relative rounded-2xl overflow-hidden bg-[#100E0C] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 no-underline flex flex-col',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0806]">
        {hasFoto ? (
          <img
            src={item.foto![0]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          // Fallback kalau arsip ini belum ada fotonya — tetap tampil rapi, tidak kosong
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8A8A94]">Dokumentasi</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/95 via-[#0C0A08]/10 to-transparent" />
        <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-[0.1em] uppercase text-[#D4AF37]">
          {item.tanggal}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold font-serif text-[#F5F5F5] mb-1.5 group-hover:text-white transition-colors leading-snug">
          {item.judul}
        </h3>
        <p className="text-[13px] text-[#9A9AA5] leading-relaxed line-clamp-2">
          {item.ringkas}
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(false);

  const { ref: statsRef, visible: statsVisible } = useScrollReveal();
  const { ref: introRef, visible: introVisible } = useScrollReveal();
  const { ref: docsRef, visible: docsVisible } = useScrollReveal();
  const { ref: progTeaserRef, visible: progTeaserVisible } = useScrollReveal();
  const { ref: testimonialRef, visible: testimonialVisible } = useScrollReveal();
  const { ref: ctaRef, visible: ctaVisible } = useScrollReveal();

  const nearest = getNearestEvent();
  const latestArchive = getLatestArchive();
  const recentDocs = getRecentArchives(3);

  /* ─── Timer Logic ─────────────────────────────────────────────────────── */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!isMountedRef.current) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
  }, [clearTimer]);

  useEffect(() => {
    isMountedRef.current = true;
    const t = setTimeout(() => setMounted(true), 100);
    startTimer();

    return () => {
      isMountedRef.current = false;
      clearTimeout(t);
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSlide = (idx: number) => {
    clearTimer();
    setActiveSlide(idx);
    startTimer();
  };

  return (
    <main aria-label="Halaman Beranda" className="overflow-x-hidden">
      {/* ─── HERO SECTION — HUMAN SPOTLIGHT ──────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-70px)] flex flex-col justify-center items-center px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpeg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Radial vignette — foto TERLIHAT di tengah, gelap hanya di pinggir */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 80% 70% at 50% 40%,
                  rgba(12,10,8,0.15) 0%,
                  rgba(12,10,8,0.35) 40%,
                  rgba(12,10,8,0.8) 100%
                ),
                linear-gradient(
                  180deg,
                  rgba(192,57,43,0.06) 0%,
                  transparent 40%,
                  rgba(12,10,8,0.3) 100%
                )
              `,
              backdropFilter: 'blur(0px)',
            }}
          />
        </div>

        {/* Interactive Canvas — dipertahankan */}
        <InteractiveWeaveCanvas />

        {/* Warm Glow Effect */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,120vw)] h-[300px] sm:h-[460px] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, rgba(192,57,43,0.04) 40%, transparent 70%)', filter: 'blur(64px)' }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl w-full text-center">
          {/* Badges */}
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-2 mb-5 sm:mb-6 transition-all duration-800 ease-out-expo',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {nearest && (
              <Link
                href="/kegiatan/jadwal"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300 no-underline"
              >
                Kegiatan terdekat: {nearest.nama} • {nearest.tanggal}
              </Link>
            )}
            {latestArchive && (
              <Link
                href={`/arsip/${latestArchive.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase text-[#E8E6E0] hover:bg-white/10 transition-all duration-300 no-underline"
              >
                Arsip terbaru: {latestArchive.judul} →
              </Link>
            )}
          </div>

          {/* Slides Container */}
          <div className="relative min-h-[280px] sm:min-h-[300px] md:min-h-[320px] mb-6 sm:mb-8">
            {SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlide;
              return (
                <div
                  key={idx}
                  aria-hidden={!isCurrent}
                  className={cn(
                    'transition-all duration-1200 ease-out-expo',
                    isCurrent
                      ? 'relative opacity-100 translate-y-0 scale-100'
                      : 'absolute inset-0 opacity-0 translate-y-6 scale-95 pointer-events-none'
                  )}
                >
                  <span className="block text-[9px] sm:text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] sm:tracking-[0.35em] uppercase mb-3 sm:mb-4">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[4.2rem] font-extrabold leading-[1.15] text-[#F5F5F5] font-serif tracking-tight mb-4">
                    {slide.title}
                    <br />
                    <span className="text-[#C0392B] [text-shadow:0_0_30px_rgba(192,57,43,0.2)]">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p className="text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] text-[#C4C4CE] max-w-xl mx-auto mt-4 sm:mt-5 leading-relaxed">
                    {slide.desc}
                  </p>
                  <div className="mt-7 sm:mt-9 flex justify-center gap-3.5">
                    <Link
                      href={`/${slide.ctaPage === 'home' ? '' : slide.ctaPage}`}
                      className="bmc-shine inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-white no-underline bg-[#C0392B] hover:bg-[#A93226] shadow-[0_0_30px_rgba(192,57,43,0.35)] hover:shadow-[0_0_40px_rgba(192,57,43,0.5)] transition-all duration-300 animate-warm-pulse"
                    >
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div
            className={cn(
              'flex justify-center items-center gap-3 transition-opacity duration-600',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className={cn(
                  'h-1 rounded-full border-none cursor-pointer p-0 transition-all duration-450 ease-out-expo',
                  idx === activeSlide
                    ? 'w-8 bg-[#C0392B] shadow-[0_0_10px_rgba(192,57,43,0.5)]'
                    : 'w-2 bg-white/10 hover:bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.15em] uppercase text-white/70">Gulir Kebawah</span>
          <div className="w-px h-6 sm:h-7 bg-gradient-to-b from-[#C0392B] to-transparent" />
        </div>
      </section>

      {/* ─── STATS (Floating Card) ────────────────────────────────────────── */}
      <div className="relative z-20 px-4 -mt-10 sm:-mt-14 max-w-5xl mx-auto">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/10 bg-[#100E0C]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {STATS.map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} delay={i * 100} start={statsVisible} />
          ))}
        </div>
      </div>

      {/* ─── INTRO / SIAPA KAMI — DIPANGKAS, FOKUS KE FOTO ────────────────── */}
      <section ref={introRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 max-w-[1100px] mx-auto">
        {/* Warm ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, rgba(192,57,43,0.03) 40%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left Column — teks dipangkas jadi satu paragraf singkat, sisanya sudah lengkap di /tentang */}
          <div>
            <SectionLabel>Siapa Kami?</SectionLabel>
            <h2
              className={cn(
                'text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold text-[#F5F5F5] font-serif tracking-tight leading-tight mb-6 transition-all duration-800 ease-out-expo',
                introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '80ms' }}
            >
              Komunitas yang Merajut <br />
              <span className="text-[#C0392B]">Persaudaraan Lintas Batas</span>
            </h2>
            <p
              className={cn(
                'text-sm text-[#B8B8C0] leading-relaxed mb-8 transition-all duration-800 ease-out-expo',
                introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '160ms' }}
            >
              Ruang dialog inklusif bagi pemuda Sulawesi Utara untuk merajut perbedaan menjadi kekuatan, tanpa sekat prasangka.
            </p>
            <div
              className={cn(
                'transition-all duration-800 ease-out-expo',
                introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '240ms' }}
            >
              <Link
                href="/tentang"
                className="text-[11px] font-bold text-[#D4AF37] tracking-[0.15em] uppercase pb-1 border-b border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300 no-underline"
              >
                Pelajari Filosofi &amp; Visi Kami &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column — FOTO KOMUNITAS + QUOTE */}
          <div
            className={cn(
              'relative transition-all duration-800 ease-out-expo',
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 h-full min-h-[380px] group">
              {/* Foto kegiatan — diskusi atau pengukuhan */}
              <img
                src="/diskusi.jpg"
                alt="Anggota Benang Merah Community berdiskusi dengan hangat"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay — gelap hanya di bawah untuk teks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/90 via-[#0C0A08]/15 to-transparent" />

              {/* Quote overlay di bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="text-[#E8E6E0] text-base sm:text-lg italic font-serif leading-relaxed mb-3">
                  &ldquo;Persaudaraan sejati dimulai dari keberanian untuk berdialog, bukan dari keseragaman yang dipaksakan.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {/* Foto member tersenyum */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/30">
                    <img
                      src="/arthur.JPG"
                      alt="Member tersenyum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#F5F5F5]">Arthur</div>
                    <div className="text-[10px] text-[#B8B8C0]">Anggota Aktif</div>
                  </div>
                </div>
              </div>

              {/* Gold accent line */}
              <div className="absolute top-4 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOKUMENTASI TERBARU — GALERI DARI ARSIP ──────────────────────── */}
      <Divider />
      <section ref={docsRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 bg-pattern-thread">
        <div className="max-w-[1100px] mx-auto">
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12 transition-all duration-800 ease-out-expo',
              docsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <div>
              <SectionLabel gold>Dokumentasi</SectionLabel>
              <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif text-[#F5F5F5]">
                Jejak Kegiatan Terbaru
              </h2>
            </div>
            <Link
              href="/arsip"
              className="text-[11px] font-bold text-[#D4AF37] tracking-[0.1em] uppercase pb-1 border-b border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300 no-underline whitespace-nowrap"
            >
              Lihat Semua Arsip &rarr;
            </Link>
          </div>

          {recentDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentDocs.map((item, i) => (
                <DocCard key={item.slug} item={item} delay={i * 120} visible={docsVisible} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8A8A94] text-center py-10">Belum ada dokumentasi kegiatan.</p>
          )}
        </div>
      </section>

      {/* ─── PROGRAM TEASER ───────────────────────────────────────────────── */}
      <Divider />
      <section ref={progTeaserRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 bg-white/[0.01] bg-pattern-dialog">
        <div className="max-w-[1100px] mx-auto">
          <div
            className={cn(
              'text-center mb-12 sm:mb-14 transition-all duration-800 ease-out-expo',
              progTeaserVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <SectionLabel gold>Program Utama Kami</SectionLabel>
            <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-4 text-[#F5F5F5]">
              Kegiatan Merajut Kebersamaan
            </h2>
            <p className="text-sm text-[#B8B8C0] max-w-[520px] mx-auto leading-relaxed">
              Setiap program dirancang untuk membuka ruang diskusi yang jujur, menumbuhkan empati, dan melahirkan karya kreatif bersama terbuka untuk semua kalangan di Sulawesi Utara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMS.slice(0, 3).map((p, i) => {
              const c = PROG_COLOR[p.color] || PROG_COLOR.red;
              return (
                <article
                  key={p.code}
                  className={cn(
                    'relative rounded-2xl p-7 sm:p-8 bg-[#100E0C] border border-white/5 hover:border-white/10 transition-all duration-500 group',
                    progTeaserVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  )}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Subtle warm accent di pojok */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-2xl opacity-[0.03] pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${c.tag}, transparent 70%)` }}
                  />

                  <ProgramCardImage program={p} isHovered={false} />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: c.tag }}>{p.focus}</span>
                    <span
                      className="text-[9px] font-bold px-2.5 py-1 rounded-full border"
                      style={{ background: c.tagBg, borderColor: c.border, color: c.tag }}
                    >
                      {p.freq}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif mb-3 text-[#F5F5F5] group-hover:text-white transition-colors">{p.name}</h3>
                  <p className="text-[13px] text-[#B8B8C0] leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[11px] text-[#D4AF37] font-medium">Jadwal:</span>
                    <span className="text-[11px] text-[#A0A0AA]">{p.schedule}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            className={cn(
              'text-center mt-10 sm:mt-12 transition-all duration-800 ease-out-expo',
              progTeaserVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <Link
              href="/program"
              className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-full text-[#D4AF37] border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 no-underline"
            >
              Lihat Seluruh Detail Program →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL — WARM & PERSONAL ────────────────────────────────── */}
      <Divider />
      <section ref={testimonialRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 bg-pattern-weave">
        {/* Warm ambient glow di belakang */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, rgba(192,57,43,0.03) 40%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="max-w-[800px] mx-auto text-center">
          <div
            className={cn(
              'transition-all duration-800 ease-out-expo',
              testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <SectionLabel>Suara Dari Anggota</SectionLabel>
            <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-9 sm:mb-10 text-[#F5F5F5]">
              Suara Pertumbuhan Bersama
            </h2>
          </div>

          <div
            className={cn(
              'relative min-h-[280px] sm:min-h-[260px] flex items-center justify-center transition-all duration-800 ease-out-expo',
              testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '120ms' }}
          >
            {TESTIMONIALS.map((t, idx) => {
              const isCurrent = idx === activeTestimonial;
              return (
                <div
                  key={idx}
                  className={cn(
                    'transition-all duration-500 ease-out-expo',
                    isCurrent
                      ? 'relative opacity-100 scale-100'
                      : 'absolute inset-0 opacity-0 scale-95 pointer-events-none'
                  )}
                >
                  {/* Quote dengan tanda kutip dekoratif */}
                  <div className="relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl text-[#D4AF37]/15 font-serif select-none">
                      &ldquo;
                    </span>
                    <blockquote className="text-base sm:text-lg italic text-[#E8E6E0] leading-relaxed mb-6 font-serif px-2 pt-4">
                      {t.quote}
                    </blockquote>
                  </div>

                  {/* Author dengan avatar */}
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2"
                      style={{
                        background: t.color === 'red' ? 'rgba(192,57,43,0.12)' : 'rgba(212,175,55,0.12)',
                        borderColor: t.color === 'red' ? 'rgba(192,57,43,0.25)' : 'rgba(212,175,55,0.25)',
                        color: t.color === 'red' ? '#C0392B' : '#D4AF37',
                      }}
                    >
                      {t.initials}
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold text-[#F5F5F5]">{t.author}</div>
                      <div className="text-[11px] text-[#A0A0AA]">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div
            className={cn(
              'flex justify-center gap-2.5 mt-8 transition-all duration-800 ease-out-expo',
              testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={cn(
                  'w-2.5 h-2.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300',
                  i === activeTestimonial
                    ? 'bg-[#C0392B] scale-110'
                    : 'bg-white/10 hover:bg-white/20'
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA AKHIR — WARM INVITATION ──────────────────────────────────── */}
      <Divider />
      <section
        ref={ctaRef}
        className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 text-center bg-gradient-to-b from-transparent via-[#C0392B]/[0.03] to-transparent"
      >
        {/* Warm glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div
          className={cn(
            'max-w-[600px] mx-auto transition-all duration-800 ease-out-expo',
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <SectionLabel>Mari Bertumbuh</SectionLabel>
          <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-4 text-[#F5F5F5]">
            Siap Merajut Helai Benang Anda?
          </h2>
          <p className="text-sm text-[#B8B8C0] leading-relaxed mb-9 sm:mb-10">
            Kami selalu menyediakan tempat duduk dan kopi hangat bagi siapa pun yang ingin ngobrol dengan terbuka di Manado.
          </p>

          {/* Tombol dengan warm pulse */}
          <Link
            href="/daftar"
            className="bmc-shine animate-warm-pulse inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 sm:px-11 sm:py-4 rounded-full text-white no-underline bg-[#C0392B] hover:bg-[#A93226] shadow-[0_0_30px_rgba(192,57,43,0.3)] hover:shadow-[0_0_40px_rgba(192,57,43,0.45)] transition-all duration-300"
          >
            Isi Formulir Bergabung &rarr;
          </Link>

          {/* Subtle invitation text */}
          <p className="text-[11px] text-[#A0A0AA] mt-5 italic">
            Atau cukup datang dan ngobrol — pintu kami selalu terbuka.
          </p>
        </div>
      </section>
    </main>
  );
}