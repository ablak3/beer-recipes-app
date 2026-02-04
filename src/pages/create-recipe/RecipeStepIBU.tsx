import { useEffect } from "react";
import { Grid, Alert, Paper, Typography } from "@mui/material";
import { useRecipe } from "../../hooks/useRecipe";
import { useIBUCalculator } from "../../hooks/useIBUCalculator";
import Section from "../../components/Section";
import PageSection from "../../components/PageSection";
import ResultCard from "../../components/ResultCard";
import HopsSection from "../../components/hops/HopsSection";

export default function RecipeStepIBU() {
  const { recipe, updateIBUResults } = useRecipe();
  
  const hops = recipe.hops;
  const batchSize = recipe.brewInABagSettings.batchSize;
  const boilGravity = recipe.abvInputs.originalGravity;
  
  const results = useIBUCalculator(hops, batchSize, boilGravity);

  // Update results in context whenever they change
  useEffect(() => {
    updateIBUResults(results);
  }, [results, updateIBUResults]);

  const hasHops = hops.length > 0 && hops.some(h => h.name && h.amount > 0);

  return (
    <PageSection title="IBU Calculator">
        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
            IBU (International Bitterness Units) is calculated using the Tinseth formula.
            Batch size is pulled from your BIAB settings ({batchSize} gallons), and boil
            gravity uses your calculated OG ({boilGravity.toFixed(3)}).
        </Alert>

        {/* Hop Schedule */}
        <Section title="Hop Schedule">
            <HopsSection />
        </Section>

        {/* Results */}
        {hasHops && (
            <>
            <Section title="IBU Results">
                <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <ResultCard
                    label="Total IBU"
                    value={results.totalIBU}
                    decimals={1}
                    highlight
                    range="10-100"
                    info="Total bitterness contribution from all hops"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <ResultCard
                    label="Batch Size"
                    value={batchSize}
                    unit="gallons"
                    decimals={1}
                    info="From BIAB settings"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <ResultCard
                    label="Boil Gravity"
                    value={boilGravity}
                    decimals={3}
                    info="From calculated OG"
                    />
                </Grid>
                </Grid>
            </Section>

            {/* Individual Hop Contributions */}
            {results.hopContributions.length > 0 && (
                <Section title="Hop Contributions">
                <Grid container spacing={2}>
                    {results.hopContributions.map((contribution, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper
                        elevation={1}
                        sx={{
                            p: 2.5,
                            height: "100%",
                            bgcolor: "background.paper",
                        }}
                        >
                        <Typography
                            variant="overline"
                            sx={{
                            fontWeight: 600,
                            letterSpacing: 0.6,
                            color: "text.secondary",
                            mb: 0.5,
                            display: "block",
                            }}
                        >
                            {contribution.hopName}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            }}
                        >
                            {contribution.ibu.toFixed(1)}
                            <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 1, color: "text.secondary", fontWeight: 500 }}
                            >
                            IBU
                            </Typography>
                        </Typography>
                        </Paper>
                    </Grid>
                    ))}
                </Grid>
                </Section>
            )}
            </>
        )}

        {/* Style Guide */}
        <Section title="IBU Style Guide">
            <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={1} sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Non-Hoppy (5-20 IBU)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Wheat beers, lagers, cream ales
                </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={1} sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Moderate (20-45 IBU)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Pale ales, ambers, porters
                </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={1} sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Hoppy (45-70 IBU)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    IPAs, strong ales
                </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={1} sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Very Hoppy (70+ IBU)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Double IPAs, imperial stouts
                </Typography>
                </Paper>
            </Grid>
            </Grid>
        </Section>
    </PageSection>
  );
}