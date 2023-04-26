// @flow strict

const transformationFunctions = {
  // alphabetically:
  CONCATENATE: (values: $ReadOnlyArray<string>, separator: string) => values.join(separator),
  REGEX_REPLACE: (value: string, regex: string, replacement: string) => {
    return value.replace(new RegExp(regex, 'g'), replacement);
  },
  REGEX_SEARCH: (value: string, regex: string) => {
    const match = value.match(new RegExp(regex));
    return match ? match[0] : '';
  },
  REMOVE_SPECIAL_CHARACTERS: (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, ''),
  REMOVE_WHITESPACE: (value: string) => value.replace(/\s+/g, ''),
  REVERSE: (value: string) => value.split('').reverse().join(''),
  SPLIT: (value: string, separator: string) => value.split(separator),
  SQUISH: (value: string) => value.replace(/\s+/g, ' ').trim(),
  TRANSFORM: (value: string, operation: string) => {
    switch (operation) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      case 'capitalize':
        return value.replace(/\b\w/g, (ch) => ch.toUpperCase());
      default:
        throw new Error(`Invalid transform operation: ${operation}`);
    }
  },
  TRIM: (value: string) => value.trim(),
};

export default function processTransformation(
  transformation: string,
  values: $ReadOnlyArray<string>,
): Array<string> {
  // Handling CONCATENATE transformation
  const separatorMatch = transformation.match(/^CONCATENATE(?:\((.+)\))?$/);
  if (separatorMatch) {
    return [transformationFunctions.CONCATENATE(values, separatorMatch[1] ?? '')];
  }

  // Handling REGEX_REPLACE transformation
  const regexReplaceMatch = transformation.match(/^REGEX_REPLACE\((.+),(.+)\)$/);
  if (regexReplaceMatch) {
    const regex = regexReplaceMatch[1];
    const replacement = regexReplaceMatch[2];
    return values.map((value) => transformationFunctions.REGEX_REPLACE(value, regex, replacement));
  }

  // Handling REGEX_SEARCH transformation
  const regexSearchMatch = transformation.match(/^REGEX_SEARCH\((.+)\)$/);
  if (regexSearchMatch) {
    const regex = regexSearchMatch[1];
    return values.map((value) => transformationFunctions.REGEX_SEARCH(value, regex));
  }

  // Handling SPLIT transformation
  const splitMatch = transformation.match(/^SPLIT\((.+)\)$/);
  if (splitMatch) {
    const separator = splitMatch[1];
    return values.flatMap((value) => transformationFunctions.SPLIT(value, separator));
  }

  // Handling TRANSFORM operation
  const transformMatch = transformation.match(/^TRANSFORM\((.+)\)$/);
  if (transformMatch) {
    const operation = transformMatch[1];
    return values.map((value) => transformationFunctions.TRANSFORM(value, operation));
  }

  // Handling other transformations
  if (transformationFunctions[transformation]) {
    return values.map((value) => transformationFunctions[transformation](value));
  }

  throw new Error(`Invalid transformation: ${transformation}`);
}
