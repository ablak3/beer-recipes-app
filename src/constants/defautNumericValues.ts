import { RecipeFormValues } from "../validation/recipeSchema";
import { Unit } from "../types";

export type Field<T> = {
  name: keyof T;
  label: string;
  options?: Unit[];
};

/* =======================
   BREW IN A BAG
======================= */

export const brewInABagNumericFields: Field<
  RecipeFormValues["brewInABagSettings"]
>[] = [
  { name: "grainTemp", label: "Grain Temperature" },
  { name: "batchSize", label: "Batch Size" },
  { name: "mashTemp", label: "Mash Temp" },
  { name: "boilTime", label: "Boil Time" },
  { name: "kettleSize", label: "Kettle Size" },
  { name: "trub", label: "Trub" },
  { name: "boilOffRate", label: "Boil Off Rate" },
  { name: "grainAbsorptionRate", label: "Grain Absorption Rate" },
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

export const startingWaterChemistryNumericFields: Field<
  RecipeFormValues["waterChemistryInputs"]["startingWaterProfile"]
>[] = [
  { name: "startingCalcium", label: "Calcium (Ca)" },
  { name: "startingMagnesium", label: "Magnesium (Mg)" },
  { name: "startingSodium", label: "Sodium (Na)" },
  { name: "startingChloride", label: "Chloride (Cl)" },
  { name: "startingSulfate", label: "Sulfate (SO₄)" },
  { name: "startingBicarbonate", label: "Bicarbonate (HCO₃)" },
];

export const waterVolumesFields: Field<
  RecipeFormValues["waterChemistryInputs"]["waterVolumes"]
>[] = [
  { name: "mashWaterVolume", label: "Mash Water Volume" },
  { name: "spargeWaterVolume", label: "Sparge Water Volume" },
  { name: "percentDistilledRO", label: "RO %" },
];

export const waterAdjustmentSaltsFields: Field<
  RecipeFormValues["waterAdjustments"]
>[] = [
  { name: "gypsum", label: "Gypsum (CaSO₄)" },
  { name: "calciumChloride", label: "Calcium Chloride (CaCl₂)" },
  { name: "epsomSalt", label: "Epsom Salt (MgSO₄)" },
  { name: "slakedLime", label: "Slaked Lime (Ca(OH)₂)" },
  { name: "BakingSoda", label: "Baking Soda (NaHCO₃)" },
  { name: "chalk", label: "Chalk (CaCO₃)" },
];

export const waterAdjustmentAcidFields: Field<
  RecipeFormValues["waterAdjustments"]
>[] = [
  { name: "lacticAcid", label: "Lactic Acid (88%)" },
];

