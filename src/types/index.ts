export interface Recipe {
  id: string | null | undefined;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  author: string;
  comments: Comment[];
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
