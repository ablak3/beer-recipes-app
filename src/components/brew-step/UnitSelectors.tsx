import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, MenuItem } from "@mui/material";
import { Unit } from "../../types";
import { RecipeFormValues } from "../../validation/recipeSchema";

export default function UnitSelectors() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const units: {
    field: keyof RecipeFormValues["brewInABagSettings"];
    label: string;
    options: string[];
  }[] = [
    {
      field: "grainBillUnit",
      label: "Grain Bill Unit",
      options: Object.values(Unit),
    },
    { field: "tempUnit", label: "Temp Unit", options: Object.values(Unit) },
    { field: "timeUnit", label: "Time Unit", options: Object.values(Unit) },
    { field: "liquidUnit", label: "Liquid Unit", options: Object.values(Unit) },
  ];

  return (
    <Grid container spacing={2}>
      {units.map(({ field, label, options }) => (
        <Grid key={field} size={{ xs: 12, sm: 3 }}>
          <Controller
            name={`brewInABagSettings.${field}` as const}
            control={control}
            render={({ field: f }) => (
              <TextField
                select
                label={label}
                fullWidth
                {...f}
                error={!!errors.brewInABagSettings?.[field]}
                helperText={errors.brewInABagSettings?.[field]?.message}
              >
                {options.map((opt) => (
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
