// utils/unitConverters.ts
import { Unit } from "../types";

export function toPounds(value: number, unit: Unit): number {
  if (!Number.isFinite(value)) return 0;

  switch (unit) {
    case Unit.Pounds:
      return value;

    case Unit.Ounces:
      return value / 16;

    case Unit.Kilograms:
      return value * 2.20462262;

    case Unit.Grams:
      return value * 0.00220462262;

    default:
      throw new Error(`Unsupported weight unit for pounds: ${unit}`);
  }
}
