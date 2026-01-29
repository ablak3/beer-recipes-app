import React from "react";
import { Grain, WaterChemistryInputs } from "../../types";
import EditableGridManager from "../EditableGridManager";

interface Props {
  grainBill: Grain[];
  setInputs: React.Dispatch<React.SetStateAction<WaterChemistryInputs>>;
}

export default function GrainBillSection({ grainBill, setInputs }: Props) {

    // Define columns for the editable grid
  const ingredientColumns = [
        { label: "Type", span: 3 },
        { label: "Name", span: 3 },
        { label: "Weight (lbs)", span: 2 },
        { label: "Lovibond", span: 2 }
      ];

  const updateGrain = (
    index: number,
    field: keyof Grain,
    value: string | number
  ) => {
    setInputs(prev => {
      const updated = [...prev.grainBill];
      updated[index] = {
        ...updated[index],
        [field]:
          field === "name" || field === "type"
            ? value
            : Number(value) || 0
      };
      return { ...prev, grainBill: updated };
    });
  };

  return (
    <EditableGridManager
      title="Grain Bill"
      items={grainBill}
      addLabel="Add Grain"
      emptyText="No grains added yet."
      columns={ingredientColumns}
      onAdd={() =>
        setInputs(prev => ({
          ...prev,
          grainBill: [
            ...prev.grainBill,
            { type: "Base Malt", name: "", weight: 0, lovibold: 0 }
          ]
        }))
      }
      onRemove={(index) =>
        setInputs(prev => ({
          ...prev,
          grainBill: prev.grainBill.filter((_, i) => i !== index)
        }))
      }
      renderRow={(grain, i) => (
        <>
          <div className="col-span-3">
            <select
              value={grain.type}
              onChange={(e) => updateGrain(i, "type", e.target.value)}
              className="w-full text-sm border rounded px-2 py-2"
            >
              <option>Base Malt</option>
              <option>Crystal/Caramel</option>
              <option>Roasted</option>
              <option>Specialty</option>
              <option>Adjunct</option>
            </select>
          </div>

          <div className="col-span-3">
            <input
              value={grain.name}
              onChange={(e) => updateGrain(i, "name", e.target.value)}
              className="w-full text-sm border rounded px-2 py-2"
            />
          </div>

          <div className="col-span-2">
            <input
              type="number"
              value={grain.weight}
              onChange={(e) => updateGrain(i, "weight", e.target.value)}
              className="w-full text-sm border rounded px-2 py-2"
            />
          </div>

          <div className="col-span-2">
            <input
              type="number"
              value={grain.lovibold}
              onChange={(e) => updateGrain(i, "lovibold", e.target.value)}
              className="w-full text-sm border rounded px-2 py-2"
            />
          </div>
        </>
      )}
    />
  );
}
