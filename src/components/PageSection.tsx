import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Stack
} from "@mui/material";

interface PageSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function PageSection({
  title,
  children
}: PageSectionProps) {

  return (
    <Box>
      <Typography variant="h3" >
        {title}
      </Typography>
      <Grid container sx={{ mt: 2}}>
        <Stack spacing={6}>
            {children}
        </Stack>
      </Grid>
    </Box>
  );
}
