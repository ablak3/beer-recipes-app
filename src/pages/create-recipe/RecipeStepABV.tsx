import { useEffect, useMemo } from "react";
import { Stack, Grid, Alert } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { useABVCalculator, calculateOGFromGrains } from "../../hooks/useABVCalculator";
import Section from "../../components/Section";
import Inputs from "../../components/ResultInputs";
import ResultCard from "../../components/ResultCard";
import type { Grain } from "../../types";

const abvInputFields = [
  { name: "originalGravity" as const, label: "Original Gravity (OG)" },
  { name: "finalGravity" as const, label: "Final Gravity (FG)" },
  { name: "mashEfficiency" as const, label: "Mash Efficiency (%)" },
];

export default function RecipeStepABV() {
  const { recipe, updateABVInput, updateABVResults } = useRecipe();
  
  const abvInputs = recipe.abvInputs;
  const grainBill = recipe.grainBill;
  const batchSize = recipe.brewInABagSettings.batchSize;
  
  const results = useABVCalculator(abvInputs, grainBill, batchSize);

  // Calculate estimated OG from grain bill
  const estimatedOG = calculateOGFromGrains(
    grainBill,
    batchSize,
    abvInputs.mashEfficiency
  );

  // Update results in context whenever they change
  useEffect(() => {
    updateABVResults(results);
  }, [results, updateABVResults]);

  // Auto-update OG when grain bill or efficiency changes
  useEffect(() => {
    if (estimatedOG > 1.000 && grainBill.length > 0 && grainBill[0].weight > 0) {
      updateABVInput('originalGravity', estimatedOG);
    }
  }, [estimatedOG, grainBill, updateABVInput]);

  const totalGrainWeight = useMemo(
  () => grainBill?.reduce((sum: number, g: Grain) => sum + g.weight, 0) ?? 0,
  [grainBill]
);

  return (
    <Stack spacing={6}>
      <Section title="ABV Calculator">
        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          Original Gravity is automatically calculated from your grain bill and mash
          efficiency. Adjust mash efficiency to fine-tune the estimate.
        </Alert>

        {/* Inputs */}
        <Section title="Inputs">
          <Inputs
            fields={abvInputFields}
            basePath="abvInputs"
          />
        </Section>

        {/* Estimated OG Display */}
        <Section title="Estimated OG from Grain Bill">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ResultCard
                label="Calculated OG"
                value={estimatedOG}
                decimals={3}
                highlight
                info={`Based on ${totalGrainWeight.toFixed(1)} lbs of grain in ${batchSize} gallons`}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Results */}
        <Section title="Results">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ResultCard
                label="Alcohol By Volume"
                value={results.abv}
                unit="%"
                decimals={2}
                highlight
                range="3-12%"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ResultCard
                label="Calories"
                value={results.calories}
                unit="per 12 oz"
                decimals={0}
                info="Estimated calories per 12 oz serving"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ResultCard
                label="Apparent Attenuation"
                value={results.attenuation}
                unit="%"
                decimals={1}
                range="65-80%"
                info="Percentage of sugars converted by yeast"
              />
            </Grid>
          </Grid>
        </Section>
      </Section>
    </Stack>
  );
}