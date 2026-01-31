import { Typography, TextField, Stack } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";

export default function RecipeStepBasic() {
  const { recipe, updateBasicInfo } = useRecipe();

  return (
    <Stack spacing={3}>
      <Typography variant="h5" gutterBottom>
        Basic Information
      </Typography>

      <TextField
        label="Title"
        fullWidth
        value={recipe.title}
        onChange={(e) => updateBasicInfo('title', e.target.value)}
        placeholder="e.g., Summer Pale Ale"
        required
      />

      <TextField
        label="Description"
        fullWidth
        value={recipe.description}
        onChange={(e) => updateBasicInfo('description', e.target.value)}
        placeholder="Describe your recipe..."
        multiline
        rows={3}
        required
      />

      <TextField
        label="Instructions"
        fullWidth
        multiline
        minRows={5}
        value={recipe.instructions}
        onChange={(e) => updateBasicInfo('instructions', e.target.value)}
        placeholder="Step-by-step brewing instructions..."
        required
      />
    </Stack>
  );
}