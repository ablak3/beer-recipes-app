import { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { recipeSchema, RecipeFormValues } from "../validation/recipeSchema";
import { IngredientType } from '../types';

export default function CreateRecipe() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
  control,
  register,
  handleSubmit,
  formState: { errors },
} = useForm<RecipeFormValues>({
  resolver: yupResolver(recipeSchema),
  defaultValues: {
    id: null,
    title: "",
    description: "",
    instructions: "",
    author: "",
    ingredients: [{ id: null, type: IngredientType.Other, name: "", amount: 0, units: "" }],
    comments: [{ id: null, user: "", content: "" }],
  },
});

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeFormValues> = (data) => {
    console.log("✅ Submitted recipe:", data);
    // Example post:
    // await fetch("/api/recipes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Recipe
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* BASIC FIELDS */}
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

        {/* INGREDIENTS SECTION */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>

        {ingredientFields.map((field, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={field.id}
            sx={{ mb: 2 }}
          >
            <Grid key={index} size={{xs:12, sm:2}}>
              <FormControl
                fullWidth
                error={!!errors.ingredients?.[index]?.type}
              >
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                defaultValue=""
                {...register(`ingredients.${index}.type` as const)}
                onOpen={() => setDropdownOpen(true)}
                onClose={() => setDropdownOpen(false)}
              >
              <MenuItem value="" disabled>
                Select type
              </MenuItem>
              {dropdownOpen &&
                Object.values(IngredientType).map((type) => (
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
            <Grid key={index} size={{xs:12, sm:3}}>
              <TextField
                label="Name"
                fullWidth
                {...register(`ingredients.${index}.name` as const)}
                error={!!errors.ingredients?.[index]?.name}
                helperText={errors.ingredients?.[index]?.name?.message}
              />
            </Grid>
            <Grid key={index} size={{xs:12, sm:2}}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                {...register(`ingredients.${index}.amount` as const, {
                  valueAsNumber: true,
                })}
                error={!!errors.ingredients?.[index]?.amount}
                helperText={errors.ingredients?.[index]?.amount?.message}
              />
            </Grid>
            <Grid key={index} size={{xs:12, sm:3}}>
              <TextField
                label="Units"
                fullWidth
                {...register(`ingredients.${index}.units` as const)}
                error={!!errors.ingredients?.[index]?.units}
                helperText={errors.ingredients?.[index]?.units?.message}
              />
            </Grid>
            <Grid key={index} size={{xs:12, sm:3}}>
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
                    addIngredient({
                      id: null,
                      type: IngredientType.Other,
                      name: "",
                      amount: 0,
                      units: "",
                    })
                  }
                >
                  <AddCircle />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        <Divider sx={{ my: 3 }} />

        <Button type="submit" variant="contained" color="primary">
          Save Recipe
        </Button>
      </form>
    </Container>
  );
}
