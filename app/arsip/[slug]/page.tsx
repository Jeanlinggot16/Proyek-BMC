import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCombinedArchives } from '@/constants/communityData';

export default async function ArsipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Sebelumnya cuma cek array ARCHIVES manual, jadi arsip yang dibuat
  // otomatis dari EVENTS yang sudah lewat (lewat getCombinedArchives)
  // selalu 404 kalau diklik dari halaman /arsip. Sekarang dicek dari
  // gabungan otomatis + manual, sama seperti yang dipakai listing-nya.
  const item = getCombinedArchives().find((x) => x.slug === slug);

  if (!item) notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/arsip"
        className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-[#D4AF37] hover:text-[#F5F5F5] transition-colors duration-300 no-underline mb-6"
      >
        ← Kembali ke Arsip
      </Link>

      <p className="text-xs text-[#D4AF37] mb-2">{item.tanggal}</p>
      <h1 className="text-3xl font-bold mb-4 text-[#F5F5F5] font-serif">{item.judul}</h1>
      <p className="text-zinc-300 leading-relaxed mb-6">{item.ringkas}</p>

      {/* Galeri foto dokumentasi — cuma tampil kalau field foto diisi */}
      {item.foto && item.foto.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {item.foto.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
              <img
                src={src}
                alt={`Dokumentasi ${item.judul} ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      <ul className="list-disc pl-5 space-y-2 text-zinc-300">
        {item.isi.map((poin, idx) => (
          <li key={idx}>{poin}</li>
        ))}
      </ul>
    </section>
  );
}