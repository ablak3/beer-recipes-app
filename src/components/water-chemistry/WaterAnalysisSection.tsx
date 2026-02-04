import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import CardGrid from "../CardGrid";

interface Props {
  results: WaterChemistryResults;
}

export default function WaterAnalysisSection({ results }: Props) {
  return (
    <CardGrid numCards={3}>
      <ResultCard
        label="Cl/SO₄ Ratio"
        value={results.chlorideSulfateRatio}
        decimals={2}
        info="<0.8: Bitter/Hoppy, >1.5: Malty/Sweet"
      />
      <ResultCard
        label="Residual Alkalinity"
        value={results.residualAlkalinity}
        decimals={1}
        unit="ppm as CaCO₃"
      />
      <ResultCard
        label="Estimated Mash pH"
        value={results.estimatedMashPH}
        decimals={2}
        range="5.2-5.6"
        highlight
        info="Target: 5.2-5.6"
      />
    </CardGrid>
  );
}
