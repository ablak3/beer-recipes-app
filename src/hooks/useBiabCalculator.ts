import { useEffect, useState, useDeferredValue, useMemo } from "react";

export enum LiquidUnit {
  Gallons = "Gallons",
  Liters = "Liters",
}

export enum TempUnit {
  Fahrenheit = "Fahrenheit",
  Celsius = "Celsius",
}

export enum GrainBillUnit {
  Pounds = "Pounds",
  Kilograms = "Kilograms",
}

export enum TimeUnit {
  Minutes = "Minutes",
  Hours = "Hours",
}

type UseBiabCalculatorProps = {
  tempUnit: TempUnit;
  liquidUnit: LiquidUnit;
  grainBillUnit: GrainBillUnit;
  timeUnit: TimeUnit;
  grainBill: number;
  batchSize: number;
  mashTemp: number;
  boilTime: number;
  trub: number;
  boilOffRate: number;
  grainAbsorptionRate: number;
  grainTemp: number;
  kettleSize?: number;
  // Allow extra properties to be passed but ignored
  [key: string]: any;
}

/**
 * ✅ Custom hook for Brew-in-a-Bag calculations
 * Uses deferred inputs and memoized results to prevent re-renders
 * 
 * Working internally with user's units (no conversions to working units)
 * All calculations done in the user's selected units
 */
export function useBiabCalculator({
  tempUnit,
  liquidUnit,
  grainBillUnit,
  timeUnit,
  grainBill,
  batchSize,
  mashTemp,
  boilTime,
  trub,
  boilOffRate,
  grainAbsorptionRate,
  grainTemp,
  kettleSize,
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
    kettleSize,
  });

  const [results, setResults] = useState({
    totalWaterNeeded: 0,
    strikeWaterTemp: 0,
    totalMashVolume: 0,
    preBoilWort: 0,
    postBoilWort: 0,
    intoFermenter: 0,
    kettleSizeExceeded: false,
    kettleSizeWarning: null as string | null,
  });

  // --- Perform calculations only when deferred inputs change ---
  useEffect(() => {
    const {
      grainBill: l,
      batchSize: b,
      mashTemp: j,
      boilTime: xRaw,
      trub: t,
      boilOffRate: r,
      grainAbsorptionRate: g,
      grainTemp: i,
      kettleSize: k,
    } = deferredInputs;

    // Convert boil time to hours if needed
    const x = timeUnit === TimeUnit.Hours ? xRaw : xRaw / 60;
    
    // Calculate boil off volume
    const boilOffVolume = r * x;
    
    // Calculate grain absorption
    const grainAbsorption = l * g;

    // Calculate Total Water Needed
    // w = batch size + trub + boil off + grain absorption
    const w = b + t + boilOffVolume + grainAbsorption;

    // Calculate grain volume
    // 0.08 gal/lb for US, 0.65 L/kg for metric
    // This is the PHYSICAL volume the grain occupies, not absorption
    let grainVolume;
    if (liquidUnit === LiquidUnit.Gallons && grainBillUnit === GrainBillUnit.Pounds) {
      grainVolume = l * 0.08; // gal
    } else if (liquidUnit === LiquidUnit.Liters && grainBillUnit === GrainBillUnit.Kilograms) {
      grainVolume = l * 0.65; // L
    } else if (liquidUnit === LiquidUnit.Gallons && grainBillUnit === GrainBillUnit.Kilograms) {
      // Convert kg to lbs, then multiply by 0.08 gal/lb
      grainVolume = (l * 2.20462) * 0.08;
    } else {
      // Liters and Pounds: convert lbs to kg, then multiply by 0.65 L/kg
      grainVolume = (l / 2.20462) * 0.65;
    }

    // Calculate Total Mash Volume
    const v = w + grainVolume;

    // Check if kettle size is exceeded
    const kettleSizeExceeded = k !== undefined && v > k;
    const kettleSizeWarning = kettleSizeExceeded
      ? `Warning: Total mash volume (${v.toFixed(2)} ${liquidUnit}) exceeds kettle size (${k!.toFixed(2)} ${liquidUnit})`
      : null;

    // Calculate PreBoil Wort (water minus grain absorption)
    const p = w - grainAbsorption;

    // Calculate Strike Water Temperature
    // The correct formula from biabcalculator.com:
    // Tw = (0.2 / R) * (Tmash - Tgrain) + Tmash
    // where R = water to grain ratio in QUARTS per pound
    // So we need to convert gallons to quarts: multiply by 4
    // For metric: Tw = (0.41 / R) * (Tmash - Tgrain) + Tmash where R is L/kg
    const waterToGrainRatio = w / l;
    let s;
    if (liquidUnit === LiquidUnit.Gallons && grainBillUnit === GrainBillUnit.Pounds) {
      // US: convert gal/lb to qt/lb by multiplying by 4
      const ratioInQuarts = waterToGrainRatio * 4;
      s = (0.2 / ratioInQuarts) * (j - i) + j;
    } else {
      // Metric: L/kg ratio used directly
      s = (0.41 / waterToGrainRatio) * (j - i) + j;
    }

    // Calculate PostBoil Wort
    const q = b + t;

    // Into Fermenter
    const f = b;

    setResults({
      totalWaterNeeded: w,
      strikeWaterTemp: s,
      totalMashVolume: v,
      preBoilWort: p,
      postBoilWort: q,
      intoFermenter: f,
      kettleSizeExceeded,
      kettleSizeWarning,
    });
  }, [deferredInputs, liquidUnit, tempUnit, grainBillUnit, timeUnit]);

  // ✅ Memoize results so reference stays stable
  return useMemo(() => results, [results]);
}