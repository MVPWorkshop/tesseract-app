export function keys<O extends Record<string, unknown>>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[];
}

export function isEmptyValue(value: any) {
  return value === undefined || value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
}
