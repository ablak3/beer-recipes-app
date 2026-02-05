import { Paper, Typography, TextField, MenuItem } from "@mui/material";
import {
  paperCardStyle,
  labelStyle,
  helperTextStyle,
  getTextFieldStyleProps,
} from "../styles/fieldStyles";

interface FieldCardProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: "text" | "number" | "select" | "unit";
  options?: string[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

export default function FieldCard({
  label,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
  error,
  helperText,
}: FieldCardProps) {
  const isSelect = type === "select" || !!options;

  return (
    <Paper {...paperCardStyle}>
      <Typography {...labelStyle}>{label}</Typography>

      <TextField
        select={isSelect}
        type={isSelect ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        FormHelperTextProps={helperTextStyle}
        fullWidth
        {...getTextFieldStyleProps(isSelect)}
      >
        {isSelect &&
          options?.map((opt) => (
            <MenuItem key={String(opt)} value={opt}>
              {opt}
            </MenuItem>
          ))}
      </TextField>
    </Paper>
  );
}
