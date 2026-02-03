import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Grain } from "../../types";
import { paperCardStyle, labelStyle, inputStyle, selectStyle } from "../../styles/fieldStyles";

interface GrainRowProps {
  grain: Grain;
  index: number;
  onUpdate: (index: number, grain: Grain) => void;
}

export default function GrainRow({ grain, index, onUpdate }: GrainRowProps) {
  return (
    <>
      {/* Grain Type */}
      <Grid size={{ xs: 12, sm: 3 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Type</Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={grain.type}
              onChange={(e) =>
                onUpdate(index, { ...grain, type: e.target.value })
              }
              {...selectStyle}
            >
              <MenuItem value="Base Malt">Base Malt</MenuItem>
              <MenuItem value="Crystal/Caramel">Crystal/Caramel</MenuItem>
              <MenuItem value="Roasted">Roasted</MenuItem>
              <MenuItem value="Specialty">Specialty</MenuItem>
              <MenuItem value="Adjunct">Adjunct</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Grain Name */}
      <Grid size={{ xs: 12, sm: 3 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Name</Typography>
          <TextField
            fullWidth
            value={grain.name}
            onChange={(e) =>
              onUpdate(index, { ...grain, name: e.target.value })
            }
            placeholder="Grain name"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Weight */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Weight (lbs)</Typography>
          <TextField
            fullWidth
            type="number"
            value={grain.weight || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || !isNaN(Number(val))) {
                onUpdate(index, {
                  ...grain,
                  weight: val === "" ? 0 : parseFloat(val),
                });
              }
            }}
            placeholder="0"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Lovibond */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Lovibond</Typography>
          <TextField
            fullWidth
            type="number"
            value={grain.lovibond || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || !isNaN(Number(val))) {
                onUpdate(index, {
                  ...grain,
                  lovibond: val === "" ? 0 : parseFloat(val),
                });
              }
            }}
            placeholder="0"
            {...inputStyle}
          />
        </Paper>
      </Grid>
    </>
  );
}