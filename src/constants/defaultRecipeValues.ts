import { BrewInABagResults, BrewInABagSettings, GrainBillUnit, Ingredient, LiquidUnit, Recipe, StepAdded, TempUnit, TimeUnit } from "../types";
import { IngredientType } from "../types";

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
    boilOffRate: 10,
    grainAbsorptionRate: 0.45
};

export const defaultBrewInABagResults: BrewInABagResults = {
    totalWaterNeeded: 0,
    strikeWaterTemp: 0,
    totalMashVolume: 0,
    preBoilWort: 0,
    postBoilWort: 0,
    intoFermenter: 0
};

export const defaultRecipeValues: Recipe = {
  id: null,
  title: "",
  description: "",
  instructions: "",
  author: "",
  brewInABagSettings: defaultBrewInABagSettings,
  brewInABagResults: defaultBrewInABagResults,
  ingredients: [defaultIngredient],
  comments: [{ id: null, user: "", content: "" }],
};