// src/components/recipe-summary/SummarySectionHeader.tsx
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function SummarySectionHeader({
  title,
  to,
  editable = true,
}: {
  title: string;
  to?: string;
  editable?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
      <Typography variant="h6">{title}</Typography>

      {to && editable ? (
        <Button component={RouterLink} to={to} size="small" variant="text">
          Edit
        </Button>
      ) : (
        // keep spacing consistent
        <Box sx={{ width: 48 }} />
      )}
    </Box>
  );
}
