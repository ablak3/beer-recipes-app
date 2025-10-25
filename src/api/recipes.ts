import api from './axios';
import { Recipe, Comment, Ingredient } from '../types';

export const getAllRecipes = () => api.get<Recipe[]>('/recipes');
export const getRecipeById = (id: string) => api.get<Recipe>(`/recipes/${id}`);
export const createRecipe = (data: Recipe) => api.post('/recipes', data);
export const updateRecipe = (id: string, data: Recipe) => api.put(`/recipes/${id}`, data);
export const deleteRecipe = (id: string) => api.delete(`/recipes/${id}`);
export const addComment = (id: string, data: Comment) => api.post(`/recipes/${id}/comment`, data);
export const addIngredient = (id: string, data: Ingredient) => api.post(`/recipes/${id}/ingredient`, data);
export const getUserRecipes = (username: string) => api.get<Recipe[]>(`/users/${username}/recipes`);
