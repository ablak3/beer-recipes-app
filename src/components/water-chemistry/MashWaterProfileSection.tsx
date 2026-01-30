import React from "react";
import { Grid } from "@mui/material";
import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import Section from "../Section";

interface Props {
  results: WaterChemistryResults;
}

export default function MashWaterProfileSection({ results }: Props) {
  return (
    <Section title="Mash Water Profile">
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Calcium (Ca)" value={results.mashCalcium} unit="ppm" range="50-150" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Magnesium (Mg)" value={results.mashMagnesium} unit="ppm" range="10-30" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Sodium (Na)" value={results.mashSodium} unit="ppm" range="0-150" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Chloride (Cl)" value={results.mashChloride} unit="ppm" range="0-250" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Sulfate (SO₄)" value={results.mashSulfate} unit="ppm" range="50-350" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard label="Bicarbonate (HCO₃)" value={results.mashBicarbonate} unit="ppm" range="0-250" />
      </Grid>
    </Section>
  );
}
