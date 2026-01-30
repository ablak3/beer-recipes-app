import { useFormContext, useWatch } from "react-hook-form";
import { Stack } from "@mui/material";
import { RecipeFormValues } from "../../validation/recipeSchema";
import Inputs from "../../components/Inputs";
import { brewInABagNumericFields, brewInABagOptionsFields } from "../../constants/defautNumericValues";
import BiabResults from "../../components/brew-step/BiabResults";
import Section from "../../components/Section";

export default function RecipeStepBrew() {
  const { control } = useFormContext<RecipeFormValues>();
  const biabValues = useWatch({ control, name: "brewInABagSettings" });

  return (
    <Stack spacing={6}>
      <Section title="Brew-In-A-Bag Settings">
        <Inputs
        fields={brewInABagOptionsFields}
        basePath="brewInABagSettings"
      />
      <Inputs
        fields={brewInABagNumericFields}
        basePath="brewInABagSettings"
      />
      </Section>
      <Section title="Brew-In-A-Bag Calculations">
        <BiabResults biabValues={biabValues} />
      </Section>
    </Stack>
  );
}
