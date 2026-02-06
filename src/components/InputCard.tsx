import { TextField, MenuItem, Paper, Typography } from "@mui/material";
import CardGrid from "./CardGrid";
import { Field } from "../constants/defaultFieldNames";
import {
  paperCardStyle,
  labelStyle,
  inputStyle,
  inputSubLabelStyle,
  helperTextStyle,
} from "../styles/fieldStyles";
import { getByPath } from "../utils/pathHelpers";

interface Props<T extends object> {
  fields: Field<T>[];
  basePath: string;
  numCards: number;
  rootValue: any; // recipe
  onChange: (path: string, value: any) => void;
}

export default function InputCard<T extends object>({
  fields,
  basePath,
  numCards,
  rootValue,
  onChange,
}: Props<T>) {
  return (
    <CardGrid numCards={numCards}>
      {fields.map(({ name, label, subLabel, options }) => {
        const fullPath = basePath ? `${basePath}.${String(name)}` : String(name);
        const raw = getByPath(rootValue, fullPath);
        const value = raw ?? "";

        return (
          <Paper key={String(name)} {...paperCardStyle}>
            <Typography {...labelStyle}>
              {label}
              {subLabel && (
                <Typography {...inputSubLabelStyle}>{subLabel}</Typography>
              )}
            </Typography>

            <TextField
              value={String(value ?? "")}
              select={!!options}
              type={options ? undefined : "text"}
              fullWidth
              {...inputStyle}
              FormHelperTextProps={helperTextStyle}
              onChange={(e) => {
                onChange(fullPath, e.target.value);
              }}
              onBlur={(e) => {
                if (options) return;
                const v = e.target.value;

                // Commit a real number to state when they leave the field
                const num = v === "" ? 0 : Number(v);
                onChange(fullPath, Number.isFinite(num) ? num : 0);
              }}
            >
              {options?.map((opt) => (
                <MenuItem key={String(opt)} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        );
      })}
    </CardGrid>
  );
}
