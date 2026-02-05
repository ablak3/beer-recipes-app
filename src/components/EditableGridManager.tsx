import React from "react";
import { Typography, Grid, Divider, Button, IconButton, Box } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import {
  editableEmptyTextStyle,
  editableRowContainerSx,
  editableRemoveCellSx,
  editableDividerSx,
  editableActionsBarSx,
  editableAddButtonSx,
} from "../styles/fieldStyles";

interface EditableGridManagerProps<T> {
  items: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  emptyText?: string;
  addLabel?: string;
  minItems?: number;
}

export default function EditableGridManager<T>({
  items,
  renderRow,
  onAdd,
  onRemove,
  emptyText = "No items added yet.",
  addLabel = "Add Item",
  minItems = 0,
}: EditableGridManagerProps<T>) {
  return (
    <>
      {items.length === 0 && (
        <Typography {...editableEmptyTextStyle}>
          {emptyText}
        </Typography>
      )}

      {items.map((item, index) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          key={index}
          sx={editableRowContainerSx}
        >
          {/* Content grows */}
          <Grid size={{ xs: 12, sm: "grow" }}>
            <Grid container spacing={2} alignItems="center">
              {renderRow(item, index)}
            </Grid>
          </Grid>

          {/* Remove pinned to the end */}
          <Grid size={{ xs: 12, sm: "auto" }} sx={editableRemoveCellSx}>
            <IconButton
              color="error"
              onClick={() => onRemove(index)}
              disabled={items.length <= minItems}
              size="small"
            >
              <RemoveCircle fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Divider sx={editableDividerSx} />

      <Box sx={editableActionsBarSx}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onAdd}
          size="small"
          sx={editableAddButtonSx}
        >
          {addLabel}
        </Button>
      </Box>
    </>
  );
}
