'use client';

import { useMemo, useState, useCallback } from 'react';
import { EVENTS } from '@/constants/communityData';
import SearchInput from '@/components/ui/SearchInput';

/* ─── Constants ─── */
const MONTHS = [
  'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
] as const;

/* ─── Sub-komponen Kartu Kegiatan (dipisahkan untuk readability) ─── */
function EventCard({ item }: { item: typeof EVENTS[number] }) {
  return (
    <article className="group rounded-xl border border-white/5 bg-[#0D0D0D]/80 backdrop-blur-sm p-5 hover:border-[#D4AF37]/30 hover:bg-[#0D0D0D] transition-all duration-300">
      {/* Badge tanggal & jam */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {item.tanggal}
        </span>
        {item.jam && (
          <span className="text-[11px] text-[#8A8A94] font-medium">
            • {item.jam}
          </span>
        )}
      </div>

      {/* Judul */}
      <h2 className="font-bold text-[#F5F5F5] text-lg mb-2 group-hover:text-white transition-colors leading-snug">
        {item.nama}
      </h2>

      {/* Lokasi */}
      <div className="flex items-center gap-1.5 text-sm text-[#9A9AA5] mb-3">
        <svg className="w-3.5 h-3.5 shrink-0 text-[#CC1111]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {item.lokasi}
      </div>

      {/* Deskripsi */}
      <p className="text-sm text-[#B4B4BD] leading-relaxed line-clamp-3">
        {item.deskripsi}
      </p>
    </article>
  );
}

/* ─── Komponen Utama ─── */
export default function JadwalPage() {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<string>('Semua Tahun');
  const [q, setQ] = useState('');

  // Ekstrak daftar tahun unik dari data event
  const years = useMemo(() => {
    const ys = Array.from(
      new Set(EVENTS.map((e) => new Date(e.tanggal).getFullYear().toString()))
    );
    return ['Semua Tahun', ...ys.sort((a, b) => b.localeCompare(a))]; // Tahun terbaru dulu
  }, []);

  // Filter & search logic — dibungkus useCallback untuk prediktabilitas
  const getFilteredEvents = useCallback(() => {
    const query = q.trim().toLowerCase();

    return EVENTS.filter((e) => {
      const d = new Date(e.tanggal);
      const m = d.getMonth() + 1;
      const y = d.getFullYear().toString();

      if (month !== 0 && m !== month) return false;
      if (year !== 'Semua Tahun' && y !== year) return false;

      if (query) {
        const searchTarget = `${e.nama} ${e.lokasi} ${e.deskripsi}`.toLowerCase();
        if (!searchTarget.includes(query)) return false;
      }

      return true;
    }).sort((a, b) => a.tanggal.localeCompare(b.tanggal)); // Ascending: terdekat dulu
  }, [month, year, q]);

  const filtered = useMemo(() => getFilteredEvents(), [getFilteredEvents]);

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
          Agenda
        </span>
        <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-[#F5F5F5] font-serif tracking-tight leading-tight mb-3">
          Jadwal Kegiatan
        </h1>
        <p className="text-sm text-[#9A9AA5] max-w-xl leading-relaxed">
          Agenda kegiatan yang akan datang. Gunakan filter untuk menemukan kegiatan berdasarkan bulan atau tahun.
        </p>
      </div>

      {/* Filter Bar — redesigned dengan Tailwind penuh */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
        {/* Select Bulan */}
        <div className="relative flex-1 min-w-[160px]">
          <label htmlFor="filter-month" className="sr-only">Filter Bulan</label>
          <select
            id="filter-month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full appearance-none bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-[#E8E6E0] font-medium cursor-pointer hover:border-white/20 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300"
          >
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx} className="bg-[#121212] text-[#E8E6E0]">
                {m}
              </option>
            ))}
          </select>
          {/* Custom chevron icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-[#8A8A94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Select Tahun */}
        <div className="relative flex-1 min-w-[140px]">
          <label htmlFor="filter-year" className="sr-only">Filter Tahun</label>
          <select
            id="filter-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full appearance-none bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-[#E8E6E0] font-medium cursor-pointer hover:border-white/20 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-[#121212] text-[#E8E6E0]">
                {y}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-[#8A8A94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search Input — flex lebih besar */}
        <div className="flex-[2] min-w-[200px]">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Cari nama kegiatan, lokasi, deskripsi..."
          />
        </div>
      </div>

      {/* Hasil */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 opacity-30">📅</div>
          <p className="text-[#9A9AA5] text-lg font-medium">Belum ada jadwal pada filter ini.</p>
          <p className="text-sm text-[#8A8A94] mt-1">Coba ubah bulan, tahun, atau kata kunci pencarian.</p>
        </div>
      ) : (
        <>
          {/* Counter info */}
          <p className="text-xs text-[#8A8A94] mb-5 font-medium tracking-wide uppercase">
            Ditemukan <span className="text-[#D4AF37] font-bold">{filtered.length}</span> kegiatan
          </p>

          {/* List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
