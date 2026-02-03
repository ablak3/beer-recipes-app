import { useRecipe } from "../../hooks/useRecipe";
import { Ingredient } from "../../types";
import { defaultIngredient } from "../../constants/defaultRecipeValues";
import EditableGridManager from "../../components/EditableGridManager";
import IngredientRow from "./IngredientsRow";

export default function IngredientsSection() {
  const { recipe, addIngredient, updateIngredient, removeIngredient } = useRecipe();

  const renderIngredientRow = (ingredient: Ingredient, index: number) => (
    <IngredientRow
      ingredient={ingredient}
      index={index}
      onUpdate={updateIngredient}
    />
  );

  return (
    <EditableGridManager
      items={recipe.ingredients}
      renderRow={renderIngredientRow}
      onAdd={() => addIngredient(defaultIngredient)}
      onRemove={removeIngredient}
      emptyText="No ingredients added yet."
      addLabel="Add Ingredient"
      minItems={1}
    />
  );
}