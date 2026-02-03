import { Grid } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import BrewSettingRow from "./BrewSettingRow";

const BREW_FIELDS = [
  { key: "grainBillUnit", label: "Grain Bill Unit", type: "unit" },
  { key: "tempUnit", label: "Temperature Unit", type: "unit" },
  { key: "timeUnit", label: "Time Unit", type: "unit" },
  { key: "liquidUnit", label: "Liquid Unit", type: "unit" },

  { key: "grainBill", label: "Grain Bill", type: "number" },
  { key: "grainTemp", label: "Grain Temperature", type: "number" },
  { key: "batchSize", label: "Batch Size", type: "number" },
  { key: "mashTemp", label: "Mash Temperature", type: "number" },
  { key: "boilTime", label: "Boil Time", type: "number" },
  { key: "kettleSize", label: "Kettle Size", type: "number" },
  { key: "trub", label: "Trub", type: "number" },
  { key: "boilOffRate", label: "Boil Off Rate", type: "number" },
  { key: "grainAbsorptionRate", label: "Grain Absorption Rate", type: "number" },
] as const;

export default function BrewSettingsSection() {
  const { recipe, updateBiabSetting, getGrainBillWeight } = useRecipe();
  const settings = recipe.brewInABagSettings;

  return (
    <Grid container spacing={3}>
      {BREW_FIELDS.map((field) => {
        const isGrainBill = field.key === "grainBill";

        return (
          <BrewSettingRow
            key={field.key}
            field={field}
            value={isGrainBill ? getGrainBillWeight() : settings[field.key]}
            disabled={isGrainBill}
            onChange={
              isGrainBill
                ? undefined
                : (value) => updateBiabSetting(field.key, value)
            }
          />
        );
      })}
    </Grid>
  );
}
