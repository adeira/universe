// @flow

const fs = require('fs');
const path = require('path');
const { extract, parse } = require('jest-docblock');
const RuleTester = require('eslint').RuleTester;

const rule = require('../no-unused-stylesheet');

const fixturesPath = path.join(__dirname, 'fixtures');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');
const validFixtures = [];
const invalidFixtures = [];
for (const fixture of fs.readdirSync(validFixturesPath)) {
  validFixtures.push({
    code: fs.readFileSync(path.join(validFixturesPath, fixture), 'utf8'),
  });
}
for (const fixture of fs.readdirSync(invalidFixturesPath)) {
  const code = fs.readFileSync(path.join(invalidFixturesPath, fixture), 'utf8');
  const docblock = extract(code);
  const pragmas = parse(docblock);
  if (pragmas.eslintExpectedError == null) {
    throw new Error('Test fixture must define at least one @eslintExpectedError pragma.');
  }
  if (Array.isArray(pragmas.eslintExpectedError)) {
    invalidFixtures.push({
      code,
      errors: pragmas.eslintExpectedError.map((message) => ({ message })),
    });
  } else {
    invalidFixtures.push({
      code,
      errors: [{ message: pragmas.eslintExpectedError }],
    });
  }
}

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('no-unused-stylesheet', rule, {
  valid: validFixtures,
  invalid: invalidFixtures,
});
