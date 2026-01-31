import React from 'react';
import {
  Typography,
  Grid,
  Divider,
  Box
} from "@mui/material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  columns?: number;
}

export default function Section({
  title,
  children,
  columns = 1
}: SectionProps) {
  return (
    <Box sx={{ mt: 6}}>
      <Typography variant="h5" gutterBottom >
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {children}
      </Grid>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}
