import IngredientsSection from "../../components/ingredients/IngredientsSection";
import PageSection from "../../components/PageSection";
import Section from "../../components/Section";

export default function RecipeStepIngredients() {
  return (
    <PageSection title="Misc Ingredients">
      <Section>
        <IngredientsSection />
      </Section>
    </PageSection>
  );
}