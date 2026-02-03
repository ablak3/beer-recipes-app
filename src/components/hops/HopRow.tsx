import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Hop, HopType, StepAdded } from "../../types";
import { paperCardStyle, labelStyle, inputStyle, selectStyle } from "../../styles/fieldStyles";

interface HopRowProps {
  hop: Hop;
  index: number;
  onUpdate: (index: number, hop: Hop) => void;
}

export default function HopRow({ hop, index, onUpdate }: HopRowProps) {
  return (
    <>
      {/* Hop Name */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Name</Typography>
          <TextField
            fullWidth
            value={hop.name}
            onChange={(e) =>
              onUpdate(index, { ...hop, name: e.target.value })
            }
            placeholder="Hop variety"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Alpha Acid */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Alpha Acid (%)</Typography>
          <TextField
            fullWidth
            type="number"
            value={hop.alphaAcid || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || !isNaN(Number(val))) {
                onUpdate(index, {
                  ...hop,
                  alphaAcid: val === "" ? 0 : parseFloat(val),
                });
              }
            }}
            placeholder="0"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Amount */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Amount (oz)</Typography>
          <TextField
            fullWidth
            type="number"
            value={hop.amount || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || !isNaN(Number(val))) {
                onUpdate(index, {
                  ...hop,
                  amount: val === "" ? 0 : parseFloat(val),
                });
              }
            }}
            placeholder="0"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Hop Type */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Type</Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={hop.type}
              onChange={(e) =>
                onUpdate(index, { ...hop, type: e.target.value as HopType })
              }
              {...selectStyle}
            >
              {Object.values(HopType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Boil Time */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Boil Time (min)</Typography>
          <TextField
            fullWidth
            type="number"
            value={hop.boilTime || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || !isNaN(Number(val))) {
                onUpdate(index, {
                  ...hop,
                  boilTime: val === "" ? 0 : parseFloat(val),
                });
              }
            }}
            placeholder="0"
            {...inputStyle}
          />
        </Paper>
      </Grid>

      {/* Use */}
      <Grid size={{ xs: 12, sm: 2 }}>
        <Paper {...paperCardStyle}>
          <Typography {...labelStyle}>Use</Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={hop.use}
              onChange={(e) =>
                onUpdate(index, { ...hop, use: e.target.value as StepAdded })
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
    </>
  );
}