import { useRecipe } from "../../hooks/useRecipe";
import BiabResults from "./BiabResults";

interface BrewResultsSectionProps {
  grainBillWeight: number;
}

export default function BrewResultsSection({grainBillWeight}: BrewResultsSectionProps) {
    const { recipe } = useRecipe();

  return (
        <BiabResults
            biabValues={recipe.brewInABagSettings}
            grainBillWeight={grainBillWeight} />
    );
}
