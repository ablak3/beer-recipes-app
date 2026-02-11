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
  waterVolumes,
  ABVInputs,
  ABVResults,
  IBUResults,
  Hop,
  HopType,
  totalWaterProfile,
} from "../types";

// Grain
export const defaultGrain: Grain = {
  type: "Base Malt",
  name: "",
  weight: 0,
  unit: Unit.Pounds,
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

//Total Water Profile
export const defaultTotalWaterProfile: totalWaterProfile = {
  totalCalcium: 0,
  totalMagnesium: 0,
  totalSodium: 0,
  totalChloride: 0,
  totalSulfate: 0,
  totalBicarbonate: 0,
}

// Water Chemistry Results
export const defaultWaterChemistryResults: WaterChemistryResults = {
  totalWaterProfile: defaultTotalWaterProfile,
  chlorideSulfateRatio: 0,
  residualAlkalinity: 0,
  estimatedMashPH: 0,
  warnings: [],
};

// Water Adjustments
export const defaultWaterAdjustments: WaterAdjustments = {
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
  type: IngredientType.Other,
  name: "",
  amount: 0,
  units: "",
  stepAdded: StepAdded.PreBoil,
  timeAdded: "NA"
};

// Brew In A Bag Settings
export const defaultBrewInABagSettings: BrewInABagSettings = {
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

// Hop
export const defaultHop: Hop = {
  name: "",
  alphaAcid: 0,
  amount: 0,
  type: HopType.Pellet,
  boilTime: 0,
  use: StepAdded.Boil,
};

// ABV Inputs
export const defaultABVInputs: ABVInputs = {
  originalGravity: 1.050,
  finalGravity: 1.010,
  mashEfficiency: 75,
};

// ABV Results
export const defaultABVResults: ABVResults = {
  abv: 0,
  calories: 0,
  attenuation: 0,
};

// IBU Results
export const defaultIBUResults: IBUResults = {
  totalIBU: 0,
  hopContributions: [],
};

// Complete Recipe (updated)
export const defaultRecipeValues: Recipe = {
  id: null,
  title: "",
  description: "",
  instructions: "",
  author: "",
  grainBill: [defaultGrain],
  hops: [defaultHop],
  brewInABagSettings: defaultBrewInABagSettings,
  brewInABagResults: defaultBrewInABagResults,
  waterChemistryInputs: defaultWaterChemistryInputs,
  waterChemistryResults: defaultWaterChemistryResults,
  waterAdjustments: defaultWaterAdjustments,
  abvInputs: defaultABVInputs,
  abvResults: defaultABVResults,
  ibuResults: defaultIBUResults,
  ingredients: [defaultIngredient],
  comments: [],
};