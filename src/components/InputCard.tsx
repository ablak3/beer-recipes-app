import { useFormContext, Controller, Path } from "react-hook-form";
import { TextField, MenuItem, Paper, Typography } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";
import { Field } from "../constants/defaultFieldNames";
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
      {fields.map(({ name, label, options }) => (
        <Controller
          name={`${basePath}.${String(name)}` as Path<RecipeFormValues>}
          control={control}
          render={({ field, fieldState }) => (
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                height: "100%",
                position: "relative",
                bgcolor: "background.paper",
                transition: "all 0.2s ease",
                "&:focus-within": {
                  elevation: 4,
                  borderLeft: 4,
                  borderColor: "primary.main",
                  bgcolor: "primary.lighter",
                },
              }}
            >
              {/* Label */}
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  color: "text.secondary",
                  mb: 0.5,
                  display: "block",
                }}
              >
                {label}
              </Typography>

              {/* Input Field */}
              <TextField
                {...field}
                select={!!options}
                type={options ? undefined : "number"}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                variant="standard"
                InputProps={{
                  disableUnderline: false,
                  sx: {
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "text.primary",
                    "& input": {
                      padding: 0,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    ml: 0,
                    mt: 0.5,
                  },
                }}
              >
                {options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
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
