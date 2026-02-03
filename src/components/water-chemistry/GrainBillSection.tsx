import React from "react";
import { Grain } from "../../types";
import EditableGridManager from "../EditableGridManager";
import GrainRow from "./GrainRow";
import { defaultGrain } from "../../constants/defaultRecipeValues";
import { useRecipe } from "../../hooks/useRecipe";

export default function GrainBillSection() {
  const { recipe, addGrain, updateGrain, removeGrain } = useRecipe();
  const grainBill = recipe.grainBill;

  // Ensure at least one grain entry exists
  React.useEffect(() => {
    if (grainBill.length === 0) {
      addGrain(defaultGrain);
    }
  }, [grainBill.length, addGrain]);

  const renderGrainRow = (grain: Grain, index: number) => (
    <GrainRow grain={grain} index={index} onUpdate={updateGrain} />
  );

  return (
    <EditableGridManager<Grain>
      items={grainBill}
      renderRow={renderGrainRow}
      onAdd={() => addGrain(defaultGrain)}
      onRemove={removeGrain}
      emptyText="No grains added yet. Click below to add grains."
      addLabel="Add Grain"
      minItems={1}
    />
  );
}