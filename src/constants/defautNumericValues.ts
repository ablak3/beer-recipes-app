import { RecipeFormValues } from "../validation/recipeSchema";
import { Unit } from "../types";

export type Field<T> = {
  name: keyof T;
  label: string;
  options?: Unit[];
};

export const brewInABagNumericFields: Field<RecipeFormValues["brewInABagSettings"]>[] = [
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

export const brewInABagOptionsFields: Field<RecipeFormValues["brewInABagSettings"]>[] = [
    { name: "grainBillUnit", label: "Grain Bill Unit", options: Object.values(Unit),},
    { name: "tempUnit", label: "Temp Unit", options: Object.values(Unit) },
    { name: "timeUnit", label: "Time Unit", options: Object.values(Unit) },
    { name: "liquidUnit", label: "Liquid Unit", options: Object.values(Unit) },
];

export const startingWaterChemistryNumericFields: Field<
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

export const waterVolumes: Field<
  RecipeFormValues["waterVolumes"]
>[] = [
  { name: "mashWater", label: "Mash Water (gal)" },
  { name: "spargeWater", label: "Sparge Water (gal)" }
];

export const mashSaltAdditions: Field<
  RecipeFormValues["mashSaltAdditions"]
>[] = [
  { name: "mashGypsumCaSO4", label: "Gypsum" },
  { name: "mashCalciumChlorideCaCl2", label: "Calcium Chloride" },
  { name: "mashEpsomSaltMgSO4", label: "Epsom Salt" },
  { name: "mashTableSaltNaCl", label: "Table Salt" },
  { name: "mashBakingSodaNaHCO3", label: "Baking Soda" },
  { name: "mashChalkCaCO3", label: "Chalk" },
];

export const spargeSaltAdditions: Field<
  RecipeFormValues["spargeSaltAdditions"]
>[] = [
  { name: "spargeGypsumCaSO4", label: "Gypsum" },
  { name: "spargeCalciumChlorideCaCl2", label: "Calcium Chloride" },
  { name: "spargeEpsomSaltMgSO4", label: "Epsom Salt" },
  { name: "spargeTableSaltNaCl", label: "Table Salt" },
  { name: "spargeBakingSodaNaHCO3", label: "Baking Soda" },
  { name: "spargeChalkCaCO3", label: "Chalk" },
];

export const acidAdditions: Field<
  RecipeFormValues["acidAdditions"]
>[] = [
  { name: "lacticAcid", label: "Lactic Acid (mL)" }
];
