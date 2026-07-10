// app/program/[code]/layout.tsx
import type { Metadata } from 'next';
import { PROGRAMS } from '@/constants/data';

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const program = PROGRAMS.find((p) => p.code.toLowerCase() === code.toLowerCase());

  if (!program) {
    return {
      title: 'Program Tidak Ditemukan | Benang Merah Community',
    };
  }

  return {
    title: `${program.name} · ${program.focus} | Benang Merah Community`,
    description: program.desc,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}