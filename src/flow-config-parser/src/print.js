// @flow strict

import { KNOWN_LIST_OPTIONS } from './utils';
import type { ParsedConfig } from './ParsedConfig.flow';

export default function print(flowconfig: ParsedConfig): string {
  let printedConfig = '';

  let sep = '';
  for (const sectionName of Object.keys(flowconfig)) {
    const sectionValues = flowconfig[sectionName];
    printedConfig += `${sep}[${sectionName}]\n`;
    sep = '\n';

    if (Array.isArray(sectionValues)) {
      printedConfig += `${sectionValues.join('\n')}\n`;
    } else if (sectionName === 'version' && sectionValues != null) {
      printedConfig += `${sectionValues}\n`;
    } else if (sectionValues != null) {
      // go through the individual values and print them
      for (const sectionValueKey of Object.keys(sectionValues)) {
        const sectionValue = sectionValues[sectionValueKey];
        if (KNOWN_LIST_OPTIONS.includes(sectionValueKey)) {
          for (const value of sectionValue) {
            printedConfig += `${sectionValueKey}=${value}\n`;
          }
        } else {
          printedConfig += `${sectionValueKey}=${sectionValue}\n`;
        }
      }
    }
  }

  return printedConfig;
}
