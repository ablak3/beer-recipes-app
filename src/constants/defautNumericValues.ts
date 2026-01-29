import { RecipeFormValues } from "../validation/recipeSchema";

export type NumericField<T> = {
  name: keyof T;
  label: string;
};

export const brewInABagNumericFields: NumericField<
  RecipeFormValues["brewInABagSettings"]
>[] = [
  { name: "grainBill", label: "Grain Bill" },
  { name: "grainTemp", label: "Grain Temperature" },
  { name: "batchSize", label: "Batch Size" },
  { name: "mashTemp", label: "Mash Temp" },
  { name: "boilTime", label: "Boil Time" },
  { name: "kettleSize", label: "Kettle Size" },
  { name: "trub", label: "Trub" },
  { name: "boilOffRate", label: "Boil Off Rate" },
  { name: "grainAbsorptionRate", label: "Grain Absorption Rate" }
];

export const startingWaterChemistryNumericFields: NumericField<
  RecipeFormValues["waterChemistryInputs"]
>[] = [
  { name: "startingCalcium", label: "Ca" },
  { name: "startingMagnesium", label: "Mg" },
  { name: "startingSodium", label: "Na" },
  { name: "startingChloride", label: "Cl" },
  { name: "startingSulfate", label: "SO₄" },
  { name: "startingBicarbonate", label: "HCO₃" },
  { name: "roPercentage", label: "RO %" }
];
