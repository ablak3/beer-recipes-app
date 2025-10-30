export interface Recipe {
  id: string | null | undefined;
  title: string;
  description: string;
  brewInABagSettings: BrewInABagSettings;
  brewInABagResults: BrewInABagResults;
  ingredients: Ingredient[];
  instructions: string;
  author: string;
  comments: Comment[];
}

export enum GrainBillUnit {
  Pounds = "Pounds",
  Kilograms = "Kilograms",
}

export enum TempUnit {
  Fahrenheit = "Fahrenheit",
  Celsius = "Celsius",
}

export enum TimeUnit {
  Hours = "Hours",
  Minutes = "Minutes",
}

export enum LiquidUnit {
  Gallons = "Gallons",
  Liters = "Liters",
}

export interface BrewInABagSettings {
  id: string | null | undefined;
  grainBillUnit: GrainBillUnit;
  tempUnit: TempUnit;
  timeUnit: TimeUnit;
  liquidUnit: LiquidUnit;
  grainBill: number;
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

export interface Ingredient {
  id: string | null | undefined;
  type: IngredientType;
  name: string;
  amount: number;
  units: string;
}

export interface Comment {
  id: string | null | undefined;
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
