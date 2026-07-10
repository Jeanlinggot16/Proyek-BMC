// app/tentang/page.tsx
'use client';

import { useState } from 'react';
import { TeamItem, FRIEND_VALUES, TEAMS } from '@/constants/data';
import OfficialBMCLogo from '@/components/ui/OfficialBMCLogo';
import { Divider, SectionLabel } from '@/components/ui/SharedComponents';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function TentangPage() {
  const { ref: storyRef } = useScrollReveal();
  const { ref: friendRef, visible: friendVisible } = useScrollReveal();
  const { ref: structureRef, visible: structureVisible } = useScrollReveal();
  const [selectedTeam, setSelectedTeam] = useState<TeamItem | null>(null);

  return (
    <section style={{ padding: '64px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }} aria-label="Halaman Tentang Kami">
      <div ref={storyRef} style={{ marginBottom: '88px' }}>
        <SectionLabel>Kisah Kami</SectionLabel>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: 'serif', marginBottom: '24px', lineHeight: 1.15 }}>
          Sejarah &amp; Impian <br />
          <span style={{ color: '#CC1111' }}>Benang Merah Community</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '40px' }}>
          <div style={{ fontSize: '14px', color: '#B4B4BD', lineHeight: 1.85 }}>
            <p style={{ marginBottom: '20px' }}>
              Benang Merah lahir dari kesadaran pahit bahwa banyak permasalahan sosial berawal dari <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>relasi yang rusak</strong>. Hubungan manusia yang terpecah karena dogma keras, kesalahpahaman latar belakang suku/agama, dan minimnya ruang dialog sehat bagi pemuda.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Diinisiasi di Manado, Sulawesi Utara, kami mengadopsi metafora <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>Tenun dan Rajut</strong>. Setiap manusia diibaratkan satu helai benang yang rapuh dan tak berbentuk jika sendirian. Namun, jika benang-benang itu dikumpulkan, dirawat, dan dirajut dalam proses yang sabar, maka akan melahirkan karya anyaman persaudaraan yang luar biasa indah.
            </p>
          </div>
          <div style={{ fontSize: '14px', color: '#9A9AA5', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '20px' }}>
              Kami tidak berambisi menyeragamkan warna helai benang. Warna merah, emas, hitam, dan putih harus tetap dipertahankan sebagai keunikan fitrah individu. Yang kami upayakan adalah merajut agar mereka saling bertemu, bersilangan secara harmonis, dan saling menguatkan struktur sosial kemasyarakatan.
            </p>
            <p style={{ fontStyle: 'italic', borderLeft: '3px solid #CC1111', paddingLeft: '16px', color: '#D4AF37' }}>
              &ldquo;Berdamai bukan berarti kehilangan jati diri pribadi. Berdamai adalah merayakan jati diri Anda, sembari menaruh rasa hormat yang mutlak bagi jati diri sesama manusia.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <Divider gold />

      <div style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <SectionLabel gold>Filosofi Identitas Visual</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>Simbol Rajutan Makna Resmi</h2>
          <p style={{ fontSize: '14px', color: '#9A9AA5', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Logo resmi <strong style={{ fontWeight: 700, color: '#E8E6E0' }}>BMC Manado</strong> kini telah ditingkatkan dengan penyelarasan geometris presisi dan animasi <span style={{ fontStyle: 'italic' }}>glow tracing</span> yang mengalir menyusuri kelokan benang merah.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div style={{ background: 'radial-gradient(circle at center, #121212 0%, #080808 100%)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }}>
            <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '9px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em' }}>OFFICIAL VERIFIED</div>
            <OfficialBMCLogo height={96} animated={true} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#E8E6E0', marginBottom: '8px' }}>Huruf B &amp; C (Berdamai &amp; Berkarya)</h4>
              <p style={{ fontSize: '12.5px', color: '#9A9AA5', lineHeight: 1.6 }}>Dicetak dengan huruf sans-serif putih solid, bersih, dan kokoh. Melambangkan fondasi yang kuat, kesucian niat, dan keterbukaan tanpa kompromi untuk merangkul segala golongan pemuda di Sulawesi Utara.</p>
            </div>
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(204,17,17,0.15)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#CC1111', marginBottom: '8px' }}>Pita Infinity Merah &quot;M&quot; (Bertumbuh)</h4>
              <p style={{ fontSize: '12.5px', color: '#9A9AA5', lineHeight: 1.6 }}>Simbol utama pergerakan kami yang membentuk huruf &quot;M&quot; sekaligus simpul tak terhingga (∞). Merepresentasikan rajutan relasi kemanusiaan yang senantiasa dinamis dan berkesinambungan.</p>
            </div>
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'serif', color: '#D4AF37', marginBottom: '8px' }}>Symmetry &amp; Subtitle Alignment</h4>
              <p style={{ fontSize: '12.5px', color: '#9A9AA5', lineHeight: 1.6 }}>Kalibrasi visual menjamin jarak antara huruf B-M dan M-C sejajar seimbang 30 piksel. Teks sub-judul dibingkai presisi di bagian bawah sehingga menyatu sempurna dengan lebar logo.</p>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel>Tiga Pilar Perjalanan</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif' }}>Filosofi Gerakan Kami</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <PillarCard
            accent="#CC1111"
            icon="☮️"
            no="1"
            title="BERDAMAI"
            desc="Ini adalah hulu dari segala proses. Pemulihan relasi secara komprehensif. Pertama, berdamai dengan Sang Pencipta. Kedua, berdamai dengan diri sendiri (menyelesaikan kecemasan, dendam, dan ego internal). Ketiga, berdamai dengan sesama, dan berdamai dengan alam ekologi."
            makna="Damai sejati dimulai dari dalam, lalu mengalir keluar."
          />
          <PillarCard
            accent="#D4AF37"
            icon="🌱"
            no="2"
            title="BERTUMBUH"
            desc="Berdamai yang pasif tidak akan membawa perubahan. Kita dituntut untuk bertumbuh. Kami merawat iman yang dewasa secara intelektual, mengasah kemampuan berpikir logis dan kritis, membangun komunikasi asertif bebas amarah, serta memupuk kematangan karakter."
            makna="Akar yang dalam melahirkan pohon yang teduh."
          />
          <PillarCard
            accent="#FB7185"
            icon="✨"
            no="3"
            title="BERKARYA"
            desc="Ini adalah muara dari kedewasaan diri. Buah nyata dari sebuah pertumbuhan karakter. Karya adalah dedikasi produktif, bentuk nyata dari kecintaan kita kepada sesama manusia. Hasil karya dapat diwujudkan dalam tulisan, musik, festival kebudayaan, dan aksi kerelawanan."
            makna="Karya adalah cinta yang menjadi tindakan."
          />
        </div>
      </div>

      <Divider />

      <div ref={friendRef} style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel gold>Nilai Inti Komunitas</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>F.R.I.E.N.D</h2>
          <p style={{ fontSize: '14px', color: '#9A9AA5', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Enam pilar sikap dasar yang melandasi setiap gerak langkah relasi internal dan publik di Benang Merah Community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {FRIEND_VALUES.map((f, i) => (
            <div key={f.letter} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '28px', opacity: friendVisible ? 1 : 0, transform: friendVisible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#CC1111', fontFamily: 'serif', lineHeight: 1, marginBottom: '12px' }}>{f.letter}</div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{f.word}</h3>
              <div style={{ fontSize: '11px', color: '#8A8A94', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{f.sub}</div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />
              <p style={{ fontSize: '13px', color: '#9A9AA5', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider gold />

      <div ref={structureRef} style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel>Sistem Tata Kelola</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, fontFamily: 'serif', marginBottom: '16px' }}>Tim Operasional Penggerak</h2>
          <p style={{ fontSize: '14px', color: '#9A9AA5', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Komunitas dikendalikan secara transparan oleh anak muda melalui 7 Divisi Kerja yang terintegrasi saling melengkapi. <strong>Klik tombol tim untuk membaca deskripsi tugas.</strong>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(204,17,17,0.04)', border: '1px solid rgba(204,17,17,0.2)', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#CC1111', letterSpacing: '0.12em', display: 'block', marginBottom: '4px' }}>KOMPAS UTAMA</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F5F5F5' }}>Dewan Pembina &amp; Ketua Tim Inti</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
              {TEAMS.map((t) => {
                const isSelected = selectedTeam?.abbr === t.abbr;
                return (
                  <button key={t.abbr} onClick={() => setSelectedTeam(t)} style={{ background: isSelected ? '#CC1111' : '#0D0D0D', border: `1px solid ${isSelected ? '#CC1111' : 'rgba(255,255,255,0.05)'}`, borderRadius: '12px', padding: '16px 12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#FFF' : '#CC1111', display: 'block', letterSpacing: '0.08em' }}>{t.abbr}</span>
                    <span style={{ fontSize: '9px', color: isSelected ? 'rgba(255,255,255,0.7)' : '#8A8A94', textTransform: 'uppercase', letterSpacing: '0.02em', display: 'block', marginTop: '4px' }}>{t.fullName.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '340px' }}>
            {selectedTeam ? (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#CC1111', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }}>DIVISI: {selectedTeam.abbr}</span>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#F5F5F5', fontFamily: 'serif', marginBottom: '4px' }}>{selectedTeam.fullName}</h3>
                <p style={{ fontSize: '12px', color: '#D4AF37', fontStyle: 'italic', marginBottom: '20px' }}>&ldquo;{selectedTeam.tagline}&rdquo;</p>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '20px' }} />
                <p style={{ fontSize: '13px', color: '#B4B4BD', lineHeight: 1.7, marginBottom: '20px' }}>{selectedTeam.identity}</p>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#E8E6E0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Tugas Pokok Divisi:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0 }}>
                  {selectedTeam.responsibilities.map((r, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px', color: '#9A9AA5', lineHeight: 1.6 }}>
                      <span style={{ color: '#CC1111', marginTop: '2px' }}>✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#8A8A94', margin: 'auto 0' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>💡</span>
                <p style={{ fontSize: '13px' }}>Silakan pilih salah satu Divisi di sebelah kiri untuk melihat detail tugas operasional, kontribusi, dan perannya dalam merajut BMC Manado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Komponen kartu pilar dengan micro-interactions ─── */
function PillarCard({
  accent,
  icon,
  no,
  title,
  desc,
  makna,
}: {
  accent: string;
  icon: string;
  no: string;
  title: string;
  desc: string;
  makna: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.03)',
        borderTop: `4px solid ${accent}`,
        padding: '36px',
        borderRadius: '16px',
        cursor: 'default',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 18px 40px -12px ${accent}55` : '0 0 0 transparent',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
      }}
    >
      <span
        style={{
          fontSize: '32px',
          display: 'inline-block',
          marginBottom: '16px',
          transform: hovered ? 'scale(1.25) rotate(-6deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {icon}
      </span>

      <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'serif', color: accent, marginBottom: '6px' }}>
        {no}. {title}
      </h3>

      <div
        style={{
          height: '2px',
          width: hovered ? '60px' : '0px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          borderRadius: '100px',
          marginBottom: '12px',
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      <p style={{ fontSize: '13px', color: '#9A9AA5', lineHeight: 1.7 }}>{desc}</p>

      <p
        style={{
          fontSize: '12.5px',
          color: accent,
          fontStyle: 'italic',
          lineHeight: 1.6,
          marginTop: '14px',
          opacity: hovered ? 1 : 0,
          maxHeight: hovered ? '60px' : '0px',
          overflow: 'hidden',
          transition: 'opacity 0.4s ease, max-height 0.4s ease',
        }}
      >
        &ldquo;{makna}&rdquo;
      </p>
    </div>
  );
}
