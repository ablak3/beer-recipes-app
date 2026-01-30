import React from "react";
import { Grid } from "@mui/material";
import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import Section from "../Section";

interface Props {
  results: WaterChemistryResults;
}

export default function WaterAnalysisSection({ results }: Props) {
  return (
    <Section title="Analysis">
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Cl/SO₄ Ratio"
          value={results.chlorideSulfateRatio}
          decimals={2}
          info="<0.8: Bitter/Hoppy, >1.5: Malty/Sweet"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Residual Alkalinity"
          value={results.residualAlkalinity}
          decimals={1}
          unit="ppm as CaCO₃"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Estimated Mash pH"
          value={results.estimatedMashPH}
          decimals={2}
          range="5.2-5.6"
          highlight
          info="Target: 5.2-5.6"
        />
      </Grid>
    </Section>
  );
}
