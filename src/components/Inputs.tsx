import { useFormContext, Controller, Path } from "react-hook-form";
import { Grid, TextField, MenuItem } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";
import { Field } from "../constants/defautNumericValues";

interface InputsProps<T extends object> {
  fields: Field<T>[];
  fieldType?: string;
  basePath: Path<RecipeFormValues>;
}

export default function Inputs<T extends object>({
  fields,
  basePath,
}: InputsProps<T>) {
  const { control } = useFormContext<RecipeFormValues>();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {fields.map(({ name, label, options }) => (
        <Grid key={String(name)} size={{ xs: 12, sm: 3 }}>
          <Controller
            name={`${basePath}.${String(name)}` as Path<RecipeFormValues>}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type={options ? undefined : "number"}
                label={label}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {options && options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
}
