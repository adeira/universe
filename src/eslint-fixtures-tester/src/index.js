// @flow

import fs from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { extract, parse } from 'jest-docblock';
import { sprintf } from '@adeira/js';
import type { EslintRule } from '@adeira/flow-types-eslint';

function createErrorObject(pragma: string): {
  +message?: string,
  +line?: number,
  +column?: number,
  +endLine?: number,
  +endColumn?: number,
  ...
} {
  const locations = pragma.match(
    /\((?<line>\d+):(?<column>\d+);(?<endLine>\d+):(?<endColumn>\d+)\)\s+(?<message>.+)/,
  );
  const error = {};
  error.message = pragma;
  if (locations) {
    const groups = locations.groups;
    error.message = groups?.message;
    error.line = Number(groups?.line);
    error.column = Number(groups?.column);
    error.endLine = Number(groups?.endLine);
    error.endColumn = Number(groups?.endColumn);
  }
  return error;
}

export default function testFixtures({
  rule,
  validFixturesPath,
  invalidFixturesPath,
}: {
  rule: EslintRule,
  validFixturesPath: string,
  invalidFixturesPath: string,
}): void {
  const validFixtures = [];
  const invalidFixtures = [];
  for (const fixture of fs.readdirSync(validFixturesPath)) {
    validFixtures.push({
      code: fs.readFileSync(path.join(validFixturesPath, fixture), 'utf8'),
    });
  }
  for (const fixture of fs.readdirSync(invalidFixturesPath)) {
    if (fixture === 'autofixed') {
      // special hardcoded directory name with "autofixed" versions
      continue;
    }
    const code = fs.readFileSync(path.join(invalidFixturesPath, fixture), 'utf8');
    let codeAutofixed = null;
    if (fs.existsSync(path.join(invalidFixturesPath, 'autofixed', fixture))) {
      codeAutofixed = fs.readFileSync(path.join(invalidFixturesPath, 'autofixed', fixture), 'utf8');
    }
    const docblock = extract(code);
    const pragmas = parse(docblock);
    if (pragmas.eslintExpectedError == null) {
      throw new Error(
        sprintf("Test fixture '%s' must define at least one @eslintExpectedError pragma.", fixture),
      );
    }
    if (Array.isArray(pragmas.eslintExpectedError)) {
      invalidFixtures.push({
        code,
        errors: pragmas.eslintExpectedError.map((message) => createErrorObject(message)),
        output: codeAutofixed,
      });
    } else {
      invalidFixtures.push({
        code,
        errors: [createErrorObject(pragmas.eslintExpectedError)],
        output: codeAutofixed,
      });
    }
  }

  const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
  });

  ruleTester.run('no-unused-stylesheet', rule, {
    valid: validFixtures,
    invalid: invalidFixtures,
  });
}
