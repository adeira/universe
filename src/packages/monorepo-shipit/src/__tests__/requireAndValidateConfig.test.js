// @flow strict-local

import requireAndValidate from '../requireAndValidateConfig';

it('returns valid config correctly', () => {
  const config = requireAndValidate(`${__dirname}/fixtures/configs/valid.js`);
  expect(config).toMatchInlineSnapshot(`
    Object {
      "getDefaultPathMappings": [Function],
      "getStaticConfig": [Function],
    }
  `);
  expect(config.getDefaultPathMappings()).toMatchInlineSnapshot(`
    Map {
      "src/apps/example-relay/__github__/.flowconfig" => ".flowconfig",
      "src/apps/example-relay/" => "",
    }
  `);
  expect(config.getStaticConfig()).toMatchInlineSnapshot(`
    Object {
      "githubOrg": "kiwicom",
      "githubProject": "relay-example",
    }
  `);
});

it('fails when config contains unsupported fields', () => {
  expect(() =>
    requireAndValidate(
      `${__dirname}/fixtures/configs/invalid-additional-props-1.js`,
    ),
  ).toThrowError(
    "Your config contains field 'defaultStrippedFiles' but this is not allowed key. Did you mean 'getDefaultStrippedFiles' instead?",
  );
  expect(() =>
    requireAndValidate(
      `${__dirname}/fixtures/configs/invalid-additional-props-2.js`,
    ),
  ).toThrowError(
    "Your config contains field 'defaultPathMappings' but this is not allowed key. Did you mean 'getDefaultPathMappings' instead?",
  );
});

it('fails when config does not contain all the required props', () => {
  expect(() =>
    requireAndValidate(
      `${__dirname}/fixtures/configs/invalid-missing-props.js`,
    ),
  ).toThrowError(
    "Configuration field 'getStaticConfig' is required but it's missing.",
  );
});
