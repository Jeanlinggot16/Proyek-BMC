'use client';

import { useState } from 'react';

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlights = [
    {
      title: "Ruang Aman Bertumbuh",
      desc: "Wadah tulus untuk berani berbicara, belajar dari kesalahan, dan mengekspresikan diri secara autentik tanpa takut dihakimi.",
      tag: "SAFE SPACE",
      icon: (
        <svg className="w-6 h-6 text-[#CC1111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Wadah Nyata Berkarya",
      desc: "Menyalurkan ide kreatif, musik, puisi, hingga film pendek menjadi karya kolektif nyata yang berdampak langsung bagi masyarakat Manado.",
      tag: "REAL IMPACT",
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Rajutan Lintas Batas",
      desc: "Merajut persaudaraan jujur lintas iman dan budaya dengan kesungguhan, melampaui sekat-sekat perbedaan teologis maupun sosial.",
      tag: "GENUINE UNION",
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-950/40 relative z-10">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">TIGA PILAR UTAMA</span>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mt-2">Mengapa Bertumbuh di BMC?</h3>
        <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
          Kami berkomitmen menjaga kultur ruang aman ini agar setiap langkah perubahan kecil yang Anda ambil terasa berharga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-8 rounded-2xl bg-zinc-950/40 border transition-all duration-500 cursor-default relative overflow-hidden ${
                isHovered 
                  ? 'border-[#CC1111]/60 shadow-glow-red -translate-y-2' 
                  : 'border-zinc-900/60'
              }`}
            >
              <div 
                className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500 ${
                  isHovered ? 'opacity-20' : 'opacity-0'
                } ${
                  idx === 0 ? 'bg-[#CC1111]' : idx === 1 ? 'bg-[#D4AF37]' : 'bg-rose-500'
                }`}
              />

              <div className="space-y-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'bg-zinc-900 scale-110' : 'bg-zinc-950'
                }`}>
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 block uppercase">
                    {item.tag}
                  </span>
                  <h4 className="text-lg font-bold text-white font-serif transition-colors duration-300 group-hover:text-[#CC1111]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}