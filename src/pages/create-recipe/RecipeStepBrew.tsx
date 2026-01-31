import { Stack, Grid, TextField, MenuItem } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import BiabResults from "../../components/brew-step/BiabResults";
import Section from "../../components/Section";
import { Unit } from "../../types";

export default function RecipeStepBrew() {
  const { recipe, updateBiabSetting } = useRecipe();
  const biabSettings = recipe.brewInABagSettings;

  return (
    <Stack spacing={6}>
      <Section title="Brew-In-A-Bag Settings">
        {/* Unit Selectors */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            select
            label="Grain Bill Unit"
            fullWidth
            value={biabSettings.grainBillUnit}
            onChange={(e) => updateBiabSetting('grainBillUnit', e.target.value as Unit)}
          >
            <MenuItem value={Unit.Pounds}>Pounds</MenuItem>
            <MenuItem value={Unit.Kilograms}>Kilograms</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            select
            label="Temperature Unit"
            fullWidth
            value={biabSettings.tempUnit}
            onChange={(e) => updateBiabSetting('tempUnit', e.target.value as Unit)}
          >
            <MenuItem value={Unit.Fahrenheit}>Fahrenheit</MenuItem>
            <MenuItem value={Unit.Celsius}>Celsius</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            select
            label="Time Unit"
            fullWidth
            value={biabSettings.timeUnit}
            onChange={(e) => updateBiabSetting('timeUnit', e.target.value as Unit)}
          >
            <MenuItem value={Unit.Minutes}>Minutes</MenuItem>
            <MenuItem value={Unit.Hours}>Hours</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            select
            label="Liquid Unit"
            fullWidth
            value={biabSettings.liquidUnit}
            onChange={(e) => updateBiabSetting('liquidUnit', e.target.value as Unit)}
          >
            <MenuItem value={Unit.Gallons}>Gallons</MenuItem>
            <MenuItem value={Unit.Liters}>Liters</MenuItem>
          </TextField>
        </Grid>

        {/* Numeric Inputs */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Grain Bill"
            type="number"
            fullWidth
            value={biabSettings.grainBill}
            onChange={(e) => updateBiabSetting('grainBill', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Grain Temperature"
            type="number"
            fullWidth
            value={biabSettings.grainTemp}
            onChange={(e) => updateBiabSetting('grainTemp', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Batch Size"
            type="number"
            fullWidth
            value={biabSettings.batchSize}
            onChange={(e) => updateBiabSetting('batchSize', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Mash Temperature"
            type="number"
            fullWidth
            value={biabSettings.mashTemp}
            onChange={(e) => updateBiabSetting('mashTemp', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Boil Time"
            type="number"
            fullWidth
            value={biabSettings.boilTime}
            onChange={(e) => updateBiabSetting('boilTime', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Kettle Size"
            type="number"
            fullWidth
            value={biabSettings.kettleSize}
            onChange={(e) => updateBiabSetting('kettleSize', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Trub"
            type="number"
            fullWidth
            value={biabSettings.trub}
            onChange={(e) => updateBiabSetting('trub', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Boil Off Rate"
            type="number"
            fullWidth
            value={biabSettings.boilOffRate}
            onChange={(e) => updateBiabSetting('boilOffRate', parseFloat(e.target.value) || 0)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Grain Absorption Rate"
            type="number"
            fullWidth
            value={biabSettings.grainAbsorptionRate}
            onChange={(e) => updateBiabSetting('grainAbsorptionRate', parseFloat(e.target.value) || 0)}
          />
        </Grid>
      </Section>

      <Section title="Brew-In-A-Bag Calculations">
        <BiabResults biabValues={biabSettings} />
      </Section>
    </Stack>
  );
}