import GrainBillSection from "../../components/water-chemistry/GrainBillSection";
import PageSection from "../../components/PageSection";
import Section from "../../components/Section";

export default function RecipeStepBrew() {

  return (
    <PageSection title="Grain Bill">
      <Section>
        <GrainBillSection />
      </Section>
    </PageSection>
  );
}
