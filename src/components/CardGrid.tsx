import React from "react";
import { Grid } from "@mui/material";

interface CardGridProps {
  children: React.ReactNode;
  numCards?: number;
}

export default function CardGrid({
  children,
  numCards,
}: CardGridProps) {
  // Determine grid size based on fullWidth prop
    let gridSize = { xs: 12, sm: 6, md: 4 }; // Default for base malts
    if (numCards === 1) gridSize = { xs: 12, sm: 12, md: 12 };
    else if (numCards === 2) gridSize = { xs: 12, sm: 6, md: 6 };
    else if (numCards === 3) gridSize = { xs: 12, sm: 6, md: 4 };
    else if (numCards === 4) gridSize = { xs: 12, sm: 6, md: 3 };
    else if (numCards === 5) gridSize = { xs: 12, sm: 6, md: 2.4 };
    else if (numCards === 6) gridSize = { xs: 12, sm: 6, md: 2 };

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Grid key={index} size={gridSize}>
          {child}
        </Grid>
      ))}
    </>
  );
}
