import { RecipeFormValues } from "../validation/recipeSchema";
import { GrainType, HopType, IngredientType, StepAdded, Unit } from "../types";

export type Field<T> = {
  name: keyof T;
  label: string;
  subLabel?: string;
  options?: Unit[] | GrainType[] | HopType[] | StepAdded[] | IngredientType[];
  type?: "text" | "number" | "select" | "unit";
  placeholder?: string;
  unit?: string;
  range?: string;
  highlight?: boolean;
  warning?: boolean;
  decimals?: number;
  info?: string;
};

/* =======================
   BREW IN A BAG
======================= */

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

/* =======================
   WATER CHEMISTRY
======================= */

export const startingWaterChemistryNumericFields:
Field<RecipeFormValues["waterChemistryInputs"]["startingWaterProfile"]>[] = [
  { name: "startingCalcium", label: "Calcium", subLabel: "Ca" },
  { name: "startingMagnesium", label: "Magnesium", subLabel: "Mg" },
  { name: "startingSodium", label: "Sodium", subLabel: "Na" },
  { name: "startingChloride", label: "Chloride", subLabel: "Cl" },
  { name: "startingSulfate", label: "Sulfate", subLabel: "SO₄" },
  { name: "startingBicarbonate", label: "Bicarbonate", subLabel: "HCO₃" },
];

export const waterVolumesFields:
Field<RecipeFormValues["waterChemistryInputs"]["waterVolumes"]>[] = [
  { name: "mashWaterVolume", label: "Mash Water Volume" },
  { name: "spargeWaterVolume", label: "Sparge Water Volume" },
  { name: "percentDistilledRO", label: "RO %" },
];

export const waterAdjustmentSaltsFields:
Field<RecipeFormValues["waterAdjustments"]>[] = [
  { name: "gypsum", label: "Gypsum", subLabel: "CaSO₄" },
  { name: "calciumChloride", label: "Calcium Chloride", subLabel: "CaCl₂" },
  { name: "epsomSalt", label: "Epsom Salt", subLabel: "MgSO₄" },
  { name: "slakedLime", label: "Slaked Lime", subLabel: "CaOH₂" },
  { name: "BakingSoda", label: "Baking Soda", subLabel: "NaHCO₃" },
  { name: "chalk", label: "Chalk", subLabel: "CaCO₃" },
];

export const waterAdjustmentAcidFields: Field<RecipeFormValues["waterAdjustments"]>[] = [
  { name: "lacticAcid", label: "Lactic Acid (88%)" },
];

export const totalWaterProfileResultFields: Field<RecipeFormValues["waterChemistryResults"]["totalWaterProfile"]>[] = [
  { name: "totalCalcium", label: "Calcium", subLabel: "Ca", unit: "ppm", range: "50-150", highlight: true },
  { name: "totalMagnesium", label: "Magnesium", subLabel: "Mg", unit: "ppm", range: "10-30", highlight: true },
  { name: "totalSodium", label: "Sodium", subLabel: "Na", unit: "ppm", range: "0-150", highlight: true },
  { name: "totalChloride", label: "Chloride", subLabel: "Cl", unit: "ppm", range: "0-250", highlight: true },
  { name: "totalSulfate", label: "Sulfate", subLabel: "SO₄", unit: "ppm", range: "50-350", highlight: true },
  { name: "totalBicarbonate", label: "Bicarbonate", subLabel: "HCO₃", unit: "ppm", range: "0-250", highlight: true },
];

/* =======================
   ABV
======================= */

export const abvInputs:
Field<RecipeFormValues["abvInputs"]>[] = [
  { name: "originalGravity" as const, label: "Original Gravity (OG)" },
  { name: "finalGravity" as const, label: "Final Gravity (FG)" },
  { name: "mashEfficiency" as const, label: "Mash Efficiency (%)" },
];

/* =======================
   GRAINS
======================= */

export const grainFields: Field<RecipeFormValues["grainBill"][0]>[] = [
  { name: "type", label: "Type", type: "select", options: Object.values(GrainType) },
  { name: "name", label: "Name", type: "text", placeholder: "Grain name" },
  { name: "weight", label: "Weight (lbs)", type: "number", placeholder: "0" },
  { name: "lovibond", label: "Lovibond", type: "number", placeholder: "0" },
];

/* =======================
   HOPS
======================= */

export const hopFields: Field<RecipeFormValues["hops"][0]>[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Hop variety" },
  { name: "alphaAcid", label: "Alpha Acid (%)", type: "number", placeholder: "0" },
  { name: "amount", label: "Amount (oz)", type: "number", placeholder: "0" },
  { name: "type", label: "Type", type: "select", options: Object.values(HopType) },
  { name: "boilTime", label: "Boil Time (min)", type: "number", placeholder: "0" },
  { name: "use", label: "Use", type: "select", options: Object.values(StepAdded) },
];

/* =======================
   INGREDIENTS
======================= */

export const ingredientFields: Field<RecipeFormValues["ingredients"][0]>[] = [
  { name: "type", label: "Type", type: "select", options: Object.values(IngredientType) },
  { name: "name", label: "Name", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "units", label: "Units", type: "text" },
  { name: "stepAdded", label: "Step Added", type: "select", options: Object.values(StepAdded) },
  { name: "timeAdded", label: "Time Added", type: "text" },
];