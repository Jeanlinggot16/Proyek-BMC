'use client';

import { useState } from 'react';
import { FAQS } from '@/constants/data';
import { SectionLabel } from '@/components/ui/SharedComponents';

export default function TentangFaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionLabel gold>Pertanyaan Umum</SectionLabel>
      <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-4">FAQ</h1>
      <p className="text-zinc-400 mb-10">
        Pertanyaan yang sering ditanyakan anggota baru.
      </p>

      <div className="space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <article key={i} className="rounded-xl border border-white/10 bg-[#0D0D0D] p-4">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                <span className="text-[#D4AF37]">{isOpen ? '−' : '+'}</span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <p className="text-sm text-zinc-300 leading-relaxed mt-3">{faq.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}