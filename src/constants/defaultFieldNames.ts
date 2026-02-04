import { RecipeFormValues } from "../validation/recipeSchema";
import { Unit } from "../types";

export type Field<T> = {
  name: keyof T;
  label: string;
  options?: Unit[];
  type?: string;
};

export const brewInABagFields: Field<
  RecipeFormValues["brewInABagSettings"]
>[] = [
  { name: "grainBillUnit", label: "Grain Bill Unit", type: "unit" },
  { name: "tempUnit", label: "Temperature Unit", type: "unit" },
  { name: "timeUnit", label: "Time Unit", type: "unit" },
  { name: "liquidUnit", label: "Liquid Unit", type: "unit" },
  { name: "grainTemp", label: "Grain Temperature", type: "number" },
  { name: "batchSize", label: "Batch Size", type: "number" },
  { name: "mashTemp", label: "Mash Temperature", type: "number" },
  { name: "boilTime", label: "Boil Time", type: "number" },
  { name: "kettleSize", label: "Kettle Size", type: "number" },
  { name: "trub", label: "Trub", type: "number" },
  { name: "boilOffRate", label: "Boil Off Rate", type: "number" },
  { name: "grainAbsorptionRate", label: "Grain Absorption Rate", type: "number" },
];

export const brewInABagOptionsFields: Field<
  RecipeFormValues["brewInABagSettings"]
>[] = [
  { name: "tempUnit", label: "Temp Unit", options: Object.values(Unit) },
  { name: "timeUnit", label: "Time Unit", options: Object.values(Unit) },
  { name: "liquidUnit", label: "Liquid Unit", options: Object.values(Unit) },
];

export const startingWaterChemistryNumericFields:
Field<RecipeFormValues["waterChemistryInputs"]["startingWaterProfile"]>[] = [
  { name: "startingCalcium", label: "Calcium (Ca)" },
  { name: "startingMagnesium", label: "Magnesium (Mg)" },
  { name: "startingSodium", label: "Sodium (Na)" },
  { name: "startingChloride", label: "Chloride (Cl)" },
  { name: "startingSulfate", label: "Sulfate (SO₄)" },
  { name: "startingBicarbonate", label: "Bicarbonate (HCO₃)" },
];

export const waterVolumesFields:
Field<RecipeFormValues["waterChemistryInputs"]["waterVolumes"]>[] = [
  { name: "mashWaterVolume", label: "Mash Water Volume" },
  { name: "spargeWaterVolume", label: "Sparge Water Volume" },
  { name: "percentDistilledRO", label: "RO %" },
];

export const waterAdjustmentSaltsFields:
Field<RecipeFormValues["waterAdjustments"]>[] = [
  { name: "gypsum", label: "Gypsum (CaSO₄)" },
  { name: "calciumChloride", label: "Calcium Chloride (CaCl₂)" },
  { name: "epsomSalt", label: "Epsom Salt (MgSO₄)" },
  { name: "slakedLime", label: "Slaked Lime (Ca(OH)₂)" },
  { name: "BakingSoda", label: "Baking Soda (NaHCO₃)" },
  { name: "chalk", label: "Chalk (CaCO₃)" },
];

export const waterAdjustmentAcidFields:
Field<RecipeFormValues["waterAdjustments"]>[] = [
  { name: "lacticAcid", label: "Lactic Acid (88%)" },
];

export const abvInputs:
Field<RecipeFormValues["abvInputs"]>[] = [
  { name: "originalGravity" as const, label: "Original Gravity (OG)" },
  { name: "finalGravity" as const, label: "Final Gravity (FG)" },
  { name: "mashEfficiency" as const, label: "Mash Efficiency (%)" },
];