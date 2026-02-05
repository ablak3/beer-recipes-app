// src/components/recipe-summary/RecipeSummaryView.tsx
import React from "react";
import { Box } from "@mui/material";
import { Recipe } from "../../types";
import { stepRoutes } from "./summaryRoutes";

import SummaryBasicSection from "./sections/SummaryBasicSection";
import SummaryBiabSection from "./sections/SummaryBiabSection";
import SummaryWaterSection from "./sections/SummaryWaterSection";
import SummaryAbvIbuSection from "./sections/SummaryAbvIbuSection";
import SummaryGrainBillSection from "./sections/SummaryGrainBillSection";
import SummaryHopScheduleSection from "./sections/SummaryHopScheduleSection";
import SummaryIngredientsSection from "./sections/SummaryIngredientsSection";
import SummaryInstructionsSection from "./sections/SummaryInstructionSections";

export default function RecipeSummaryView({ recipe }: { recipe: Recipe }) {
  return (
    <Box sx={{ width: "100%" }}>
      <SummaryBasicSection recipe={recipe} editTo={stepRoutes.basic} />
      <SummaryBiabSection recipe={recipe} editTo={stepRoutes.biab} />
      <SummaryWaterSection recipe={recipe} editTo={stepRoutes.water} />

      <SummaryAbvIbuSection
        recipe={recipe}
        editToAbv={stepRoutes.abv}
        editToIbu={stepRoutes.ibu}
      />

      <SummaryGrainBillSection recipe={recipe} editTo={stepRoutes.grains} />
      <SummaryHopScheduleSection recipe={recipe} editTo={stepRoutes.hops} />
      <SummaryIngredientsSection recipe={recipe} editTo={stepRoutes.ingredients} />
      <SummaryInstructionsSection recipe={recipe} editTo={stepRoutes.instructions} />
    </Box>
  );
}
