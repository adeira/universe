// @flow

import generateTestsFromFixtures from './generateTestsFromFixtures';

/**
 * Use this function to evaluate resolvers in test files. Usage:
 *
 * ```js
 * const fields = Location.getFields();
 * expect(
 *   evaluateResolver(fields.countryFlagURL, {
 *     country: ' ... ', // test value
 *   }),
 * ).toBe(' ... ');
 * ```
 */
function evaluateGraphQLResolver(
  field: Object,
  testValue: mixed,
  argsValue?: Object,
  contextValue?: Object,
) {
  const resolveFn = field.resolve || function resolveMock() {};
  return resolveFn(testValue, argsValue, contextValue, {
    path: { key: 'mocked' },
  });
}

export { evaluateGraphQLResolver, generateTestsFromFixtures };
