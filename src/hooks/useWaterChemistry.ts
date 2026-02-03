import { useEffect, useState, useDeferredValue, useMemo } from 'react';
import { WaterChemistryInputs, WaterChemistryResults, WaterAdjustments, Grain } from '../types';
import { defaultWaterChemistryResults } from '../constants/defaultRecipeValues';

export function useWaterChemistry(
  inputs: WaterChemistryInputs,
  waterAdjustments: WaterAdjustments,
  grainBill: Grain[]
): WaterChemistryResults {
  const deferredGrainBill = useDeferredValue<Grain[]>(grainBill);
  const deferredInputs = useDeferredValue(inputs);
  const deferredAdjustments = useDeferredValue(waterAdjustments);

  const [results, setResults] = useState<WaterChemistryResults>(defaultWaterChemistryResults);

  useEffect(() => {
    // Destructure from nested objects
    const {
      startingWaterProfile,
      waterVolumes,
      lacticAcidML,
    } = deferredInputs;

    const {
      startingCalcium,
      startingMagnesium,
      startingSodium,
      startingChloride,
      startingSulfate,
      startingBicarbonate,
    } = startingWaterProfile;

    const {
      mashWaterVolume,
      spargeWaterVolume,
      percentDistilledRO,
    } = waterVolumes;

    const {
      gypsum,
      calciumChloride,
      epsomSalt,
      slakedLime,
      BakingSoda,
      chalk,
      lacticAcid,
    } = deferredAdjustments;

    // EZ Water Calculator ion contributions (ppm per gram per gallon)
    // These values match the EZ Water Calculator 3.0.2 formulas exactly
    const GYPSUM_CA = 60;           // CaSO4: Calcium
    const GYPSUM_SO4 = 147.4;       // CaSO4: Sulfate
    const CACL2_CA = 72;            // CaCl2: Calcium
    const CACL2_CL = 127.47;        // CaCl2: Chloride
    const EPSOM_MG = 24.6;          // MgSO4: Magnesium
    const EPSOM_SO4 = 103;          // MgSO4: Sulfate
    const SLAKED_LIME_CA = 105.89;  // Ca(OH)2: Calcium
    const BAKING_SODA_NA = 72.3;    // NaHCO3: Sodium
    const CHALK_CA = 143;           // CaCO3: Calcium
    
    // Alkalinity contributions (as CaCO3 ppm per gram per gallon)
    const SLAKED_LIME_ALK = -130;   // Reduces alkalinity
    const BAKING_SODA_ALK = 157;    // Increases alkalinity
    const CHALK_ALK = 357;          // Increases alkalinity
    const LACTIC_ACID_ALK = -176.1; // Per ml at 88% concentration
    
    // Lactic acid concentration (typically 88%)
    const lacticAcidConcentration = 0.88;

    // Adjust starting water based on RO/Distilled percentage
    const roFactor = 1 - (percentDistilledRO / 100);
    const adjStartCa = startingCalcium * roFactor;
    const adjStartMg = startingMagnesium * roFactor;
    const adjStartNa = startingSodium * roFactor;
    const adjStartCl = startingChloride * roFactor;
    const adjStartSO4 = startingSulfate * roFactor;
    const adjStartBicarb = startingBicarbonate * roFactor;
    
    // Convert starting bicarbonate to alkalinity (as CaCO3)
    const adjStartAlk = adjStartBicarb * (50 / 61);

    const totalVolume = mashWaterVolume + spargeWaterVolume;
    
    // Calculate total water profile with salt additions
    let totalCa = adjStartCa;
    let totalMg = adjStartMg;
    let totalNa = adjStartNa;
    let totalCl = adjStartCl;
    let totalSO4 = adjStartSO4;
    let totalAlk = adjStartAlk;

    if (totalVolume > 0) {
      // Calcium additions
      totalCa += (gypsum * GYPSUM_CA / totalVolume) + 
                 (calciumChloride * CACL2_CA / totalVolume) +
                 (slakedLime * SLAKED_LIME_CA / totalVolume) +
                 (chalk * CHALK_CA / totalVolume);
      
      // Magnesium additions
      totalMg += (epsomSalt * EPSOM_MG / totalVolume);
      
      // Sodium additions
      totalNa += (BakingSoda * BAKING_SODA_NA / totalVolume);
      
      // Chloride additions
      totalCl += (calciumChloride * CACL2_CL / totalVolume);
      
      // Sulfate additions
      totalSO4 += (gypsum * GYPSUM_SO4 / totalVolume) +
                  (epsomSalt * EPSOM_SO4 / totalVolume);
      
      // Alkalinity adjustments (as CaCO3)
      totalAlk += (slakedLime * SLAKED_LIME_ALK / totalVolume) +
                  (BakingSoda * BAKING_SODA_ALK / totalVolume) +
                  (chalk * CHALK_ALK / totalVolume) +
                  ((lacticAcid || lacticAcidML) * lacticAcidConcentration * LACTIC_ACID_ALK * 2 / totalVolume);
      
      // Ensure alkalinity doesn't go negative
      totalAlk = Math.max(0, totalAlk);
    }
    
    // Convert alkalinity back to bicarbonate for display
    const totalHCO3 = totalAlk * (61 / 50);

    // Calculate ratios
    const clSO4Ratio = totalSO4 > 0 ? totalCl / totalSO4 : 0;

    // Calculate Residual Alkalinity (using EZ Water formula)
    const residualAlk = totalAlk - (totalCa / 1.4 + totalMg / 1.7);

    // Estimate Mash pH (using EZ Water formula)
    let totalGrainWeight = 0;
    let weightedPH = 0;
    
    deferredGrainBill.forEach(grain => {
      totalGrainWeight += grain.weight;
      
      // Base malt pH values based on grain type
      let grainPH = 5.7; // Default for base malts
      
      // Crystal/Caramel malts (calculated from Lovibond)
      if (grain.type.toLowerCase().includes('crystal') || 
          grain.type.toLowerCase().includes('caramel')) {
        grainPH = 5.22 - 0.00504 * grain.lovibond;
      }
      // Roasted/toasted malts
      else if (grain.lovibond > 300) {
        grainPH = 4.71;
      }
      // Specific base malt types
      else if (grain.type.toLowerCase().includes('munich')) {
        grainPH = 5.43;
      }
      else if (grain.type.toLowerCase().includes('wheat')) {
        grainPH = 6.04;
      }
      else if (grain.type.toLowerCase().includes('vienna')) {
        grainPH = 5.56;
      }
      else if (grain.type.toLowerCase().includes('pilsner') || 
               grain.type.toLowerCase().includes('pils')) {
        grainPH = 5.75;
      }
      else if (grain.type.toLowerCase().includes('maris otter')) {
        grainPH = 5.77;
      }
      else if (grain.type.toLowerCase().includes('6-row')) {
        grainPH = 5.79;
      }
      
      weightedPH += grainPH * grain.weight;
    });
    
    const baseMashPH = totalGrainWeight > 0 ? weightedPH / totalGrainWeight : 5.7;
    
    // EZ Water pH calculation with mash thickness factor
    // pH = base grain pH + (mash thickness factor) * (effective alkalinity / 50)
    // Mash thickness factor = (0.1085 * mashWaterVolume / totalGrainWeight + 0.013)
    let estimatedPH = baseMashPH;
    if (totalGrainWeight > 0 && mashWaterVolume > 0) {
      const mashThicknessFactor = (0.1085 * mashWaterVolume / totalGrainWeight) + 0.013;
      estimatedPH = baseMashPH + (mashThicknessFactor * totalAlk / 50);
    }

    // Generate warnings
    const warnings: string[] = [];
    if (totalCa < 50) warnings.push('Calcium below recommended minimum (50 ppm)');
    if (totalCa > 150) warnings.push('Calcium above recommended range (50-150 ppm)');
    if (totalMg < 10) warnings.push('Magnesium below recommended minimum (10 ppm)');
    if (totalMg > 30) warnings.push('Magnesium above recommended range (10-30 ppm)');
    if (totalNa > 150) warnings.push('Sodium above recommended range (0-150 ppm)');
    if (totalCl > 250) warnings.push('Chloride above recommended range (0-250 ppm)');
    if (totalSO4 < 50) warnings.push('Sulfate below recommended minimum (50 ppm)');
    if (totalSO4 > 350) warnings.push('Sulfate above recommended range (50-350 ppm)');
    if (estimatedPH < 5.4) warnings.push('Mash pH below optimal range (5.4-5.6)');
    if (estimatedPH > 5.6) warnings.push('Mash pH above optimal range (5.4-5.6)');
    
    // Cl/SO4 ratio guidance (from EZ Water)
    if (clSO4Ratio < 0.77) {
      warnings.push('Cl/SO4 ratio below 0.77 - may enhance bitterness');
    } else if (clSO4Ratio > 1.3) {
      warnings.push('Cl/SO4 ratio above 1.3 - may enhance maltiness');
    }

    setResults({
      totalCalcium: Math.round(totalCa * 10) / 10,
      totalMagnesium: Math.round(totalMg * 10) / 10,
      totalSodium: Math.round(totalNa * 10) / 10,
      totalChloride: Math.round(totalCl * 10) / 10,
      totalSulfate: Math.round(totalSO4 * 10) / 10,
      totalBicarbonate: Math.round(totalHCO3 * 10) / 10,
      
      chlorideSulfateRatio: Math.round(clSO4Ratio * 100) / 100,
      residualAlkalinity: Math.round(residualAlk * 10) / 10,
      estimatedMashPH: Math.round(estimatedPH * 100) / 100,
      
      warnings,
    });
  }, [deferredInputs, deferredAdjustments, deferredGrainBill]);

  return useMemo(() => results, [results]);
}