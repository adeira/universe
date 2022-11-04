// @flow strict

import { isNumeric, invariant } from '@adeira/js';

import { isListSection, KNOWN_LIST_OPTIONS } from './utils';
import type { ParsedConfig } from './ParsedConfig.flow';

export default function parse(input: string): ParsedConfig {
  const lines = input
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const parsedConfig = {
    // default values (TODO: remove and do not return defaults?)
    declarations: [],
    ignore: [],
    include: [],
    libs: [],
    lints: null,
    options: null,
    rollouts: null,
    strict: [],
    untyped: [],
    version: null,
  };

  let currentSection = null;
  for (const line of lines) {
    const commentMatch = line.match(/[;#💩]/u);
    if (commentMatch) {
      continue;
    }

    const sectionMatch = line.match(/\[(?<sectionName>[a-z]+)]/i);
    if (sectionMatch) {
      // TODO: validate sections (?)
      currentSection = sectionMatch.groups?.sectionName.toLowerCase();
      continue;
    }

    invariant(currentSection != null, 'All config values must be inside some section.');

    if (isListSection(currentSection)) {
      // process it as a list
      parsedConfig[currentSection].push(line);
    } else if (currentSection === 'version') {
      /* $FlowFixMe[incompatible-type] This comment suppresses an error when
       * upgrading Flow. To see the error delete this comment and run Flow. */
      parsedConfig[currentSection] = line;
    } else {
      // process it as a key/value (while ignoring rollout annotations since we do not merge them properly, yet)
      const keyValueMatch = line.match(/^(?:(?<rollout>\(.+\)))?(?<rawKey>.+)=(?<rawValue>.+)$/);
      if (keyValueMatch) {
        const rawKey = keyValueMatch.groups?.rawKey;
        const rawValue = keyValueMatch.groups?.rawValue;
        const key = rawKey?.trim();
        if (parsedConfig[currentSection] === null) {
          /* $FlowFixMe[prop-missing] This comment suppresses an error when
           * upgrading Flow to version 0.191.0. To see the error delete this
           * comment and run Flow. */
          parsedConfig[currentSection] = {};
        }
        if (KNOWN_LIST_OPTIONS.includes(key)) {
          const previousValues = parsedConfig[currentSection][key] ?? [];
          parsedConfig[currentSection][key] = previousValues.concat(rawValue);
        } else {
          parsedConfig[currentSection][key] = transformKeyValue(rawValue);
        }
      }
    }
  }

  return parsedConfig;
}

function transformKeyValue(value: void | string) {
  if (value?.toLowerCase() === 'true') {
    return true;
  } else if (value?.toLowerCase() === 'false') {
    return false;
  } else if (isNumeric(value)) {
    return Number(value);
  }
  return value;
}
