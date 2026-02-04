import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import CardGrid from "../CardGrid";

interface Props {
  results: WaterChemistryResults;
}

export default function TotalWaterProfileSection({ results }: Props) {
  return (
    <CardGrid numCards={6}>
      <ResultCard
        label="Calcium (Ca)"
        value={results.totalCalcium}
        unit="ppm"
        range="50-150"
        highlight />
      <ResultCard
        label="Magnesium (Mg)"
        value={results.totalMagnesium}
        unit="ppm"
        range="10-30"
        highlight />
        <ResultCard
        label="Sodium (Na)"
        value={results.totalSodium}
        unit="ppm"
        range="0-150"
        highlight />
      <ResultCard
        label="Chloride (Cl)"
        value={results.totalChloride}
        unit="ppm"
        range="0-250"
        highlight />
      <ResultCard
        label="Sulfate (SO₄)"
        value={results.totalSulfate}
        unit="ppm"
        range="50-350"
        highlight />
      <ResultCard
        label="Bicarbonate (HCO₃)"
        value={results.totalBicarbonate}
        unit="ppm"
        range="0-250"
        highlight />
    </CardGrid>
  );
}
