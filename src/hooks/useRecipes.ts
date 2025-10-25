import { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { getAllRecipes } from '../api/recipes';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRecipes().then(res => {
      setRecipes(res.data);
      setLoading(false);
    });
  }, []);

  return { recipes, loading };
};
