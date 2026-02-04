import { useEffect, useState, useDeferredValue } from 'react';
import { ABVInputs, ABVResults, Grain } from '../types';

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