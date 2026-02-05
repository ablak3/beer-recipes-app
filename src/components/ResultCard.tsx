import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  paperCardStyle,
  getPaperCardAccentSx,
  labelStyle,
  getLabelAccentSx,
  subLabelStyle,
  getSubLabelAccentSx,
  resultValueRowStyle,
  resultValueStyle,
  getResultValueAccentSx,
  resultUnitStyle,
  getResultUnitAccentSx,
  resultRangeStyle,
  resultInfoStyle,
} from "../styles/fieldStyles";

interface ResultCardProps {
  label: string;
  subLabel?: string;
  value: number;
  unit?: string;
  decimals?: number;
  range?: string;
  highlight?: boolean;
  warning?: boolean;
  info?: string;
}

export default function ResultCard({
  label,
  subLabel,
  value,
  unit,
  decimals = 0,
  range,
  highlight = false,
  warning = false,
  info,
}: ResultCardProps) {
  const displayValue = Number.isFinite(value) ? value.toFixed(decimals) : "—";

  // Warning overrides highlight visually
  const isAccented = warning || highlight;

  return (
    <Paper
      elevation={isAccented ? 4 : paperCardStyle.elevation}
      sx={{
        ...paperCardStyle.sx,
        ...getPaperCardAccentSx({ highlight, warning }),
      }}
    >
      {/* Label + SubLabel */}
      <Typography
        {...labelStyle}
        sx={{
          ...labelStyle.sx,
          ...getLabelAccentSx({ highlight, warning }),
        }}
      >
        {label}

        {subLabel && (
          <Typography
            {...subLabelStyle}
            sx={{
              ...subLabelStyle.sx,
              ...getSubLabelAccentSx({ highlight, warning }),
            }}
          >
            {subLabel}
          </Typography>
        )}
      </Typography>

      {/* Value */}
      <Box {...resultValueRowStyle}>
        <Typography
          {...resultValueStyle}
          sx={{
            ...resultValueStyle.sx,
            ...getResultValueAccentSx({ highlight, warning }),
          }}
        >
          {displayValue}
        </Typography>

        {unit && (
          <Typography
            {...resultUnitStyle}
            sx={{
              ...resultUnitStyle.sx,
              ...getResultUnitAccentSx({ highlight, warning }),
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>

      {/* Range */}
      {range && (
        <Typography {...resultRangeStyle}>
          Target: {range}
        </Typography>
      )}

      {/* Info */}
      {info && <Typography {...resultInfoStyle}>{info}</Typography>}
    </Paper>
  );
}
