import { WaterChemistryResults } from "../../types";
import ResultCard from "../ResultCard";
import CardGrid from "../CardGrid";
import { totalWaterProfileResultFields } from "../../constants/defaultFieldNames";

interface Props {
  results: WaterChemistryResults;
}

export default function TotalWaterProfileSection({ results }: Props) {
  const profile = results.totalWaterProfile;

  return (
    <CardGrid numCards={6}>
      {totalWaterProfileResultFields.map((field) => (
        <ResultCard
          key={String(field.name)}
          label={field.label}
          subLabel={field.subLabel}
          value={profile[field.name] as number}
          unit={field.unit}
          range={field.range}
          highlight={field.highlight}
          decimals={field.decimals}
          info={field.info}
        />
      ))}
    </CardGrid>
  );
}
