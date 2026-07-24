// FILE: constants/communityData.ts

export type EventItem = {
  id: string;
  tanggal: string; // YYYY-MM-DD, atau 'Coming Soon' kalau tanggal belum pasti
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
  foto?: string[]; // opsional — path gambar dokumentasi, taruh file-nya di /public
};

export const EVENTS: EventItem[] = [
  {
    id: 'tenun-2026-08',
    tanggal: '2026-08-15',
    jam: '19:00 - 23:00 WITA',
    nama: 'TENUN Agustus: Stop Bullying',
    lokasi: 'Kedai Kopi Gatenine, Manado',
    deskripsi: 'Diskusi interaktif dan ruang dialog bersama mengenai isu perundungan (bullying), dampaknya bagi generasi muda, serta upaya membangun lingkungan yang aman dan bersahabat.',
  },
  {
    id: 'tenun-2026-07',
    tanggal: '2026-07-11',
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
    // Slug ini SENGAJA dibuat sama persis dengan hasil otomatis dari
    // convertPastEventsToArchives() untuk entri 'TENUN Bulanan' tanggal
    // 2026-07-11 (polanya: slugify(nama)-tanggal). Kalau nama atau
    // tanggal event TENUN di EVENTS berubah lagi nanti, slug di sini
    // HARUS ikut disesuaikan juga, kalau tidak versi kurasi manual ini
    // tidak akan menggantikan versi generik, dan malah muncul dobel.
    slug: 'tenun-bulanan-2026-07-11',
    judul: 'TENUN Juli 2026',
    tanggal: '2026-07-11',
    ringkas: 'Dialog lintas iman bertema Muharram — esensi Tahun Baru Islam dan relevansinya bagi semua orang, dihadiri peserta Muslim, Kristen, dan elder Gereja Mormon.',
    isi: [
      'Materi utama membahas esensi Tahun Baru Islam (Muharram): mengapa umat Muslim punya penanggalan tahun baru sendiri, sistemnya, dan relevansinya bagi siapa pun lepas dari latar belakang agama.',
      'Sesi tanya jawab dari peserta Kristen berlangsung dua babak: babak pertama seputar materi, babak kedua pertanyaan bebas.',
      'Diselingi sesi permainan sebelum dan sesudah diskusi untuk mencairkan suasana antar peserta lintas agama.',
      'Dihadiri peserta dalam jumlah cukup banyak, dari latar belakang Muslim, Kristen, dan beberapa elder dari Gereja Mormon.',
      '"Saya sadar bahwa wadah ini sangat diperlukan untuk diskusi iman yang berbeda, karena kalau misalnya dua organisasi Muslim dan Kristen membuat forum begini mungkin akan ada perdebatan karena berasal dari dua wadah berbeda dengan visi misi berbeda. Tapi BMC adalah satu komunitas dengan visi yang sama sehingga mencegah hal itu." — salah satu peserta',
    ],
    foto: [
      '/tenun new.jpeg',
      '/games tenun.jpeg',
      '/ten.JPG',
      '/pemateri.JPEG',
      '/penanya.JPEG',
      '/diskusi kelompok.JPEG',
      '/misel.JPEG',
    ],
  },
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
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Cek apakah string berformat tanggal YYYY-MM-DD yang valid.
// Dipakai supaya nilai placeholder seperti 'Coming Soon' tidak ikut
// dianggap sebagai tanggal beneran saat dibandingkan.
function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function getNearestEvent(now = new Date()): EventItem | null {
  const today = now.toISOString().slice(0, 10);
  const upcoming = EVENTS
    .filter((e) => isValidDateString(e.tanggal) && e.tanggal >= today)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal));

  return upcoming[0] ?? null;
}

export function getPastEvents(now = new Date()): EventItem[] {
  const today = now.toISOString().slice(0, 10);
  return EVENTS
    .filter((e) => isValidDateString(e.tanggal) && e.tanggal < today)
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

  // ARCHIVES manual ditaruh belakangan supaya menimpa versi otomatis
  // kalau slug-nya sama (prioritas ke data yang sudah dikurasi manual).
  for (const item of [...autoArchives, ...ARCHIVES]) {
    map.set(item.slug, item);
  }

  return Array.from(map.values()).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function getLatestArchive(now = new Date()): ArchiveItem | null {
  const all = getCombinedArchives(now);
  return all.length ? all[0] : null;
}

// Ambil beberapa arsip terbaru sekaligus — dipakai untuk galeri dokumentasi di homepage.
export function getRecentArchives(count = 3, now = new Date()): ArchiveItem[] {
  return getCombinedArchives(now).slice(0, count);
}