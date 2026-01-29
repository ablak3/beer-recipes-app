import { useFormContext, Controller, Path } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";
import { NumericField } from "../constants/defautNumericValues";

interface NumericInputsProps<T extends object> {
  fields: NumericField<T>[];
  basePath: Path<RecipeFormValues>;
}

export default function NumericInputs<T extends object>({
  fields,
  basePath,
}: NumericInputsProps<T>) {
  const { control } = useFormContext<RecipeFormValues>();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {fields.map(({ name, label }) => (
        <Grid key={String(name)} size={{ xs: 12, sm: 3 }}>
          <Controller
            name={`${basePath}.${String(name)}` as Path<RecipeFormValues>}
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
