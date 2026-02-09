// src/components/recipe-summary/sections/SummaryAbvIbuSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import {
  paperCardStyle,
  labelStyle,
  summaryListItemSx,
  summaryMutedTextSx,
} from "../../../styles/fieldStyles";

export default function SummaryAbvIbuSection({
  recipe,
  editToAbv,
  editToIbu,
  editable = true,
}: {
  recipe: Recipe;
  editToAbv: string;
  editToIbu: string;
  editable: boolean;
}) {
  const abvInputs = recipe.abvInputs;
  const abvResults = recipe.abvResults;
  const ibuResults = recipe.ibuResults;

  const items = [
    { label: "OG", value: abvInputs?.originalGravity, decimals: 3, to: editToAbv },
    { label: "FG", value: abvInputs?.finalGravity, decimals: 3, to: editToAbv },
    { label: "ABV", value: abvResults?.abv, suffix: "%", decimals: 1, to: editToAbv },
    { label: "Total IBU", value: ibuResults?.totalIBU, decimals: 1, to: editToIbu },
  ];

  const format = (v: any, decimals?: number, suffix?: string) => {
    const num = Number(v);
    if (!Number.isFinite(num)) return "—";
    const str = decimals != null ? num.toFixed(decimals) : String(num);
    return suffix ? `${str} ${suffix}` : str;
  };

  return (
    <>
      <SummarySectionHeader title="ABV / IBU" to={editToAbv} editable={editable} />

      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {items.every((i) => !Number.isFinite(Number(i.value))) ? (
          <Typography {...labelStyle}>No ABV/IBU data yet.</Typography>
        ) : (
          items.map((item) => (
            <Box key={item.label} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {format(item.value, item.decimals, item.suffix)}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
