import { FRIEND_VALUES } from '@/constants/data';
import { SectionLabel } from '@/components/ui/SharedComponents';

export default function NilaiPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <SectionLabel gold>Nilai Inti</SectionLabel>
      <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-4">F.R.I.E.N.D</h1>
      <p className="text-zinc-400 mb-10">
        Enam nilai sikap dasar yang menjadi budaya relasi di komunitas.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FRIEND_VALUES.map((f) => (
          <article key={f.letter} className="rounded-xl border border-white/10 p-5 bg-[#0D0D0D]">
            <div className="text-4xl font-serif font-bold text-[#CC1111] leading-none mb-2">{f.letter}</div>
            <h2 className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">{f.word}</h2>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-3">{f.sub}</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}