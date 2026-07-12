'use client';

import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  isLoading: boolean;
  disabled: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function SubmitButton({
  isLoading,
  disabled,
  loadingText = 'Mengirim...',
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        // Base styling
        'w-full rounded-full py-4',
        'text-[11px] font-bold tracking-[0.12em] uppercase',
        'transition-all duration-300',
        
        // Active state — merah BMC
        'bg-bmc-red text-bmc-white',
        'shadow-bmc-button',
        'hover:bg-bmc-red-hover hover:shadow-bmc-button-hover',
        'active:scale-[0.98]',
        
        // Disabled state
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'disabled:hover:bg-bmc-red disabled:hover:shadow-bmc-button',
        'disabled:active:scale-100'
      )}
    >
      {isLoading ? (
        <span className="inline-flex items-center justify-center gap-2">
          {/* Spinner SVG inline */}
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
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
