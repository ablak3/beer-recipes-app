import PageSection from "../../components/PageSection";
import RecipeSummaryView from "../../components/recipe-summary/RecipeSummaryView";
import { useRecipe } from "../../hooks/useRecipe";

export default function RecipeStepSummary() {
  const { recipe } = useRecipe();

  return (
    <PageSection title="Review & Submit">
      <RecipeSummaryView recipe={recipe} />
    </PageSection>
  );
}
