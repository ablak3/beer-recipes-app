import { Paper, Typography } from "@mui/material";
import Section from "../Section";
import CardGrid from "../CardGrid";
import {
  styleGuideBodyTypography,
  styleGuideCardSx,
  styleGuideTitleTypography,
} from "../../styles/fieldStyles";

export default function IBUStyleGuideSection() {
  return (
    <Section title="IBU Style Guide">
      <CardGrid numCards={4}>
        <Paper elevation={1} sx={styleGuideCardSx}>
          <Typography {...styleGuideTitleTypography}>Non-Hoppy (5-20 IBU)</Typography>
          <Typography {...styleGuideBodyTypography}>
            Wheat beers, lagers, cream ales
          </Typography>
        </Paper>

        <Paper elevation={1} sx={styleGuideCardSx}>
          <Typography {...styleGuideTitleTypography}>Moderate (20-45 IBU)</Typography>
          <Typography {...styleGuideBodyTypography}>
            Pale ales, ambers, porters
          </Typography>
        </Paper>

        <Paper elevation={1} sx={styleGuideCardSx}>
          <Typography {...styleGuideTitleTypography}>Hoppy (45-70 IBU)</Typography>
          <Typography {...styleGuideBodyTypography}>
            IPAs, strong ales
          </Typography>
        </Paper>

        <Paper elevation={1} sx={styleGuideCardSx}>
          <Typography {...styleGuideTitleTypography}>Very Hoppy (70+ IBU)</Typography>
          <Typography {...styleGuideBodyTypography}>
            Double IPAs, imperial stouts
          </Typography>
        </Paper>
      </CardGrid>
    </Section>
  );
}
