import { Paper, Typography, Box } from "@mui/material";
import CardGrid from "../CardGrid";

interface Props {
  warnings: string[];
}

export default function WaterWarningsSection({ warnings }: Props) {
  if (warnings.length === 0) return null;

  return (
    <CardGrid numCards={1}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "warning.lighter",
          border: 1,
          borderColor: "warning.main"
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "warning.dark" }}>
          ⚠️ Warnings
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          {warnings.map((warning, index) => (
            <Typography
              component="li"
              key={index}
              variant="body2"
              sx={{ mb: 1, color: "warning.dark" }}
            >
              {warning}
            </Typography>
          ))}
        </Box>
      </Paper>
    </CardGrid>
  );
}
