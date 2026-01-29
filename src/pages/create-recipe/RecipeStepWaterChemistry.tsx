import React, { useState } from "react";
import { useWaterChemistry } from "../../hooks/useWaterChemistry";
import { WaterChemistryInputs } from "../../types";
import { defaultWaterChemistryInputs } from "../../constants/defaultRecipeValues";
import Section from "../../components/water-chemistry/Section";
import NumberInput from "../../components/water-chemistry/NumberInput";
import ResultRow from "../../components/water-chemistry/ResultRow";
import GrainBillSection from "../../components/water-chemistry/GrainBillSection";
import NumericInputs from "../../components/NumbericInputs";
import { startingWaterChemistryNumericFields } from "../../constants/defautNumericValues";

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
              <NumberInput
                label="Mash Water (gal)"
                value={inputs.mashWaterVolume}
                onChange={(v) => updateInput("mashWaterVolume", v)}
              />
              <NumberInput
                label="Sparge Water (gal)"
                value={inputs.spargeWaterVolume}
                onChange={(v) => updateInput("spargeWaterVolume", v)}
              />
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
                <NumberInput
                  label="Gypsum"
                  value={inputs.mashGypsumCaSO4}
                  onChange={(v) => updateInput("mashGypsumCaSO4", v)}
                />
                <NumberInput
                  label="Calcium Chloride"
                  value={inputs.mashCalciumChlorideCaCl2}
                  onChange={(v) => updateInput("mashCalciumChlorideCaCl2", v)}
                />
                <NumberInput
                  label="Epsom Salt"
                  value={inputs.mashEpsomSaltMgSO4}
                  onChange={(v) => updateInput("mashEpsomSaltMgSO4", v)}
                />
                <NumberInput
                  label="Table Salt"
                  value={inputs.mashTableSaltNaCl}
                  onChange={(v) => updateInput("mashTableSaltNaCl", v)}
                />
                <NumberInput
                  label="Baking Soda"
                  value={inputs.mashBakingSodaNaHCO3}
                  onChange={(v) => updateInput("mashBakingSodaNaHCO3", v)}
                />
                <NumberInput
                  label="Chalk"
                  value={inputs.mashChalkCaCO3}
                  onChange={(v) => updateInput("mashChalkCaCO3", v)}
                />
              </Section>
            )}

            {inputs.spargeWaterVolume > 0 && (
              <Section title="Sparge Salt Additions (g)" columns={3}>
                <NumberInput
                  label="Gypsum"
                  value={inputs.spargeGypsumCaSO4}
                  onChange={(v) => updateInput("spargeGypsumCaSO4", v)}
                />
                <NumberInput
                  label="Calcium Chloride"
                  value={inputs.spargeCalciumChlorideCaCl2}
                  onChange={(v) => updateInput("spargeCalciumChlorideCaCl2", v)}
                />
                <NumberInput
                  label="Epsom Salt"
                  value={inputs.spargeEpsomSaltMgSO4}
                  onChange={(v) => updateInput("spargeEpsomSaltMgSO4", v)}
                />
                <NumberInput
                  label="Table Salt"
                  value={inputs.spargeTableSaltNaCl}
                  onChange={(v) => updateInput("spargeTableSaltNaCl", v)}
                />
                <NumberInput
                  label="Baking Soda"
                  value={inputs.spargeBakingSodaNaHCO3}
                  onChange={(v) => updateInput("spargeBakingSodaNaHCO3", v)}
                />
                <NumberInput
                  label="Chalk"
                  value={inputs.spargeChalkCaCO3}
                  onChange={(v) => updateInput("spargeChalkCaCO3", v)}
                />
              </Section>
            )}

            <Section title="Acid Additions" columns={2}>
              <NumberInput
                label="Lactic Acid (mL)"
                value={inputs.lacticAcidML}
                onChange={(v) => updateInput("lacticAcidML", v)}
              />
            </Section>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-6">
            <Section title="Mash Water Profile (ppm)" columns={2}>
              <ResultRow label="Calcium" value={results.mashCalcium} />
              <ResultRow label="Magnesium" value={results.mashMagnesium} />
              <ResultRow label="Sodium" value={results.mashSodium} />
              <ResultRow label="Chloride" value={results.mashChloride} />
              <ResultRow label="Sulfate" value={results.mashSulfate} />
              <ResultRow label="Bicarbonate" value={results.mashBicarbonate} />
            </Section>

            <Section title="Analysis">
              <ResultRow
                label="Cl / SO₄ Ratio"
                value={results.chlorideSulfateRatio}
                decimals={2}
              />
              <ResultRow
                label="Residual Alkalinity"
                value={results.residualAlkalinity}
                decimals={1}
              />
              <ResultRow
                label="Est. Mash pH"
                value={results.estimatedMashPH}
                decimals={2}
              />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
