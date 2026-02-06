import { useMemo } from 'react';
import { useRecipe } from "../../hooks/useRecipe";
import BiabResults from "./BiabResults";

export default function BrewResultsSection() {
  const { recipe } = useRecipe();

  // Calculate grain bill weight directly from recipe
  const grainBillWeight = useMemo(() => {
    return recipe.grainBill.reduce((total, grain) => {
        const w = typeof grain.weight === "number" ? grain.weight : parseFloat(String(grain.weight));
        return total + (Number.isFinite(w) ? w : 0);
    }, 0)
  }, [recipe.grainBill]);

  return <BiabResults
            biabValues={recipe.brewInABagSettings}
            grainBillWeight={grainBillWeight} />;
}
