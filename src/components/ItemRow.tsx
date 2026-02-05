import CardGrid from "./CardGrid";
import FieldCard from "./FieldCard";
import { Field } from "../constants/defaultFieldNames";

interface ItemRowProps<T> {
  item: T;
  index: number;
  fields: Field<T>[];
  onUpdate: (index: number, item: T) => void;
  numCards: number;
}

export default function ItemRow<T extends Record<string, any>>({
  item,
  index,
  fields,
  onUpdate,
  numCards,
}: ItemRowProps<T>) {
  const handleFieldChange = (key: keyof T, value: any) => {
    onUpdate(index, { ...item, [key]: value });
  };

  return (
    <CardGrid numCards={numCards}>
      {fields.map((field) => (
        <FieldCard
          key={String(field.name)}
          label={field.label}
          value={item[field.name] ?? ""}
          onChange={(value) => handleFieldChange(field.name, value)}
          type={field.type}
          options={field.options}
          placeholder={field.placeholder}
        />
      ))}
    </CardGrid>
  );
}