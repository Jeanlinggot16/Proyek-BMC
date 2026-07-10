// components/ui/BmcButton.tsx
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type BmcButtonVariant = 'primary' | 'outline' | 'ghost';
type BmcButtonSize = 'default' | 'sm';

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-[0.1em] no-underline cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed';

const variantClass: Record<BmcButtonVariant, string> = {
  primary: 'bg-[#CC1111] text-white shadow-[0_0_20px_rgba(204,17,17,0.3)] hover:bg-[#AA0A0A] hover:shadow-[0_0_30px_rgba(204,17,17,0.45)]',
  outline: 'bg-transparent text-[#D4AF37] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]',
  ghost: 'bg-transparent text-[#B4B4BD] border border-white/10 hover:border-white/25',
};

const sizeClass: Record<BmcButtonSize, string> = {
  default: 'text-[11px] px-7 py-3.5 sm:px-8',
  sm: 'text-[10px] px-5 py-2.5',
};

interface BmcButtonBaseProps {
  variant?: BmcButtonVariant;
  size?: BmcButtonSize;
  className?: string;
  children: ReactNode;
  /** Tambahkan className bmc-shine secara manual jika ingin efek kilau (hanya cocok untuk variant="primary") */
  shine?: boolean;
}

interface BmcLinkButtonProps extends BmcButtonBaseProps {
  href: string;
  onClick?: () => void;
}

interface BmcActionButtonProps extends BmcButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

/**
 * Tombol BMC reusable — menggantikan pola inline style berulang
 * (background: '#CC1111', borderRadius: '100px', dst.) yang sebelumnya
 * diketik ulang manual di hampir setiap halaman.
 *
 * Pakai href untuk navigasi (dirender sebagai <Link>),
 * atau onClick/type untuk aksi form (dirender sebagai <button>).
 */
export function BmcButton(props: BmcLinkButtonProps | BmcActionButtonProps) {
  const { variant = 'primary', size = 'default', className, children, shine = false } = props;
  const classes = cn(baseClass, variantClass[variant], sizeClass[size], shine && 'bmc-shine', className);

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, size: _s, className: _c, children: _ch, shine: _sh, ...buttonProps } = props as BmcActionButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}