// src/components/recipe-summary/SummarySectionHeader.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { summaryHeaderRowSx, summaryEditButtonSx } from "../../styles/fieldStyles";

export default function SummarySectionHeader({
  title,
  to,
}: {
  title: string;
  to?: string;
}) {
  return (
    <Box sx={summaryHeaderRowSx}>
      <Typography variant="h6">{title}</Typography>

      {to && (
        <Button
          component={RouterLink}
          to={to}
          variant="outlined"
          size="small"
          sx={summaryEditButtonSx}
        >
          Edit
        </Button>
      )}
    </Box>
  );
}
