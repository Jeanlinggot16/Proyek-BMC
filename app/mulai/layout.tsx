import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mulai di Sini · Panduan Pendatang Baru | Benang Merah Community',
  description:
    'Baru mengenal BMC Manado? Inilah panduan langkah pertamamu, tanpa tekanan. Kenali kami, pilih ruang yang cocok, lalu datang dan rasakan perjumpaannya.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}