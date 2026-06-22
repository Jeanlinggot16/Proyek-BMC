import './globals.css';
import Navbar from '@/components/Navbar';
import GlobalBackground from '@/components/global-background';
import PageTransition from '@/components/page-transition';

export const metadata = {
  title: 'Benang Merah Community Manado',
  description: 'Ruang aman untuk berdialog, bertumbuh, dan berkarya lintas iman di Manado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Warna latar belakang dasar dikunci ke hitam pekat (#040404) agar transisi layar tidak pernah menampilkan warna putih */}
      <body className="bg-[#040404] text-zinc-200 antialiased selection:bg-[#CC1111]/30 selection:text-white min-h-screen">
        {/* Background Global (Loom + Gradient Bars) yang dikunci (Fixed) */}
        <GlobalBackground />

        {/* Navigasi Stabil (Fixed) */}
        <Navbar />

        {/* Semua halaman akan di-render di dalam PageTransition ini agar memiliki efek Fade-In */}
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}