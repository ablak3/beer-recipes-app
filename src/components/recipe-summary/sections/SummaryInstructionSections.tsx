// src/components/recipe-summary/sections/SummaryInstructionsSection.tsx
import { Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle, summaryMutedTextSx } from "../../../styles/fieldStyles";

export default function SummaryInstructionsSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  return (
    <>
      <SummarySectionHeader title="Instructions" to={editTo} />
      <Paper {...paperCardStyle}>
        <Typography {...labelStyle}>Steps</Typography>
        <Typography variant="body2" sx={summaryMutedTextSx} style={{ whiteSpace: "pre-wrap" }}>
          {recipe.instructions || "No instructions yet."}
        </Typography>
      </Paper>
    </>
  );
}
