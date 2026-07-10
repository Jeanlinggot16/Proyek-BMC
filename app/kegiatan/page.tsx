import Link from 'next/link';

export default function KegiatanPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Kegiatan</h1>
      <p className="text-zinc-400 mb-8">Pusat informasi kegiatan komunitas.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/kegiatan/jadwal" className="rounded-xl border border-white/10 p-5 hover:border-[#D4AF37] transition">
          <h2 className="font-semibold mb-1">Jadwal Terdekat</h2>
          <p className="text-sm text-zinc-400">Lihat agenda yang akan datang.</p>
        </Link>
        <Link href="/kegiatan/cara-ikut" className="rounded-xl border border-white/10 p-5 hover:border-[#D4AF37] transition">
          <h2 className="font-semibold mb-1">Cara Ikut</h2>
          <p className="text-sm text-zinc-400">Panduan singkat untuk peserta baru.</p>
        </Link>
      </div>
    </section>
  );
}