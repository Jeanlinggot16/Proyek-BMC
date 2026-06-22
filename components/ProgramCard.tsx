'use client';

// components/program-card.tsx
// BMC MANADO — ProgramCard Level 3 "Prestige"
// Fitur: card flip 3D · stagger reveal · expand detail · badge jadwal · icon unik

import { useState } from 'react';

/* ─── TIPE DATA ───────────────────────────────────────────────────────────── */
export interface ProgramData {
  title:      string;
  schedule:   string;
  freq:       'Bulanan' | 'Tahunan';
  focus:      string;
  desc:       string;
  activities: string[];
  color:      'red' | 'gold' | 'rose';
  icon:       React.ReactNode;
}

/* ─── DATA PROGRAM (dari app/program/page.tsx) ────────────────────────────── */
export const PROGRAMS: ProgramData[] = [
  {
    title:    'TENUN',
    schedule: 'Sabtu, Minggu Kedua',
    freq:     'Bulanan',
    focus:    'Belajar Mendengar',
    desc:     'Tenun adalah proses menyatukan benang-benang berbeda menjadi kain yang utuh dan bermakna — melambangkan dialog yang sehat di tengah perbedaan.',
    activities: [
      'Diskusi santai lintas iman, budaya, dan disiplin ilmu',
      'Bedah buku, film, atau artikel isu sosial kemanusiaan',
      'Dialog bersama akademisi, praktisi, dan tokoh masyarakat',
    ],
    color: 'red',
    icon:  <IconTenun />,
  },
  {
    title:    'ANYAMAN',
    schedule: 'Sabtu, Minggu Keempat',
    freq:     'Bulanan',
    focus:    'Mengembangkan Potensi',
    desc:     'Anyaman melambangkan proses membentuk diri secara sadar, konsisten, dan penuh kesabaran — setiap individu adalah benang yang sedang dirawat.',
    activities: [
      'Seni: musik, puisi, rupa, fotografi, film pendek',
      'Public speaking & storytelling',
      'Refleksi diri dan ekspresi kreatif',
    ],
    color: 'gold',
    icon:  <IconAnyaman />,
  },
  {
    title:    'TFT',
    schedule: 'Program Tahunan',
    freq:     'Tahunan',
    focus:    'Belajar Memimpin',
    desc:     'Training For Trainers — pembinaan fasilitator dan calon penggerak komunitas untuk menjaga kesinambungan nilai dan budaya BMC.',
    activities: [
      'Pelatihan fasilitator kelompok',
      'Kepemimpinan transformatif & manajemen komunitas',
      'Resolusi konflik sosial',
    ],
    color: 'red',
    icon:  <IconTFT />,
  },
  {
    title:    'RAJUT',
    schedule: 'Program Tahunan',
    freq:     'Tahunan',
    focus:    'Menciptakan Dampak',
    desc:     'Karya kolektif hasil dari proses kecil yang konsisten — melambangkan aksi nyata dari pertumbuhan kedewasaan pemuda.',
    activities: [
      'Pentas seni budaya & workshop publik',
      'Kolaborasi dengan UMKM dan komunitas lokal',
      'Penggalangan dana sosial',
    ],
    color: 'gold',
    icon:  <IconRajut />,
  },
  {
    title:    'SIMPUL',
    schedule: 'Program Tahunan',
    freq:     'Tahunan',
    focus:    'Merawat Persaudaraan',
    desc:     'Silaturahmi lintas iman pada momen besar keagamaan sebagai wujud nyata dari perdamaian yang inklusif.',
    activities: [
      'Perayaan bersama Natal dan Lebaran',
      'Doa dan refleksi lintas iman',
      'Kunjungan dan aksi sosial',
    ],
    color: 'rose',
    icon:  <IconSimpul />,
  },
];

/* ─── PALET WARNA PER PROGRAM ─────────────────────────────────────────────── */
const COLOR_MAP = {
  red: {
    glow:       'rgba(204,17,17,0.12)',
    border:     'rgba(204,17,17,0.25)',
    borderHov:  'rgba(204,17,17,0.5)',
    tag:        '#CC1111',
    tagBg:      'rgba(204,17,17,0.08)',
    dot:        '#CC1111',
    iconBg:     'rgba(204,17,17,0.08)',
  },
  gold: {
    glow:       'rgba(212,175,55,0.1)',
    border:     'rgba(212,175,55,0.2)',
    borderHov:  'rgba(212,175,55,0.45)',
    tag:        '#D4AF37',
    tagBg:      'rgba(212,175,55,0.06)',
    dot:        '#D4AF37',
    iconBg:     'rgba(212,175,55,0.07)',
  },
  rose: {
    glow:       'rgba(251,113,133,0.1)',
    border:     'rgba(251,113,133,0.2)',
    borderHov:  'rgba(251,113,133,0.45)',
    tag:        '#FB7185',
    tagBg:      'rgba(251,113,133,0.07)',
    dot:        '#FB7185',
    iconBg:     'rgba(251,113,133,0.07)',
  },
} as const;

/* ─── KOMPONEN KARTU TUNGGAL ──────────────────────────────────────────────── */
export function ProgramCard({
  program,
  index = 0,
}: {
  program: ProgramData;
  index?:  number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const c = COLOR_MAP[program.color];

  return (
    <article
      className="reveal"
      data-delay={String(index * 100)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border:       `1px solid ${hovered ? c.borderHov : c.border}`,
        background:   '#111111',
        padding:      '2rem',
        transition:   'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:    hovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 60px ${c.glow}`
          : '0 0 0 transparent',
        cursor: 'default',
      }}
    >
      {/* ── Header ── */}
      <header className="flex items-start justify-between gap-4 mb-5">

        {/* Ikon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                     transition-all duration-500"
          style={{
            background: c.iconBg,
            border:     `1px solid ${c.border}`,
            transform:  hovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0)',
          }}
        >
          {program.icon}
        </div>

        {/* Badge jadwal */}
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{ color: c.tag, background: c.tagBg }}
          >
            {program.freq}
          </span>
          <span
            className="text-[9px] tracking-[0.1em]"
            style={{ color: '#3A3A3A' }}
          >
            {program.schedule}
          </span>
        </div>
      </header>

      {/* ── Title & focus ── */}
      <div className="mb-4">
        <span
          className="block text-[9px] font-bold tracking-[0.22em] uppercase mb-2"
          style={{ color: c.tag }}
        >
          {program.focus}
        </span>
        <h3
          className="text-2xl font-bold mb-3 transition-colors duration-300"
          style={{
            fontFamily:    'var(--font-display)',
            letterSpacing: '-0.01em',
            color:         hovered ? '#F5F5F5' : '#E8E6E0',
          }}
        >
          {program.title}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: '#52525B' }}
        >
          {program.desc}
        </p>
      </div>

      {/* ── Divider ── */}
      <div
        className="my-5 h-px transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${c.tag}40, transparent)`
            : 'rgba(31,31,31,0.8)',
        }}
      />

      {/* ── Accordion: Kegiatan ── */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between gap-2 text-left
                   transition-colors duration-300 group"
        aria-expanded={expanded}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.15em] uppercase
                     transition-colors duration-300"
          style={{ color: expanded ? c.tag : '#3A3A3A' }}
        >
          Kegiatan Program
        </span>
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0
                     transition-all duration-400"
          style={{
            background: expanded ? c.tagBg : 'rgba(31,31,31,0.6)',
            border:     `1px solid ${expanded ? c.border : 'transparent'}`,
            transform:  expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke={expanded ? c.tag : '#3A3A3A'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* ── Detail kegiatan (accordion body) ── */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded ? '300px' : '0px',
          opacity:   expanded ? 1 : 0,
        }}
      >
        <ul className="mt-4 space-y-3" role="list">
          {program.activities.map((act, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{
                opacity:    expanded ? 1 : 0,
                transform:  expanded ? 'translateX(0)' : 'translateX(-8px)',
                transition: `opacity 0.4s ease ${i * 60 + 80}ms,
                             transform 0.4s ease ${i * 60 + 80}ms`,
              }}
            >
              <span
                className="w-1 h-1 rounded-full mt-2 shrink-0"
                style={{ background: c.dot }}
              />
              <span
                className="text-xs leading-relaxed"
                style={{ color: '#52525B' }}
              >
                {act}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ─── KOMPONEN GRID (dipakai di app/program/page.tsx) ─────────────────────── */
export default function ProgramGrid() {
  return (
    <section className="section-padding">
      <div className="container-bmc">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="text-eyebrow tag-gold block mb-3">
            Kegiatan Kami
          </span>
          <h2 className="text-display-md text-white mb-4">
            Lima Program BMC
          </h2>
          <p className="text-body">
            Setiap program adalah satu helai benang — dirajut bersama menjadi
            kain persaudaraan yang kuat dan bermakna.
          </p>
        </div>

        {/* Grid kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program, idx) => (
            <ProgramCard key={program.title} program={program} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── IKON SVG PER PROGRAM ────────────────────────────────────────────────── */

function IconTenun() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CC1111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 12h18M3 18h18M6 3v18M12 3v18M18 3v18"/>
    </svg>
  );
}

function IconAnyaman() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function IconTFT() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CC1111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}

function IconRajut() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4l3 3"/>
    </svg>
  );
}

function IconSimpul() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB7185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  );
}