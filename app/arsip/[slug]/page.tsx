import { notFound } from 'next/navigation';
import { ARCHIVES } from '@/constants/communityData';

export default async function ArsipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ARCHIVES.find((x) => x.slug === slug);

  if (!item) notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs text-[#D4AF37] mb-2">{item.tanggal}</p>
      <h1 className="text-3xl font-bold mb-4">{item.judul}</h1>
      <p className="text-zinc-300 leading-relaxed mb-6">{item.ringkas}</p>

      <ul className="list-disc pl-5 space-y-2 text-zinc-300">
        {item.isi.map((poin, idx) => (
          <li key={idx}>{poin}</li>
        ))}
      </ul>
    </section>
  );
}