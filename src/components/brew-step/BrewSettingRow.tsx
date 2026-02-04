import {
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Unit } from "../../types";
import { Field } from "../../constants/defaultFieldNames";

interface BrewSettingRowProps<T extends object> {
  field: Field<T>;
  value: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export default function BrewSettingRow<T extends object>({
  field,
  value,
  onChange,
  disabled,
}: BrewSettingRowProps<T>) {
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

  return (
    <Grid size={{ xs: 12, sm: 3 }}>
      <Paper {...paperCardStyle}>
        <Typography {...labelStyle}>{field.label}</Typography>

        {field.type === "unit" ? (
          <TextField
            select
            fullWidth
            value={value}
            variant="standard"
            onChange={(e) => onChange?.(e.target.value) || 0}
            disabled={disabled}
          >
            {Object.values(Unit).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            type="number"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => onChange?.(parseFloat(e.target.value) || 0)}
            disabled={disabled}
          />
        )}
      </Paper>
    </Grid>
  );
}
