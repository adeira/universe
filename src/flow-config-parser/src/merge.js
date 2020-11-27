// @flow strict

import parse from './parse';
import print from './print';
import { KNOWN_LIST_OPTIONS } from './utils';

export default function merge(flowconfigA: string, flowconfigB: string): string {
  const configA = parse(flowconfigA);
  const configB = parse(flowconfigB);

  for (const section of Object.keys(configB)) {
    const sectionValues = configB[section];
    if (Array.isArray(sectionValues)) {
      // merge lists together
      configA[section] = configA[section].concat(sectionValues);
    } else if (section === 'version') {
      // special case for version
      configA[section] = sectionValues;
    } else if (sectionValues != null) {
      // go through each property and either overwrite it or merge it into the list
      for (const sectionValueKey of Object.keys(sectionValues)) {
        const sectionValue = sectionValues[sectionValueKey];
        if (KNOWN_LIST_OPTIONS.includes(sectionValueKey)) {
          configA[section][sectionValueKey] = configA[section][sectionValueKey].concat(
            sectionValue,
          );
        } else {
          configA[section][sectionValueKey] = sectionValue;
        }
      }
    }
  }

  return print(configA);
}
