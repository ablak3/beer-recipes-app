// src/components/recipe-summary/sections/SummaryWaterSection.tsx
import { Box, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import SummarySectionHeader from "../SummarySectionHeader";
import {
  paperCardStyle,
  labelStyle,
  summaryListItemSx,
  summaryMutedTextSx,
} from "../../../styles/fieldStyles";

export default function SummaryWaterSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const water = recipe.waterChemistryResults;
  const p = water?.totalWaterProfile;

  const items = p
    ? [
        { label: "Calcium", sub: "Ca", value: p.totalCalcium },
        { label: "Magnesium", sub: "Mg", value: p.totalMagnesium },
        { label: "Sodium", sub: "Na", value: p.totalSodium },
        { label: "Chloride", sub: "Cl", value: p.totalChloride },
        { label: "Sulfate", sub: "SO₄", value: p.totalSulfate },
        { label: "Bicarbonate", sub: "HCO₃", value: p.totalBicarbonate },
      ]
    : [];

  const formatPpm = (v: any) => {
    const num = Number(v);
    return Number.isFinite(num) ? `${num.toFixed(1)} ppm` : "—";
  };

  return (
    <>
      <SummarySectionHeader title="Water Chemistry" to={editTo} />

      <Paper {...paperCardStyle} sx={{ ...paperCardStyle.sx, mb: 3 }}>
        {!p ? (
          <Typography {...labelStyle}>No water chemistry results yet.</Typography>
        ) : (
          items.map((item) => (
            <Box key={item.label} sx={summaryListItemSx}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
                {item.sub ? (
                  <Typography component="span" sx={{ ...summaryMutedTextSx, ml: 1 }}>
                    {item.sub}
                  </Typography>
                ) : null}
              </Typography>
              <Typography variant="body2" sx={summaryMutedTextSx}>
                {formatPpm(item.value)}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </>
  );
}
