type Value = string | number | null | undefined | false | Value[];

export function clsx(...args: Value[]): string {
  const out: string[] = [];
  const stack: Value[] = [...args];
  while (stack.length > 0) {
    const v = stack.pop();
    if (v == null || v === false) continue;
    if (Array.isArray(v)) {
      stack.push(...v);
      continue;
    }
    out.push(String(v));
  }
  return out.join(' ');
}
