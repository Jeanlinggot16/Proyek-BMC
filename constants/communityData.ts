// constants/communityData.ts

export type EventItem = {
  id: string;
  tanggal: string; // YYYY-MM-DD
  jam: string;
  nama: string;
  lokasi: string;
  deskripsi: string;
};

export type ArchiveItem = {
  slug: string;
  judul: string;
  tanggal: string; // YYYY-MM-DD
  ringkas: string;
  isi: string[];
};

export const EVENTS: EventItem[] = [
  {
    id: 'tenun-2026-07',
    tanggal: '2026-07-10',
    jam: '19:00 WITA',
    nama: 'TENUN Bulanan',
    lokasi: 'Kedai Kopi Gatenine, Manado',
    deskripsi: 'Dialog lintas iman dengan tema ruang aman.',
  },
  {
    id: 'anyaman-2026-07',
    tanggal: 'Coming Soon',
    jam: '-',
    nama: 'ANYAMAN Kreatif',
    lokasi: 'Manado',
    deskripsi: 'Eksplorasi ekspresi kreatif dan refleksi bersama.',
  },
];

export const ARCHIVES: ArchiveItem[] = [
  {
    slug: 'tenun-juni-2026',
    judul: 'TENUN Juni 2026',
    tanggal: '2026-06-13',
    ringkas: 'Dialog lintas iman tentang ruang aman.',
    isi: [
      'Peserta berbagi pengalaman membangun ruang aman di lingkungan masing-masing.',
      'Diskusi menyorot pentingnya mendengar aktif sebelum merespons.',
      'Tindak lanjut: sesi mentoring kecil untuk anggota baru.',
    ],
  },
  {
    slug: 'anyaman-juni-2026',
    judul: 'ANYAMAN Juni 2026',
    tanggal: '2026-06-27',
    ringkas: 'Sesi ekspresi kreatif dan refleksi.',
    isi: [
      'Anggota menampilkan karya puisi dan musik.',
      'Refleksi bersama tentang keberanian berekspresi.',
      'Tindak lanjut: pameran mini karya komunitas bulan depan.',
    ],
  },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getNearestEvent(now = new Date()): EventItem | null {
  const today = now.toISOString().slice(0, 10);
  const upcoming = EVENTS
    .filter((e) => e.tanggal >= today)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal));

  return upcoming[0] ?? null;
}

export function getPastEvents(now = new Date()): EventItem[] {
  const today = now.toISOString().slice(0, 10);
  return EVENTS
    .filter((e) => e.tanggal < today)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function convertPastEventsToArchives(pastEvents: EventItem[]): ArchiveItem[] {
  return pastEvents.map((e) => ({
    slug: `${slugify(e.nama)}-${e.tanggal}`,
    judul: `${e.nama} (${e.tanggal})`,
    tanggal: e.tanggal,
    ringkas: `${e.deskripsi} • Lokasi: ${e.lokasi}`,
    isi: [
      `Kegiatan berlangsung pada ${e.tanggal} pukul ${e.jam}.`,
      `Lokasi kegiatan: ${e.lokasi}.`,
      `Ringkasan: ${e.deskripsi}`,
    ],
  }));
}

export function getCombinedArchives(now = new Date()): ArchiveItem[] {
  const autoArchives = convertPastEventsToArchives(getPastEvents(now));
  const map = new Map<string, ArchiveItem>();

  for (const item of [...autoArchives, ...ARCHIVES]) {
    if (!map.has(item.slug)) map.set(item.slug, item);
  }

  return Array.from(map.values()).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function getLatestArchive(now = new Date()): ArchiveItem | null {
  const all = getCombinedArchives(now);
  return all.length ? all[0] : null;
}