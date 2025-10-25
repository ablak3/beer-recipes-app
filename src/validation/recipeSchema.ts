import * as yup from 'yup';
import { IngredientType } from '../types';

/**
 * Ingredient Schema
 */
export const ingredientSchema = yup.object({
  id: yup.string().required().nullable(),
  type: yup.mixed<IngredientType>()
    .oneOf(Object.values(IngredientType))
    .required("Ingredient type is required"),
  name: yup.string().required("Ingredient name is required"),
  amount: yup
    .number()
    .required("Ingredient amount is required"),
  units: yup.string().required("Ingredient units are required"),
});

/**
 * Comment Schema
 */
export const commentSchema = yup.object({
  id: yup.string().required().nullable(),
  user: yup.string().required("User is required"),
  content: yup.string().required("Comment content is required"),
});

/**
 * Recipe Schema
 */
export const recipeSchema = yup.object({
  id: yup.string().required().nullable(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  ingredients: yup.array().of(ingredientSchema)
    .default([])
    .min(1, "At least one ingredient is required")
    .required("Ingredients are required"),
  instructions: yup.string().required("Instructions are required"),
  author: yup.string().required(),
  comments: yup.array().of(commentSchema).default([]),
});

/**
 * TypeScript types inferred directly from schema
 */
export type RecipeFormValues = yup.InferType<typeof recipeSchema>;