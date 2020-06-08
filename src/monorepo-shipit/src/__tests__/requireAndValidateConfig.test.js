// @flow strict-local

import path from 'path';

import requireAndValidate from '../requireAndValidateConfig';

it('returns minimal valid config correctly', () => {
  const config = requireAndValidate(
    path.join(__dirname, 'fixtures', 'configs', 'valid-minimal.js'),
  );
  expect(config).toMatchInlineSnapshot(`
    Object {
      "getPathMappings": [Function],
      "getStaticConfig": [Function],
    }
  `);
  expect(config.getPathMappings()).toMatchInlineSnapshot(`
    Map {
      "src/apps/example-relay/__github__/.flowconfig" => ".flowconfig",
      "src/apps/example-relay/" => "",
    }
  `);
  expect(config.getStaticConfig()).toMatchInlineSnapshot(`
    Object {
      "repository": "git@github.com/adeira/relay-example.git",
    }
  `);
});

it('returns valid config with branches correctly', () => {
  const config = requireAndValidate(
    path.join(__dirname, 'fixtures', 'configs', 'valid-branches.js'),
  );
  expect(config).toMatchInlineSnapshot(`
    Object {
      "getBranchConfig": [Function],
      "getPathMappings": [Function],
      "getStaticConfig": [Function],
    }
  `);
  expect(config.getPathMappings()).toMatchInlineSnapshot(`
    Map {
      "src/apps/example-relay/__github__/.flowconfig" => ".flowconfig",
      "src/apps/example-relay/" => "",
    }
  `);
  expect(config.getStaticConfig()).toMatchInlineSnapshot(`
    Object {
      "repository": "git@github.com/adeira/relay-example.git",
    }
  `);
});

it('fails when config contains unsupported fields', () => {
  expect(() =>
    requireAndValidate(
      path.join(__dirname, 'fixtures', 'configs', 'invalid-additional-props-1.js'),
    ),
  ).toThrowError(
    "Your config contains field 'defaultStrippedFiles' but this is not allowed key. Did you mean 'getStrippedFiles' instead?",
  );
  expect(() =>
    requireAndValidate(
      path.join(__dirname, 'fixtures', 'configs', 'invalid-additional-props-2.js'),
    ),
  ).toThrowError(
    "Your config contains field 'defaultPathMappings' but this is not allowed key. Did you mean 'getPathMappings' instead?",
  );
});

it("fails when branch config doesn't have valid keys", () => {
  expect(() =>
    requireAndValidate(
      path.join(__dirname, 'fixtures', 'configs', 'invalid-misconfigured-branches.js'),
    ),
  ).toThrowError(
    "Your config contains field 'what_is_this' but this is not allowed key. Did you mean 'destination' instead?",
  );
});

it('fails when config does not contain all the required props', () => {
  expect(() =>
    requireAndValidate(path.join(__dirname, 'fixtures', 'configs/invalid-missing-props.js')),
  ).toThrowError("Configuration field 'getStaticConfig' is required but it's missing.");
});
