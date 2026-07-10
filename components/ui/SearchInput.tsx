'use client';

type SearchInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Cari...',
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm w-full sm:w-[280px] outline-none focus:border-[#D4AF37]"
    />
  );
}