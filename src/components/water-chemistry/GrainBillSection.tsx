import { useRecipe } from "../../hooks/useRecipe";
import { defaultGrain } from "../../constants/defaultRecipeValues";
import { grainFields } from "../../constants/defaultFieldNames";
import ItemSection from "../ItemSection";

export default function GrainBillSection() {
  const { recipe, addGrain, updateGrain, removeGrain } = useRecipe();

  return (
    <ItemSection
      items={recipe.grainBill}
      fields={grainFields}
      numCards={4}
      onAdd={addGrain}
      onUpdate={updateGrain}
      onRemove={removeGrain}
      defaultItem={defaultGrain}
      emptyText="No grains added yet. Click below to add grains."
      addLabel="Add Grain"
      minItems={1}
      ensureMinimum
    />
  );
}