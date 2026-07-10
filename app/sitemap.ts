import type { MetadataRoute } from 'next';
import { getCombinedArchives } from '@/constants/communityData';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bmcmanado.me';

  const staticRoutes = [
    '',
    '/kegiatan',
    '/kegiatan/jadwal',
    '/kegiatan/cara-ikut',
    '/tentang',
    '/program',
    '/arsip',
    '/daftar',
    '/kontak',
    '/saran',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const archiveRoutes = getCombinedArchives().map((a) => ({
    url: `${base}/arsip/${a.slug}`,
    lastModified: new Date(a.tanggal),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...archiveRoutes];
}