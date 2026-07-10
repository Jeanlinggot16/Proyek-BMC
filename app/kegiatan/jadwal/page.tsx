'use client';

import { useMemo, useState } from 'react';
import { EVENTS } from '@/constants/communityData';
import SearchInput from '@/components/ui/SearchInput';

const MONTHS = [
  'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export default function JadwalPage() {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<string>('Semua Tahun');
  const [q, setQ] = useState('');

  const years = useMemo(() => {
    const ys = Array.from(new Set(EVENTS.map((e) => new Date(e.tanggal).getFullYear().toString())));
    return ['Semua Tahun', ...ys.sort()];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return EVENTS.filter((e) => {
      const d = new Date(e.tanggal);
      const m = d.getMonth() + 1;
      const y = d.getFullYear().toString();

      const monthOk = month === 0 || m === month;
      const yearOk = year === 'Semua Tahun' || y === year;

      const searchTarget = `${e.nama} ${e.lokasi} ${e.deskripsi}`.toLowerCase();
      const searchOk = !query || searchTarget.includes(query);

      return monthOk && yearOk && searchOk;
    }).sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  }, [month, year, q]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Jadwal Terdekat</h1>
      <p className="text-zinc-400 mb-8">Agenda kegiatan yang akan datang.</p>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm">
          {MONTHS.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm">
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>

        <SearchInput value={q} onChange={setQ} placeholder="Cari nama kegiatan, lokasi, deskripsi..." />
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-400">Belum ada jadwal pada filter/pencarian ini.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 p-4">
              <div className="text-xs text-[#D4AF37] mb-1">{item.tanggal} • {item.jam}</div>
              <h2 className="font-semibold">{item.nama}</h2>
              <p className="text-sm text-zinc-400">{item.lokasi}</p>
              <p className="text-sm text-zinc-300 mt-2">{item.deskripsi}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}