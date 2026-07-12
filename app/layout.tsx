import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import GlobalBackground from '@/components/global-background';
import AnnouncementBanner from '@/components/ui/AnnouncementBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/page-transition';
import ScrollThread from '@/components/ui/ScrollThread';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bmcmanado.me'),
  title: {
    default: 'Benang Merah Community Manado',
    template: '%s | Benang Merah Community Manado',
  },
  description:
    'Komunitas lintas iman, budaya, dan kehidupan di Sulawesi Utara yang merajut perjumpaan, penerimaan, dan kebersamaan.',
  keywords: [
    'komunitas manado',
    'komunitas lintas iman',
    'kegiatan pemuda manado',
    'benang merah community',
    'dialog lintas iman sulawesi utara',
  ],
  openGraph: {
    type: 'website',
    url: 'https://bmcmanado.me',
    siteName: 'Benang Merah Community Manado',
    title: 'Benang Merah Community Manado',
    description:
      'Ruang aman untuk berdamai, bertumbuh, dan berkarya bersama di Manado.',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Benang Merah Community Manado',
      },
    ],
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benang Merah Community Manado',
    description:
      'Ruang aman untuk berdamai, bertumbuh, dan berkarya bersama di Manado.',
    images: ['/og-cover.jpg'],
  },
  alternates: {
    canonical: 'https://bmcmanado.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable}`}>
      <body className="relative min-h-screen antialiased">
        {/* Banner pengumuman — paling atas di DOM, geser Navbar lewat CSS variable --bmc-banner-h */}
        <AnnouncementBanner />

        {/* Latar global — gradient bars + loom grid, harus di paling belakang (z-0) */}
        <GlobalBackground />

        {/* Navbar fixed, ada di atas semua halaman */}
        <Navbar />

        {/* Indikator progres scroll berbentuk benang, fixed di pinggir kanan.
            pointerEvents: none jadi tidak pernah menghalangi klik ke konten. */}
        <ScrollThread />

        {/* Konten tiap halaman, dibungkus transisi fade+slide saat pindah rute */}
        <main className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}