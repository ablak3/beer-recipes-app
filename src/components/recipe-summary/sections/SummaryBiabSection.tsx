// src/components/recipe-summary/sections/SummaryBiabSection.tsx
import { Divider } from "@mui/material";
import { Recipe } from "../../../types";
import CardGrid from "../../CardGrid";
import ResultCard from "../../ResultCard";
import SummarySectionHeader from "../SummarySectionHeader";

export default function SummaryBiabSection({
  recipe,
  editTo,
}: {
  recipe: Recipe;
  editTo: string;
}) {
  const biab = recipe.brewInABagSettings;

  return (
    <>
      <SummarySectionHeader title="Brew-In-A-Bag" to={editTo} />
      <CardGrid numCards={4}>
        <ResultCard label="Batch Size" value={biab.batchSize} unit={biab.liquidUnit} decimals={1} />
        <ResultCard label="Mash Temp" value={biab.mashTemp} unit={biab.tempUnit} decimals={0} />
        <ResultCard label="Boil Time" value={biab.boilTime} unit={biab.timeUnit} decimals={0} />
        <ResultCard label="Kettle Size" value={biab.kettleSize} unit={biab.liquidUnit} decimals={1} />
      </CardGrid>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
