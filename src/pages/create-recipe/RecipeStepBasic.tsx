import { TextField } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import PageSection from "../../components/PageSection";

export default function RecipeStepBasic() {
  const { recipe, updateBasicInfo } = useRecipe();

  return (
    <PageSection title="Basic Information">
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
    </PageSection>
  );
}