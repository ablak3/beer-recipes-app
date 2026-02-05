// fieldStyles.ts
import { SxProps, Theme } from "@mui/material/styles";

type AccentState = {
  highlight?: boolean;
  warning?: boolean;
};

/**
 * Base card style (neutral)
 */
export const paperCardStyle = {
  elevation: 1,
  sx: {
    p: 2.5,
    height: "100%",
    bgcolor: "background.paper",
    transition: "all 0.2s ease",
    "&:focus-within": {
      elevation: 4,
      borderLeft: 4,
      borderColor: "primary.main",
      bgcolor: "primary.lighter",
    },
  },
} as const;

/**
 * Card accent helper (highlight / warning)
 */
export const getPaperCardAccentSx = ({
  highlight = false,
  warning = false,
}: AccentState): SxProps<Theme> => {
  if (warning) {
    return {
      bgcolor: "error.lighter",
      borderLeft: 4,
      borderColor: "error.main",
    };
  }

  if (highlight) {
    return {
      bgcolor: "primary.lighter",
      borderLeft: 4,
      borderColor: "primary.main",
    };
  }

  return {};
};

/**
 * Label styles (primary label)
 */
export const labelStyle = {
  variant: "overline" as const,
  sx: {
    fontWeight: 600,
    letterSpacing: 0.6,
    color: "text.secondary",
    mb: 0.25,
    display: "block",
  },
} as const;

/**
 * Label accent helper
 */
export const getLabelAccentSx = ({
  highlight = false,
  warning = false,
}: AccentState): SxProps<Theme> => ({
  color: warning ? "error.dark" : highlight ? "primary.dark" : "text.secondary",
});

/**
 * Sub-label styles (e.g. SO₄, Ca, HCO₃)
 */
export const subLabelStyle = {
  component: "span" as const,
  sx: {
    display: "block",
    fontSize: "0.75em",
    fontWeight: 500,
    letterSpacing: 0.3,
    lineHeight: 1.1,
    color: "text.secondary",
    mt: 0.25,
  },
} as const;

/**
 * Sub-label accent helper
 */
export const getSubLabelAccentSx = ({
  highlight = false,
  warning = false,
}: AccentState): SxProps<Theme> => ({
  color: warning ? "error.dark" : highlight ? "primary.dark" : "text.secondary",
});

/**
 * Input styles
 */
export const inputStyle = {
  variant: "standard" as const,
  InputProps: {
    disableUnderline: false,
    sx: {
      fontSize: "1.5rem",
      fontWeight: 700,
      "& input": {
        padding: 0,
      },
    },
  },
} as const;

export const selectStyle = {
  disableUnderline: false,
  sx: {
    fontSize: "1.5rem",
    fontWeight: 700,
    "& .MuiSelect-select": {
      padding: 0,
    },
  },
} as const;

// ResultCard styles
export const resultValueRowStyle = {
  sx: {
    display: "flex",
    alignItems: "baseline",
    mb: 0.5,
  },
} as const;

export const resultValueStyle = {
  variant: "h4" as const,
  sx: {
    fontWeight: 700,
    lineHeight: 1.1,
    color: "text.primary",
  },
} as const;

export const getResultValueAccentSx = ({
  highlight = false,
  warning = false,
}: { highlight?: boolean; warning?: boolean }) => ({
  color: warning ? "error.main" : highlight ? "primary.main" : "text.primary",
});

export const resultUnitStyle = {
  variant: "body2" as const,
  sx: {
    ml: 1,
    color: "text.secondary",
    fontWeight: 500,
  },
} as const;

export const getResultUnitAccentSx = ({
  highlight = false,
  warning = false,
}: { highlight?: boolean; warning?: boolean }) => ({
  color: warning ? "error.dark" : highlight ? "primary.dark" : "text.secondary",
});

export const resultRangeStyle = {
  variant: "caption" as const,
  sx: {
    display: "block",
    color: "text.secondary",
  },
} as const;

export const resultInfoStyle = {
  variant: "caption" as const,
  sx: {
    display: "block",
    mt: 1,
    fontStyle: "italic",
    color: "text.secondary",
  },
} as const;

// InputCard helper text spacing (used by TextField)
export const helperTextStyle = {
  sx: {
    ml: 0,
    mt: 0.5,
  },
} as const;

// Sub-label style for InputCard (reuse base subLabelStyle, but slightly smaller)
export const inputSubLabelStyle = {
  ...subLabelStyle,
  sx: {
    ...subLabelStyle.sx,
    fontSize: "0.7em",
  },
} as const;

// EditableGridManager styles
export const editableEmptyTextStyle = {
  variant: "body2" as const,
  color: "text.secondary" as const,
  sx: { py: 4, textAlign: "center" },
} as const;

export const editableRowContainerSx = {
  mb: 2,
  width: "100%",
} as const;

export const editableRemoveCellSx = {
  display: "flex",
  justifyContent: { xs: "flex-start", sm: "flex-end" },
} as const;

export const editableDividerSx = { my: 3 } as const;

export const editableActionsBarSx = { display: "flex" } as const;

/**
 * Keeps buttons looking like your BIAB inputs (outlined, consistent height/padding).
 * You can tune this once and all add buttons match.
 */
export const editableAddButtonSx = {
  minHeight: 36,
  px: 2,
  fontWeight: 500,
} as const;

// Common TextField props you reuse everywhere
export const baseTextFieldProps = {
  fullWidth: true,
  variant: "standard" as const,
} as const;

// Numeric text field input props (matches your big number look)
export const numericTextFieldInputProps = {
  disableUnderline: false,
  sx: {
    fontSize: "1.5rem",
    fontWeight: 700,
    "& input": { padding: 0 },
  },
} as const;

// Select input props (same typography)
export const selectTextFieldInputProps = {
  disableUnderline: false,
  sx: {
    fontSize: "1.5rem",
    fontWeight: 700,
    "& .MuiSelect-select": { padding: 0 },
  },
} as const;

// FieldCard/TextField helpers
export const getTextFieldStyleProps = (isSelect: boolean) => {
  return isSelect
    ? { ...inputStyle, select: true, SelectProps: selectStyle }
    : { ...inputStyle };
};