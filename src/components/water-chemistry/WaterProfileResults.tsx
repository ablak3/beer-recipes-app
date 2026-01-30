import React from "react";
import { Stack } from "@mui/material";
import { WaterChemistryResults } from "../../types";
import MashWaterProfileSection from "./MashWaterProfileSection";
import TotalWaterProfileSection from "./TotalWaterProfileSection";
import WaterAnalysisSection from "./WaterAnalysisSection";
import WaterWarningsSection from "./WaterWarningsSection";

interface WaterProfileResultsProps {
  results: WaterChemistryResults;
}

export default function WaterProfileResults({
  results
}: WaterProfileResultsProps) {
  return (
    <Stack spacing={6}>
      <MashWaterProfileSection results={results} />
      <TotalWaterProfileSection results={results} />
      <WaterAnalysisSection results={results} />
      <WaterWarningsSection warnings={results.warnings} />
    </Stack>
  );
}
