import { useFormContext, useWatch } from "react-hook-form";
import { Typography } from "@mui/material";
import { RecipeFormValues } from "../../validation/recipeSchema";
import UnitSelectors from "../../components/brew-step/UnitSelectors";
import NumericInputs from "../../components/NumbericInputs";
import { brewInABagNumericFields } from "../../constants/defautNumericValues";
import BiabResults from "../../components/brew-step/BiabResults";

export default function RecipeStepBrew() {
  const { control } = useFormContext<RecipeFormValues>();
  const biabValues = useWatch({ control, name: "brewInABagSettings" });

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Typography variant="h6" gutterBottom>
        Brew-In-A-Bag Settings
      </Typography>

      <UnitSelectors />
      <NumericInputs
        fields={brewInABagNumericFields}
        basePath="brewInABagSettings"
      />
      <BiabResults biabValues={biabValues} />
    </div>
  );
}
