// src/components/recipe-summary/sections/SummaryBiabSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import {
  paperCardStyle,
  labelStyle,
  summaryListItemSx,
  summaryMutedTextSx,
} from "../../../styles/fieldStyles";

export default function SummaryBiabSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const biab = recipe.brewInABagSettings;

  const format = (v: any, decimals = 0, unit?: string) => {
    const num = Number(v);
    if (!Number.isFinite(num)) return "—";
    const str = num.toFixed(decimals);
    return unit ? `${str} ${unit}` : str;
  };

  const items = [
    { label: "Batch Size", value: biab?.batchSize, decimals: 1, unit: biab?.liquidUnit },
    { label: "Mash Temp", value: biab?.mashTemp, decimals: 0, unit: biab?.tempUnit },
    { label: "Boil Time", value: biab?.boilTime, decimals: 0, unit: biab?.timeUnit },
    { label: "Kettle Size", value: biab?.kettleSize, decimals: 1, unit: biab?.liquidUnit },
  ];

  return (
    <>
      <SummarySectionHeader title="Brew-In-A-Bag" to={editTo} />

      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {items.every((i) => !Number.isFinite(Number(i.value))) ? (
          <Typography {...labelStyle}>No BIAB settings yet.</Typography>
        ) : (
          items.map((item) => (
            <Box key={item.label} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {format(item.value, item.decimals, item.unit)}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
