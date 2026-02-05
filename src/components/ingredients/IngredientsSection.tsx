import { useRecipe } from "../../hooks/useRecipe";
import { defaultIngredient } from "../../constants/defaultRecipeValues";
import { ingredientFields } from "../../constants/defaultFieldNames";
import ItemSection from "../ItemSection";

export default function IngredientsSection() {
  const { recipe, addIngredient, updateIngredient, removeIngredient } = useRecipe();

  return (
    <ItemSection
      items={recipe.ingredients}
      fields={ingredientFields}
      numCards={6}
      onAdd={addIngredient}
      onUpdate={updateIngredient}
      onRemove={removeIngredient}
      defaultItem={defaultIngredient}
      emptyText="No ingredients added yet."
      addLabel="Add Ingredient"
      minItems={1}
      ensureMinimum
    />
  );
}