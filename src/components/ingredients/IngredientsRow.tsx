import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { IngredientType, StepAdded, Ingredient } from "../../types";

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  onUpdate: (index: number, ingredient: Ingredient) => void;
}

export default function IngredientRow({
  ingredient,
  index,
  onUpdate,
}: IngredientRowProps) {
  const paperCardStyle = {
    elevation: 1,
    sx: {
      p: 2.5,
      height: "100%",
      bgcolor: "background.paper",
      transition: "all 0.2s ease",
      "&:focus-within": {
        elevation: 4,
        borderLeft: 4,
        borderColor: "primary.main",
        bgcolor: "primary.lighter",
      },
    },
  };

  const labelStyle = {
    variant: "overline" as const,
    sx: {
      fontWeight: 600,
      letterSpacing: 0.6,
      color: "text.secondary",
      mb: 0.5,
      display: "block",
    },
  };

  const inputStyle = {
    variant: "standard" as const,
    InputProps: {
      disableUnderline: false,
      sx: {
        fontSize: "1.5rem",
        fontWeight: 700,
        "& input": {
          padding: 0,
        },
      },
    },
  };

  const selectStyle = {
    disableUnderline: false,
    sx: {
      fontSize: "1.5rem",
      fontWeight: 700,
      "& .MuiSelect-select": {
        padding: 0,
      },
    },
  };

  return (
    <>
      {/* Ingredient Type */}
      <Grid size={{ xs: 12, sm: 1.75 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Type</Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={ingredient.type}
              onChange={(e) =>
                onUpdate(index, {
                  ...ingredient,
                  type: e.target.value as IngredientType,
                })
              }
              {...selectStyle}
            >
              {Object.values(IngredientType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Ingredient Name */}
      <Grid size={{ xs: 12, sm: 2.5 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Name</Typography>
          <TextField
            fullWidth
            value={ingredient.name}
            onChange={(e) =>
              onUpdate(index, {
                ...ingredient,
                name: e.target.value,
              })
            }
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Amount */}
      <Grid size={{ xs: 12, sm: 1.3 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Amount</Typography>
          <TextField
            type="number"
            fullWidth
            value={ingredient.amount}
            onChange={(e) =>
              onUpdate(index, {
                ...ingredient,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Units */}
      <Grid size={{ xs: 12, sm: 1.2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Units</Typography>
          <TextField
            fullWidth
            value={ingredient.units}
            onChange={(e) =>
              onUpdate(index, {
                ...ingredient,
                units: e.target.value,
              })
            }
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Step Added */}
      <Grid size={{ xs: 12, sm: 1.75 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Step Added</Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={ingredient.stepAdded}
              onChange={(e) =>
                onUpdate(index, {
                  ...ingredient,
                  stepAdded: e.target.value as StepAdded,
                })
              }
              {...selectStyle}
            >
              {Object.values(StepAdded).map((step) => (
                <MenuItem key={step} value={step}>
                  {step}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Time Added */}
      <Grid size={{ xs: 12, sm: 1.5 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Time Added</Typography>
          <TextField
            fullWidth
            value={ingredient.timeAdded}
            onChange={(e) =>
              onUpdate(index, {
                ...ingredient,
                timeAdded: e.target.value,
              })
            }
            {...inputStyle}
          />
        </Paper>
      </Grid>
    </>
  );
}