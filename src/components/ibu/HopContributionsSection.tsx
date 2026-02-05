import { Paper, Typography, Box } from "@mui/material";
import Section from "../Section";
import CardGrid from "../CardGrid";
import {
  paperCardStyle,
  labelStyle,
  resultValueRowStyle,
  resultValueStyle,
  resultUnitStyle,
} from "../../styles/fieldStyles";

type HopContribution = {
  hopName: string;
  ibu: number;
};

interface Props {
  contributions: HopContribution[];
}

export default function HopContributionsSection({ contributions }: Props) {
  if (!contributions.length) return null;

  return (
    <Section title="Hop Contributions">
      <CardGrid numCards={3}>
        {contributions.map((c, index) => (
          <Paper key={`${c.hopName}-${index}`} {...paperCardStyle}>
            <Typography {...labelStyle}>{c.hopName}</Typography>

            <Box {...resultValueRowStyle}>
              <Typography {...resultValueStyle}>{c.ibu.toFixed(1)}</Typography>
              <Typography {...resultUnitStyle}>IBU</Typography>
            </Box>
          </Paper>
        ))}
      </CardGrid>
    </Section>
  );
}
