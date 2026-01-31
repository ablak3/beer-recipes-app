import React from "react";
import { Paper, Typography, Box } from "@mui/material";

interface ResultCardProps {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  range?: string;
  highlight?: boolean;
  info?: string;
}

export default function ResultCard({
  label,
  value,
  unit,
  decimals = 0,
  range,
  highlight = false,
  info,
}: ResultCardProps) {
  const displayValue = Number.isFinite(value)
    ? value.toFixed(decimals)
    : "—";

  return (
    <Paper
      elevation={highlight ? 4 : 1}
      sx={{
        p: 2.5,
        height: "100%",
        position: "relative",
        bgcolor: highlight ? "primary.lighter" : "background.paper",
        borderLeft: highlight ? 4 : 0,
        borderColor: "primary.main",
        transition: "all 0.2s ease",
      }}
    >
      {/* Label */}
      <Typography
        variant="overline"
        sx={{
          fontWeight: 600,
          letterSpacing: 0.6,
          color: highlight ? "primary.dark" : "text.secondary",
          mb: 0.5,
          display: "block",
        }}
      >
        {label}
      </Typography>

      {/* Value */}
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 0.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.1,
            color: highlight ? "primary.main" : "text.primary",
          }}
        >
          {displayValue}
        </Typography>

        {unit && (
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              color: highlight ? "primary.dark" : "text.secondary",
              fontWeight: 500,
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>

      {/* Range */}
      {range && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block" }}
        >
          Target: {range}
        </Typography>
      )}

      {/* Info */}
      {info && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            fontStyle: "italic",
            color: "text.secondary",
          }}
        >
          {info}
        </Typography>
      )}
    </Paper>
  );
}