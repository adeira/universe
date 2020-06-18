// @flow

import { invariant } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

function suggest(name: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(name, firstEl);
    const secondScore = levenshtein.get(name, secondEl);
    return firstScore - secondScore;
  })[0];
}

function validateObjectKeys(
  object: { [string]: mixed, ... },
  allowedFields: Map<string, boolean>,
): void | empty {
  for (const key of Object.keys(object)) {
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
        object[fieldName] !== undefined,
        "Configuration field '%s' is required but it's missing.",
        fieldName,
      );
    }
  }
}

export default function requireAndValidateConfig(configFile: string) {
  const config = require(configFile);
  const allowedFields = new Map([
    // filed name => is required
    ['getBranchConfig', false],
    ['getStaticConfig', true],
    ['getPathMappings', true],
    ['getStrippedFiles', false],
  ]);

  // TODO: consider Ajv but with good error messages!
  validateObjectKeys(config, allowedFields);

  if (config.getBranchConfig) {
    validateObjectKeys(
      config.getBranchConfig(),
      new Map([
        ['source', true],
        ['destination', true],
      ]),
    );
  }

  if (config.getStaticConfig) {
    validateObjectKeys(config.getStaticConfig(), new Map([['repository', true]]));
  }

  return config;
}
