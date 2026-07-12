'use client';

import Link from 'next/link';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { getCombinedArchives } from '@/constants/communityData';
import SearchInput from '@/components/ui/SearchInput';
import { cn } from '@/lib/utils';

/* ─── Constants ─── */
const MONTHS = [
  'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
] as const;

const PAGE_SIZE = 6;

/* ─── Sub-komponen Kartu Arsip ─── */
function ArchiveCard({ item }: { item: ReturnType<typeof getCombinedArchives>[number] }) {
  return (
    <Link
      href={`/arsip/${item.slug}`}
      className="group relative rounded-xl border border-white/5 bg-[#0D0D0D]/80 backdrop-blur-sm overflow-hidden hover:border-[#D4AF37]/40 hover:bg-[#0D0D0D] transition-all duration-300 flex flex-col h-full"
    >
      {/* Thumbnail — cuma tampil kalau arsip ini punya foto dokumentasi */}
      {item.foto && item.foto.length > 0 && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={item.foto[0]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Tanggal badge */}
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-[0.08em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full mb-4">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {item.tanggal}
        </span>

        {/* Judul */}
        <h2 className="font-bold text-[#F5F5F5] text-lg mb-2.5 group-hover:text-white transition-colors leading-snug">
          {item.judul}
        </h2>

        {/* Ringkasan */}
        <p className="text-sm text-[#9A9AA5] leading-relaxed line-clamp-3 flex-1">
          {item.ringkas}
        </p>

        {/* Read more indicator */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-[#D4AF37] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-0 group-hover:translate-x-1 transition-transform">
            Baca selengkapnya →
          </span>
          <span className="text-[10px] text-[#8A8A94] font-medium uppercase tracking-wider">
            Arsip
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Komponen Pagination (dipisahkan) ─── */
function Pagination({
  page,
  totalPages,
  filteredLength,
  start,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  filteredLength: number;
  start: number;
  onPageChange: (newPage: number) => void;
}) {
  const end = Math.min(start + PAGE_SIZE, filteredLength);

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
      {/* Info */}
      <p className="text-xs text-[#8A8A94] font-medium order-2 sm:order-1">
        Menampilkan{' '}
        <span className="text-[#E8E6E0] font-bold">{start + 1}</span>
        {' '}-{' '}
        <span className="text-[#E8E6E0] font-bold">{end}</span>
        {' '}dari{' '}
        <span className="text-[#D4AF37] font-bold">{filteredLength}</span> arsip
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={cn(
            'px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-300',
            page === 1
              ? 'border-white/5 text-[#8A8A94]/40 cursor-not-allowed'
              : 'border-white/10 text-[#E8E6E0] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 active:scale-95'
          )}
        >
          ← Sebelumnya
        </button>

        {/* Page indicator */}
        <div className="flex items-center gap-1 px-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'w-8 h-8 text-xs font-bold rounded-lg transition-all duration-300',
                p === page
                  ? 'bg-[#CC1111] text-white shadow-[0_0_12px_rgba(204,17,17,0.4)]'
                  : 'text-[#8A8A94] hover:text-[#E8E6E0] hover:bg-white/5'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={cn(
            'px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-300',
            page === totalPages
              ? 'border-white/5 text-[#8A8A94]/40 cursor-not-allowed'
              : 'border-white/10 text-[#E8E6E0] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 active:scale-95'
          )}
        >
          Berikutnya →
        </button>
      </div>
    </div>
  );
}

/* ─── Komponen Utama ─── */
export default function ArsipPage() {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<string>('Semua Tahun');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  // Data arsip gabungan (static, hanya dipanggil sekali)
  const allArchives = useMemo(() => getCombinedArchives(), []);

  // Daftar tahun unik
  const years = useMemo(() => {
    const ys = Array.from(
      new Set(allArchives.map((item) => new Date(item.tanggal).getFullYear().toString()))
    );
    return ['Semua Tahun', ...ys.sort((a, b) => b.localeCompare(a))]; // Terbaru dulu
  }, [allArchives]);

  // Filter logic
  const getFilteredArchives = useCallback(() => {
    const query = q.trim().toLowerCase();

    return allArchives.filter((item) => {
      const d = new Date(item.tanggal);
      const m = d.getMonth() + 1;
      const y = d.getFullYear().toString();

      if (month !== 0 && m !== month) return false;
      if (year !== 'Semua Tahun' && y !== year) return false;

      if (query) {
        const searchTarget = `${item.judul} ${item.ringkas} ${item.isi.join(' ')}`.toLowerCase();
        if (!searchTarget.includes(query)) return false;
      }

      return true;
    });
  }, [allArchives, month, year, q]);

  const filtered = useMemo(() => getFilteredArchives(), [getFilteredArchives]);

  // Reset halaman ke 1 setiap kali filter berubah
  useEffect(() => {
    setPage(1);
  }, [month, year, q]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  // Handler paging yang aman (clamp)
  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(totalPages, newPage)));
    },
    [totalPages]
  );

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
          Dokumentasi
        </span>
        <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-[#F5F5F5] font-serif tracking-tight leading-tight mb-3">
          Arsip Kegiatan
        </h1>
        <p className="text-sm text-[#9A9AA5] max-w-xl leading-relaxed">
          Dokumentasi dan ringkasan kegiatan yang telah terlaksana. Telusuri perjalanan komunitas kami.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
        {/* Select Bulan */}
        <div className="relative flex-1 min-w-[160px]">
          <label htmlFor="archive-filter-month" className="sr-only">Filter Bulan</label>
          <select
            id="archive-filter-month"
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
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-[#8A8A94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Select Tahun */}
        <div className="relative flex-1 min-w-[140px]">
          <label htmlFor="archive-filter-year" className="sr-only">Filter Tahun</label>
          <select
            id="archive-filter-year"
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

        {/* Search */}
        <div className="flex-[2] min-w-[200px]">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Cari judul, ringkasan, isi arsip..."
          />
        </div>
      </div>

      {/* Hasil */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 opacity-30">📂</div>
          <p className="text-[#9A9AA5] text-lg font-medium">Belum ada arsip pada filter ini.</p>
          <p className="text-sm text-[#8A8A94] mt-1">Coba ubah bulan, tahun, atau kata kunci pencarian.</p>
        </div>
      ) : (
        <>
          {/* Counter */}
          <p className="text-xs text-[#8A8A94] mb-5 font-medium tracking-wide uppercase">
            Ditemukan <span className="text-[#D4AF37] font-bold">{filtered.length}</span> arsip
            {filtered.length > PAGE_SIZE && (
              <span className="text-[#8A8A94]"> • Halaman {safePage} dari {totalPages}</span>
            )}
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {paginated.map((item) => (
              <ArchiveCard key={item.slug} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              filteredLength={filtered.length}
              start={start}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}