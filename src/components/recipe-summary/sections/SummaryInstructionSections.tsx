// src/components/recipe-summary/sections/SummaryInstructionsSection.tsx
import { Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle, summaryMutedTextSx } from "../../../styles/fieldStyles";

export default function SummaryInstructionsSection({
  recipe,
  editTo,
  editable = true,
}: {
  recipe: Recipe;
  editTo: string;
  editable: boolean;
}) {
  return (
    <>
      <SummarySectionHeader title="Instructions" to={editTo} editable={editable} />
      <Paper {...paperCardStyle}>
        <Typography {...labelStyle}>Steps</Typography>
        <Typography variant="body2" sx={summaryMutedTextSx} style={{ whiteSpace: "pre-wrap" }}>
          {recipe.instructions || "No instructions yet."}
        </Typography>
      </Paper>
    </>
  );
}
