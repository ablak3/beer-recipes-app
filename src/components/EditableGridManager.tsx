import React from "react";
import {
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

interface EditableGridManagerProps<T> {
  title: string;
  items: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  emptyText?: string;
  addLabel?: string;
  minItems?: number;
}

export default function EditableGridManager<T>({
  title,
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
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {items.length === 0 && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ py: 4, textAlign: 'center' }}
        >
          {emptyText}
        </Typography>
      )}

      {items.map((item, index) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          key={index}
          sx={{ mb: 2 }}
        >
          {renderRow(item, index)}

          {/* Add / Remove Buttons */}
          <Grid size={{ xs: 12, sm: 2 }}>
            <IconButton
              color="error"
              onClick={() => onRemove(index)}
              disabled={items.length <= minItems}
            >
              <RemoveCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ my: 3 }} />

      <Button
        variant="outlined"
        color="primary"
        onClick={onAdd}
      >
        {addLabel}
      </Button>
    </>
  );
}