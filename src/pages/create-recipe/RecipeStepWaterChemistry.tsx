import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { useWaterChemistry } from "../../hooks/useWaterChemistry";
import Section from "../../components/Section";
import GrainBillSection from "../../components/water-chemistry/GrainBillSection";
import WaterProfileResults from "../../components/water-chemistry/WaterProfileResults";
import Inputs from "../../components/Inputs"
import {
  startingWaterChemistryNumericFields,
  waterVolumes,
  acidAdditions,
  mashSaltAdditions,
  spargeSaltAdditions,
} from "../../constants/defautNumericValues";

export default function RecipeStepWaterChemistry() {
  const { 
    waterChemistryInputs, 
    updateWaterChemistryInput,
    updateWaterChemistryResults,
  } = useRecipe();
  
  const results = useWaterChemistry(waterChemistryInputs);

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
            basePath="waterChemistryInputs"
          />
        </Section>

        <Section title="Water Volumes">
          <Inputs fields={waterVolumes} basePath="waterVolumes" />
        </Section>

        <Section title="Grain Bill">
          <GrainBillSection
          grainBill={waterChemistryInputs.grainBill}
          setInputs={(updater) => {
            const newInputs = typeof updater === 'function' 
              ? updater(waterChemistryInputs) 
              : updater;
            
            Object.entries(newInputs).forEach(([key, value]) => {
              updateWaterChemistryInput(key as any, value);
            });
          }}
        />
        </Section>
      </Section>

      {/* COLUMN 2 */}
        <div className="space-y-6">
          {waterChemistryInputs.mashWaterVolume > 0 && (
            <Section title="Mash Salt Additions (g)" columns={3}>
              <Inputs
                fields={mashSaltAdditions}
                basePath="mashSaltAdditions"
              />
            </Section>
          )}

          {waterChemistryInputs.spargeWaterVolume > 0 && (
            <Section title="Sparge Salt Additions (g)" columns={3}>
              <Inputs
                fields={spargeSaltAdditions}
                basePath="spargeSaltAdditions"
              />
            </Section>
          )}

          <Section title="Acid Additions" columns={2}>
            <Inputs fields={acidAdditions} basePath="acidAdditions" />
          </Section>
        </div>

      <WaterProfileResults results={results} />
    </Stack>
  );
}