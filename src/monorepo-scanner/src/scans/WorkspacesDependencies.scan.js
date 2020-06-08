// @flow

import { Workspaces } from '@adeira/monorepo-utils';

/**
 * Please update this list with well know similar dependencies and
 * suggest one we should use (Map key).
 */
const similarities = new Map([
  [
    // data fetching
    '@adeira/fetch',
    [
      'request',
      'request-promise-native',
      'fetch',
      'node-fetch',
      'whatwg-fetch',
      'cross-fetch',
      'isomorphic-fetch',
      'unfetch',
    ],
  ],
  // Design systems
  ['grommet', ['@kiwicom/orbit-components']],
  [
    // helper functions
    'ramda',
    ['lodash'],
  ],
  [
    // banned dependencies
    null,
    [
      'fbjs', // https://github.com/facebook/fbjs/blob/36f30888cfba866d44df61d5172f870b56c83d8e/README.md
    ],
  ],
]);

const exceptions = new Map([
  // @adeira/fetch is the only package with allowed cross-fetch dependency (internal wrapped dependency)
  ['@adeira/fetch', ['cross-fetch']],
]);

describe('dependencies similarities', () => {
  Workspaces.iterateWorkspaces((packageJSONLocation) => {
    test(`${packageJSONLocation}`, (done) => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      const packageDependencies = dependencies.concat(devDependencies);

      for (const [mainDependency, similarDependencies] of similarities.entries()) {
        similarDependencies.forEach((similarDependency) => {
          packageDependencies.forEach((dependency) => {
            if (similarDependency === dependency) {
              // some package is using forbidden dependency but there may be an exception:
              const packageExceptions = exceptions.get(mainDependency) ?? [];
              if (!packageExceptions.includes(dependency)) {
                const reasoning =
                  mainDependency === null
                    ? 'this dependency is not allowed.'
                    : `it should use '${mainDependency}' instead.`;
                throw new Error(
                  `Project ${packageJson.name} requires dependency '${dependency}' but ${reasoning}`,
                );
              }
            }
          });
        });
      }

      done();
    });
  });
});
