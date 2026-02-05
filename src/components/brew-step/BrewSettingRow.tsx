import {
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Unit } from "../../types";
import { Field } from "../../constants/defaultFieldNames";
import CardGrid from "../CardGrid";
import { paperCardStyle, labelStyle } from "../../styles/fieldStyles";

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

  return (
    <CardGrid numCards={4}>
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
    </CardGrid>
  );
}
