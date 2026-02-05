import { Alert } from "@mui/material";
import { infoAlertSx } from "../../styles/fieldStyles";

interface Props {
  batchSize: number;
  boilGravity: number;
}

export default function IBUInfoAlert({ batchSize, boilGravity }: Props) {
  return (
    <Alert severity="info" sx={infoAlertSx}>
      IBU (International Bitterness Units) is calculated using the Tinseth formula.
      Batch size is pulled from your BIAB settings ({batchSize} gallons), and boil
      gravity uses your calculated OG ({boilGravity.toFixed(3)}).
    </Alert>
  );
}
