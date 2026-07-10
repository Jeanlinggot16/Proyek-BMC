'use client';

import { useState } from 'react';
import { TEAMS, TeamItem } from '@/constants/data';
import { SectionLabel } from '@/components/ui/SharedComponents';

export default function TimPage() {
  const [selected, setSelected] = useState<TeamItem | null>(TEAMS[0] ?? null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionLabel>Struktur Tim</SectionLabel>
      <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-4">Tim Operasional</h1>
      <p className="text-zinc-400 mb-10">
        Klik divisi untuk melihat identitas dan tanggung jawabnya.
      </p>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEAMS.map((t) => {
            const active = selected?.abbr === t.abbr;
            return (
              <button
                key={t.abbr}
                onClick={() => setSelected(t)}
                className="rounded-xl border p-4 text-left transition"
                style={{
                  borderColor: active ? '#CC1111' : 'rgba(255,255,255,0.1)',
                  background: active ? 'rgba(204,17,17,0.12)' : '#0D0D0D',
                }}
              >
                <p className="text-sm font-bold tracking-wide" style={{ color: active ? '#fff' : '#CC1111' }}>
                  {t.abbr}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">{t.fullName}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D0D0D] p-6">
          {selected ? (
            <>
              <p className="text-xs uppercase tracking-wider text-[#CC1111] font-bold mb-2">
                Divisi {selected.abbr}
              </p>
              <h2 className="text-2xl font-serif font-bold mb-1">{selected.fullName}</h2>
              <p className="text-sm text-[#D4AF37] italic mb-4">“{selected.tagline}”</p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">{selected.identity}</p>

              <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
                Tugas Pokok
              </h3>
              <ul className="space-y-2">
                {selected.responsibilities.map((r, i) => (
                  <li key={i} className="text-sm text-zinc-300 leading-relaxed">
                    • {r}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-zinc-400">Pilih salah satu divisi.</p>
          )}
        </div>
      </div>
    </section>
  );
}