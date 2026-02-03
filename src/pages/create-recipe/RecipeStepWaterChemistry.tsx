import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { useWaterChemistry } from "../../hooks/useWaterChemistry";
import WaterProfileResults from "../../components/water-chemistry/WaterProfileResults";
import Section from "../../components/Section";
import Inputs from "../../components/ResultInputs";
import { 
  waterVolumesFields, 
  startingWaterChemistryNumericFields,
  waterAdjustmentSaltsFields,
  waterAdjustmentAcidFields
} from "../../constants/defautNumericValues";

export default function RecipeStepWaterChemistry() {
  const { 
    recipe,
    updateWaterChemistryResults,
    getGrainBill,
  } = useRecipe();
  
  const grainBill = getGrainBill();
  const waterChemistryInputs = recipe.waterChemistryInputs;
  const waterAdjustments = recipe.waterAdjustments;
  const results = useWaterChemistry(waterChemistryInputs, waterAdjustments, grainBill);

  // Update results in context whenever they change
  useEffect(() => {
    updateWaterChemistryResults(results);
  }, [results, updateWaterChemistryResults]);

  return (
    <Stack spacing={6}>
      <Section title="Water Chemistry">
        <Section title="Starting Water Profile (ppm)">
          <Inputs
            fields={startingWaterChemistryNumericFields}
            basePath="waterChemistryInputs.startingWaterProfile"
          />
        </Section>
        <Section title="Water Volumes">
          <Inputs
            fields={waterVolumesFields}
            basePath="waterChemistryInputs.waterVolumes"
          />
        </Section>
        <Section title="Water Adjustments">
          <Section title="Salt Additions (grams)">
            <Inputs
              fields={waterAdjustmentSaltsFields}
              basePath="waterAdjustments"
            />
          </Section>
          <Section title="Acid Additions (mL)">
            <Inputs
              fields={waterAdjustmentAcidFields}
              basePath="waterAdjustments"
            />
          </Section>
        </Section>
        <Section title="Water Chemistry Results">
          <WaterProfileResults results={results} />
        </Section>
      </Section>
    </Stack>
  );
}