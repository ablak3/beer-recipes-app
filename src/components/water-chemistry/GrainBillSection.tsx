import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Grain, WaterChemistryInputs } from "../../types";
import EditableGridManager from "../EditableGridManager";
import { defaultGrain } from "../../constants/defaultRecipeValues";

interface GrainBillSectionProps {
  grainBill: Grain[];
  setInputs: React.Dispatch<React.SetStateAction<WaterChemistryInputs>>;
}

export default function GrainBillSection({ 
  grainBill, 
  setInputs 
}: GrainBillSectionProps) {

  // Ensure at least one grain entry exists
  React.useEffect(() => {
    if (grainBill.length === 0) {
      setInputs(prev => ({
        ...prev,
        grainBill: [ defaultGrain ]
      }));
    }
  }, [grainBill.length, setInputs]);

  // Update a specific grain field
  const updateGrain = (
    index: number,
    field: keyof Grain,
    value: string | number
  ) => {
    setInputs(prev => {
      const newGrainBill = [...prev.grainBill];
      
      if (field === "name" || field === "type") {
        newGrainBill[index] = {
          ...newGrainBill[index],
          [field]: value as string
        };
      } else {
        newGrainBill[index] = {
          ...newGrainBill[index],
          [field]: typeof value === "string" ? parseFloat(value) || 0 : value
        };
      }
      
      return { ...prev, grainBill: newGrainBill };
    });
  };

  // Add a new grain
  const handleAddGrain = () => {
    setInputs(prev => ({
      ...prev,
      grainBill: [
        ...prev.grainBill,
        defaultGrain 
      ]
    }));
  };

  // Remove a grain
  const handleRemoveGrain = (index: number) => {
    setInputs(prev => ({
      ...prev,
      grainBill: prev.grainBill.filter((_, i) => i !== index)
    }));
  };

  // Render each grain row
  const renderGrainRow = (grain: Grain, index: number) => (
    <>
      {/* Grain Type */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={grain.type}
            onChange={(e) => updateGrain(index, "type", e.target.value)}
          >
            <MenuItem value="Base Malt">Base Malt</MenuItem>
            <MenuItem value="Crystal/Caramel">Crystal/Caramel</MenuItem>
            <MenuItem value="Roasted">Roasted</MenuItem>
            <MenuItem value="Specialty">Specialty</MenuItem>
            <MenuItem value="Adjunct">Adjunct</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Grain Name */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Name"
          fullWidth
          value={grain.name}
          onChange={(e) => updateGrain(index, "name", e.target.value)}
          placeholder="Grain name"
        />
      </Grid>

      {/* Weight */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Weight (lbs)"
          fullWidth
          type="number"
          value={grain.weight || ''}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || !isNaN(Number(val))) {
              updateGrain(index, 'weight', val === '' ? 0 : val);
            }
          }}
          placeholder="0"
        />
      </Grid>

      {/* Lovibond */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <TextField
          label="Lovibond"
          fullWidth
          type="number"
          value={grain.lovibond || ''}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || !isNaN(Number(val))) {
              updateGrain(index, 'lovibond', val === '' ? 0 : val);
            }
          }}
          placeholder="0"
        />
      </Grid>
    </>
  );

  return (
    <EditableGridManager<Grain>
      items={grainBill}
      renderRow={renderGrainRow}
      onAdd={handleAddGrain}
      onRemove={handleRemoveGrain}
      emptyText="No grains added yet. Click below to add grains."
      addLabel="Add Grain"
      minItems={1}
    />
  );
}