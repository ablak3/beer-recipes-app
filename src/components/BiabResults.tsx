import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useBiabCalculator } from "../hooks/useBiabCalculator";
import { BrewInABagSettings } from "../types";

interface BiabResultsProps {
  biabValues: BrewInABagSettings;
}

export default function BiabResults({ biabValues }: BiabResultsProps) {
  const { setValue, getValues } = useFormContext();

  // ✅ Calculate results once per biabValues change
  const results = useBiabCalculator(biabValues);

  // ✅ Use ref to prevent redundant form updates
  const prevResultsRef = useRef<typeof results | null>(null);

  useEffect(() => {
    if (!results) return;

    let hasChanged = false;

    // Only update changed fields
    for (const [key, value] of Object.entries(results)) {
      const current = getValues(`brewInABagSettings.${key}`);
      if (current !== value) {
        hasChanged = true;
        setValue(`brewInABagSettings.${key}`, value, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }

    // Update ref only if changes happened
    if (hasChanged) {
      prevResultsRef.current = results;
    }
  }, [results, getValues, setValue]);

  if (!results) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        BIAB Calculations
      </Typography>
      <ul>
        <li>
          Total Water Needed: {results.totalWaterNeeded.toFixed(2)}{" "}
          {biabValues.liquidUnit}
        </li>
        <li>
          Strike Water Temp: {results.strikeWaterTemp.toFixed(1)}{" "}
          {biabValues.tempUnit}
        </li>
        <li>
          Total Mash Volume: {results.totalMashVolume.toFixed(2)}{" "}
          {biabValues.liquidUnit}
        </li>
        <li>
          Pre-Boil Wort: {results.preBoilWort.toFixed(2)}{" "}
          {biabValues.liquidUnit}
        </li>
        <li>
          Post-Boil Wort: {results.postBoilWort.toFixed(2)}{" "}
          {biabValues.liquidUnit}
        </li>
        <li>
          Into Fermenter: {results.intoFermenter.toFixed(2)}{" "}
          {biabValues.liquidUnit}
        </li>
      </ul>
    </div>
  );
}
