import React from "react";
import { Paper, Typography } from "@mui/material";

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
  return (
    <Paper
      elevation={highlight ? 3 : 1}
      sx={{
        p: 2,
        height: '100%',
        bgcolor: highlight ? 'primary.lighter' : 'background.paper',
        border: highlight ? 2 : 0,
        borderColor: highlight ? 'primary.main' : 'transparent',
      }}
    >
      <Typography 
        variant="caption" 
        color={highlight ? 'primary.dark' : 'text.secondary'}
        sx={{ fontWeight: 600, display: 'block', mb: 1 }}
      >
        {label}
      </Typography>
      
      <Typography 
        variant="h4" 
        color={highlight ? 'primary.main' : 'text.primary'}
        sx={{ fontWeight: 'bold', mb: 0.5 }}
      >
        {value.toFixed(decimals)}
        {unit && (
          <Typography 
            component="span" 
            variant="body2" 
            color={highlight ? 'primary.dark' : 'text.secondary'}
            sx={{ ml: 1 }}
          >
            {unit}
          </Typography>
        )}
      </Typography>
      
      {range && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Range: {range}
        </Typography>
      )}
      
      {info && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ display: 'block', fontStyle: 'italic', mt: 1 }}
        >
          {info}
        </Typography>
      )}
    </Paper>
  );
}