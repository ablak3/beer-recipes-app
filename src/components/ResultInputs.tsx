import { useFormContext, Controller, Path } from "react-hook-form";
import { Grid, TextField, MenuItem, Paper, Typography } from "@mui/material";
import { RecipeFormValues } from "../validation/recipeSchema";
import { Field } from "../constants/defautNumericValues";

interface ResultInputsProps<T extends object> {
  fields: Field<T>[];
  basePath: Path<RecipeFormValues>;
}

export default function ResultInputs<T extends object>({
  fields,
  basePath,
}: ResultInputsProps<T>) {
  const { control } = useFormContext<RecipeFormValues>();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {fields.map(({ name, label, options }) => (
        <Grid key={String(name)} size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
      ))}
    </Grid>
  );
}