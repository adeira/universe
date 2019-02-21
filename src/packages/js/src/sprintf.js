// @flow

/**
 * Simple function for formatting strings.
 * Replaces placeholders with values passed as extra arguments
 */
export default function sprintf(format: string, ...args: mixed[]): string {
  let index = 0;
  return format
    .replace(/%s/g, () => String(args[index++]))
    .replace(/%j/g, () => JSON.stringify(args[index++], getCircularReplacer()));
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  };
}
