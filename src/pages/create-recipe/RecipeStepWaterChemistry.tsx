import React, { useState } from 'react';
import { useWaterChemistry, WaterChemistryInputs, Grain } from '../../hooks/useWaterChemistry';

export default function RecipeStepWaterChemistry() {
  const [inputs, setInputs] = useState<WaterChemistryInputs>({
    // Starting water profile
    startingCalcium: 0,
    startingMagnesium: 0,
    startingSodium: 0,
    startingChloride: 0,
    startingSulfate: 0,
    startingBicarbonate: 0,
    
    // Water volumes
    mashWaterVolume: 0,
    spargeWaterVolume: 0,
    
    // Grain bill
    grainBill: [],
    
    // Mash salt additions
    mashGypsumCaSO4: 0,
    mashCalciumChlorideCaCl2: 0,
    mashEpsomSaltMgSO4: 0,
    mashTableSaltNaCl: 0,
    mashBakingSodaNaHCO3: 0,
    mashChalkCaCO3: 0,
    
    // Sparge salt additions
    spargeGypsumCaSO4: 0,
    spargeCalciumChlorideCaCl2: 0,
    spargeEpsomSaltMgSO4: 0,
    spargeTableSaltNaCl: 0,
    spargeBakingSodaNaHCO3: 0,
    spargeChalkCaCO3: 0,
    
    // Acid
    lacticAcidML: 0,
    
    // RO percentage
    roPercentage: 0,
  });

  const results = useWaterChemistry(inputs);

  const updateInput = (field: keyof WaterChemistryInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateGrain = (index: number, field: keyof Grain, value: string | number) => {
    setInputs(prev => {
      const newGrainBill = [...prev.grainBill];
      newGrainBill[index] = { 
        ...newGrainBill[index], 
        [field]: field === 'name' ? value : parseFloat(value as string) || 0 
      };
      return { ...prev, grainBill: newGrainBill };
    });
  };

  const addGrain = () => {
    setInputs(prev => ({
      ...prev,
      grainBill: [...prev.grainBill, { name: 'Grain', weight: 0, lovibold: 2 }]
    }));
  };

  const removeGrain = (index: number) => {
    setInputs(prev => ({
      ...prev,
      grainBill: prev.grainBill.filter((_, i) => i !== index)
    }));
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
          {/* Column 1: Starting Water & Volumes */}
          <div className="space-y-6">
            <Section title="Starting Water Profile (ppm)">
              <NumberInput 
                label="Calcium (Ca)" 
                value={inputs.startingCalcium} 
                onChange={(v) => updateInput('startingCalcium', v)} 
              />
              <NumberInput 
                label="Magnesium (Mg)" 
                value={inputs.startingMagnesium} 
                onChange={(v) => updateInput('startingMagnesium', v)} 
              />
              <NumberInput 
                label="Sodium (Na)" 
                value={inputs.startingSodium} 
                onChange={(v) => updateInput('startingSodium', v)} 
              />
              <NumberInput 
                label="Chloride (Cl)" 
                value={inputs.startingChloride} 
                onChange={(v) => updateInput('startingChloride', v)} 
              />
              <NumberInput 
                label="Sulfate (SO₄)" 
                value={inputs.startingSulfate} 
                onChange={(v) => updateInput('startingSulfate', v)} 
              />
              <NumberInput 
                label="Bicarbonate (HCO₃)" 
                value={inputs.startingBicarbonate} 
                onChange={(v) => updateInput('startingBicarbonate', v)} 
              />
              <NumberInput 
                label="RO/Distilled %" 
                value={inputs.roPercentage} 
                onChange={(v) => updateInput('roPercentage', v)} 
              />
            </Section>

            <Section title="Water Volumes">
              <NumberInput 
                label="Mash Water (gal)" 
                value={inputs.mashWaterVolume} 
                onChange={(v) => updateInput('mashWaterVolume', v)} 
              />
              <NumberInput 
                label="Sparge Water (gal)" 
                value={inputs.spargeWaterVolume} 
                onChange={(v) => updateInput('spargeWaterVolume', v)} 
              />
            </Section>

            <Section title="Grain Bill">
              {inputs.grainBill.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4">
                  No grains added yet. Click below to add grains.
                </div>
              ) : (
                inputs.grainBill.map((grain, i) => (
                  <div key={i} className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={grain.name}
                        onChange={(e) => updateGrain(i, 'name', e.target.value)}
                        className="text-sm font-medium px-2 py-1 border rounded flex-1 mr-2"
                      />
                      <button 
                        onClick={() => removeGrain(i)} 
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <NumberInput 
                        label="Weight (lbs)" 
                        value={grain.weight} 
                        onChange={(v) => updateGrain(i, 'weight', v)} 
                        small 
                      />
                      <NumberInput 
                        label="Lovibond" 
                        value={grain.lovibold} 
                        onChange={(v) => updateGrain(i, 'lovibold', v)} 
                        small 
                      />
                    </div>
                  </div>
                ))
              )}
              <button 
                onClick={addGrain} 
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
              >
                + Add Grain
              </button>
            </Section>
          </div>

          {/* Column 2: Salt Additions */}
          <div className="space-y-6">
            {inputs.mashWaterVolume > 0 && (
              <Section title="Mash Salt Additions (grams)">
                <NumberInput 
                  label="Gypsum (CaSO₄)" 
                  value={inputs.mashGypsumCaSO4} 
                  onChange={(v) => updateInput('mashGypsumCaSO4', v)} 
                />
                <NumberInput 
                  label="Calcium Chloride (CaCl₂)" 
                  value={inputs.mashCalciumChlorideCaCl2} 
                  onChange={(v) => updateInput('mashCalciumChlorideCaCl2', v)} 
                />
                <NumberInput 
                  label="Epsom Salt (MgSO₄)" 
                  value={inputs.mashEpsomSaltMgSO4} 
                  onChange={(v) => updateInput('mashEpsomSaltMgSO4', v)} 
                />
                <NumberInput 
                  label="Table Salt (NaCl)" 
                  value={inputs.mashTableSaltNaCl} 
                  onChange={(v) => updateInput('mashTableSaltNaCl', v)} 
                />
                <NumberInput 
                  label="Baking Soda (NaHCO₃)" 
                  value={inputs.mashBakingSodaNaHCO3} 
                  onChange={(v) => updateInput('mashBakingSodaNaHCO3', v)} 
                />
                <NumberInput 
                  label="Chalk (CaCO₃)" 
                  value={inputs.mashChalkCaCO3} 
                  onChange={(v) => updateInput('mashChalkCaCO3', v)} 
                />
              </Section>
            )}

            {inputs.spargeWaterVolume > 0 && (
              <Section title="Sparge Salt Additions (grams)">
                <NumberInput 
                  label="Gypsum (CaSO₄)" 
                  value={inputs.spargeGypsumCaSO4} 
                  onChange={(v) => updateInput('spargeGypsumCaSO4', v)} 
                />
                <NumberInput 
                  label="Calcium Chloride (CaCl₂)" 
                  value={inputs.spargeCalciumChlorideCaCl2} 
                  onChange={(v) => updateInput('spargeCalciumChlorideCaCl2', v)} 
                />
                <NumberInput 
                  label="Epsom Salt (MgSO₄)" 
                  value={inputs.spargeEpsomSaltMgSO4} 
                  onChange={(v) => updateInput('spargeEpsomSaltMgSO4', v)} 
                />
                <NumberInput 
                  label="Table Salt (NaCl)" 
                  value={inputs.spargeTableSaltNaCl} 
                  onChange={(v) => updateInput('spargeTableSaltNaCl', v)} 
                />
                <NumberInput 
                  label="Baking Soda (NaHCO₃)" 
                  value={inputs.spargeBakingSodaNaHCO3} 
                  onChange={(v) => updateInput('spargeBakingSodaNaHCO3', v)} 
                />
                <NumberInput 
                  label="Chalk (CaCO₃)" 
                  value={inputs.spargeChalkCaCO3} 
                  onChange={(v) => updateInput('spargeChalkCaCO3', v)} 
                />
              </Section>
            )}

            <Section title="Acid Additions">
              <NumberInput 
                label="Lactic Acid (88%) mL" 
                value={inputs.lacticAcidML} 
                onChange={(v) => updateInput('lacticAcidML', v)} 
              />
            </Section>
          </div>

          {/* Column 3: Results */}
          <div className="space-y-6">
            <Section title="Mash Water Profile (ppm)">
              <ResultRow label="Calcium" value={results.mashCalcium} range="50-150" />
              <ResultRow label="Magnesium" value={results.mashMagnesium} range="10-30" />
              <ResultRow label="Sodium" value={results.mashSodium} range="0-150" />
              <ResultRow label="Chloride" value={results.mashChloride} range="0-250" />
              <ResultRow label="Sulfate" value={results.mashSulfate} range="50-350" />
              <ResultRow label="Bicarbonate" value={results.mashBicarbonate} range="0-250" />
            </Section>

            <Section title="Total Water Profile (ppm)">
              <ResultRow 
                label="Calcium" 
                value={results.totalCalcium} 
                range="50-150" 
                highlight 
              />
              <ResultRow 
                label="Magnesium" 
                value={results.totalMagnesium} 
                range="10-30" 
                highlight 
              />
              <ResultRow 
                label="Sodium" 
                value={results.totalSodium} 
                range="0-150" 
                highlight 
              />
              <ResultRow 
                label="Chloride" 
                value={results.totalChloride} 
                range="0-250" 
                highlight 
              />
              <ResultRow 
                label="Sulfate" 
                value={results.totalSulfate} 
                range="50-350" 
                highlight 
              />
              <ResultRow 
                label="Bicarbonate" 
                value={results.totalBicarbonate} 
                range="0-250" 
                highlight 
              />
            </Section>

            <Section title="Analysis">
              <ResultRow 
                label="Cl/SO₄ Ratio" 
                value={results.chlorideSulfateRatio} 
                decimals={2} 
                info="<0.8: Bitter/Hoppy, >1.5: Malty/Sweet" 
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
                range="5.2-5.6" 
                highlight 
                info="Target: 5.2-5.6" 
              />
            </Section>

            {results.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Warnings</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {results.warnings.map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
        {title}
      </h2>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function NumberInput({ 
  label, 
  value, 
  onChange, 
  small = false 
}: { 
  label: string; 
  value: number; 
  onChange: (value: number) => void; 
  small?: boolean;
}) {
  return (
    <div>
      <label className={`block text-gray-700 font-medium mb-1 ${small ? 'text-xs' : 'text-sm'}`}>
        {label}
      </label>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={`w-full border border-gray-300 rounded px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          small ? 'py-1 text-sm' : 'py-2'
        }`}
      />
    </div>
  );
}

function ResultRow({ 
  label, 
  value, 
  decimals = 0, 
  range, 
  highlight = false, 
  info 
}: { 
  label: string; 
  value: number; 
  decimals?: number; 
  range?: string; 
  highlight?: boolean; 
  info?: string;
}) {
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded ${
      highlight ? 'bg-blue-50' : 'bg-gray-50'
    }`}>
      <div className="flex-1">
        <span className={`text-sm font-medium ${
          highlight ? 'text-blue-900' : 'text-gray-700'
        }`}>
          {label}
        </span>
        {range && <span className="text-xs text-gray-500 ml-2">({range})</span>}
        {info && <div className="text-xs text-gray-500 italic mt-1">{info}</div>}
      </div>
      <span className={`font-bold ${highlight ? 'text-blue-600' : 'text-gray-900'}`}>
        {value.toFixed(decimals)}
      </span>
    </div>
  );
}