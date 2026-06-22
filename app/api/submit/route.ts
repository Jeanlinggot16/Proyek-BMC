import { NextResponse } from 'next/server';

// Endpoint aman server-side Next.js
// Melindungi URL rahasia Web App Google Apps Script Anda agar tidak dibongkar oleh pengguna dari inspeksi kode browser.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Membaca URL Web App Google Apps Script dari environment variables
    // Pengaturan ini ditaruh di berkas Vercel / local .env (.env.local) dengan kunci: GOOGLE_SCRIPT_URL
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      console.warn('Variabel GOOGLE_SCRIPT_URL belum dipasang di environment hosting.');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Konfigurasi server belum lengkap. Mohon hubungi administrator Tim CATAT.' 
        },
        { status: 500 }
      );
    }

    // Meneruskan data (forwarding) secara aman dari website ke Google Apps Script Web App
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Respons jaringan dari Google Script menunjukkan galat.');
    }

    const result = await response.json();
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error forwarding data to Google Sheet:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Gagal mengarsipkan data ke Spreadsheet: ' + error.message 
      },
      { status: 500 }
    );
  }
}