import { useEffect, useState, useDeferredValue, useMemo } from 'react';
import { WaterChemistryInputs, WaterChemistryResults } from '../types';
import { defaultWaterChemistryResults } from '../constants/defaultRecipeValues';

export function useWaterChemistry(inputs: WaterChemistryInputs): WaterChemistryResults {
  const deferredInputs = useDeferredValue(inputs);

  const [results, setResults] = useState<WaterChemistryResults>(defaultWaterChemistryResults);

  useEffect(() => {
    const {
      startingCalcium,
      startingMagnesium,
      startingSodium,
      startingChloride,
      startingSulfate,
      startingBicarbonate,
      mashWaterVolume,
      spargeWaterVolume,
      grainBill,
      mashGypsumCaSO4,
      mashCalciumChlorideCaCl2,
      mashEpsomSaltMgSO4,
      mashTableSaltNaCl,
      mashBakingSodaNaHCO3,
      mashChalkCaCO3,
      spargeGypsumCaSO4,
      spargeCalciumChlorideCaCl2,
      spargeEpsomSaltMgSO4,
      spargeTableSaltNaCl,
      spargeBakingSodaNaHCO3,
      spargeChalkCaCO3,
      lacticAcidML,
      roPercentage,
    } = deferredInputs;

    // Adjust starting water based on RO percentage
    const roFactor = 1 - (roPercentage / 100);
    const adjStartCa = startingCalcium * roFactor;
    const adjStartMg = startingMagnesium * roFactor;
    const adjStartNa = startingSodium * roFactor;
    const adjStartCl = startingChloride * roFactor;
    const adjStartSO4 = startingSulfate * roFactor;
    const adjStartHCO3 = startingBicarbonate * roFactor;

    // Ion contributions from salts (ppm per gram per gallon)
    // Gypsum (CaSO4·2H2O): Ca=61.5, SO4=147.4
    // Calcium Chloride (CaCl2·2H2O): Ca=72.6, Cl=127.4
    // Epsom Salt (MgSO4·7H2O): Mg=26.3, SO4=103.8
    // Table Salt (NaCl): Na=104.3, Cl=160.7
    // Baking Soda (NaHCO3): Na=72.8, HCO3=193.0
    // Chalk (CaCO3): Ca=105.9, HCO3=161.8 (50% soluble)

    // Calculate mash water profile
    let mashCa = adjStartCa;
    let mashMg = adjStartMg;
    let mashNa = adjStartNa;
    let mashCl = adjStartCl;
    let mashSO4 = adjStartSO4;
    let mashHCO3 = adjStartHCO3;

    if (mashWaterVolume > 0) {
      mashCa += (mashGypsumCaSO4 * 61.5 / mashWaterVolume) + 
                (mashCalciumChlorideCaCl2 * 72.6 / mashWaterVolume) +
                (mashChalkCaCO3 * 105.9 * 0.5 / mashWaterVolume);
      
      mashMg += (mashEpsomSaltMgSO4 * 26.3 / mashWaterVolume);
      
      mashNa += (mashTableSaltNaCl * 104.3 / mashWaterVolume) +
                (mashBakingSodaNaHCO3 * 72.8 / mashWaterVolume);
      
      mashCl += (mashCalciumChlorideCaCl2 * 127.4 / mashWaterVolume) +
                (mashTableSaltNaCl * 160.7 / mashWaterVolume);
      
      mashSO4 += (mashGypsumCaSO4 * 147.4 / mashWaterVolume) +
                 (mashEpsomSaltMgSO4 * 103.8 / mashWaterVolume);
      
      mashHCO3 += (mashBakingSodaNaHCO3 * 193.0 / mashWaterVolume) +
                  (mashChalkCaCO3 * 161.8 * 0.5 / mashWaterVolume);
    }

    // Calculate sparge water profile
    let spargeCa = adjStartCa;
    let spargeMg = adjStartMg;
    let spargeNa = adjStartNa;
    let spargeCl = adjStartCl;
    let spargeSO4 = adjStartSO4;
    let spargeHCO3 = adjStartHCO3;

    if (spargeWaterVolume > 0) {
      spargeCa += (spargeGypsumCaSO4 * 61.5 / spargeWaterVolume) + 
                  (spargeCalciumChlorideCaCl2 * 72.6 / spargeWaterVolume) +
                  (spargeChalkCaCO3 * 105.9 * 0.5 / spargeWaterVolume);
      
      spargeMg += (spargeEpsomSaltMgSO4 * 26.3 / spargeWaterVolume);
      
      spargeNa += (spargeTableSaltNaCl * 104.3 / spargeWaterVolume) +
                  (spargeBakingSodaNaHCO3 * 72.8 / spargeWaterVolume);
      
      spargeCl += (spargeCalciumChlorideCaCl2 * 127.4 / spargeWaterVolume) +
                  (spargeTableSaltNaCl * 160.7 / spargeWaterVolume);
      
      spargeSO4 += (spargeGypsumCaSO4 * 147.4 / spargeWaterVolume) +
                   (spargeEpsomSaltMgSO4 * 103.8 / spargeWaterVolume);
      
      spargeHCO3 += (spargeBakingSodaNaHCO3 * 193.0 / spargeWaterVolume) +
                    (spargeChalkCaCO3 * 161.8 * 0.5 / spargeWaterVolume);
    }

    // Calculate combined water profile
    const totalVolume = mashWaterVolume + spargeWaterVolume;
    let totalCa = 0, totalMg = 0, totalNa = 0;
    let totalCl = 0, totalSO4 = 0, totalHCO3 = 0;
    
    if (totalVolume > 0) {
      totalCa = (mashCa * mashWaterVolume + spargeCa * spargeWaterVolume) / totalVolume;
      totalMg = (mashMg * mashWaterVolume + spargeMg * spargeWaterVolume) / totalVolume;
      totalNa = (mashNa * mashWaterVolume + spargeNa * spargeWaterVolume) / totalVolume;
      totalCl = (mashCl * mashWaterVolume + spargeCl * spargeWaterVolume) / totalVolume;
      totalSO4 = (mashSO4 * mashWaterVolume + spargeSO4 * spargeWaterVolume) / totalVolume;
      totalHCO3 = (mashHCO3 * mashWaterVolume + spargeHCO3 * spargeWaterVolume) / totalVolume;
    }

    // Calculate ratios
    const clSO4Ratio = totalSO4 > 0 ? totalCl / totalSO4 : 0;

    // Calculate Residual Alkalinity
    const alkalinityAsCaCO3 = totalHCO3 * 50/61;
    const residualAlk = alkalinityAsCaCO3 - (totalCa / 1.4 + totalMg / 1.7);

    // Estimate Mash pH
    let totalGrainWeight = 0;
    let weightedPH = 0;
    
    grainBill.forEach(grain => {
      totalGrainWeight += grain.weight;
      let grainPH = 5.7;
      if (grain.lovibold > 300) grainPH = 4.5;
      else if (grain.lovibold > 100) grainPH = 4.8;
      else if (grain.lovibold > 40) grainPH = 5.2;
      else if (grain.lovibold > 10) grainPH = 5.4;
      
      weightedPH += grainPH * grain.weight;
    });
    
    const baseMashPH = totalGrainWeight > 0 ? weightedPH / totalGrainWeight : 5.5;
    const caEffect = (mashCa - 50) * -0.001;
    const mgEffect = (mashMg - 10) * -0.0005;
    const hco3Effect = (mashHCO3 - 50) * 0.002;
    const lacticEffect = lacticAcidML * -0.015;
    const estimatedPH = baseMashPH + caEffect + mgEffect + hco3Effect + lacticEffect;

    // Generate warnings
    const warnings: string[] = [];
    if (totalCa < 50) warnings.push('Calcium below recommended minimum (50 ppm)');
    if (totalCa > 200) warnings.push('Calcium above 200 ppm - may taste minerally');
    if (totalMg < 5) warnings.push('Magnesium below recommended minimum (5 ppm)');
    if (totalMg > 30) warnings.push('Magnesium above 30 ppm - may cause bitter taste');
    if (totalNa > 150) warnings.push('Sodium above recommended range (0-150 ppm)');
    if (totalCl > 250) warnings.push('Chloride above recommended range (0-250 ppm)');
    if (totalSO4 > 350) warnings.push('Sulfate above recommended range (50-350 ppm)');
    if (estimatedPH < 5.2) warnings.push('Mash pH below optimal range (5.2-5.6)');
    if (estimatedPH > 5.6) warnings.push('Mash pH above optimal range (5.2-5.6)');

    setResults({
      mashCalcium: mashCa,
      mashMagnesium: mashMg,
      mashSodium: mashNa,
      mashChloride: mashCl,
      mashSulfate: mashSO4,
      mashBicarbonate: mashHCO3,
      
      spargeCalcium: spargeCa,
      spargeMagnesium: spargeMg,
      spargeSodium: spargeNa,
      spargeChloride: spargeCl,
      spargeSulfate: spargeSO4,
      spargeBicarbonate: spargeHCO3,
      
      totalCalcium: totalCa,
      totalMagnesium: totalMg,
      totalSodium: totalNa,
      totalChloride: totalCl,
      totalSulfate: totalSO4,
      totalBicarbonate: totalHCO3,
      
      chlorideSulfateRatio: clSO4Ratio,
      residualAlkalinity: residualAlk,
      estimatedMashPH: estimatedPH,
      
      warnings,
    });
  }, [deferredInputs]);

  return useMemo(() => results, [results]);
}