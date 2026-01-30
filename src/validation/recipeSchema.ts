import * as yup from 'yup';
import { 
  Unit, 
  IngredientType,
  StepAdded } from '../types';

/**
 * Before Water Profile
 */
export const waterChemistryInputs = yup.object({
  id: yup.string().required().nullable(),
  solidUnit: yup.number().required("Solid unit is required"),
  startingCalcium: yup.number().required("Calcium is required"),
  startingMagnesium: yup.number().required("Magnesium is required"),
  startingSodium: yup.number().required("Sodium is required"),
  startingChloride: yup.number().required("Chloride is required"),
  startingSulfate: yup.number().required("Sulfate is required"),
  startingBicarbonate: yup.number().required("Alkalinity is required"),
  roPercentage: yup.number().required("RO Percentage is required"),
})

export const waterVolumes = yup.object({
  id: yup.string().required().nullable(),
  mashWater: yup.number().required("Mash water is required"),
  spargeWater: yup.number().required("Sparge water is required"),
})

export const mashSaltAdditions = yup.object({
  id: yup.string().required().nullable(),
  mashGypsumCaSO4: yup.number().required("Mash gypsum is required"),
  mashCalciumChlorideCaCl2: yup.number().required("Mash calcium chloride is required"),
  mashEpsomSaltMgSO4: yup.number().required("Mash epsom salt is required"),
  mashTableSaltNaCl: yup.number().required("Mash table salt is required"),
  mashBakingSodaNaHCO3: yup.number().required("Mash baking soda is required"),
  mashChalkCaCO3: yup.number().required("Mash chalk is required"),
})

export const spargeSaltAdditions = yup.object({
  id: yup.string().required().nullable(),
  spargeGypsumCaSO4: yup.number().required("Sparge gypsum is required"),
  spargeCalciumChlorideCaCl2: yup.number().required("Sparge calcium chloride is required"),
  spargeEpsomSaltMgSO4: yup.number().required("Sparge epsom salt is required"),
  spargeTableSaltNaCl: yup.number().required("Sparge table salt is required"),
  spargeBakingSodaNaHCO3: yup.number().required("Sparge baking soda is required"),
  spargeChalkCaCO3: yup.number().required("Sparge chalk is required"),
})

export const acidAdditions = yup.object({
  id: yup.string().required().nullable(),
  lacticAcid: yup.number().required("Lactic acid is required"),
})

export const grain = yup.object({
  id: yup.string().required().nullable(),
  type: yup.string().required("type is required"),
  name: yup.string().required("name is required"),
  weight: yup.number().required("weight is required"),
  lovibond: yup.number().required("lovibond is required"),
})

/**
 * After Water Profile
 */
export const waterChemistryResults = yup.object({
  id: yup.string().required().nullable(),
  solidUnit: yup.number().required("Solid unit is required"),
  calcium: yup.number().required("Calcium is required"),
  magnesium: yup.number().required("Magnesium is required"),
  sodium: yup.number().required("Sodium is required"),
  chloride: yup.number().required("Chloride is required"),
  sulfate: yup.number().required("Sulfate is required"),
})

/**
 * Water Additions
 */
export const waterAdditions = yup.object({
  id: yup.string().required().nullable(),
  solidUnit: yup.number().required("Solid unit is required"),
  liquidUnit: yup.number().required("Liquid unit is required"),
  gypsum: yup.number().required("Gypsum is required"),
  calciumChloride: yup.number().required("Calcium chloride is required"),
  epsomSalt: yup.number().required("Epsom salt is required"),
  slakedLime: yup.number().required("Slaked Lime is required"),
  bakingSoda: yup.number().required("Baking soda is required"),
  chalk: yup.number().required("chalk is required"),
  lacticAcid: yup.number().required("Lactic acid is required"),
})

/**
 * Brew In A Bag Schema
 */
export const brewInABagSettings = yup.object({
  id: yup.string().required().nullable(),
  grainBillUnit: yup.mixed<Unit>()
    .oneOf(Object.values(Unit))
    .required("Grain bill unit is required"),
  tempUnit: yup.mixed<Unit>()
    .oneOf(Object.values(Unit))
    .required("Temp unit is required"),
  timeUnit: yup.mixed<Unit>()
    .oneOf(Object.values(Unit))
    .required("Time unit is required"),
  liquidUnit: yup.mixed<Unit>()
    .oneOf(Object.values(Unit))
    .required("Liquid unit is required"),
  grainBill: yup.number().required("Grain bill is required"),
  grainTemp: yup.number().required("Grain Temperature is required"),
  batchSize: yup.number().required("Batch size is required"),
  mashTemp: yup.number().required("Mash temp is required"),
  boilTime: yup.number().required("Boil time is required"),
  kettleSize: yup.number().required("Kettle size is required"),
  trub: yup.number().required("Trub is required"),
  boilOffRate: yup.number().required("Boil off rate is required"),
  grainAbsorptionRate: yup.number().required("Grain absorption is required"),
})

/**
 * Brew In A Bag Schema
 */
export const brewInABagResults = yup.object({
  totalWaterNeeded: yup.number().required("Total water needed is required"),
  strikeWaterTemp: yup.number().required("Strike water temp is required"),
  totalMashVolume: yup.number().required("Total Mash Volume is required"),
  preBoilWort: yup.number().required("Pre boil wort is required"),
  postBoilWort: yup.number().required("Post boil wort is required"),
  intoFermenter: yup.number().required("Into fermenter is required"),
})

/**
 * Ingredient Schema
 */
export const ingredientSchema = yup.object({
  id: yup.string().required().nullable(),
  type: yup.mixed<IngredientType>()
    .oneOf(Object.values(IngredientType))
    .required("Ingredient type is required"),
  name: yup.string().required("Ingredient name is required"),
  amount: yup
    .number()
    .required("Ingredient amount is required"),
  units: yup.string().required("Ingredient units are required"),
  stepAdded: yup.mixed<StepAdded>().required("Step added is required"),
  timeAdded: yup.string().required(),
});

/**
 * Comment Schema
 */
export const commentSchema = yup.object({
  id: yup.string().required().nullable(),
  user: yup.string().required("User is required"),
  content: yup.string().required("Comment content is required"),
});

/**
 * Recipe Schema
 */
export const recipeSchema = yup.object({
  id: yup.string().required().nullable(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  brewInABagSettings: brewInABagSettings.required("Brew in a bag settings are required"),
  brewInABagResults: brewInABagResults.required("Brew in a bag results are required"),
  waterChemistryInputs: waterChemistryInputs.required("Water chemistry inputs are required"),
  waterChemistryResults: waterChemistryResults.required("Water chemistry results are required"),
  grains: yup.array().of(grain)
    .default([])
    .min(1, "At least one grain is required")
    .required("grains are required"),
  waterVolumes: waterVolumes.required("Water volumes is required"),
  mashSaltAdditions: mashSaltAdditions.required("Mash salt additions are required"),
  spargeSaltAdditions: spargeSaltAdditions.required("Sparge salt additions are requred"),
  acidAdditions: acidAdditions.required("Acid additions is required"),
  ingredients: yup.array().of(ingredientSchema)
    .default([])
    .min(1, "At least one ingredient is required")
    .required("Ingredients are required"),
  instructions: yup.string().required("Instructions are required"),
  author: yup.string().required(),
  comments: yup.array().of(commentSchema).default([]),
});

/**
 * TypeScript types inferred directly from schema
 */
export type RecipeFormValues = yup.InferType<typeof recipeSchema>;