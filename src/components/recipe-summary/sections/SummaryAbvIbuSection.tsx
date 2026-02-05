// src/components/recipe-summary/sections/SummaryAbvIbuSection.tsx
import { Divider } from "@mui/material";
import { Recipe } from "../../../types";
import CardGrid from "../../CardGrid";
import ResultCard from "../../ResultCard";
import SummarySectionHeader from "../SummarySectionHeader";

export default function SummaryAbvIbuSection({
  recipe,
  editToAbv,
  editToIbu,
}: {
  recipe: Recipe;
  editToAbv: string;
  editToIbu: string;
}) {
  const abvInputs = recipe.abvInputs;
  const abvResults = recipe.abvResults;
  const ibuResults = recipe.ibuResults;

  return (
    <>
      {/* ABV edit link in header; you can also add a small IBU edit button in the future if you want */}
      <SummarySectionHeader title="ABV / IBU" to={editToAbv} />

      <CardGrid numCards={4}>
        <ResultCard label="OG" value={abvInputs.originalGravity} decimals={3} />
        <ResultCard label="FG" value={abvInputs.finalGravity} decimals={3} />
        <ResultCard label="ABV" value={abvResults.abv} unit="%" decimals={1} highlight />
        <ResultCard label="Total IBU" value={ibuResults.totalIBU} decimals={1} info={`Edit in IBU step`} />
      </CardGrid>

      <Divider sx={{ my: 3 }} />
    </>
  );
}
