import { useFormContext, useWatch } from "react-hook-form";
import { Typography } from "@mui/material";
import { RecipeFormValues } from "../../validation/recipeSchema";
import UnitSelectors from "../../components/UnitSelectors";
import NumericInputs from "../../components/NumbericInputs";
import BiabResults from "../../components/BiabResults";

export default function RecipeStepBrew() {
  const { control } = useFormContext<RecipeFormValues>();
  const biabValues = useWatch({ control, name: "brewInABagSettings" });

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Typography variant="h6" gutterBottom>
        Brew-In-A-Bag Settings
      </Typography>

      <UnitSelectors />
      <NumericInputs />
      <BiabResults biabValues={biabValues} />
    </div>
  );
}
