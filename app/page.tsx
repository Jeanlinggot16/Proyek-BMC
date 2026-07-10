// app/page.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { SLIDES, STATS, PROGRAMS, TESTIMONIALS, PROG_COLOR } from '@/constants/data';
import { getNearestEvent, getLatestArchive } from '@/constants/communityData';
import useScrollReveal from '@/hooks/useScrollReveal';
import useCountUp from '@/hooks/useCountUp';
import InteractiveWeaveCanvas from '@/components/ui/InteractiveWeaveCanvas';
import { Divider, SectionLabel, ProgramCardImage } from '@/components/ui/SharedComponents';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { ref: statsRef,       visible: statsVisible       } = useScrollReveal();
  const { ref: introRef,       visible: introVisible       } = useScrollReveal();
  const { ref: progTeaserRef,  visible: progTeaserVisible  } = useScrollReveal();
  const { ref: testimonialRef, visible: testimonialVisible } = useScrollReveal();
  const { ref: ctaRef,         visible: ctaVisible         } = useScrollReveal();

  const nearest = getNearestEvent();
  const latestArchive = getLatestArchive();

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    startTimer();
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToSlide = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveSlide(idx);
    startTimer();
  };

  const fadeUp = (visible: boolean, delay = 0): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section aria-label="Halaman Beranda">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[calc(100vh-70px)] flex flex-col justify-center items-center px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 overflow-hidden">
        <InteractiveWeaveCanvas />

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,120vw)] h-[300px] sm:h-[460px] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse, rgba(204,17,17,0.08) 0%, transparent 70%)', filter: 'blur(64px)' }}
        />

        <div className="relative z-10 max-w-4xl w-full text-center pointer-events-none">
          
          {/* BADGE BARU */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 mb-5 sm:mb-6 pointer-events-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            {nearest && (
              <Link
                href="/kegiatan/jadwal"
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase no-underline transition"
                style={{
                  borderColor: 'rgba(212,175,55,0.35)',
                  background: 'rgba(212,175,55,0.10)',
                  color: '#D4AF37',
                }}
              >
                Kegiatan terdekat: {nearest.nama} • {nearest.tanggal}
              </Link>
            )}

            {latestArchive && (
              <Link
                href={`/arsip/${latestArchive.slug}`}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase no-underline transition"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#E8E6E0',
                }}
              >
                Arsip terbaru: {latestArchive.judul} →
              </Link>
            )}
          </div>

          <div className="relative min-h-[280px] sm:min-h-[300px] md:min-h-[300px] mb-6 sm:mb-8">
            {SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlide;
              return (
                <div
                  key={idx}
                  aria-hidden={!isCurrent}
                  className={cn(
                    isCurrent ? 'relative' : 'absolute',
                    'inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
                  )}
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                >
                  <span className="block text-[9px] sm:text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] sm:tracking-[0.35em] uppercase mb-3 sm:mb-4">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[4.2rem] font-extrabold leading-[1.15] text-[#F5F5F5] font-serif tracking-[-0.02em] mb-4">
                    {slide.title}
                    <br />
                    <span className="text-[#CC1111]" style={{ textShadow: '0 0 30px rgba(204,17,17,0.2)' }}>{slide.highlight}</span>
                  </h1>
                  <p className="text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] text-[#9A9AA5] max-w-xl mx-auto mt-4 sm:mt-5 leading-[1.8]">
                    {slide.desc}
                  </p>
                  <div className="mt-7 sm:mt-9 flex justify-center gap-3.5">
                    <Link
                      href={`/${slide.ctaPage === 'home' ? '' : slide.ctaPage}`}
                      className="bmc-shine inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-white no-underline pointer-events-auto transition-all duration-300"
                      style={{ background: '#CC1111', boxShadow: '0 0 30px rgba(204,17,17,0.35)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#AA0A0A';
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(204,17,17,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#CC1111';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(204,17,17,0.35)';
                      }}
                    >
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex justify-center items-center gap-3 pointer-events-auto"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}
          >
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className="h-1 rounded-full border-none cursor-pointer p-0 transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: idx === activeSlide ? '32px' : '8px',
                  background: idx === activeSlide ? '#CC1111' : 'rgba(255,255,255,0.1)',
                  boxShadow: idx === activeSlide ? '0 0 10px rgba(204,17,17,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.15em] uppercase">Gulir Kebawah</span>
          <div className="w-px h-6 sm:h-7" style={{ background: 'linear-gradient(180deg, #CC1111, transparent)' }} />
        </div>
      </div>

      {/* ─── STATS ────────────────────────────────────────────────────────── */}
      <Divider />
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {STATS.map((s, i) => (
          <StatItem key={i} value={s.value} label={s.label} delay={i * 100} start={statsVisible} />
        ))}
      </div>
      <Divider />

      {/* ─── INTRO / SIAPA KAMI ───────────────────────────────────────────── */}
      <section ref={introRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <SectionLabel>Siapa Kami?</SectionLabel>
            <h2
              style={fadeUp(introVisible, 80)}
              className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold text-[#F5F5F5] font-serif tracking-[-0.02em] leading-[1.25] mb-6"
            >
              Komunitas yang Merajut <br />
              <span className="text-[#CC1111]">Persaudaraan Lintas Batas</span>
            </h2>
            <p style={fadeUp(introVisible, 160)} className="text-sm text-[#B4B4BD] leading-[1.85] mb-5">
              Benang Merah Community lahir dari sebuah kepedulian tulus di Manado: bahwa di tengah dunia yang terpolarisasi, persaudaraan sejati bukan didapat dengan menghapus perbedaan, melainkan dengan{' '}
              <strong className="font-bold text-[#E8E6E0]">merajutnya</strong>.
            </p>
            <p style={fadeUp(introVisible, 240)} className="text-sm text-[#9A9AA5] leading-[1.8] mb-8">
              Kami memfasilitasi ruang dialog sehat tanpa sekat dogma dan kecurigaan. Kami percaya bahwa lewat perjumpaan, kita bisa berdamai secara utuh, bertumbuh secara sadar, dan berkarya secara konsisten.
            </p>
            <div style={fadeUp(introVisible, 320)}>
              <Link
                href="/tentang"
                className="text-[11px] font-bold text-[#D4AF37] tracking-[0.15em] uppercase pb-1 no-underline transition-colors duration-300"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)')}
              >
                Pelajari Filosofi &amp; Visi Kami &rarr;
              </Link>
            </div>
          </div>

          <div style={fadeUp(introVisible, 200)} className="relative">
            <div
              className="rounded-3xl p-7 sm:p-9 relative"
              style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #121212 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="absolute top-4 right-4 text-3xl opacity-10 font-serif">∞</div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-5 font-serif">Tiga pilar Perjalanan</h3>
              <ul className="flex flex-col gap-5 list-none p-0">
                <li className="flex gap-4">
                  <span className="text-2xl shrink-0">☮️</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#FF5555] tracking-[0.08em]">BERDAMAI (Visi)</h4>
                    <p className="text-xs text-[#9A9AA5] leading-[1.6]">Pemulihan relasi secara utuh dan tulus dengan Tuhan, diri sendiri, sesama, dan alam semesta.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl shrink-0">🌱</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#D4AF37] tracking-[0.08em]">BERTUMBUH (Misi)</h4>
                    <p className="text-xs text-[#9A9AA5] leading-[1.6]">Menumbuhkan kedewasaan berpikir kritis, kematangan emosi, dan mengenali potensi diri.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl shrink-0">✨</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#FB7185] tracking-[0.08em]">BERKARYA (Misi)</h4>
                    <p className="text-xs text-[#9A9AA5] leading-[1.6]">Meluapkan hasil pertumbuhan ke dalam kreasi nyata yang bertanggung jawab bagi publik.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAM TEASER ───────────────────────────────────────────────── */}
      <Divider />
      <section ref={progTeaserRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={fadeUp(progTeaserVisible, 0)} className="text-center mb-12 sm:mb-14">
            <SectionLabel gold>Program Utama Kami</SectionLabel>
            <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-4">
              Kegiatan Merajut Kebersamaan
            </h2>
            <p className="text-sm text-[#9A9AA5] max-w-[520px] mx-auto leading-[1.7]">
              Every program is intentionally designed to trigger smart discussions, social empathy, and creative art forms among North Sulawesi youth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMS.slice(0, 3).map((p, i) => {
              const c = PROG_COLOR[p.color] || PROG_COLOR.red;
              return (
                <article
                  key={p.code}
                  className="relative rounded-2xl p-7 sm:p-8"
                  style={{
                    background: '#0D0D0D',
                    border: '1px solid rgba(255,255,255,0.05)',
                    opacity: progTeaserVisible ? 1 : 0,
                    transform: progTeaserVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
                  }}
                >
                  <ProgramCardImage program={p} isHovered={false} />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: c.tag }}>{p.focus}</span>
                    <span
                      className="text-[9px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: c.tagBg, border: `1px solid ${c.border}`, color: c.tag }}
                    >
                      {p.freq}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif mb-3">{p.name}</h3>
                  <p className="text-[13px] text-[#9A9AA5] leading-[1.7] mb-6">{p.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#D4AF37]">Jadwal:</span>
                    <span className="text-[11px] text-[#B4B4BD]">{p.schedule}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={fadeUp(progTeaserVisible, 300)} className="text-center mt-10 sm:mt-12">
            <Link
              href="/program"
              className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-full text-[#D4AF37] no-underline transition-all duration-300"
              style={{ border: '1px solid rgba(212,175,55,0.25)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)')}
            >
              Lihat Seluruh Detail Program →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ──────────────────────────────────────────────────── */}
      <Divider />
      <section ref={testimonialRef} className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="max-w-[800px] mx-auto text-center">
          <div style={fadeUp(testimonialVisible, 0)}>
            <SectionLabel>Suara Dari Anggota</SectionLabel>
            <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-9 sm:mb-10">Suara Pertumbuhan Bersama</h2>
          </div>

          <div style={{ ...fadeUp(testimonialVisible, 120) }} className="relative min-h-[280px] sm:min-h-[260px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => {
              const isCurrent = idx === activeTestimonial;
              return (
                <div
                  key={idx}
                  className={cn(isCurrent ? 'relative' : 'absolute', 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]')}
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? 'scale(1)' : 'scale(0.95)',
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                >
                  <blockquote className="text-base sm:text-lg italic text-[#D4AF37] leading-[1.8] mb-6 font-serif px-2">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                      style={{
                        background: t.color === 'red' ? 'rgba(204,17,17,0.15)' : 'rgba(212,175,55,0.15)',
                        color: t.color === 'red' ? '#CC1111' : '#D4AF37',
                      }}
                    >
                      {t.initials}
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold text-[#E8E6E0]">{t.author}</div>
                      <div className="text-[11px] text-[#8A8A94]">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ ...fadeUp(testimonialVisible, 200) }} className="flex justify-center gap-2.5 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="w-1.5 h-1.5 rounded-full border-none cursor-pointer p-0"
                style={{ background: i === activeTestimonial ? '#CC1111' : 'rgba(255,255,255,0.1)' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA AKHIR ────────────────────────────────────────────────────── */}
      <Divider />
      <section
        ref={ctaRef}
        className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-24 text-center"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(204,17,17,0.04) 50%, transparent)' }}
      >
        <div style={fadeUp(ctaVisible, 0)} className="max-w-[600px] mx-auto">
          <SectionLabel>Mari Bertumbuh</SectionLabel>
          <h2 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold font-serif mb-4">Siap Merajut Helai Benang Anda?</h2>
          <p className="text-sm text-[#9A9AA5] leading-[1.8] mb-9 sm:mb-10">
            Kami selalu menyediakan tempat duduk ekstra dan cangkir kopi hangat bagi siapa pun yang bersedia berdialog secara asertif di Manado.
          </p>
          <Link
            href="/daftar"
            className="bmc-shine inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 sm:px-11 sm:py-4 rounded-full text-white no-underline transition-all duration-300"
            style={{ background: '#CC1111', boxShadow: '0 0 30px rgba(204,17,17,0.3)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#AA0A0A';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(204,17,17,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#CC1111';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(204,17,17,0.3)';
            }}
          >
            Isi Formulir Bergabung &rarr;
          </Link>
        </div>
      </section>

    </section>
  );
}

/* ─── Angka statistik yang menghitung naik saat masuk layar ─── */
function StatItem({ value, label, delay, start }: { value: string; label: string; delay: number; start: boolean }) {
  const isInfinity = value.includes('∞');
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.includes('+') ? '+' : '';

  const counted = useCountUp(isNaN(numericPart) ? 0 : numericPart, 1600, start);

  return (
    <div
      className="text-center px-4 py-7 sm:px-6 sm:py-10"
      style={{
        background: '#060606',
        opacity: start ? 1 : 0,
        transform: start ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] font-serif tracking-[-0.02em] mb-1">
        {isInfinity ? (
          <span className="text-[#CC1111]">∞</span>
        ) : (
          <>
            <span className="text-[#F5F5F5]">{counted}</span>
            {suffix && <span className="text-[#CC1111]">{suffix}</span>}
          </>
        )}
      </div>
      <div className="text-[9px] sm:text-[10px] text-[#8A8A94] tracking-[0.12em] uppercase font-bold">
        {label}
      </div>
    </div>
  );
}