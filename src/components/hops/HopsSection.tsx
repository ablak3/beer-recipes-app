import { useRecipe } from "../../hooks/useRecipe";
import { defaultHop } from "../../constants/defaultRecipeValues";
import { hopFields } from "../../constants/defaultFieldNames";
import ItemSection from "../ItemSection";

export default function HopsSection() {
  const { recipe, addHop, updateHop, removeHop } = useRecipe();

  return (
    <ItemSection
      items={recipe.hops}
      fields={hopFields}
      numCards={6}
      onAdd={addHop}
      onUpdate={updateHop}
      onRemove={removeHop}
      defaultItem={defaultHop}
      emptyText="No hops added yet. Click below to add hops."
      addLabel="Add Hop"
      minItems={1}
      ensureMinimum
    />
  );
}