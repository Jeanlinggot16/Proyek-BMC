'use client';

import { cn } from '@/lib/utils';

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
  helperText?: string;
  error?: string;
}

export function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  rows = 4,
  helperText,
  error,
}: FormInputProps) {
  const inputClasses = cn(
    // Base styling
    'w-full rounded-xl px-4 py-3.5',
    'text-[13px] leading-relaxed',
    'outline-none transition-all duration-300',
    
    // Background & border — pakai token BMC dari @theme
    'bg-bmc-bg-secondary',
    'border border-bmc-border-default',
    'text-bmc-text-secondary',
    'placeholder-bmc',  // utility custom di globals.css
    
    // Hover state
    'hover:border-bmc-border-hover',
    
    // Focus state — ring gold BMC
    'focus:border-bmc-gold focus:ring-2 focus:ring-bmc-border-active focus:bg-bmc-bg-tertiary',
    
    // Error state
    error && 'border-bmc-red/50 focus:border-bmc-red focus:ring-bmc-red/30',
    
    // Textarea specific
    isTextarea && 'resize-y min-h-[100px]'
  );

  return (
    <div>
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-[11px] font-bold text-bmc-text-muted tracking-[0.08em] uppercase mb-2"
      >
        {label}
        {required && (
          <span className="text-bmc-red ml-1" aria-hidden="true">*</span>
        )}
      </label>

      {/* Input atau Textarea */}
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={inputClasses}
        />
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p
          id={`${id}-helper`}
          className="mt-1.5 text-[10px] text-bmc-text-placeholder leading-relaxed"
        >
          {helperText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[10px] text-bmc-rose font-medium flex items-center gap-1"
        >
          <svg
            className="w-3 h-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3l9.66 16.5H2.34L12 3z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
