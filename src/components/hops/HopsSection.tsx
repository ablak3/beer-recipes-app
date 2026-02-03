import React from "react";
import { Hop } from "../../types";
import EditableGridManager from "../EditableGridManager";
import HopRow from "./HopRow";
import { defaultHop } from "../../constants/defaultRecipeValues";
import { useRecipe } from "../../hooks/useRecipe";

export default function HopsSection() {
  const { recipe, addHop, updateHop, removeHop } = useRecipe();
  const hops = recipe.hops;

  // Ensure at least one hop entry exists
  React.useEffect(() => {
    if (hops.length === 0) {
      addHop(defaultHop);
    }
  }, [hops.length, addHop]);

  const renderHopRow = (hop: Hop, index: number) => (
    <HopRow hop={hop} index={index} onUpdate={updateHop} />
  );

  return (
    <EditableGridManager<Hop>
      items={hops}
      renderRow={renderHopRow}
      onAdd={() => addHop(defaultHop)}
      onRemove={removeHop}
      emptyText="No hops added yet. Click below to add hops."
      addLabel="Add Hop"
      minItems={1}
    />
  );
}