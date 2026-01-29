import React from 'react';

interface InlineNumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function InlineNumberInput({
  label,
  value,
  onChange
}: InlineNumberInputProps) {
  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val === '' || !isNaN(Number(val))) {
      onChange(val === '' ? 0 : parseFloat(val));
    }
  };

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
