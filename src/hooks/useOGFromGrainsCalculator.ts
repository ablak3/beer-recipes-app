import { Grain } from '../types';

// Calculate OG from grain bill
// Based on: points = (grain_weight_lbs * grain_ppg) / batch_size_gallons
// Average PPG (points per pound per gallon) for malts ≈ 37
// Adjusted by mash efficiency
export function useOGFromGrainsCalculator(
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