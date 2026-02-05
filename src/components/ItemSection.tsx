import { useEffect } from "react";
import EditableGridManager from "./EditableGridManager";
import ItemRow from "./ItemRow";
import { Field } from "../constants/defaultFieldNames";

interface ItemSectionProps<T> {
  items: T[];
  fields: Field<T>[];
  numCards: number;
  onAdd: (item: T) => void;
  onUpdate: (index: number, item: T) => void;
  onRemove: (index: number) => void;
  defaultItem: T;
  emptyText: string;
  addLabel: string;
  minItems?: number;
  ensureMinimum?: boolean;
}

export default function ItemSection<T extends Record<string, any>>({
  items,
  fields,
  numCards,
  onAdd,
  onUpdate,
  onRemove,
  defaultItem,
  emptyText,
  addLabel,
  minItems = 0,
  ensureMinimum = false,
}: ItemSectionProps<T>) {
  // Ensure at least one item exists if specified
  useEffect(() => {
    if (ensureMinimum && items.length === 0) {
      onAdd(defaultItem);
    }
  }, [items.length, ensureMinimum, onAdd, defaultItem]);

  const renderRow = (item: T, index: number) => (
    <ItemRow
      item={item}
      index={index}
      fields={fields}
      onUpdate={onUpdate}
      numCards={numCards}
    />
  );

  return (
    <EditableGridManager<T>
      items={items}
      renderRow={renderRow}
      onAdd={() => onAdd(defaultItem)}
      onRemove={onRemove}
      emptyText={emptyText}
      addLabel={addLabel}
      minItems={minItems}
    />
  );
}