import React from 'react';

interface ResultRowProps {
  label: string;
  value: number;
  decimals?: number;
  range?: string;
  highlight?: boolean;
  info?: string;
}

export default function ResultRow({
  label,
  value,
  decimals = 0,
  range,
  highlight = false,
  info
}: ResultRowProps) {
  return (
    <div
      className={`flex justify-between items-start px-3 py-2 rounded ${
        highlight ? 'bg-blue-50' : 'bg-gray-50'
      }`}
    >
      <div className="flex-1">
        <span
          className={`text-sm font-medium ${
            highlight ? 'text-blue-900' : 'text-gray-700'
          }`}
        >
          {label}
        </span>

        {range && (
          <span className="text-xs text-gray-500 ml-2">({range})</span>
        )}

        {info && (
          <div className="text-xs text-gray-500 italic mt-1">
            {info}
          </div>
        )}
      </div>

      <span
        className={`font-bold ${
          highlight ? 'text-blue-600' : 'text-gray-900'
        }`}
      >
        {value.toFixed(decimals)}
      </span>
    </div>
  );
}
