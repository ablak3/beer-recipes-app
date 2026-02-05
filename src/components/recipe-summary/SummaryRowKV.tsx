// src/components/recipe-summary/SummaryRowKV.tsx
import { Box, Typography } from "@mui/material";
import { summaryListItemSx, summaryMutedTextSx } from "../../styles/fieldStyles";

export default function SummaryRowKV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <Box sx={summaryListItemSx}>
      <Typography variant="body2" sx={summaryMutedTextSx}>
        {k}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "right" }}>
        {v}
      </Typography>
    </Box>
  );
}
