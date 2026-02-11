import { useRecipe } from "../../hooks/useRecipe";
import BrewSettingRow from "./BrewSettingRow";
import { Field } from "../../constants/defaultFieldNames";
import { BrewInABagSettings } from "../../types";

interface BrewSettingsSectionProps<T extends object> {
  fields: Field<BrewInABagSettings>[];
}

export default function BrewSettingsSection<T extends object>({
  fields,
}: BrewSettingsSectionProps<T>) {
  const { recipe, updateBiabSetting } = useRecipe();
  const settings = recipe.brewInABagSettings;

  return (
    <>
      {fields
        .map((field) => (
          <BrewSettingRow
            key={String(field.name)}
            field={field}
            value={settings[field.name]}
            onChange={(value) => updateBiabSetting(field.name, value)}
          />
        ))}
    </>
  );
}
