import { Typography, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../validation/recipeSchema";

export default function RecipeStepBasic() {
  const { register, formState: { errors } } = useFormContext<RecipeFormValues>();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Basic Information
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        label="Instructions"
        fullWidth
        multiline
        minRows={3}
        margin="normal"
        {...register("instructions")}
        error={!!errors.instructions}
        helperText={errors.instructions?.message}
      />
    </>
  );
}
