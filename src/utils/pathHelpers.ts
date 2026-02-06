

export function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function setByPath<T extends object>(obj: T, path: string, value: any): T {
  const parts = path.split(".");
  const next: any = structuredClone(obj);

  let cur = next;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cur[key] ??= {};
    cur = cur[key];
  }

  cur[parts[parts.length - 1]] = value;
  return next;
}
