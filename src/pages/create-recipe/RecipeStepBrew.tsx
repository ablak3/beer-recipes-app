import Section from "../../components/Section";
import BrewSettingsSection from "../../components/brew-step/BrewSettingsSection";
import { brewInABagFields } from "../../constants/defaultFieldNames";
import PageSection from "../../components/PageSection";
import { useMemo } from 'react';
import { useRecipe } from "../../hooks/useRecipe";
import { toPounds } from '../../utils/unitConverters';
import { Unit } from '../../types';
import { Alert } from "@mui/material";
import BiabResults from "../../components/brew-step/BiabResults";

export default function RecipeStepBrew() {
  const { recipe } = useRecipe();

  // Calculate grain bill weight in POUNDS (normalized)
  const grainBillWeight = useMemo(() => {
    return recipe.grainBill.reduce((total, grain) => {
      const raw = typeof grain.weight === "number"
        ? grain.weight
        : Number(grain.weight);

      if (!Number.isFinite(raw)) return total;

      return total + toPounds(raw, grain.unit as Unit);
    }, 0);
  }, [recipe.grainBill]);

  return (
    <PageSection title="Brew-In-A-Bag Settings">
      <Alert severity="info" sx={{ mb: 3 }}>
          The calculated grain bill weight used is {grainBillWeight} pounds
      </Alert>
      <Section title="BIAB Inputs">
        <BrewSettingsSection fields={brewInABagFields} />
      </Section>
      <Section title="BIAB Calculations">
        <BiabResults grainBillWeight={grainBillWeight}/>
      </Section>
    </PageSection>
  );
}
