interface SelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Select({ value, options, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">All</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
