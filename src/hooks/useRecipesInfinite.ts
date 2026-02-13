import { Recipe, Page } from "../types";
import { getAllRecipes, getUserRecipes } from "../api/recipes";
import { useInfinitePage } from "./useInfinitePage";
import { useCallback } from "react";

type Mode = "mine" | "all";

type UseRecipesInfiniteOptions = {
  mode: Mode;
  initialSize?: number;
  initialSort?: string;
};

export const useRecipesInfinite = ({
  mode,
  initialSize = 10,
  initialSort = "createdDate,desc",
}: UseRecipesInfiniteOptions) => {
  const fetcher = useCallback(
  async (page: number, size: number, sort: string): Promise<Page<Recipe>> => {
    const res = mode === "mine"
      ? await getUserRecipes(page, size, sort)
      : await getAllRecipes(page, size, sort);
    return res.data as Page<Recipe>;
  },
  [mode]
);

  return useInfinitePage<Recipe>(fetcher, {
    initialSize,
    initialSort,
  });
};
