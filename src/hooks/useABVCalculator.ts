import { useEffect, useState, useDeferredValue } from 'react';
import { ABVInputs, ABVResults, Grain } from '../types';

// Calculate OG from grain bill
// Based on: points = (grain_weight_lbs * grain_ppg) / batch_size_gallons
// Average PPG (points per pound per gallon) for malts ≈ 37
// Adjusted by mash efficiency
export function calculateOGFromGrains(
  grains: Grain[],
  batchSize: number,
  mashEfficiency: number
): number {
  if (batchSize <= 0) return 1.000;
  
  const totalPoints = grains.reduce((sum, grain) => {
    // Estimate PPG based on grain type and color
    let ppg = 37; // Default for base malts
    
    // Adjust PPG based on lovibond (darker malts have less extract)
    if (grain.lovibond > 300) ppg = 25; // Roasted
    else if (grain.lovibond > 100) ppg = 28; // Dark crystal
    else if (grain.lovibond > 40) ppg = 33; // Crystal
    else if (grain.lovibond > 10) ppg = 35; // Light crystal/specialty
    
    return sum + (grain.weight * ppg);
  }, 0);
  
  // Apply mash efficiency
  const adjustedPoints = (totalPoints * mashEfficiency) / 100;
  
  // Convert to gravity (1.000 + points/batch_size/1000)
  const gravity = 1 + (adjustedPoints / batchSize / 1000);
  
  return Math.round(gravity * 1000) / 1000;
}

export function useABVCalculator(
  inputs: ABVInputs,
  grains?: Grain[],
  batchSize?: number
): ABVResults {
  const deferredInputs = useDeferredValue(inputs);
  const [results, setResults] = useState<ABVResults>({
    abv: 0,
    calories: 0,
    attenuation: 0,
  });

  useEffect(() => {
    const { originalGravity, finalGravity } = deferredInputs;

    // Calculate ABV using standard formula
    // ABV = (OG - FG) * 131.25
    const abv = (originalGravity - finalGravity) * 131.25;

    // Calculate apparent attenuation
    // AA = ((OG - FG) / (OG - 1)) * 100
    const attenuation = originalGravity > 1 
      ? ((originalGravity - finalGravity) / (originalGravity - 1)) * 100 
      : 0;

    // Calculate calories (per 12 oz serving)
    // Calories = [(6.9 × ABW) + 4.0 × (RE - 0.1)] × FG × 3.55
    // Where ABW = ABV × 0.789
    // RE = Real Extract = 0.1808 × OG + 0.8192 × FG - 1.0004
    const abw = abv * 0.789;
    const realExtract = 0.1808 * originalGravity + 0.8192 * finalGravity - 1.0004;
    const calories = ((6.9 * abw) + 4.0 * (realExtract - 0.1)) * finalGravity * 3.55;

    setResults({
      abv: Math.round(abv * 100) / 100,
      calories: Math.round(calories),
      attenuation: Math.round(attenuation * 10) / 10,
    });
  }, [deferredInputs]);

  return results;
}