import React from "react";
import {
  Typography,
  Grid,
  TextField,
  IconButton,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Button,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../validation/recipeSchema";
import { IngredientType, StepAdded } from "../../types";
import { defaultIngredient } from "../../constants/defaultRecipeValues";

export default function RecipeStepIngredients() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>

      <Divider sx={{ my: 2 }} />

      {ingredientFields.map((field, index) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          key={field.id}
          sx={{ mb: 2 }}
        >
          {/* --- Ingredient Type --- */}
          <Grid size={{xs:12, sm:2}}>
            <FormControl fullWidth error={!!errors.ingredients?.[index]?.type}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                {...register(`ingredients.${index}.type` as const)}
                defaultValue={field.type || ""}
              >
                <MenuItem value="" disabled>
                  Select type
                </MenuItem>
                {Object.values(IngredientType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.ingredients?.[index]?.type?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* --- Ingredient Name --- */}
          <Grid size={{xs:12, sm:2}}>
            <TextField
              label="Name"
              fullWidth
              {...register(`ingredients.${index}.name` as const)}
              defaultValue={field.name}
              error={!!errors.ingredients?.[index]?.name}
              helperText={errors.ingredients?.[index]?.name?.message}
            />
          </Grid>

          {/* --- Amount --- */}
          <Grid size={{xs:12, sm:2}}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              {...register(`ingredients.${index}.amount` as const, {
                valueAsNumber: true,
              })}
              defaultValue={field.amount}
              error={!!errors.ingredients?.[index]?.amount}
              helperText={errors.ingredients?.[index]?.amount?.message}
            />
          </Grid>

          {/* --- Units --- */}
          <Grid size={{xs:12, sm:2}}>
            <TextField
              label="Units"
              fullWidth
              {...register(`ingredients.${index}.units` as const)}
              defaultValue={field.units}
              error={!!errors.ingredients?.[index]?.units}
              helperText={errors.ingredients?.[index]?.units?.message}
            />
          </Grid>

          {/* --- Step Added --- */}
          <Grid size={{xs:12, sm:2}}>
            <FormControl fullWidth error={!!errors.ingredients?.[index]?.stepAdded}>
              <InputLabel>Step Added</InputLabel>
              <Select
                label="StepAdded"
                {...register(`ingredients.${index}.stepAdded` as const)}
                defaultValue={field.stepAdded || ""}
              >
                <MenuItem value="" disabled>
                  Select type
                </MenuItem>
                {Object.values(StepAdded).map((stepAdded) => (
                  <MenuItem key={stepAdded} value={stepAdded}>
                    {stepAdded}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.ingredients?.[index]?.stepAdded?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* --- Time Added --- */}
          <Grid size={{xs:12, sm:2}}>
            <TextField
              label="Time Added"
              fullWidth
              {...register(`ingredients.${index}.timeAdded` as const)}
              defaultValue={field.timeAdded}
              error={!!errors.ingredients?.[index]?.timeAdded}
              helperText={errors.ingredients?.[index]?.timeAdded?.message}
            />
          </Grid>

          {/* --- Add / Remove Buttons --- */}
          <Grid size={{xs:12, sm:2}}>
            <IconButton
              color="error"
              onClick={() => removeIngredient(index)}
              disabled={ingredientFields.length === 1}
            >
              <RemoveCircle />
            </IconButton>

            {index === ingredientFields.length - 1 && (
              <IconButton
                color="primary"
                onClick={() =>
                  addIngredient(defaultIngredient)
                }
              >
                <AddCircle />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ my: 3 }} />

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          addIngredient(defaultIngredient)
        }
      >
        Add Ingredient
      </Button>
    </>
  );
}
