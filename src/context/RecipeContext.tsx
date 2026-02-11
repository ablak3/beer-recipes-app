import React, { createContext, useState, useCallback } from 'react';
import { Recipe, Grain, Ingredient, WaterChemistryResults, ABVInputs, ABVResults, IBUResults, Hop } from '../types';
import { defaultRecipeValues } from '../constants/defaultRecipeValues';
import { setByPath } from "../utils/pathHelpers";

interface RecipeContextType {
  recipe: Recipe;
  
  // Basic Info
  updateBasicInfo: (field: 'title' | 'description' | 'instructions' | 'author', value: string) => void;
  
  // BIAB Settings
  updateBiabSetting: (field: keyof Recipe['brewInABagSettings'], value: any) => void;
  updateBiabResults: (results: Recipe['brewInABagResults']) => void;
  
  // Water Chemistry
  updateWaterChemistryInput: (path: string, value: any) => void;
  updateWaterChemistryResults: (results: WaterChemistryResults) => void;
  updateWaterAdjustments: (field: keyof Recipe['waterAdjustments'], value: number) => void;
  
  // Grains
  addGrain: (grain: Grain) => void;
  updateGrain: (index: number, grain: Grain) => void;
  removeGrain: (index: number) => void;
  
  // Hops
  addHop: (hop: Hop) => void;
  updateHop: (index: number, hop: Hop) => void;
  removeHop: (index: number) => void;
  
  // Ingredients
  addIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (index: number, ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  
  // ABV
  updateABVInput: (field: keyof ABVInputs, value: number) => void;
  updateABVResults: (results: ABVResults) => void;
  
  // IBU
  updateIBUResults: (results: IBUResults) => void;
  
  // Reset & Load
  resetRecipe: () => void;
  loadRecipe: (recipe: Recipe) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({
  children,
  initialRecipe,
}: {
  children: React.ReactNode;
  initialRecipe?: Recipe;
}) {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe ?? defaultRecipeValues);

  // Basic Info
  const updateBasicInfo = useCallback((field: 'title' | 'description' | 'instructions' | 'author', value: string) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  }, []);

  // BIAB Settings
  const updateBiabSetting = useCallback((field: keyof Recipe['brewInABagSettings'], value: any) => {
    setRecipe(prev => ({
      ...prev,
      brewInABagSettings: {
        ...prev.brewInABagSettings,
        [field]: value
      }
    }));
  }, []);

  const updateBiabResults = useCallback((results: Recipe['brewInABagResults']) => {
    setRecipe(prev => ({
      ...prev,
      brewInABagResults: results
    }));
  }, []);

  // Water Chemistry Inputs - handles nested paths
  const updateWaterChemistryInput = useCallback((path: string, value: any) => {
    console.log("updateWaterChemistryInput called", path, value);
    setRecipe(prev => {
      const next = setByPath(prev, path, value);
      console.log("updated?", prev === next, path, value);
      return next;
    });
  }, []);

  const updateWaterChemistryResults = useCallback((results: WaterChemistryResults) => {
    setRecipe(prev => ({
      ...prev,
      waterChemistryResults: results
    }));
  }, []);

  // Grains
  const addGrain = useCallback((grain: Grain) => {
    setRecipe(prev => ({
      ...prev,
      grainBill: [...prev.grainBill, grain]
    }));
  }, []);

  const updateGrain = useCallback((index: number, grain: Grain) => {
    setRecipe(prev => ({
      ...prev,
      grainBill: prev.grainBill.map((g, i) => i === index ? grain : g)
    }));
  }, []);

  const removeGrain = useCallback((index: number) => {
    setRecipe(prev => ({
      ...prev,
      grainBill: prev.grainBill.filter((_, i) => i !== index)
    }));
  }, []);

  // Hops
  const addHop = useCallback((hop: Hop) => {
    setRecipe(prev => ({
      ...prev,
      hops: [...prev.hops, hop]
    }));
  }, []);

  const updateHop = useCallback((index: number, hop: Hop) => {
    setRecipe(prev => ({
      ...prev,
      hops: prev.hops.map((h, i) => i === index ? hop : h)
    }));
  }, []);

  const removeHop = useCallback((index: number) => {
    setRecipe(prev => ({
      ...prev,
      hops: prev.hops.filter((_, i) => i !== index)
    }));
  }, []);

  // Ingredients
  const addIngredient = useCallback((ingredient: Ingredient) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient]
    }));
  }, []);

  const updateIngredient = useCallback((index: number, ingredient: Ingredient) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? ingredient : ing)
    }));
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  }, []);

  // Water Adjustments
  const updateWaterAdjustments = useCallback((field: keyof Recipe['waterAdjustments'], value: number) => {
    setRecipe(prev => ({
      ...prev,
      waterAdjustments: {
        ...prev.waterAdjustments,
        [field]: value
      }
    }));
  }, []);

  // ABV
  const updateABVInput = useCallback((field: keyof ABVInputs, value: number) => {
    setRecipe(prev => ({
      ...prev,
      abvInputs: {
        ...prev.abvInputs,
        [field]: value
      }
    }));
  }, []);

  const updateABVResults = useCallback((results: ABVResults) => {
    setRecipe(prev => ({
      ...prev,
      abvResults: results
    }));
  }, []);

  // IBU
  const updateIBUResults = useCallback((results: IBUResults) => {
    setRecipe(prev => ({
      ...prev,
      ibuResults: results
    }));
  }, []);

  // Reset & Load
  const resetRecipe = useCallback(() => {
    setRecipe(defaultRecipeValues);
  }, []);

  const loadRecipe = useCallback((newRecipe: Recipe) => {
    setRecipe(newRecipe);
  }, []);

  const value: RecipeContextType = {
    recipe,
    updateBasicInfo,
    updateBiabSetting,
    updateBiabResults,
    updateWaterChemistryInput,
    updateWaterChemistryResults,
    addGrain,
    updateGrain,
    removeGrain,
    addHop,
    updateHop,
    removeHop,
    addIngredient,
    updateIngredient,
    removeIngredient,
    updateWaterAdjustments,
    updateABVInput,
    updateABVResults,
    updateIBUResults,
    resetRecipe,
    loadRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}