import { useEffect, useState, useDeferredValue, useMemo } from "react";
import { LiquidUnit, TempUnit } from "../types";

interface UseBiabCalculatorProps {
  tempUnit?: TempUnit;
  liquidUnit?: LiquidUnit;
  grainBill: number;
  batchSize: number;
  mashTemp: number;
  boilTime: number;
  trub: number;
  boilOffRate: number;
  grainAbsorptionRate: number;
  grainTemp?: number;
}

/**
 * ✅ Custom hook for Brew-in-a-Bag calculations
 * Uses deferred inputs and memoized results to prevent re-renders
 */
export function useBiabCalculator({
  tempUnit = TempUnit.Fahrenheit,
  liquidUnit = LiquidUnit.Gallons,
  grainBill,
  batchSize,
  mashTemp,
  boilTime,
  trub,
  boilOffRate,
  grainAbsorptionRate,
  grainTemp = 70,
}: UseBiabCalculatorProps) {
  // Defer values to reduce calculation frequency
  const deferredInputs = useDeferredValue({
    grainBill,
    batchSize,
    mashTemp,
    boilTime,
    trub,
    boilOffRate,
    grainAbsorptionRate,
    grainTemp,
  });

  const [results, setResults] = useState({
    totalWaterNeeded: 0,
    strikeWaterTemp: 0,
    totalMashVolume: 0,
    preBoilWort: 0,
    postBoilWort: 0,
    intoFermenter: 0,
  });

  // --- Unit conversion helpers ---
  const toLiters = (value: number) =>
    liquidUnit === LiquidUnit.Gallons ? value * 3.78541 : value;
  const fromLiters = (value: number) =>
    liquidUnit === LiquidUnit.Gallons ? value / 3.78541 : value;
  const toCelsius = (f: number) =>
    tempUnit === TempUnit.Fahrenheit ? (f - 32) * (5 / 9) : f;
  const fromCelsius = (c: number) =>
    tempUnit === TempUnit.Fahrenheit ? c * (9 / 5) + 32 : c;

  // --- Perform calculations only when deferred inputs change ---
  useEffect(() => {
    const {
      grainBill: gb,
      batchSize: bsRaw,
      mashTemp: mtRaw,
      boilTime: bt,
      trub: tRaw,
      boilOffRate: bor,
      grainAbsorptionRate: gar,
      grainTemp: gtRaw,
    } = deferredInputs;

    const bs = toLiters(bsRaw);
    const t = toLiters(tRaw);
    const mt = toCelsius(mtRaw);
    const gt = toCelsius(gtRaw);

    const boilOff = (bor / 100) * (bt / 60) * bs;
    const grainAbsorption = gb * (gar / 10);
    const totalWaterNeeded = bs + boilOff + t + grainAbsorption;
    const strikeWaterTemp = mt + (0.2 / (totalWaterNeeded / gb)) * (mt - gt);
    const grainDisplacement = gb * 0.08;
    const totalMashVolume = totalWaterNeeded + grainDisplacement;
    const preBoilWort = totalWaterNeeded - grainAbsorption;
    const postBoilWort = preBoilWort - boilOff;
    const intoFermenter = postBoilWort - t;

    setResults({
      totalWaterNeeded: fromLiters(totalWaterNeeded),
      strikeWaterTemp: fromCelsius(strikeWaterTemp),
      totalMashVolume: fromLiters(totalMashVolume),
      preBoilWort: fromLiters(preBoilWort),
      postBoilWort: fromLiters(postBoilWort),
      intoFermenter: fromLiters(intoFermenter),
    });
  }, [deferredInputs, liquidUnit, tempUnit]);

  // ✅ Memoize results so reference stays stable
  return useMemo(() => results, [results]);
}
