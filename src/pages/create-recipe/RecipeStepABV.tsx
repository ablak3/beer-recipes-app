import { useEffect, useMemo } from "react";
import { Alert } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { useABVCalculator } from "../../hooks/useABVCalculator";
import { useOGFromGrainsCalculator } from "../../hooks/useOGFromGrainsCalculator";
import Section from "../../components/Section";
import PageSection from "../../components/PageSection";
import ResultCard from "../../components/ResultCard";
import type { Grain } from "../../types";
import InputCard from "../../components/InputCard";
import CardGrid from "../../components/CardGrid";
import { abvInputs } from "../../constants/defaultFieldNames";


export default function RecipeStepABV() {
  const { recipe, updateABVInput, updateABVResults } = useRecipe();

  const recipeAbvInputs = recipe.abvInputs;
  const grainBill = recipe.grainBill;
  const batchSize = recipe.brewInABagSettings.batchSize;

  const results = useABVCalculator(recipeAbvInputs, grainBill, batchSize);

  // Calculate estimated OG from grain bill
  const estimatedOG = useOGFromGrainsCalculator(
    grainBill,
    batchSize,
    recipeAbvInputs.mashEfficiency,
  );

  // Update results in context whenever they change
  useEffect(() => {
    updateABVResults(results);
  }, [results, updateABVResults]);

  // Auto-update OG when grain bill or efficiency changes
  useEffect(() => {
    if (estimatedOG > 1.0 && grainBill.length > 0 && grainBill[0].weight > 0) {
      updateABVInput("originalGravity", estimatedOG);
    }
  }, [estimatedOG, grainBill, updateABVInput]);

  const totalGrainWeight = useMemo(
    () => grainBill?.reduce((sum: number, g: Grain) => sum + g.weight, 0) ?? 0,
    [grainBill],
  );

  return (
    <PageSection title="ABV Calculator">
        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
            Original Gravity is automatically calculated from your grain bill and
            mash efficiency. Adjust mash efficiency to fine-tune the estimate.
        </Alert>

        {/* Inputs */}
        <Section title="Inputs">
            <InputCard
            fields={abvInputs}
            basePath="abvInputs"
            numCards={3} />
        </Section>

        {/* Estimated OG Display */}
        <Section title="Estimated OG from Grain Bill">
            <CardGrid numCards={3}>
            <ResultCard
                label="Calculated OG"
                value={estimatedOG}
                decimals={3}
                highlight
                info={`Based on ${totalGrainWeight.toFixed(1)} lbs of grain in ${batchSize} gallons`} />
            </CardGrid>
        </Section>

        {/* Results */}
        <Section title="Results">
            <CardGrid numCards={3}>
            <ResultCard
                label="Alcohol By Volume"
                value={results.abv}
                unit="%"
                decimals={2}
                highlight
                range="3-12%" />
            <ResultCard
                label="Calories"
                value={results.calories}
                unit="per 12 oz"
                decimals={0}
                info="Estimated calories per 12 oz serving"/>
            <ResultCard
                label="Apparent Attenuation"
                value={results.attenuation}
                unit="%"
                decimals={1}
                range="65-80%"
                info="Percentage of sugars converted by yeast"/>
            </CardGrid>
        </Section>
    </PageSection>
  );
}
