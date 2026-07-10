// app/not-found.tsx
// Server Component — TIDAK boleh ada 'use client' di sini
import NotFoundClient from './not-found-client';

export default function NotFound() {
  return <NotFoundClient />;
}