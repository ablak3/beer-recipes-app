import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  columns?: number;
}

export default function Section({
  title,
  children,
  columns = 1
}: SectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
        {title}
      </h2>

      <div
        className={`grid gap-3 ${
          columns === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : columns === 3
            ? 'grid-cols-1 md:grid-cols-3'
            : columns === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
