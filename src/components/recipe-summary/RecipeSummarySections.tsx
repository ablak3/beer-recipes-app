// src/components/recipe-summary/RecipeSummarySections.tsx
import { Box } from "@mui/material";
import { Recipe } from "../../types";
import SummaryBasicSection from "./sections/SummaryBasicSection";
import SummaryBiabSection from "./sections/SummaryBiabSection";
import SummaryWaterSection from "./sections/SummaryWaterSection";
import SummaryAbvIbuSection from "./sections/SummaryAbvIbuSection";
import SummaryGrainBillSection from "./sections/SummaryGrainBillSection";
import SummaryHopScheduleSection from "./sections/SummaryHopScheduleSection";
import SummaryIngredientsSection from "./sections/SummaryIngredientsSection";
import SummaryInstructionsSection from "./sections/SummaryInstructionSections";
import { stepRoutes } from "./summaryRoutes";

export default function RecipeSummarySections({
  recipe,
  editable = true,
  routes = stepRoutes,
}: {
  recipe: Recipe;
  editable?: boolean;
  routes?: typeof stepRoutes;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <SummaryBasicSection recipe={recipe} editTo={routes.basic} editable={editable} />
      <SummaryBiabSection recipe={recipe} editTo={routes.biab} editable={editable} />
      <SummaryWaterSection recipe={recipe} editTo={routes.water} editable={editable} />
      <SummaryAbvIbuSection
        recipe={recipe}
        editToAbv={routes.abv}
        editToIbu={routes.ibu}
        editable={editable}
      />
      <SummaryGrainBillSection recipe={recipe} editTo={routes.grains} editable={editable} />
      <SummaryHopScheduleSection recipe={recipe} editTo={routes.hops} editable={editable} />
      <SummaryIngredientsSection recipe={recipe} editTo={routes.ingredients} editable={editable} />
      <SummaryInstructionsSection recipe={recipe} editTo={routes.instructions} editable={editable} />
    </Box>
  );
}
