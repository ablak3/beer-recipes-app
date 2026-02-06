import { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useBiabCalculator } from "../../hooks/useBiabCalculator";
import { BrewInABagSettings } from "../../types";
import ResultCard from "../ResultCard";

interface BiabResultsProps {
  grainBillWeight: number;
  biabValues: BrewInABagSettings;
}

export default function BiabResults({ grainBillWeight, biabValues }: BiabResultsProps) {
  const { setValue, getValues } = useFormContext();

  // Calculate results when BIAB inputs change
  const results = useBiabCalculator({grainBillWeight, ...biabValues});

  // Prevent redundant form updates
  const prevResultsRef = useRef<typeof results | null>(null);

  useEffect(() => {
    if (!results) return;

    let hasChanged = false;

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

    if (hasChanged) {
      prevResultsRef.current = results;
    }
  }, [results, getValues, setValue]);

  if (!results) return null;

  return (
    <>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Total Water Needed"
          value={results.totalWaterNeeded}
          unit={biabValues.liquidUnit}
          decimals={2}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Strike Water Temperature"
          value={results.strikeWaterTemp}
          unit={biabValues.tempUnit}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Total Mash Volume"
          value={results.totalMashVolume}
          unit={biabValues.liquidUnit}
          decimals={2}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Pre-Boil Wort"
          value={results.preBoilWort}
          unit={biabValues.liquidUnit}
          decimals={2}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Post-Boil Wort"
          value={results.postBoilWort}
          unit={biabValues.liquidUnit}
          decimals={2}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ResultCard
          label="Into Fermenter"
          value={results.intoFermenter}
          unit={biabValues.liquidUnit}
          decimals={2}
        />
      </Grid>
    </>
  );
}
