// @flow strict-local

// $FlowPullRequest: https://github.com/facebook/flow/pull/7660
import { strict as assert } from 'assert';

export default function requireAndValidateConfig(configFile: string) {
  // $FlowAllowDynamicImport
  const config = require(configFile);

  assert.deepStrictEqual(Object.keys(config), [
    'getStaticConfig',
    'getDefaultPathMappings',
  ]);

  return config;
}
