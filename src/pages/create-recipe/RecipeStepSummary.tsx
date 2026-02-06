import PageSection from "../../components/PageSection";
import { useRecipe } from "../../hooks/useRecipe";
import { Box } from "@mui/material";
import { stepRoutes } from "../../components/recipe-summary/summaryRoutes";
import SummaryBasicSection from "../../components/recipe-summary/sections/SummaryBasicSection";
import SummaryBiabSection from "../../components/recipe-summary/sections/SummaryBiabSection";
import SummaryWaterSection from "../../components/recipe-summary/sections/SummaryWaterSection";
import SummaryAbvIbuSection from "../../components/recipe-summary/sections/SummaryAbvIbuSection";
import SummaryGrainBillSection from "../../components/recipe-summary/sections/SummaryGrainBillSection";
import SummaryHopScheduleSection from "../../components/recipe-summary/sections/SummaryHopScheduleSection";
import SummaryIngredientsSection from "../../components/recipe-summary/sections/SummaryIngredientsSection";
import SummaryInstructionsSection from "../../components/recipe-summary/sections/SummaryInstructionSections";

export default function RecipeStepSummary() {
  const { recipe } = useRecipe();
  
  return (
    <PageSection title="Review & Save">
      <Box sx={{ width: "100%" }}>
        <SummaryBasicSection recipe={recipe} editTo={stepRoutes.basic} />
        <SummaryBiabSection recipe={recipe} editTo={stepRoutes.biab} />
        <SummaryWaterSection recipe={recipe} editTo={stepRoutes.water} />
        <SummaryAbvIbuSection recipe={recipe} editToAbv={stepRoutes.abv} editToIbu={stepRoutes.ibu} />
        <SummaryGrainBillSection recipe={recipe} editTo={stepRoutes.grains} />
        <SummaryHopScheduleSection recipe={recipe} editTo={stepRoutes.hops} />
        <SummaryIngredientsSection recipe={recipe} editTo={stepRoutes.ingredients} />
        <SummaryInstructionsSection recipe={recipe} editTo={stepRoutes.instructions} />
      </Box>
    </PageSection>
  );
}
