import { useFormContext, Controller, Path } from "react-hook-form";
import { TextField, MenuItem, Paper, Typography } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";
import { Field } from "../constants/defaultFieldNames";
import {
  paperCardStyle,
  labelStyle,
  inputStyle,
  inputSubLabelStyle,
  helperTextStyle,
} from "../styles/fieldStyles";
import CardGrid from "./CardGrid";

interface InputCardProps<T extends object> {
  fields: Field<T>[];
  basePath: Path<RecipeFormValues>;
  numCards: number;
}

export default function InputCard<T extends object>({
  fields,
  basePath,
  numCards,
}: InputCardProps<T>) {
  const { control } = useFormContext<RecipeFormValues>();

  return (
    <CardGrid numCards={numCards}>
      {fields.map(({ name, label, subLabel, options }) => (
        <Controller
          key={String(name)}
          name={`${basePath}.${String(name)}` as Path<RecipeFormValues>}
          control={control}
          render={({ field, fieldState }) => (
            <Paper {...paperCardStyle}>
              <Typography {...labelStyle}>
                {label}
                {subLabel && <Typography {...inputSubLabelStyle}>{subLabel}</Typography>}
              </Typography>

              <TextField
                {...field}
                select={!!options}
                type={options ? undefined : "number"}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...inputStyle}
                FormHelperTextProps={helperTextStyle}
              >
                {options?.map((opt) => (
                  <MenuItem key={String(opt)} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Paper>
          )}
        />
      ))}
    </CardGrid>
  );
}
