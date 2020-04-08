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
  field: { [key: string]: any, name: string, ... },
  testValue: { [key: string]: any, ... },
  argsValue?: { [key: string]: any, ... },
  contextValue?: { [key: string]: any, ... },
): any {
  const resolveFn =
    field.resolve ||
    function resolveMock(): string {
      return testValue[field.name];
    };
  const resolvedValue = resolveFn(testValue, argsValue, contextValue, {
    path: { key: 'mocked' },
  });

  if (typeof field.type.serialize === 'function') {
    return field.type.serialize(resolvedValue);
  }
  return resolvedValue;
}
