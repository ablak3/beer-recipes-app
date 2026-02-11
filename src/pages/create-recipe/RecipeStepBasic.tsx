import { TextField, Paper } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import PageSection from "../../components/PageSection";
import CardGrid from "../../components/CardGrid";
import { paperCardStyle } from "../../styles/fieldStyles";
import { useAuth } from "../../hooks/useAuth";

export default function RecipeStepBasic() {
  const { recipe, updateBasicInfo } = useRecipe();
  const { user } = useAuth();


  return (
    <PageSection title="Basic Information">
      <CardGrid numCards={1}>
        <Paper {...paperCardStyle}>
          <TextField
            label="Title"
            fullWidth
            value={recipe.title}
            onChange={(e) => {
              updateBasicInfo('title', e.target.value);
              updateBasicInfo('author', user ? user : "anon");
            }}
            placeholder="e.g., Summer Pale Ale"
            required />
        </Paper>
      </CardGrid>
      <CardGrid numCards={1}>
        <Paper {...paperCardStyle}>
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
        </Paper>
      </CardGrid>
      <CardGrid numCards={1}>
        <Paper {...paperCardStyle}>
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
        </Paper> 
      </CardGrid>
    </PageSection>
  );
}