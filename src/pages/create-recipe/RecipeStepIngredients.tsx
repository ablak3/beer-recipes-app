import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { IngredientType, StepAdded, Ingredient } from "../../types";
import { defaultIngredient } from "../../constants/defaultRecipeValues";
import EditableGridManager from "../../components/EditableGridManager";
import Section from "../../components/Section";

export default function RecipeStepIngredients() {
  const { recipe, addIngredient, updateIngredient, removeIngredient } = useRecipe();

  const renderIngredientRow = (ingredient: Ingredient, index: number) => (
    <>
      {/* Ingredient Type */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={ingredient.type}
            onChange={(e) => {
              updateIngredient(index, {
                ...ingredient,
                type: e.target.value as IngredientType
              });
            }}
          >
            {Object.values(IngredientType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Ingredient Name */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Name"
          fullWidth
          value={ingredient.name}
          onChange={(e) => {
            updateIngredient(index, {
              ...ingredient,
              name: e.target.value
            });
          }}
        />
      </Grid>

      {/* Amount */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={ingredient.amount}
          onChange={(e) => {
            updateIngredient(index, {
              ...ingredient,
              amount: parseFloat(e.target.value) || 0
            });
          }}
        />
      </Grid>

      {/* Units */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Units"
          fullWidth
          value={ingredient.units}
          onChange={(e) => {
            updateIngredient(index, {
              ...ingredient,
              units: e.target.value
            });
          }}
        />
      </Grid>

      {/* Step Added */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Step Added</InputLabel>
          <Select
            label="Step Added"
            value={ingredient.stepAdded}
            onChange={(e) => {
              updateIngredient(index, {
                ...ingredient,
                stepAdded: e.target.value as StepAdded
              });
            }}
          >
            {Object.values(StepAdded).map((step) => (
              <MenuItem key={step} value={step}>
                {step}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Time Added */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Time Added"
          fullWidth
          value={ingredient.timeAdded}
          onChange={(e) => {
            updateIngredient(index, {
              ...ingredient,
              timeAdded: e.target.value
            });
          }}
        />
      </Grid>
    </>
  );

  return (
    <Section title="Ingredients">
      <EditableGridManager
        items={recipe.ingredients}
        renderRow={renderIngredientRow}
        onAdd={() => addIngredient(defaultIngredient)}
        onRemove={removeIngredient}
        emptyText="No ingredients added yet."
        addLabel="Add Ingredient"
        minItems={1}
      />
    </Section>
    
  );
}