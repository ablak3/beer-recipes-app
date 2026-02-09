// src/components/recipe-summary/sections/SummaryBasicSection.tsx
import { Divider, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import { paperCardStyle, summaryMutedTextSx } from "../../../styles/fieldStyles";
import SummarySectionHeader from "../SummarySectionHeader";
import SummaryRowKV from "../SummaryRowKV";

export default function SummaryBasicSection({
  recipe,
  editTo,
  editable = true,
}: {
  recipe: Recipe;
  editTo: string;
  editable: boolean;
}) {
  const grainCount = recipe.grainBill?.length ?? 0;
  const hopCount = recipe.hops?.length ?? 0;
  const ingredientCount = recipe.ingredients?.length ?? 0;

  return (
    <>
      <SummarySectionHeader title="Basic" to={editTo} editable={editable} />
      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {recipe.title || "Untitled Recipe"}
        </Typography>
        <Typography variant="body2" sx={summaryMutedTextSx}>
          {recipe.description || "No description provided."}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <SummaryRowKV k="Grains" v={grainCount} />
        <SummaryRowKV k="Hops" v={hopCount} />
        <SummaryRowKV k="Ingredients" v={ingredientCount} />
        <SummaryRowKV k="Author" v={recipe.author || "—"} />
      </Paper>
    </>
  );
}
