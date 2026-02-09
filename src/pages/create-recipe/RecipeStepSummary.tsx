// src/pages/recipe-steps/RecipeStepSummary.tsx
import PageSection from "../../components/PageSection";
import { useRecipe } from "../../hooks/useRecipe";
import RecipeSummarySections from "../../components/recipe-summary/RecipeSummarySections";

export default function RecipeStepSummary() {
  const { recipe } = useRecipe();

  return (
    <PageSection title="Review & Save">
      <RecipeSummarySections recipe={recipe} editable />
    </PageSection>
  );
}
