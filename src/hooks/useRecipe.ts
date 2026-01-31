import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

// Custom hook to use the recipe context
export function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}