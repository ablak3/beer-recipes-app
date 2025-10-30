import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";

const numericFields: {
  name: keyof RecipeFormValues["brewInABagSettings"];
  label: string;
}[] =  [
  { name: "grainBill", label: "Grain Bill" },
  { name: "batchSize", label: "Batch Size" },
  { name: "mashTemp", label: "Mash Temp" },
  { name: "boilTime", label: "Boil Time" },
  { name: "trub", label: "Trub" },
  { name: "boilOffRate", label: "Boil Off Rate" },
  { name: "grainAbsorptionRate", label: "Grain Absorption Rate" },
];

export default function NumericInputs() {
  const { control } = useFormContext<RecipeFormValues>();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {numericFields.map(({ name, label }) => (
        <Grid key={name} size={{xs:12, sm:3}}>
          <Controller
            name={`brewInABagSettings.${name}` as const}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label={label}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
}
