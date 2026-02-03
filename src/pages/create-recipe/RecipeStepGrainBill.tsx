import { Stack } from "@mui/material";
import Section from "../../components/Section";
import GrainBillSection from "../../components/water-chemistry/GrainBillSection";

export default function RecipeStepBrew() {
  
  return (
    <Stack spacing={6}>
      <Section title="Grain Bill">
        <GrainBillSection />
      </Section>
    </Stack>
  );
}
