import { Fields, Verify } from "./demo";
export function updateRemainsList(
  valid: boolean,
  list: (keyof Fields)[],
  key: keyof Fields,
): (keyof Fields)[] {
  return valid
    ? list.filter((id) => id !== key)
    : !list.includes(key)
    ? [...list, key]
    : list;
}

export function getFocusDOMRect(activeNode: HTMLElement): { [k: string]: string } {
  return Object.entries(activeNode.getBoundingClientRect()).reduce(
    (collection, [key, value]) => ({
      ...collection,
      [key]: !isNaN(value) ? `${value}px` : value,
    }),
    {},
  );
}
