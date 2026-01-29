import { BrewInABagResults,
  BrewInABagSettings,
  Unit,
  Ingredient,
  Recipe,
  StepAdded,
  BeforeWaterProfile,
  AfterWaterProfile,
  WaterAdditions,
  IngredientType,
  WaterChemistryInputs,
  WaterChemistryResults
} from "../types";

export const defaultWaterChemistryResults: WaterChemistryResults = {
  mashCalcium: 0,
  mashMagnesium: 0,
  mashSodium: 0,
  mashChloride: 0,
  mashSulfate: 0,
  mashBicarbonate: 0,
  
  spargeCalcium: 0,
  spargeMagnesium: 0,
  spargeSodium: 0,
  spargeChloride: 0,
  spargeSulfate: 0,
  spargeBicarbonate: 0,
  
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
}

export const defaultWaterChemistryInputs: WaterChemistryInputs = {
  // Starting water profile
  startingCalcium: 0,
  startingMagnesium: 0,
  startingSodium: 0,
  startingChloride: 0,
  startingSulfate: 0,
  startingBicarbonate: 0,
  
  // Water volumes
  mashWaterVolume: 0,
  spargeWaterVolume: 0,
  
  // Grain bill
  grainBill: [],
  
  // Mash salt additions
  mashGypsumCaSO4: 0,
  mashCalciumChlorideCaCl2: 0,
  mashEpsomSaltMgSO4: 0,
  mashTableSaltNaCl: 0,
  mashBakingSodaNaHCO3: 0,
  mashChalkCaCO3: 0,
  
  // Sparge salt additions
  spargeGypsumCaSO4: 0,
  spargeCalciumChlorideCaCl2: 0,
  spargeEpsomSaltMgSO4: 0,
  spargeTableSaltNaCl: 0,
  spargeBakingSodaNaHCO3: 0,
  spargeChalkCaCO3: 0,
  
  // Acid
  lacticAcidML: 0,
  
  // RO percentage
  roPercentage: 0,
}

export const defaultIngredient: Ingredient = {
  id: null,
  type: IngredientType.Other,
  name: "",
  amount: 0,
  units: "",
  stepAdded: StepAdded.PreBoil,
  timeAdded: "NA"
};

export const defaultBrewInABagSettings: BrewInABagSettings = {
  id: null,
  grainBillUnit: Unit.Pounds,
  tempUnit: Unit.Fahrenheit,
  timeUnit: Unit.Minutes,
  liquidUnit: Unit.Gallons,
  grainBill: 10,
  batchSize: 5.5,
  mashTemp: 153,
  boilTime: 60,
  kettleSize: 15,
  trub: 0.25,
  boilOffRate: 1.25,
  grainAbsorptionRate: 0.045,
  grainTemp: 70
};

export const defaultBrewInABagResults: BrewInABagResults = {
  totalWaterNeeded: 0,
  strikeWaterTemp: 0,
  totalMashVolume: 0,
  preBoilWort: 0,
  postBoilWort: 0,
  intoFermenter: 0
};

export const defaultBeforeWaterProfile: BeforeWaterProfile = {
  id: null,
  solidUnit: Unit.PartsPerMillion,
  calcium: 0,
  magnesium: 0,
  sodium: 0,
  chloride: 0,
  sulfate: 0,
  alkalinity: 0
}

export const defaultAfterWaterProfile: AfterWaterProfile = {
  id: null,
  solidUnit: Unit.PartsPerMillion,
  calcium: 0,
  magnesium: 0,
  sodium: 0,
  chloride: 0
}

export const defaultWaterAdditions: WaterAdditions = {
  id: null,
  solidUnit: Unit.PartsPerMillion,
  liquidUnit: Unit.Milliliters,
  gypsum: 0,
  calciumChloride: 0,
  epsomSalt: 0,
  slakedLime: 0,
  BakingSoda: 0,
  chalk: 0,
  lacticAcid: 0
}

export const defaultRecipeValues: Recipe = {
  id: null,
  title: "",
  description: "",
  instructions: "",
  author: "",
  brewInABagSettings: defaultBrewInABagSettings,
  brewInABagResults: defaultBrewInABagResults,
  beforeWaterProfile: defaultBeforeWaterProfile,
  afterWaterProfile: defaultAfterWaterProfile,
  waterAdditions: defaultWaterAdditions,
  ingredients: [defaultIngredient],
  comments: [{ id: null, user: "", content: "" }],
};