// app/dinding/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SAMPLE_THREADS, THREAD_COLOR, ThreadItem } from '@/constants/threadsData';
import { SectionLabel } from '@/components/ui/SharedComponents';
import { cn } from '@/lib/utils';

/* ─── Constants ─── */
const STORAGE_KEY = 'bmc_threads_local';
const COLORS: Array<'red' | 'gold' | 'rose'> = ['red', 'gold', 'rose'];
const MAX_CHAR = 180;

/* ────────────────────────────────────────────────────────────────────────── */
/*  SUB-KOMPONEN: ThreadCard (kartu helai benang)                            */
/* ────────────────────────────────────────────────────────────────────────── */
function ThreadCard({ thread }: { thread: ThreadItem }) {
  const c = THREAD_COLOR[thread.color] || THREAD_COLOR.red;

  return (
    <article
      className={cn(
        'break-inside-avoid mb-4 rounded-xl p-5 sm:p-6 transition-all duration-300',
        'hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5',
        'animate-fadeIn'
      )}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderLeft: `3px solid ${c.accent}`,
      }}
    >
      {/* Pesan */}
      <blockquote className="text-sm sm:text-[14px] text-[#E8E6E0] leading-relaxed italic mb-4 font-serif">
        &ldquo;{thread.pesan}&rdquo;
      </blockquote>

      {/* Footer: penulis + indikator warna */}
      <div className="flex items-center gap-2.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: c.accent }}
          aria-hidden="true"
        />
        <span
          className="text-[11px] sm:text-xs font-bold tracking-wide"
          style={{ color: c.accent }}
        >
          {thread.nama}
        </span>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  SUB-KOMPONEN: CharacterCounter                                        */
/* ────────────────────────────────────────────────────────────────────────── */
function CharacterCounter({ current, max }: { current: number; max: number }) {
  const isNearLimit = current > max * 0.85;
  const isAtLimit = current >= max;

  return (
    <div className="flex justify-between items-center mt-1.5">
      <span className="text-[10px] text-[#8A8A94]">
        {current === 0 ? 'Tulis minimal 1 karakter' : ''}
      </span>
      <span
        className={cn(
          'text-[10px] font-medium tabular-nums transition-colors duration-200',
          isAtLimit
            ? 'text-[#FF5555]'
            : isNearLimit
            ? 'text-[#D4AF37]'
            : 'text-[#8A8A94]'
        )}
      >
        {current}/{max}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  KOMPONEN UTAMA                                                           */
/* ────────────────────────────────────────────────────────────────────────── */
export default function DindingPage() {
  const [threads, setThreads] = useState<ThreadItem[]>(SAMPLE_THREADS);
  const [pesan, setPesan] = useState('');
  const [nama, setNama] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [justSent, setJustSent] = useState(false);

  // Ref untuk auto-focus kembali ke textarea setelah kirim
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ref untuk mencegah double-submit
  const isSubmittingRef = useRef(false);

  /* ─── Load local threads dari localStorage ─── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const local: ThreadItem[] = JSON.parse(raw);
        setThreads((prev) => [...local, ...prev]);
      }
    } catch {
      // Silent fail jika localStorage tidak tersedia
    }
  }, []);

  /* ─── Handler submit dengan anti double-submit ─── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedPesan = pesan.trim();
      if (!trimmedPesan) return;
      if (isSubmittingRef.current) return;

      isSubmittingRef.current = true;
      setIsLoading(true);

      const newThread: ThreadItem = {
        id: `local_${Date.now()}`,
        pesan: trimmedPesan,
        nama: nama.trim() || 'Anonim',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };

      // Kirim ke server (best-effort, tidak blocking UX)
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formType: 'thread',
            nama: newThread.nama,
            pesan: newThread.pesan,
            color: newThread.color,
          }),
        });
      } catch (err) {
        console.error('Gagal mengirim thread ke server:', err);
      }

      // Simpan ke localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const local: ThreadItem[] = raw ? JSON.parse(raw) : [];
        const updated = [newThread, ...local].slice(0, 50); // Batasi 50 item lokal
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Silent fail
      }

      // Update state
      setThreads((prev) => [newThread, ...prev]);
      setPesan('');
      setNama('');
      setIsLoading(false);
      isSubmittingRef.current = false;
      setJustSent(true);

      // Auto-focus kembali ke textarea
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);

      // Clear success message setelah 4 detik
      setTimeout(() => setJustSent(false), 4000);
    },
    [pesan, nama]
  );

  return (
    <main
      className="relative z-10 px-5 py-12 sm:px-6 sm:py-16 md:py-20 max-w-[1100px] mx-auto"
      aria-label="Dinding Benang"
    >
      {/* ─── HEADER ──────────────────────────────────────────────────── */}
      <header className="text-center mb-12 sm:mb-14">
        <SectionLabel gold>Ruang Perjumpaan</SectionLabel>
        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3.2rem] font-extrabold font-serif tracking-tight text-[#F5F5F5] mb-3">
          Dinding{' '}
          <span className="text-[#CC1111] [text-shadow:0_0_20px_rgba(204,17,17,0.3)]">
            Benang
          </span>
        </h1>
        <p className="text-sm sm:text-[14px] text-[#B4B4BD] leading-relaxed max-w-[600px] mx-auto">
          Tinggalkan satu helai benangmu, sepatah harapan, refleksi, atau sapaan.
          Setiap helai dirajut bersama menjadi anyaman persaudaraan kita.
        </p>
      </header>

      {/* ─── FORM HELAI BENANG ───────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-[640px] mx-auto mb-14 sm:mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="flex flex-col gap-5 border-none p-0" disabled={isLoading}>
            <legend className="sr-only">Tulis helai benang baru</legend>

            {/* Textarea Pesan */}
            <div>
              <label
                htmlFor="pesan"
                className="block text-[11px] font-bold text-[#B4B4BD] tracking-[0.08em] uppercase mb-2"
              >
                Helai Benangmu <span className="text-[#CC1111]" aria-hidden="true">*</span>
              </label>
              <textarea
                ref={textareaRef}
                id="pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tuliskan harapan, refleksi, atau sapaan singkatmu..."
                rows={3}
                maxLength={MAX_CHAR}
                required
                aria-required="true"
                className={cn(
                  'w-full bg-[#060606] border border-white/10 rounded-xl px-4 py-3.5 text-[13px] text-[#E8E6E0] placeholder:text-[#8A8A94] outline-none resize-y leading-relaxed transition-all duration-300',
                  'hover:border-white/20',
                  'focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-[#0A0A0A]'
                )}
              />
              <CharacterCounter current={pesan.length} max={MAX_CHAR} />
            </div>

            {/* Input Nama */}
            <div>
              <label
                htmlFor="nama"
                className="block text-[11px] font-bold text-[#B4B4BD] tracking-[0.08em] uppercase mb-2"
              >
                Nama{' '}
                <span className="text-[#8A8A94] font-normal normal-case tracking-normal">
                  (boleh dikosongkan untuk Anonim)
                </span>
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama atau inisialmu"
                className={cn(
                  'w-full bg-[#060606] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-[#E8E6E0] placeholder:text-[#8A8A94] outline-none transition-all duration-300',
                  'hover:border-white/20',
                  'focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-[#0A0A0A]'
                )}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!pesan.trim() || isLoading}
              aria-disabled={!pesan.trim() || isLoading}
              aria-busy={isLoading}
              className={cn(
                'w-full rounded-full py-3.5 sm:py-4 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300',
                'bg-[#CC1111] text-white shadow-[0_0_20px_rgba(204,17,17,0.3)]',
                'hover:bg-[#AA0A0A] hover:shadow-[0_0_32px_rgba(204,17,17,0.45)]',
                'active:scale-[0.98]',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#CC1111] disabled:hover:shadow-[0_0_20px_rgba(204,17,17,0.3)] disabled:active:scale-100'
              )}
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Merajut...
                </span>
              ) : (
                'Rajut Helai Benangku →'
              )}
            </button>

            {/* Success feedback */}
            {justSent && (
              <p
                role="status"
                className="text-center text-xs text-[#D4AF37] font-medium animate-fadeIn flex items-center justify-center gap-1.5"
              >
                <span aria-hidden="true">🧵</span>
                Terima kasih, helaimu telah terajut di dinding ini.
              </p>
            )}
          </fieldset>
        </form>
      </div>

      {/* ─── ANYAMAN HELAI (Masonry Grid) ────────────────────────────── */}
      {threads.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl opacity-30 block mb-3" aria-hidden="true">🧵</span>
          <p className="text-[#9A9AA5] text-sm">Belum ada helai benang. Jadilah yang pertama merajut!</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-[#8A8A94] mb-6 font-medium tracking-wide uppercase text-center sm:text-left">
            <span className="text-[#D4AF37] font-bold">{threads.length}</span> helai telah terajut
          </p>

          {/* Masonry layout menggunakan CSS columns */}
          <div
            style={{
              columnCount: 1,
            }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5"
          >
            {threads.map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
