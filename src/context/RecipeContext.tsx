import React, { createContext, useState, useCallback } from 'react';
import { Recipe, Grain, Ingredient, WaterChemistryResults } from '../types';
import { defaultRecipeValues } from '../constants/defaultRecipeValues';

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
  getGrainBill: () => Grain[];
  getGrainBillWeight: () => number;

  
  // Ingredients
  addIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (index: number, ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  
  // Reset & Load
  resetRecipe: () => void;
  loadRecipe: (recipe: Recipe) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipeValues);

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
    setRecipe(prev => {
      const newInputs = { ...prev.waterChemistryInputs };
      
      // Handle nested paths like "startingWaterProfile.startingCalcium"
      const parts = path.split('.');
      if (parts.length === 2) {
        const [parent, field] = parts;
        if (parent === 'startingWaterProfile') {
          newInputs.startingWaterProfile = {
            ...newInputs.startingWaterProfile,
            [field]: value
          };
        } else if (parent === 'waterVolumes') {
          newInputs.waterVolumes = {
            ...newInputs.waterVolumes,
            [field]: value
          };
        }
      } else {
        // Direct field like "lacticAcidML" or "grainBill"
        (newInputs as any)[path] = value;
      }
      
      return { ...prev, waterChemistryInputs: newInputs };
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
      }
    ));
  }, []);

  const updateGrain = useCallback((index: number, grain: Grain) => {
    setRecipe(prev => ({
      ...prev,
      grainBill: prev.grainBill.map((g, i) => i === index ? grain : g)
      }
    ));
  }, []);

  const removeGrain = useCallback((index: number) => {
    setRecipe(prev => ({
      ...prev,
      grainBill: prev.grainBill.filter((_, i) => i !== index)
    }));
  }, []);

  const getGrainBill = useCallback(() => {
    return recipe.grainBill
  }, [recipe.grainBill]);

  const getGrainBillWeight = useCallback(() => {
    return recipe.grainBill.reduce(
      (total, grain) => total + (grain.weight || 0),
      0
    );
  }, [recipe.grainBill]);


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

  // Water Additions
  const updateWaterAdjustments = useCallback((field: keyof Recipe['waterAdjustments'], value: number) => {
    setRecipe(prev => ({
      ...prev,
      waterAdditions: {
        ...prev.waterAdjustments,
        [field]: value
      }
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
    getGrainBill,
    getGrainBillWeight,
    addIngredient,
    updateIngredient,
    removeIngredient,
    updateWaterAdjustments,
    resetRecipe,
    loadRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}