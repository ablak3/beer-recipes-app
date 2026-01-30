import { useState } from "react";
import { useWaterChemistry } from "../../hooks/useWaterChemistry";
import { WaterChemistryInputs } from "../../types";
import { defaultWaterChemistryInputs } from "../../constants/defaultRecipeValues";
import Section from "../../components/Section";
import GrainBillSection from "../../components/water-chemistry/GrainBillSection";
import NumericInputs from "../../components/Inputs";
import WaterProfileResults from "../../components/water-chemistry/WaterProfileResults";

import {
  startingWaterChemistryNumericFields,
  waterVolumes,
  acidAdditions,
  mashSaltAdditions,
  spargeSaltAdditions,
} from "../../constants/defautNumericValues";

export default function RecipeStepWaterChemistry() {
  const [inputs, setInputs] = useState<WaterChemistryInputs>(
    defaultWaterChemistryInputs
  );
  const results = useWaterChemistry(inputs);

  const updateInput = (field: keyof WaterChemistryInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Brewing Water Chemistry Calculator
        </h1>
        <p className="text-gray-600 mb-6">
          Calculate mineral additions and mash pH for your brew
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* COLUMN 1 */}
          <div className="space-y-6">
            <Section title="Starting Water Profile (ppm)">
              <NumericInputs
                fields={startingWaterChemistryNumericFields}
                basePath="waterChemistryInputs"
              />
            </Section>

            <Section title="Water Volumes" columns={2}>
              <NumericInputs fields={waterVolumes} basePath="waterVolumes" />
            </Section>

            <GrainBillSection
              grainBill={inputs.grainBill}
              setInputs={setInputs}
            />
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-6">
            {inputs.mashWaterVolume > 0 && (
              <Section title="Mash Salt Additions (g)" columns={3}>
                <NumericInputs
                  fields={mashSaltAdditions}
                  basePath="mashSaltAdditions"
                />
              </Section>
            )}

            {inputs.spargeWaterVolume > 0 && (
              <Section title="Sparge Salt Additions (g)" columns={3}>
                <NumericInputs
                  fields={spargeSaltAdditions}
                  basePath="spargeSaltAdditions"
                />
              </Section>
            )}

            <Section title="Acid Additions" columns={2}>
              <NumericInputs fields={acidAdditions} basePath="acidAdditions" />
            </Section>
          </div>

          {/* COLUMN 3 */}
          <WaterProfileResults results={results} />
        </div>
      </div>
    </div>
  );
}
