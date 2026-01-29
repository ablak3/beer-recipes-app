import React from "react";

interface Column {
  label: string;
  span: number; // out of 12
}

interface EditableGridManagerProps<T> {
  title: string;
  items: T[];
  columns: Column[];
  renderRow: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  emptyText?: string;
  addLabel?: string;
}

export default function EditableGridManager<T>({
  title,
  items,
  columns,
  renderRow,
  onAdd,
  onRemove,
  emptyText = "No items added yet.",
  addLabel = "Add Item"
}: EditableGridManagerProps<T>) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      {/* Header */}
      <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 mb-2">
        {columns.map((col, i) => (
          <div key={i} className={`col-span-${col.span}`}>
            {col.label}
          </div>
        ))}
        <div className="col-span-1" />
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-sm text-gray-500 py-4 text-center">
          {emptyText}
        </div>
      )}

      {/* Rows */}
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-2 mb-2 items-center"
        >
          {renderRow(item, index)}

          <div className="col-span-1 text-right">
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 text-sm hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add button */}
      <button
        onClick={onAdd}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
      >
        + {addLabel}
      </button>
    </div>
  );
}
