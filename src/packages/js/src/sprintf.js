// @flow strict

function maybeReplace(
  format: string,
  pattern: RegExp,
  replacementFn: () => void | string,
): string {
  return format.replace(pattern, match => {
    const replacement = replacementFn();
    if (replacement === undefined) {
      return match;
    }
    return replacement;
  });
}

/**
 * Simple function for formatting strings. Replaces placeholders with values
 * passed as extra arguments.
 *
 * See: https://nodejs.org/api/util.html#util_util_format_format_args
 */
export default function sprintf(
  format: string,
  ...args: $ReadOnlyArray<mixed>
): string {
  const argsLength = args.length;
  if (argsLength === 0) {
    return format;
  }

  let index = 0;
  const withString = maybeReplace(format, /(?<!%)%s/g, () => {
    return index >= argsLength ? undefined : String(args[index++]);
  });
  const withJSON = maybeReplace(withString, /(?<!%)%j/g, () => {
    return index >= argsLength
      ? undefined
      : String(JSON.stringify(args[index++], getCircularReplacer()));
  });
  return withJSON.replace(/%%/g, '%');
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
