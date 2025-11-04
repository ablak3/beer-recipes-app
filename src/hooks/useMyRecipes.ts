import { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { getUserRecipes } from '../api/recipes';
import { useAuth } from "../hooks/useAuth";

export const useMyRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
  
    useEffect(() => {
        console.log('useMyRecipes Rendered');
      if (!user) return; // no user, skip
  
      const fetchUserRecipes = async () => {
        try {
          setLoading(true);
          const response = await getUserRecipes(user);
          setRecipes(response.data);
        } catch (err) {
          console.error("Failed to fetch user recipes:", err);
          setError("Failed to fetch user recipes.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserRecipes();
    }, [user]);

  return { recipes, loading, error };
};
