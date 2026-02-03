import { useEffect, useState, useDeferredValue } from 'react';
import { IBUResults, Hop } from '../types';

// Tinseth Formula for IBU calculation
// IBU = (AAU × U × 75) / Vrecipe
// Where:
// - AAU = alpha acid units = (oz of hops × % alpha acid)
// - U = utilization factor
// - Vrecipe = batch size in gallons

function calculateUtilization(boilTime: number, boilGravity: number): number {
  // Bigness factor accounts for reduced utilization at higher gravities
  const bignessFactor = 1.65 * Math.pow(0.000125, boilGravity - 1);
  
  // Boil time factor
  const boilTimeFactor = (1 - Math.exp(-0.04 * boilTime)) / 4.15;
  
  return bignessFactor * boilTimeFactor;
}

export function useIBUCalculator(
  hops: Hop[],
  batchSize: number,
  boilGravity: number
): IBUResults {
  const deferredHops = useDeferredValue(hops);
  const deferredBatchSize = useDeferredValue(batchSize);
  const deferredBoilGravity = useDeferredValue(boilGravity);
  
  const [results, setResults] = useState<IBUResults>({
    totalIBU: 0,
    hopContributions: [],
  });

  useEffect(() => {
    if (deferredBatchSize <= 0) {
      setResults({ totalIBU: 0, hopContributions: [] });
      return;
    }

    const hopContributions = deferredHops.map(hop => {
      // Calculate AAU (Alpha Acid Units)
      const aau = hop.amount * hop.alphaAcid;
      
      // Calculate utilization
      const utilization = calculateUtilization(hop.boilTime, deferredBoilGravity);
      
      // Calculate IBU contribution
      // IBU = (AAU × U × 75) / batch_size
      const ibu = (aau * utilization * 75) / deferredBatchSize;

      return {
        hopName: hop.name || 'Unnamed Hop',
        ibu: Math.round(ibu * 10) / 10,
      };
    });

    const totalIBU = hopContributions.reduce((sum, hop) => sum + hop.ibu, 0);

    setResults({
      totalIBU: Math.round(totalIBU * 10) / 10,
      hopContributions,
    });
  }, [deferredHops, deferredBatchSize, deferredBoilGravity]);

  return results;
}