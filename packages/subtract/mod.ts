import { add } from "@scope/add";

export function subtract(a: number, b: number): number {
  return add(a, b * -1);
}
