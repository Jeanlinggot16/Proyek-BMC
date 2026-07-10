import { SectionLabel } from '@/components/ui/SharedComponents';

export default function VisiMisiPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionLabel>Fondasi Komunitas</SectionLabel>
      <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
        Visi & Misi Benang Merah Community
      </h1>
      <p className="text-zinc-400 leading-relaxed mb-10">
        Kami merajut ruang aman lintas latar belakang di Manado, agar setiap orang bisa berdamai,
        bertumbuh, dan berkarya bersama.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <article className="rounded-xl border border-white/10 p-5 bg-[#0D0D0D]">
          <h2 className="text-sm uppercase tracking-wider text-[#FF5555] font-bold mb-2">Visi</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Berdamai: pemulihan relasi yang utuh dengan Tuhan, diri sendiri, sesama, dan alam.
          </p>
        </article>

        <article className="rounded-xl border border-white/10 p-5 bg-[#0D0D0D]">
          <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] font-bold mb-2">Misi 1</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Bertumbuh: menumbuhkan kedewasaan berpikir, emosi, dan karakter.
          </p>
        </article>

        <article className="rounded-xl border border-white/10 p-5 bg-[#0D0D0D]">
          <h2 className="text-sm uppercase tracking-wider text-[#FB7185] font-bold mb-2">Misi 2</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Berkarya: mewujudkan pertumbuhan dalam karya nyata yang berdampak sosial.
          </p>
        </article>
      </div>
    </section>
  );
}