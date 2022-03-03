// @flow strict

function maybeReplace(format: string, pattern: RegExp, replacementFn: () => void | string): string {
  return format.replace(pattern, (match, lookbehind) => {
    // https://caniuse.com/#search=lookbehind
    if (lookbehind === '%') {
      return match;
    }
    const replacement = replacementFn();
    if (replacement === undefined) {
      return match;
    }
    return replacement;
  });
}

/**
 * Simple function for formatting strings. Replaces placeholders with values passed as extra
 * arguments. The following placeholders are supported:
 *
 *  - %s: renders value as String
 *  - %j: renders value as JSON
 *  - %%: renders percentage symbol (escape sequence)
 *
 * See: https://nodejs.org/api/util.html#util_util_format_format_args
 */
export default function sprintf(format: string, ...args: $ReadOnlyArray<mixed>): string {
  const argsLength = args.length;
  if (argsLength === 0) {
    return format;
  }

  let index = 0;
  const withString = maybeReplace(format, /(?<lookbehind>%)?%s/g, () => {
    return index >= argsLength ? undefined : String(args[index++]);
  });
  let withJSON = maybeReplace(withString, /(?<lookbehind>%)?%j/g, () => {
    return index >= argsLength
      ? undefined
      : String(JSON.stringify(args[index++], getCircularReplacer()));
  });

  for (index; index < argsLength; index++) {
    withJSON += ` ${String(args[index])}`;
  }

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
