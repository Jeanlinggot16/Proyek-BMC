import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulir Bergabung | Benang Merah Community Manado',
  description:
    'Daftarkan dirimu menjadi bagian dari Benang Merah Community Manado. Proses sederhana tiga langkah, gratis, dan terbuka untuk semua latar belakang.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}