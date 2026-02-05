import Section from "../Section";
import CardGrid from "../CardGrid";
import ResultCard from "../ResultCard";

interface Props {
  totalIBU: number;
  batchSize: number;
  boilGravity: number;
}

export default function IBUResultsSection({ totalIBU, batchSize, boilGravity }: Props) {
  return (
    <Section title="IBU Results">
      <CardGrid numCards={3}>
        <ResultCard
          label="Total IBU"
          value={totalIBU}
          decimals={1}
          highlight
          range="10-100"
          info="Total bitterness contribution from all hops"
        />
        <ResultCard
          label="Batch Size"
          value={batchSize}
          unit="gallons"
          decimals={1}
          info="From BIAB settings"
        />
        <ResultCard
          label="Boil Gravity"
          value={boilGravity}
          decimals={3}
          info="From calculated OG"
        />
      </CardGrid>
    </Section>
  );
}
