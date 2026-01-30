import React from "react";
import { Grid } from "@mui/material";
import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import Section from "../Section";

interface Props {
  results: WaterChemistryResults;
}

export default function TotalWaterProfileSection({ results }: Props) {
  return (
    <Section title="Total Water Profile">
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Calcium (Ca)" value={results.totalCalcium} unit="ppm" range="50-150" highlight />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Magnesium (Mg)" value={results.totalMagnesium} unit="ppm" range="10-30" highlight />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Sodium (Na)" value={results.totalSodium} unit="ppm" range="0-150" highlight />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Chloride (Cl)" value={results.totalChloride} unit="ppm" range="0-250" highlight />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Sulfate (SO₄)" value={results.totalSulfate} unit="ppm" range="50-350" highlight />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Bicarbonate (HCO₃)" value={results.totalBicarbonate} unit="ppm" range="0-250" highlight />
      </Grid>
    </Section>
  );
}
