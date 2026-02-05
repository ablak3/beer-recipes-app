import React from 'react';
import {
  Typography,
  Grid,
  Box
} from "@mui/material";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  children
}: SectionProps) {

  return (
    <Box>
      <Typography variant="h5" >
        {title}
      </Typography>
      <Grid container>
        {children}
      </Grid>
    </Box>
  );
}
