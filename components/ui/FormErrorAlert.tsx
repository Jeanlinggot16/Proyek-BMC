'use client';

import { cn } from '@/lib/utils';

interface FormErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'inline' | 'banner';
}

export function FormErrorAlert({
  message,
  onDismiss,
  variant = 'inline',
}: FormErrorAlertProps) {
  if (variant === 'banner') {
    return (
      <div
        role="alert"
        className={cn(
          'rounded-xl p-4 flex items-start gap-3',
          'bg-bmc-red/8 border border-bmc-red/25'
        )}
      >
        {/* Icon warning */}
        <svg
          className="w-5 h-5 shrink-0 mt-0.5 text-bmc-red"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs text-bmc-rose font-bold mb-1">
            Gagal Mengirim
          </p>
          <p className="text-xs text-bmc-text-muted leading-relaxed">
            {message}
          </p>
        </div>

        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 text-bmc-text-placeholder hover:text-bmc-text-secondary transition-colors duration-200"
            aria-label="Tutup pesan error"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // Inline variant (lebih ringkas, untuk di dalam form)
  return (
    <div
      role="alert"
      className={cn(
        'mb-5 p-3.5 rounded-lg text-xs leading-relaxed flex items-start gap-2.5',
        'bg-bmc-red/8 border border-bmc-red/25 text-bmc-rose'
      )}
    >
      <svg
        className="w-4 h-4 shrink-0 mt-0.5 text-bmc-red"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
