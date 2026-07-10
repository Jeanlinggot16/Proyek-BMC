import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program Kerja · TENUN, ANYAMAN, RAJUT & Lainnya | Benang Merah Community',
  description:
    'Jelajahi program BMC Manado: TENUN (dialog lintas iman), ANYAMAN (eksplorasi seni), RAJUT (festival kolektif), Peace Camp, dan SIMPUL. Kegiatan reguler 100% gratis.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}