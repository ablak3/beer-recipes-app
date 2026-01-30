export interface Recipe {
  id: string | null;
  title: string;
  description: string;
  brewInABagSettings: BrewInABagSettings;
  brewInABagResults: BrewInABagResults;
  beforeWaterProfile: BeforeWaterProfile;
  afterWaterProfile: AfterWaterProfile;
  grains: Grain[];
  waterAdditions: WaterAdditions;
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

export interface BeforeWaterProfile {
  id: string | null;
  solidUnit:Unit;
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  alkalinity: number;
}

export interface AfterWaterProfile {
  id: string | null;
  solidUnit: Unit;
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
}

export interface WaterAdditions {
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

export interface BrewInABagSettings {
  id: string | null;
  grainBillUnit: Unit;
  tempUnit: Unit;
  timeUnit: Unit;
  liquidUnit: Unit;
  grainBill: number;
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

export interface WaterChemistryInputs {
  // Starting water profile (ppm)
  startingCalcium: number;
  startingMagnesium: number;
  startingSodium: number;
  startingChloride: number;
  startingSulfate: number;
  startingBicarbonate: number;
  
  // Water volumes (gallons)
  mashWaterVolume: number;
  spargeWaterVolume: number;
  
  // Grain bill
  grainBill: Grain[];
  
  // Salt additions to mash (grams)
  mashGypsumCaSO4: number;
  mashCalciumChlorideCaCl2: number;
  mashEpsomSaltMgSO4: number;
  mashTableSaltNaCl: number;
  mashBakingSodaNaHCO3: number;
  mashChalkCaCO3: number;
  
  // Salt additions to sparge (grams)
  spargeGypsumCaSO4: number;
  spargeCalciumChlorideCaCl2: number;
  spargeEpsomSaltMgSO4: number;
  spargeTableSaltNaCl: number;
  spargeBakingSodaNaHCO3: number;
  spargeChalkCaCO3: number;
  
  // Acid additions
  lacticAcidML: number;
  
  // RO/Distilled water percentage
  roPercentage: number;
}

export interface WaterChemistryResults {
  // Mash water profile
  mashCalcium: number;
  mashMagnesium: number;
  mashSodium: number;
  mashChloride: number;
  mashSulfate: number;
  mashBicarbonate: number;
  
  // Sparge water profile
  spargeCalcium: number;
  spargeMagnesium: number;
  spargeSodium: number;
  spargeChloride: number;
  spargeSulfate: number;
  spargeBicarbonate: number;
  
  // Combined water profile
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
