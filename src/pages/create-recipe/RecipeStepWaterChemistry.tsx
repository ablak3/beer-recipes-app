import { useEffect } from "react";
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
  const { recipe, updateWaterChemistryResults, getGrainBill } = useRecipe();

  const grainBill = getGrainBill();
  const waterChemistryInputs = recipe.waterChemistryInputs;
  const waterAdjustments = recipe.waterAdjustments;
  const results = useWaterChemistry(
    waterChemistryInputs,
    waterAdjustments,
    grainBill,
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
            basePath="waterChemistryInputs.startingWaterProfile"
            numCards={6} />
        </Section>
        <Section title="Water Volumes">
          <InputCard
            fields={waterVolumesFields}
            basePath="waterChemistryInputs.waterVolumes"
            numCards={3} />
        </Section>
        <Section title="Acid Additions (mL)">
          <InputCard
            fields={waterAdjustmentAcidFields}
            basePath="waterAdjustments"
            numCards={3} />
        </Section>
        <Section title="Salt Additions (grams)">
          <InputCard
            fields={waterAdjustmentSaltsFields}
            basePath="waterAdjustments"
            numCards={6} />
        </Section>
        <Section title="Total Water Profile">
          <TotalWaterProfileSection results={results} />
          <WaterAnalysisSection results={results} />
          <WaterWarningsSection warnings={results.warnings} />
        </Section>
    </PageSection>
  );
}
