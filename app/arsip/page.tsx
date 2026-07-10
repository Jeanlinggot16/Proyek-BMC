'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getCombinedArchives } from '@/constants/communityData';
import SearchInput from '@/components/ui/SearchInput';

const MONTHS = [
  'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const PAGE_SIZE = 6;

export default function ArsipPage() {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<string>('Semua Tahun');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const allArchives = useMemo(() => getCombinedArchives(), []);

  const years = useMemo(() => {
    const ys = Array.from(new Set(allArchives.map((e) => new Date(e.tanggal).getFullYear().toString())));
    return ['Semua Tahun', ...ys.sort()];
  }, [allArchives]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return allArchives.filter((item) => {
      const d = new Date(item.tanggal);
      const m = d.getMonth() + 1;
      const y = d.getFullYear().toString();

      const monthOk = month === 0 || m === month;
      const yearOk = year === 'Semua Tahun' || y === year;

      const searchTarget = `${item.judul} ${item.ringkas} ${item.isi.join(' ')}`.toLowerCase();
      const searchOk = !query || searchTarget.includes(query);

      return monthOk && yearOk && searchOk;
    });
  }, [allArchives, month, year, q]);

  // Reset ke halaman 1 saat filter/search berubah
  useEffect(() => {
    setPage(1);
  }, [month, year, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Arsip Kegiatan</h1>
      <p className="text-zinc-400 mb-8">Dokumentasi dan ringkasan kegiatan sebelumnya.</p>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          {MONTHS.map((m, idx) => (
            <option key={m} value={idx}>{m}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <SearchInput value={q} onChange={setQ} placeholder="Cari judul, ringkasan, isi arsip..." />
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-400">Belum ada arsip pada filter/pencarian ini.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            {paginated.map((item) => (
              <Link
                key={item.slug}
                href={`/arsip/${item.slug}`}
                className="rounded-xl border border-white/10 p-5 hover:border-[#D4AF37] transition"
              >
                <p className="text-xs text-[#D4AF37] mb-1">{item.tanggal}</p>
                <h2 className="font-semibold mb-1">{item.judul}</h2>
                <p className="text-sm text-zinc-400">{item.ringkas}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">
              Menampilkan {start + 1}-{Math.min(start + PAGE_SIZE, filtered.length)} dari {filtered.length} arsip
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3 py-2 text-xs rounded-lg border border-white/10 disabled:opacity-40"
              >
                ← Sebelumnya
              </button>

              <span className="text-xs text-zinc-400">
                Halaman {safePage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-3 py-2 text-xs rounded-lg border border-white/10 disabled:opacity-40"
              >
                Berikutnya →
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
