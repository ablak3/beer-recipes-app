// src/components/recipe-summary/sections/SummaryHopScheduleSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle, summaryListItemSx, summaryMutedTextSx } from "../../../styles/fieldStyles";

export default function SummaryHopScheduleSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const hops = recipe.hops ?? [];

  return (
    <>
      <SummarySectionHeader title="Hop Schedule" to={editTo} />
      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {hops.length === 0 ? (
          <Typography {...labelStyle}>No hops added.</Typography>
        ) : (
          hops.map((h, idx) => (
            <Box key={`${h.name}-${idx}`} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {h.name}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {h.amount} oz • {h.alphaAcid}% • {h.boilTime} min
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
