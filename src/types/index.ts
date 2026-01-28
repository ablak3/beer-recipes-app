export interface Recipe {
  id: string | null;
  title: string;
  description: string;
  brewInABagSettings: BrewInABagSettings;
  brewInABagResults: BrewInABagResults;
  beforeWaterProfile: BeforeWaterProfile;
  afterWaterProfile: AfterWaterProfile;
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
