import * as yup from 'yup';
import { 
  Unit, 
  IngredientType,
  StepAdded 
} from '../types';

/**
 * Grain Schema
 */
export const grainSchema = yup.object({
  type: yup.string().required("Grain type is required"),
  name: yup.string().required("Grain name is required"),
  weight: yup.number().required("Weight is required"),
  lovibond: yup.number().required("Lovibond is required"),
});

/**
 * Starting Water Profile Schema
 */
export const startingWaterProfileSchema = yup.object({
  startingCalcium: yup.number().required("Calcium is required"),
  startingMagnesium: yup.number().required("Magnesium is required"),
  startingSodium: yup.number().required("Sodium is required"),
  startingChloride: yup.number().required("Chloride is required"),
  startingSulfate: yup.number().required("Sulfate is required"),
  startingBicarbonate: yup.number().required("Bicarbonate is required"),
});

/**
 * Water Volumes Schema
 */
export const waterVolumesSchema = yup.object({
  mashWaterVolume: yup.number().required("Mash water volume is required"),
  spargeWaterVolume: yup.number().required("Sparge water volume is required"),
  percentDistilledRO: yup.number().required("RO percentage is required"),
});

/**
 * Water Chemistry Inputs Schema
 */
export const waterChemistryInputsSchema = yup.object({
  startingWaterProfile: startingWaterProfileSchema.required(),
  waterVolumes: waterVolumesSchema.required(),
  lacticAcidML: yup.number().required("Lactic acid is required"),
});

/**
 * Water Adjustments Schema
 */
export const waterAdjustmentsSchema = yup.object({
  id: yup.string().nullable(),
  solidUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  liquidUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  gypsum: yup.number().required("Gypsum is required"),
  calciumChloride: yup.number().required("Calcium chloride is required"),
  epsomSalt: yup.number().required("Epsom salt is required"),
  slakedLime: yup.number().required("Slaked lime is required"),
  BakingSoda: yup.number().required("Baking soda is required"),
  chalk: yup.number().required("Chalk is required"),
  lacticAcid: yup.number().required("Lactic acid is required"),
});

/**
 * Water Chemistry Results Schema
 */
export const waterChemistryResultsSchema = yup.object({
  totalCalcium: yup.number().required(),
  totalMagnesium: yup.number().required(),
  totalSodium: yup.number().required(),
  totalChloride: yup.number().required(),
  totalSulfate: yup.number().required(),
  totalBicarbonate: yup.number().required(),
  chlorideSulfateRatio: yup.number().required(),
  residualAlkalinity: yup.number().required(),
  estimatedMashPH: yup.number().required(),
  warnings: yup.array().of(yup.string().required()).default([]),
});

/**
 * Brew In A Bag Settings Schema
 */
export const brewInABagSettingsSchema = yup.object({
  id: yup.string().nullable(),
  grainBillUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  tempUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  timeUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  liquidUnit: yup.mixed<Unit>().oneOf(Object.values(Unit)).required(),
  grainTemp: yup.number().required("Grain temperature is required"),
  batchSize: yup.number().required("Batch size is required"),
  mashTemp: yup.number().required("Mash temp is required"),
  boilTime: yup.number().required("Boil time is required"),
  kettleSize: yup.number().required("Kettle size is required"),
  trub: yup.number().required("Trub is required"),
  boilOffRate: yup.number().required("Boil off rate is required"),
  grainAbsorptionRate: yup.number().required("Grain absorption is required"),
});

/**
 * Brew In A Bag Results Schema
 */
export const brewInABagResultsSchema = yup.object({
  totalWaterNeeded: yup.number().required(),
  strikeWaterTemp: yup.number().required(),
  totalMashVolume: yup.number().required(),
  preBoilWort: yup.number().required(),
  postBoilWort: yup.number().required(),
  intoFermenter: yup.number().required(),
});

/**
 * Ingredient Schema
 */
export const ingredientSchema = yup.object({
  id: yup.string().nullable(),
  type: yup.mixed<IngredientType>().oneOf(Object.values(IngredientType)).required(),
  name: yup.string().required("Ingredient name is required"),
  amount: yup.number().required("Amount is required"),
  units: yup.string().required("Units are required"),
  stepAdded: yup.mixed<StepAdded>().oneOf(Object.values(StepAdded)).required(),
  timeAdded: yup.string().required("Time added is required"),
});

/**
 * Comment Schema
 */
export const commentSchema = yup.object({
  id: yup.string().nullable(),
  user: yup.string().required("User is required"),
  content: yup.string().required("Content is required"),
});

/**
 * Recipe Schema
 */
export const recipeSchema = yup.object({
  id: yup.string().required().nullable(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  grainBill: yup.array().of(grainSchema).default([]).min(1, "At least one grain is required"),
  brewInABagSettings: brewInABagSettingsSchema.required(),
  brewInABagResults: brewInABagResultsSchema.required(),
  waterChemistryInputs: waterChemistryInputsSchema.required(),
  waterChemistryResults: waterChemistryResultsSchema.required(),
  waterAdjustments: waterAdjustmentsSchema.required(),
  ingredients: yup.array().of(ingredientSchema).default([]).min(1, "At least one ingredient required"),
  instructions: yup.string().required("Instructions are required"),
  author: yup.string().required("Author is required"),
  comments: yup.array().of(commentSchema).default([]),
});

/**
 * TypeScript types inferred from schema
 */
export type RecipeFormValues = yup.InferType<typeof recipeSchema>;