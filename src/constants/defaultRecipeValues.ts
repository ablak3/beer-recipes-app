import { GrainBillUnit, LiquidUnit, Recipe, TempUnit, TimeUnit } from "../types";
import { IngredientType } from "../types";

export const defaultRecipeValues: Recipe = {
  id: null,
  title: "",
  description: "",
  instructions: "",
  author: "",
  brewInABagSettings: {
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
    grainAbsorptionRate: 0.45,
  },
  brewInABagResults: {
    totalWaterNeeded: 0,
    strikeWaterTemp: 0,
    totalMashVolume: 0,
    preBoilWort: 0,
    postBoilWort: 0,
    intoFermenter: 0,
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
};
