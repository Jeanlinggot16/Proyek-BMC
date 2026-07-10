import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dinding Benang · Ruang Perjumpaan | Benang Merah Community',
  description:
    'Tinggalkan satu helai benangmu, sepatah harapan, refleksi, atau sapaan. Setiap helai dirajut bersama menjadi anyaman persaudaraan di BMC Manado.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}