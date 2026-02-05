import { useEffect } from "react";
import { useRecipe } from "../../hooks/useRecipe";
import { useIBUCalculator } from "../../hooks/useIBUCalculator";
import PageSection from "../../components/PageSection";
import Section from "../../components/Section";
import HopsSection from "../../components/hops/HopsSection";
import IBUInfoAlert from "../../components/ibu/IBUInfoAlert";
import IBUResultsSection from "../../components/ibu/IBUResultsSection";
import HopContributionsSection from "../../components/ibu/HopContributionsSection";
import IBUStyleGuideSection from "../../components/ibu/IBUStyleGuideSection";

export default function RecipeStepIBU() {
  const { recipe, updateIBUResults } = useRecipe();

  const hops = recipe.hops;
  const batchSize = recipe.brewInABagSettings.batchSize;
  const boilGravity = recipe.abvInputs.originalGravity;

  const results = useIBUCalculator(hops, batchSize, boilGravity);

  useEffect(() => {
    updateIBUResults(results);
  }, [results, updateIBUResults]);

  const hasHops = hops.length > 0 && hops.some((h) => h.name && h.amount > 0);

  return (
    <PageSection title="IBU Calculator">
      <IBUInfoAlert batchSize={batchSize} boilGravity={boilGravity} />

      <Section title="Hop Schedule">
        <HopsSection />
      </Section>

      {hasHops && (
        <>
          <IBUResultsSection
            totalIBU={results.totalIBU}
            batchSize={batchSize}
            boilGravity={boilGravity}
          />

          <HopContributionsSection contributions={results.hopContributions} />
        </>
      )}

      <IBUStyleGuideSection />
    </PageSection>
  );
}
