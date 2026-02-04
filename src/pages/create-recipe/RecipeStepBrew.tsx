import Section from "../../components/Section";
import BrewSettingsSection from "../../components/brew-step/BrewSettingsSection";
import BrewResultsSection from "../../components/brew-step/BrewResultsSection";
import { brewInABagFields } from "../../constants/defaultFieldNames";
import PageSection from "../../components/PageSection";

export default function RecipeStepBrew() {
  return (
    <PageSection title="Brew-In-A-Bag Settings">
      <Section title="BIAB Inputs">
        <BrewSettingsSection fields={brewInABagFields} />
      </Section>
      <Section title="BIAB Calculations">
        <BrewResultsSection />
      </Section>
    </PageSection>
  );
}
