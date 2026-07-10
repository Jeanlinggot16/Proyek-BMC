import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami · Sejarah, Filosofi & Tim | Benang Merah Community',
  description:
    'Kisah, filosofi tiga pilar (Berdamai, Bertumbuh, Berkarya), nilai F.R.I.E.N.D, dan 7 divisi kerja Benang Merah Community Manado, komunitas dialog lintas iman.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}