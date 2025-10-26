import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import {
  IngredientType,
  GrainBillUnit,
  TempUnit,
  TimeUnit,
  LiquidUnit,
} from "../types";

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
      BrewInABagSettings: {
        id: null,
        grainBillUnit: GrainBillUnit.Pounds,
        tempUnit: TempUnit.Fahrenheit,
        timeUnit: TimeUnit.Minutes,
        liquidUnit: LiquidUnit.Gallons,
        grainBill: 10,
        batchSize: 5.5,
        mashTemp: 153,
        boilTime: 60,
        kettleSize: 15,
        trub: 0.25,
        boilOffRate: 1.25,
        grainAbsorption: 0.45,
        totalWaterNeed: 7.45,
        strikeWaterTemp: 159,
        totalMashVolume: 8.25,
        preBoilWort: 7,
        postBoilWort: 5.75,
        intoFermenter: 5.5,
      },
      ingredients: [
        {
          id: null,
          type: IngredientType.Other,
          name: "",
          amount: 0,
          units: "",
        },
      ],
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

  const fields = [
    { fieldName: "grainBill", label: "Grain Bill" },
    { fieldName: "batchSize", label: "Batch Size" },
    { fieldName: "mashTemp", label: "Mash Temp" },
    { fieldName: "boilTime", label: "Boil Time" },
    { fieldName: "kettleSize", label: "Kettle Size" },
    { fieldName: "trub", label: "Trub" },
    { fieldName: "boilOffRate", label: "Boil Off Rate" },
    { fieldName: "grainAbsorption", label: "Grain Absorption" },
    { fieldName: "totalWaterNeed", label: "Total Water Needed" },
    { fieldName: "strikeWaterTemp", label: "Strike Water Temp" },
    { fieldName: "totalMashVolume", label: "Total Mash Volume" },
    { fieldName: "preBoilWort", label: "Pre Boil Wort" },
    { fieldName: "postBoilWort", label: "Post Boil Wort" },
    { fieldName: "intoFermenter", label: "Into Fermenter" },
  ] as const;

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

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              label="Grain Bill Unit"
              fullWidth
              {...register("BrewInABagSettings.grainBillUnit")}
              error={!!errors.BrewInABagSettings?.grainBillUnit}
              helperText={errors.BrewInABagSettings?.grainBillUnit?.message}
            >
              {Object.values(GrainBillUnit).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              label="Temperature Unit"
              fullWidth
              {...register("BrewInABagSettings.tempUnit")}
              error={!!errors.BrewInABagSettings?.tempUnit}
              helperText={errors.BrewInABagSettings?.tempUnit?.message}
            >
              {Object.values(TempUnit).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              label="Time Unit"
              fullWidth
              {...register("BrewInABagSettings.timeUnit")}
              error={!!errors.BrewInABagSettings?.timeUnit}
              helperText={errors.BrewInABagSettings?.timeUnit?.message}
            >
              {Object.values(TimeUnit).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              label="Liquid Unit"
              fullWidth
              {...register("BrewInABagSettings.liquidUnit")}
              error={!!errors.BrewInABagSettings?.liquidUnit}
              helperText={errors.BrewInABagSettings?.liquidUnit?.message}
            >
              {Object.values(LiquidUnit).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Numeric Fields */}
        {fields.map(({ fieldName, label }) => (
          <TextField
            key={fieldName}
            type="number"
            label={label}
            fullWidth
            margin="normal"
            {...register(`BrewInABagSettings.${fieldName}` as const)}
            error={!!errors.BrewInABagSettings?.[fieldName]}
            helperText={errors.BrewInABagSettings?.[fieldName]?.message}
          />
        ))}

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
            <Grid key={index} size={{ xs: 12, sm: 2 }}>
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
            <Grid key={index} size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Name"
                fullWidth
                {...register(`ingredients.${index}.name` as const)}
                error={!!errors.ingredients?.[index]?.name}
                helperText={errors.ingredients?.[index]?.name?.message}
              />
            </Grid>
            <Grid key={index} size={{ xs: 12, sm: 2 }}>
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
            <Grid key={index} size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Units"
                fullWidth
                {...register(`ingredients.${index}.units` as const)}
                error={!!errors.ingredients?.[index]?.units}
                helperText={errors.ingredients?.[index]?.units?.message}
              />
            </Grid>
            <Grid key={index} size={{ xs: 12, sm: 3 }}>
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
