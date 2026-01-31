import React, { createContext, useState, useCallback } from 'react';
import { Recipe, Grain, Ingredient, WaterChemistryInputs, WaterChemistryResults } from '../types';
import { defaultRecipeValues, defaultWaterChemistryInputs } from '../constants/defaultRecipeValues';

interface RecipeContextType {
  recipe: Recipe;
  
  // Basic Info
  updateBasicInfo: (field: 'title' | 'description' | 'instructions', value: string) => void;
  
  // BIAB Settings
  updateBiabSetting: (field: keyof Recipe['brewInABagSettings'], value: any) => void;
  updateBiabResults: (results: Recipe['brewInABagResults']) => void;
  
  // Water Chemistry
  waterChemistryInputs: WaterChemistryInputs;
  updateWaterChemistryInput: (field: keyof WaterChemistryInputs, value: any) => void;
  updateWaterChemistryResults: (results: WaterChemistryResults) => void;
  
  // Grains
  addGrain: (grain: Grain) => void;
  updateGrain: (index: number, grain: Grain) => void;
  removeGrain: (index: number) => void;
  
  // Ingredients
  addIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (index: number, ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  
  // Water Additions
  updateWaterAddition: (field: keyof Recipe['waterAdditions'], value: number) => void;
  
  // Reset
  resetRecipe: () => void;
  loadRecipe: (recipe: Recipe) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipeValues);
  const [waterChemistryInputs, setWaterChemistryInputs] = useState<WaterChemistryInputs>(defaultWaterChemistryInputs);

  // Basic Info
  const updateBasicInfo = useCallback((field: 'title' | 'description' | 'instructions', value: string) => {
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

  // Water Chemistry Inputs
  const updateWaterChemistryInput = useCallback((field: keyof WaterChemistryInputs, value: any) => {
    setWaterChemistryInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateWaterChemistryResults = useCallback((results: WaterChemistryResults) => {
    // Map water chemistry results to recipe water profiles
    setRecipe(prev => ({
      ...prev,
      beforeWaterProfile: {
        id: prev.beforeWaterProfile.id,
        solidUnit: prev.beforeWaterProfile.solidUnit,
        calcium: waterChemistryInputs.startingCalcium,
        magnesium: waterChemistryInputs.startingMagnesium,
        sodium: waterChemistryInputs.startingSodium,
        chloride: waterChemistryInputs.startingChloride,
        sulfate: waterChemistryInputs.startingSulfate,
        alkalinity: waterChemistryInputs.startingBicarbonate,
      },
      afterWaterProfile: {
        id: prev.afterWaterProfile.id,
        solidUnit: prev.afterWaterProfile.solidUnit,
        calcium: results.totalCalcium,
        magnesium: results.totalMagnesium,
        sodium: results.totalSodium,
        chloride: results.totalChloride,
        sulfate: results.totalSulfate,
      }
    }));
  }, [waterChemistryInputs]);

  // Grains
  const addGrain = useCallback((grain: Grain) => {
    setRecipe(prev => ({
      ...prev,
      grains: [...prev.grains, grain]
    }));
    setWaterChemistryInputs(prev => ({
      ...prev,
      grainBill: [...prev.grainBill, grain]
    }));
  }, []);

  const updateGrain = useCallback((index: number, grain: Grain) => {
    setRecipe(prev => ({
      ...prev,
      grains: prev.grains.map((g, i) => i === index ? grain : g)
    }));
    setWaterChemistryInputs(prev => ({
      ...prev,
      grainBill: prev.grainBill.map((g, i) => i === index ? grain : g)
    }));
  }, []);

  const removeGrain = useCallback((index: number) => {
    setRecipe(prev => ({
      ...prev,
      grains: prev.grains.filter((_, i) => i !== index)
    }));
    setWaterChemistryInputs(prev => ({
      ...prev,
      grainBill: prev.grainBill.filter((_, i) => i !== index)
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

  // Water Additions
  const updateWaterAddition = useCallback((field: keyof Recipe['waterAdditions'], value: number) => {
    setRecipe(prev => ({
      ...prev,
      waterAdditions: {
        ...prev.waterAdditions,
        [field]: value
      }
    }));
    
    // Also update water chemistry inputs
    const fieldMap: Record<string, keyof WaterChemistryInputs> = {
      gypsum: 'mashGypsumCaSO4',
      calciumChloride: 'mashCalciumChlorideCaCl2',
      epsomSalt: 'mashEpsomSaltMgSO4',
      bakingSoda: 'mashBakingSodaNaHCO3',
      chalk: 'mashChalkCaCO3',
      lacticAcid: 'lacticAcidML',
    };
    
    if (fieldMap[field]) {
      setWaterChemistryInputs(prev => ({
        ...prev,
        [fieldMap[field]]: value
      }));
    }
  }, []);

  // Reset & Load
  const resetRecipe = useCallback(() => {
    setRecipe(defaultRecipeValues);
    setWaterChemistryInputs(defaultWaterChemistryInputs);
  }, []);

  const loadRecipe = useCallback((newRecipe: Recipe) => {
    setRecipe(newRecipe);
    // Sync water chemistry inputs from loaded recipe
    setWaterChemistryInputs({
      startingCalcium: newRecipe.beforeWaterProfile.calcium,
      startingMagnesium: newRecipe.beforeWaterProfile.magnesium,
      startingSodium: newRecipe.beforeWaterProfile.sodium,
      startingChloride: newRecipe.beforeWaterProfile.chloride,
      startingSulfate: newRecipe.beforeWaterProfile.sulfate,
      startingBicarbonate: newRecipe.beforeWaterProfile.alkalinity,
      mashWaterVolume: 0, // You'll need to add these to Recipe type if needed
      spargeWaterVolume: 0,
      grainBill: newRecipe.grains,
      mashGypsumCaSO4: newRecipe.waterAdditions.gypsum,
      mashCalciumChlorideCaCl2: newRecipe.waterAdditions.calciumChloride,
      mashEpsomSaltMgSO4: newRecipe.waterAdditions.epsomSalt,
      mashTableSaltNaCl: 0,
      mashBakingSodaNaHCO3: newRecipe.waterAdditions.BakingSoda,
      mashChalkCaCO3: newRecipe.waterAdditions.chalk,
      spargeGypsumCaSO4: 0,
      spargeCalciumChlorideCaCl2: 0,
      spargeEpsomSaltMgSO4: 0,
      spargeTableSaltNaCl: 0,
      spargeBakingSodaNaHCO3: 0,
      spargeChalkCaCO3: 0,
      lacticAcidML: newRecipe.waterAdditions.lacticAcid,
      roPercentage: 0,
    });
  }, []);

  const value: RecipeContextType = {
    recipe,
    updateBasicInfo,
    updateBiabSetting,
    updateBiabResults,
    waterChemistryInputs,
    updateWaterChemistryInput,
    updateWaterChemistryResults,
    addGrain,
    updateGrain,
    removeGrain,
    addIngredient,
    updateIngredient,
    removeIngredient,
    updateWaterAddition,
    resetRecipe,
    loadRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}