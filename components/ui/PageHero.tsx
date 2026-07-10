// components/ui/PageHero.tsx
import { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/SharedComponents';

interface PageHeroProps {
  /** Teks kecil di atas judul, mis. "Komitmen Bersama" */
  label: string;
  /** Bagian judul yang berwarna putih/default */
  title: string;
  /** Bagian judul yang disorot warna merah BMC */
  highlight?: string;
  /** Deskripsi singkat di bawah judul */
  description?: ReactNode;
  goldLabel?: boolean;
  className?: string;
}

/**
 * Header halaman reusable — menggantikan pola SectionLabel + <h1> + <p>
 * yang sebelumnya diketik ulang dengan nilai clamp() identik di
 * app/daftar, app/dinding, app/mulai, app/saran, dan lainnya.
 */
export function PageHero({ label, title, highlight, description, goldLabel = false, className }: PageHeroProps) {
  return (
    <div className={`text-center mb-10 sm:mb-12 ${className ?? ''}`}>
      <SectionLabel gold={goldLabel}>{label}</SectionLabel>
      <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3.2rem] font-extrabold font-serif leading-[1.15] mb-3">
        {title}{highlight && <> <span className="text-[#CC1111]">{highlight}</span></>}
      </h1>
      {description && (
        <p className="text-sm text-[#9A9AA5] leading-[1.7] max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}