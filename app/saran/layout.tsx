import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saran & Kritik | Benang Merah Community Manado',
  description:
    'Sampaikan saran, kritik, atau gagasan demi kemajuan ruang aman bersama. Bisa dikirim secara anonim. Setiap masukan dievaluasi oleh tim BMC Manado.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}