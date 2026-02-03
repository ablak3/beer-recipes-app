import {
  BrewInABagResults,
  BrewInABagSettings,
  Unit,
  Ingredient,
  Recipe,
  StepAdded,
  WaterAdjustments,
  IngredientType,
  WaterChemistryInputs,
  WaterChemistryResults,
  Grain,
  startingWaterProfile,
  waterVolumes
} from "../types";

// Grain
export const defaultGrain: Grain = {
  type: "Base Malt",
  name: "",
  weight: 0,
  lovibond: 0
};

// Starting Water Profile
export const defaultStartingWaterProfile: startingWaterProfile = {
  startingCalcium: 0,
  startingMagnesium: 0,
  startingSodium: 0,
  startingChloride: 0,
  startingSulfate: 0,
  startingBicarbonate: 0,
};

// Water Volumes
export const defaultWaterVolumes: waterVolumes = {
  mashWaterVolume: 0,
  spargeWaterVolume: 0,
  percentDistilledRO: 0,
};

// Water Chemistry Inputs
export const defaultWaterChemistryInputs: WaterChemistryInputs = {
  startingWaterProfile: defaultStartingWaterProfile,
  waterVolumes: defaultWaterVolumes,
  lacticAcidML: 0,
};

// Water Chemistry Results
export const defaultWaterChemistryResults: WaterChemistryResults = {
  totalCalcium: 0,
  totalMagnesium: 0,
  totalSodium: 0,
  totalChloride: 0,
  totalSulfate: 0,
  totalBicarbonate: 0,
  chlorideSulfateRatio: 0,
  residualAlkalinity: 0,
  estimatedMashPH: 0,
  warnings: [],
};

// Water Adjustments
export const defaultWaterAdjustments: WaterAdjustments = {
  id: null,
  solidUnit: Unit.PartsPerMillion,
  liquidUnit: Unit.Milliliters,
  gypsum: 0,
  calciumChloride: 0,
  epsomSalt: 0,
  slakedLime: 0,
  BakingSoda: 0,
  chalk: 0,
  lacticAcid: 0,
};

// Ingredient
export const defaultIngredient: Ingredient = {
  id: null,
  type: IngredientType.Other,
  name: "",
  amount: 0,
  units: "",
  stepAdded: StepAdded.PreBoil,
  timeAdded: "NA"
};

// Brew In A Bag Settings
export const defaultBrewInABagSettings: BrewInABagSettings = {
  id: null,
  grainBillUnit: Unit.Pounds,
  tempUnit: Unit.Fahrenheit,
  timeUnit: Unit.Minutes,
  liquidUnit: Unit.Gallons,
  grainTemp: 70,
  batchSize: 5.5,
  mashTemp: 153,
  boilTime: 60,
  kettleSize: 15,
  trub: 0.25,
  boilOffRate: 1.25,
  grainAbsorptionRate: 0.045,
};

// Brew In A Bag Results
export const defaultBrewInABagResults: BrewInABagResults = {
  totalWaterNeeded: 0,
  strikeWaterTemp: 0,
  totalMashVolume: 0,
  preBoilWort: 0,
  postBoilWort: 0,
  intoFermenter: 0
};

// Complete Recipe
export const defaultRecipeValues: Recipe = {
  id: null,
  title: "",
  description: "",
  instructions: "",
  author: "",
  grainBill: [defaultGrain],
  brewInABagSettings: defaultBrewInABagSettings,
  brewInABagResults: defaultBrewInABagResults,
  waterChemistryInputs: defaultWaterChemistryInputs,
  waterChemistryResults: defaultWaterChemistryResults,
  waterAdjustments: defaultWaterAdjustments,
  ingredients: [defaultIngredient],
  comments: [],
};