import { useEffect, useMemo } from "react";
import { useRecipe } from "../../hooks/useRecipe";
import { useWaterChemistry } from "../../hooks/useWaterChemistry";
import TotalWaterProfileSection from "../../components/water-chemistry/TotalWaterProfileSection";
import WaterAnalysisSection from "../../components/water-chemistry/WaterAnalysisSection";
import WaterWarningsSection from "../../components/water-chemistry/WaterWarningsSection";
import Section from "../../components/Section";
import PageSection from "../../components/PageSection";
import InputCard from "../../components/InputCard";
import {
  waterVolumesFields,
  startingWaterChemistryNumericFields,
  waterAdjustmentSaltsFields,
  waterAdjustmentAcidFields,
} from "../../constants/defaultFieldNames";

export default function RecipeStepWaterChemistry() {
  const {
    recipe,
    updateWaterChemistryInput,
    updateWaterAdjustments,
    updateWaterChemistryResults,
  } = useRecipe();

  // Get grain bill directly from recipe
  const grainBill = useMemo(() => recipe.grainBill, [recipe.grainBill]);

  const results = useWaterChemistry(
    recipe.waterChemistryInputs,
    recipe.waterAdjustments,
    grainBill
  );

  // Update results in context whenever they change
  useEffect(() => {
    updateWaterChemistryResults(results);
  }, [results, updateWaterChemistryResults]);

  return (
    <PageSection title="Water Chemistry">
        <Section title="Starting Water Profile (ppm)">
          <InputCard
            fields={startingWaterChemistryNumericFields}
            basePath="startingWaterProfile"
            numCards={6}
            rootValue={recipe.waterChemistryInputs}
            onChange={(path, value) =>
              updateWaterChemistryInput(`waterChemistryInputs.${path}`, value)
            }
          />
        </Section>

        <Section title="Water Volumes">
          <InputCard
            fields={waterVolumesFields}
            basePath="waterVolumes"
            numCards={3}
            rootValue={recipe.waterChemistryInputs}
            onChange={(path, value) =>
              updateWaterChemistryInput(`waterChemistryInputs.${path}`, value)
            }
          />
        </Section>
        <Section title="Acid Additions (mL)">
          <InputCard
            fields={waterAdjustmentAcidFields}
            basePath=""
            numCards={3}
            rootValue={recipe.waterAdjustments}
            onChange={(path, value) => {
              const field = path as keyof typeof recipe.waterAdjustments;
              updateWaterAdjustments(field, value as any);
            }}
          />
        </Section>

        <Section title="Salt Additions (grams)">
          <InputCard
            fields={waterAdjustmentSaltsFields}
            basePath=""
            numCards={6}
            rootValue={recipe.waterAdjustments}
            onChange={(path, value) => {
              const field = path as keyof typeof recipe.waterAdjustments;
              updateWaterAdjustments(field, value as any);
            }}
          />
        </Section>
        <Section title="Total Water Profile">
          <TotalWaterProfileSection results={results} />
          <WaterAnalysisSection results={results} />
          <WaterWarningsSection warnings={results.warnings} />
        </Section>
    </PageSection>
  );
}
