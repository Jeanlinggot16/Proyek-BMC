import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak & FAQ | Benang Merah Community Manado',
  description:
    'Hubungi Benang Merah Community Manado untuk pertanyaan, kolaborasi, atau sekadar menyapa. Temukan juga jawaban pertanyaan umum (FAQ) seputar komunitas.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}