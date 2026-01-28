import { BrewInABagResults,
  BrewInABagSettings,
  Unit,
  Ingredient,
  Recipe,
  StepAdded,
  BeforeWaterProfile,
  AfterWaterProfile,
  WaterAdditions,
  IngredientType
} from "../types";

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