// src/components/recipe-summary/sections/SummaryGrainBillSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle, summaryListItemSx, summaryMutedTextSx } from "../../../styles/fieldStyles";

export default function SummaryGrainBillSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const grains = recipe.grainBill ?? [];
  const unit = recipe.brewInABagSettings?.grainBillUnit;

  return (
    <>
      <SummarySectionHeader title="Grain Bill" to={editTo} />
      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {grains.length === 0 ? (
          <Typography {...labelStyle}>No grains added.</Typography>
        ) : (
          grains.map((g, idx) => (
            <Box key={`${g.name}-${idx}`} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {g.name}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {g.weight} {unit}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
