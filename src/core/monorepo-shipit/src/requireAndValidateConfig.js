// @flow

import { invariant } from '@kiwicom/js';
import levenshtein from 'fast-levenshtein';

function suggest(name: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(name, firstEl);
    const secondScore = levenshtein.get(name, secondEl);
    return firstScore - secondScore;
  })[0];
}

export default function requireAndValidateConfig(configFile: string) {
  // $FlowAllowDynamicImport
  const config = require(configFile);
  const allowedFields = new Map([
    // filed name => is required
    ['getStaticConfig', true],
    ['getDefaultPathMappings', true],
    ['getDefaultStrippedFiles', false],
  ]);

  for (const key of Object.keys(config)) {
    invariant(
      allowedFields.has(key),
      "Your config contains field '%s' but this is not allowed key. Did you mean '%s' instead?",
      key,
      suggest(key, [...allowedFields.keys()]),
    );
  }

  for (const [fieldName, isRequired] of allowedFields) {
    if (isRequired) {
      invariant(
        config[fieldName] !== undefined,
        "Configuration field '%s' is required but it's missing.",
        fieldName,
      );
    }
  }

  return config;
}
