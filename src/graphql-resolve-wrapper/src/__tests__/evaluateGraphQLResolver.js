// @flow

/**
 * Use this function to evaluate resolvers in test files. Usage:
 *
 * ```js
 * const fields = Location.getFields();
 * expect(
 *   evaluateGraphQLResolver(fields.countryFlagURL, {
 *     country: ' ... ', // test value
 *   }),
 * ).toBe(' ... ');
 * ```
 */
export default function evaluateGraphQLResolver(
  field: { [key: string]: any, ... },
  testValue: mixed,
  argsValue?: { [key: string]: any, ... },
  contextValue?: { [key: string]: any, ... },
): any {
  const resolveFn = field.resolve || function resolveMock() {};
  return resolveFn(testValue, argsValue, contextValue, {
    path: { key: 'mocked' },
  });
}
