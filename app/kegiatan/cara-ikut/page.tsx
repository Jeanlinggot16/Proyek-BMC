import Link from 'next/link';

export default function CaraIkutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Cara Ikut</h1>
      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
        <li>Lihat jadwal kegiatan terdekat.</li>
        <li>Isi formulir gabung.</li>
        <li>Tunggu konfirmasi dari tim.</li>
      </ol>

      <div className="mt-8">
        <Link href="/daftar" className="inline-block rounded-full bg-[#CC1111] px-6 py-3 text-sm font-bold uppercase tracking-wider">
          Gabung Sekarang →
        </Link>
      </div>
    </section>
  );
}