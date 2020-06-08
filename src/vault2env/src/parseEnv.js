// @flow strict

import os from 'os';

type ParsedEnv = { +[string]: string, ... };

/**
 * Over-simplified INI parser to get mainly keys from our ENV files and compare them with new
 * values. This way we can easily determine whether the key already exists in our file or not.
 */
export default function parseEnv(fileContent: string): ParsedEnv {
  const parsedEnv = {};
  fileContent.split(os.EOL).forEach(line => {
    if (line !== '') {
      const [key, ...rest] = line.split(/\s?=\s?/);
      parsedEnv[key] = rest.join('=');
    }
  });
  return parsedEnv;
}
