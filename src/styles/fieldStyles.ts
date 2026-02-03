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

export const labelStyle = {
  variant: "overline" as const,
  sx: {
    fontWeight: 600,
    letterSpacing: 0.6,
    color: "text.secondary",
    mb: 0.5,
    display: "block",
  },
} as const;

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