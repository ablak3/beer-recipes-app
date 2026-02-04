export interface Recipe {
  id: string | null;
  title: string;
  description: string;
  grainBill: Grain[];
  hops: Hop[];
  brewInABagSettings: BrewInABagSettings;
  brewInABagResults: BrewInABagResults;
  waterChemistryInputs: WaterChemistryInputs;
  waterChemistryResults: WaterChemistryResults;
  waterAdjustments: WaterAdjustments;
  abvInputs: ABVInputs;
  abvResults: ABVResults;
  ibuResults: IBUResults;
  ingredients: Ingredient[];
  instructions: string;
  author: string;
  comments: Comment[];
}

export enum Unit {
  Pounds = "Pounds",
  Kilograms = "Kilograms",
  Fahrenheit = "Fahrenheit",
  Celsius = "Celsius",
  Hours = "Hours",
  Minutes = "Minutes",
  Gallons = "Gallons",
  Liters = "Liters",
  Milliliters = "Milliliters",
  PartsPerMillion = "PartsPerMillion",
}

export interface BrewInABagSettings {
  id: string | null;
  grainBillUnit: Unit;
  tempUnit: Unit;
  timeUnit: Unit;
  liquidUnit: Unit;
  grainTemp: number;
  batchSize: number;
  mashTemp: number;
  boilTime: number;
  kettleSize: number;
  trub: number;
  boilOffRate: number;
  grainAbsorptionRate: number;
}

export interface BrewInABagResults {
  totalWaterNeeded: number;
  strikeWaterTemp: number;
  totalMashVolume: number;
  preBoilWort: number;
  postBoilWort: number;
  intoFermenter: number;
}

export interface Grain {
  type: string;
  name: string;
  weight: number;
  lovibond: number;
}

export interface startingWaterProfile {
  // Starting water profile (ppm)
  startingCalcium: number;
  startingMagnesium: number;
  startingSodium: number;
  startingChloride: number;
  startingSulfate: number;
  startingBicarbonate: number;
}

export interface waterVolumes {
  // Water volumes (gallons)
  mashWaterVolume: number;
  spargeWaterVolume: number;
  percentDistilledRO: number;
}

export interface WaterChemistryInputs {
  startingWaterProfile: startingWaterProfile;
  waterVolumes: waterVolumes;
  lacticAcidML: number;
}

export interface WaterAdjustments {
  id: string | null;
  solidUnit: Unit;
  liquidUnit: Unit;
  gypsum: number;
  calciumChloride: number;
  epsomSalt: number;
  slakedLime: number;
  BakingSoda: number;
  chalk: number;
  lacticAcid: number;
}

export interface WaterChemistryResults {
  totalCalcium: number;
  totalMagnesium: number;
  totalSodium: number;
  totalChloride: number;
  totalSulfate: number;
  totalBicarbonate: number;
  
  // Ratios and pH
  chlorideSulfateRatio: number;
  residualAlkalinity: number;
  estimatedMashPH: number;
  
  // Warnings
  warnings: string[];
}

export enum IngredientType {
  Hop = "Hop",
  Salt = "Salt",
  Water = "Water",
  Grain = "Grain",
  Malt = "Malt",
  Other = "Other",
}

export enum StepAdded {
  PreBoil = "PreBoil",
  FirstWort = "FirstWort",
  Boil = "Boil",
  Fermentation = "Fermentation",
}

// ABV Calculation
export interface ABVInputs {
  originalGravity: number;
  finalGravity: number;
  mashEfficiency: number;
}

export interface ABVResults {
  abv: number;
  calories: number;
  attenuation: number;
}

// IBU Calculation
export enum HopType {
  Pellet = "Pellet",
  Whole = "Whole",
  Plugin = "Plugin",
}

export interface Hop {
  id: string | null;
  name: string;
  alphaAcid: number; // percentage
  amount: number; // ounces
  type: HopType;
  boilTime: number; // minutes
  use: StepAdded;
}

export interface IBUResults {
  totalIBU: number;
  hopContributions: Array<{
    hopName: string;
    ibu: number;
  }>;
}

export interface Ingredient {
  id: string | null;
  type: IngredientType;
  name: string;
  amount: number;
  units: string;
  stepAdded: StepAdded;
  timeAdded: string;
}

export interface Comment {
  id: string | null;
  user: string;
  content: string;
}

export interface JwtPayload {
  username: string;
  exp: number;
  iat?: number;
  roles?: string[];
}

export interface Credentials {
    username: string;
    password: string;
}
