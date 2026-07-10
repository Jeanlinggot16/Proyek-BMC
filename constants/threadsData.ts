// constants/threadsData.ts

export interface ThreadItem {
  id: string;
  pesan: string;
  nama: string;
  color: 'red' | 'gold' | 'rose';
}

// Data contoh awal. Nanti akan digabung dengan kiriman pengunjung (localStorage).
export const SAMPLE_THREADS: ThreadItem[] = [
  { id: 's1', pesan: 'Semoga setiap perjumpaan di sini merajut lebih banyak pengertian, bukan jarak.', nama: 'Rina', color: 'red' },
  { id: 's2', pesan: 'Berbeda itu bukan untuk ditakuti, tapi untuk dirayakan bersama secangkir kopi hangat.', nama: 'Yoel', color: 'gold' },
  { id: 's3', pesan: 'Di ruang ini saya belajar mendengar sebelum menjawab. Itu hadiah terindah.', nama: 'Sari', color: 'rose' },
  { id: 's4', pesan: 'Satu helai benang rapuh. Tapi dirajut bersama, kita jadi kain yang kuat.', nama: 'Daniel', color: 'red' },
  { id: 's5', pesan: 'Damai itu dimulai dari berani menyapa orang yang berbeda dari kita.', nama: 'Putri', color: 'gold' },
  { id: 's6', pesan: 'Terima kasih sudah menyediakan tempat duduk ekstra untuk saya yang baru.', nama: 'Anonim', color: 'rose' },
];

// Warna kartu, selaras dengan PROG_COLOR di data.ts
export const THREAD_COLOR = {
  red: { accent: '#CC1111', bg: 'rgba(204,17,17,0.06)', border: 'rgba(204,17,17,0.22)' },
  gold: { accent: '#D4AF37', bg: 'rgba(212,175,55,0.06)', border: 'rgba(212,175,55,0.22)' },
  rose: { accent: '#FB7185', bg: 'rgba(251,113,133,0.06)', border: 'rgba(251,113,133,0.22)' },
};
