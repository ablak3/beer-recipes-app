import React from "react";
import { Typography, Grid, Box, Stack } from "@mui/material";

interface PageSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function PageSection({ title, children }: PageSectionProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>

      <Grid container sx={{ mt: 2, width: "100%" }}>
        <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
          <Stack spacing={2} alignItems="stretch" sx={{ width: "100%" }}>
            {children}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
