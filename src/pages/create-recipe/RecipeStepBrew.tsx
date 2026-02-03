import { Stack } from "@mui/material";
import Section from "../../components/Section";
import BrewSettingsSection from "../../components/brew-step/BrewSettingsSection";
import BrewResultsSection from "../../components/brew-step/BrewResultsSection";

export default function RecipeStepBrew() {
  return (
    <Stack spacing={6}>
      <Section title="Brew-In-A-Bag Settings">
        <BrewSettingsSection />
      </Section>

      <Section title="Brew-In-A-Bag Calculations">
        <BrewResultsSection />
      </Section>
    </Stack>
  );
}
