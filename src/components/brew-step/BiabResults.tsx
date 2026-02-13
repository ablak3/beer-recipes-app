import { useEffect } from "react";
import { useBiabCalculator } from "../../hooks/useBiabCalculator";
import ResultCard from "../ResultCard";
import { useRecipe } from "../../hooks/useRecipe";
import CardGrid from "../CardGrid";

interface BiabResultsProps {
  grainBillWeight: number;
}

export default function BiabResults({ grainBillWeight }: BiabResultsProps) {
  const { recipe, updateBiabResults } = useRecipe();
  const biabValues = recipe.brewInABagSettings;

  const results = useBiabCalculator({ grainBillWeight, ...biabValues });

  useEffect(() => {
    if (!results) return;
    updateBiabResults(results);
  }, [results, updateBiabResults]);

  if (!results) return null;

  return (
    <CardGrid numCards={3}>
      <ResultCard
        label="Total Water Needed"
        value={results.totalWaterNeeded}
        unit={biabValues.liquidUnit}
        decimals={2}
      />
      <ResultCard
        label="Strike Water Temperature"
        value={results.strikeWaterTemp}
        unit={biabValues.tempUnit}
      />
      <ResultCard
        label="Total Mash Volume"
        value={results.totalMashVolume}
        unit={biabValues.liquidUnit}
        decimals={2}
      />
      <ResultCard
        label="Pre-Boil Wort"
        value={results.preBoilWort}
        unit={biabValues.liquidUnit}
        decimals={2}
      />
      <ResultCard
        label="Post-Boil Wort"
        value={results.postBoilWort}
        unit={biabValues.liquidUnit}
        decimals={2}
      />
      <ResultCard
        label="Into Fermenter"
        value={results.intoFermenter}
        unit={biabValues.liquidUnit}
        decimals={2}
      />
    </CardGrid>
  );
}
