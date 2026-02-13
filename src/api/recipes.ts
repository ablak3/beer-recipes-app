import api from './axios';
import { Recipe, Comment, Ingredient, Page } from '../types';

/**
 * Get ONLY logged-in user's recipes (uses JWT on backend)
 */
export const getUserRecipes = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdDate,desc'
) =>
  api.get<Page<Recipe>>(
    `/recipes?page=${page}&size=${size}&sort=${sort}`
  );

/**
 * get ALL recipes
 */
export const getAllRecipes = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdDate,desc'
) =>
  api.get<Page<Recipe>>(
    `/recipes/all?page=${page}&size=${size}&sort=${sort}`
  );

/**
 * Get single recipe
 */
export const getRecipeById = (id: string) =>
  api.get<Recipe>(`/recipes/${id}`);

export const createRecipe = (data: Recipe) =>
  api.post('/recipes', data);

export const updateRecipe = (id: string, data: Recipe) =>
  api.put(`/recipes/${id}`, data);

export const deleteRecipe = (id: string) =>
  api.delete(`/recipes/${id}`);

export const addComment = (id: string, data: Comment) =>
  api.post(`/recipes/${id}/comment`, data);

export const addIngredient = (id: string, data: Ingredient) =>
  api.post(`/recipes/${id}/ingredient`, data);
