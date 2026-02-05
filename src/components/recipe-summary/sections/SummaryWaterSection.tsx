// src/components/recipe-summary/sections/SummaryWaterSection.tsx
import { Divider, Paper, Typography } from "@mui/material";
import { Recipe } from "../../../types";
import CardGrid from "../../CardGrid";
import ResultCard from "../../ResultCard";
import SummarySectionHeader from "../SummarySectionHeader";
import { paperCardStyle, labelStyle } from "../../../styles/fieldStyles";

export default function SummaryWaterSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const water = recipe.waterChemistryResults;

  return (
    <>
      <SummarySectionHeader title="Water Chemistry" to={editTo} />

      {water?.totalWaterProfile ? (
        <CardGrid numCards={6}>
          <ResultCard label="Calcium" subLabel="Ca" value={water.totalWaterProfile.totalCalcium} unit="ppm" decimals={1} />
          <ResultCard label="Magnesium" subLabel="Mg" value={water.totalWaterProfile.totalMagnesium} unit="ppm" decimals={1} />
          <ResultCard label="Sodium" subLabel="Na" value={water.totalWaterProfile.totalSodium} unit="ppm" decimals={1} />
          <ResultCard label="Chloride" subLabel="Cl" value={water.totalWaterProfile.totalChloride} unit="ppm" decimals={1} />
          <ResultCard label="Sulfate" subLabel="SO₄" value={water.totalWaterProfile.totalSulfate} unit="ppm" decimals={1} />
          <ResultCard label="Bicarbonate" subLabel="HCO₃" value={water.totalWaterProfile.totalBicarbonate} unit="ppm" decimals={1} />
        </CardGrid>
      ) : (
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>No water chemistry results yet.</Typography>
        </Paper>
      )}

      <Divider sx={{ my: 3 }} />
    </>
  );
}
