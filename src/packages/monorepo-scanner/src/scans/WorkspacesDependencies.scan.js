// @flow

import { Workspaces } from '@kiwicom/monorepo-utils';

/**
 * Please update this list with well know similar dependencies and
 * suggest one we should use (Map key).
 */
const similarities = new Map([
  [
    // data fetching
    '@kiwicom/fetch',
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
  [
    // CLI interface
    'commander',
    ['minimist', 'optimist', 'yargs'],
  ],
  [
    // helper functions
    'ramda',
    ['lodash'],
  ],
]);

const exceptions = new Map([
  // @kiwicom/fetch is the only package with allowed cross-fetch dependency (internal wrapped dependency)
  ['@kiwicom/fetch', ['cross-fetch']],
]);

describe('dependencies similarities', () => {
  Workspaces.iterateWorkspaces(packageJSONLocation => {
    test(packageJSONLocation, done => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      const packageDependencies = dependencies.concat(devDependencies);

      for (const [
        mainDependency,
        similarDependencies,
      ] of similarities.entries()) {
        similarDependencies.forEach(similarDependency => {
          packageDependencies.forEach(dependency => {
            if (similarDependency === dependency) {
              // some package is using forbidden dependency but there may be an exception:
              const packageExceptions = exceptions.get(mainDependency) ?? [];
              if (!packageExceptions.includes(dependency)) {
                done.fail(
                  `Project ${
                    packageJson.name
                  } requires dependency '${dependency}' but it should use '${mainDependency}' instead.`,
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
