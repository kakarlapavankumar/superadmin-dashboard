interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tenant..."
      className="border rounded-lg px-4 py-2 w-full md:w-80"
    />
  );
}
