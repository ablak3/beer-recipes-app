// src/components/recipe-summary/sections/SummaryIngredientsSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle, summaryListItemSx, summaryMutedTextSx } from "../../../styles/fieldStyles";

export default function SummaryIngredientsSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const ingredients = recipe.ingredients ?? [];

  return (
    <>
      <SummarySectionHeader title="Ingredients" to={editTo} />
      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {ingredients.length === 0 ? (
          <Typography {...labelStyle}>No ingredients added.</Typography>
        ) : (
          ingredients.map((ing, idx) => (
            <Box key={`${ing.name}-${idx}`} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {ing.name}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {ing.amount} {ing.units} • {ing.stepAdded}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
