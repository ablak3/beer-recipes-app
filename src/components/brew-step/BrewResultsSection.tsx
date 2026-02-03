import { useRecipe } from "../../hooks/useRecipe";
import BiabResults from "./BiabResults";

export default function BrewResultsSection() {
  const { recipe, getGrainBillWeight } = useRecipe();
  const grainBillWeight = getGrainBillWeight();

  return <BiabResults
            biabValues={recipe.brewInABagSettings}
            grainBillWeight={grainBillWeight} />;
}
