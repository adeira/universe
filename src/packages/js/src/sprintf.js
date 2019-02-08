// @flow

/**
 * Simple function for formatting strings.
 * Replaces placeholders with values passed as extra arguments
 */
export default function sprintf(format: string, ...args: mixed[]): string {
  let index = 0;
  return format.replace(/%s/g, match => String(args[index++]));
}
