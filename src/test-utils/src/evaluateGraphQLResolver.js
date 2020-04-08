// @flow

import { coerceInputValue, defaultFieldResolver } from 'graphql';

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
  const resolvedValue = getResolvedValue(field, testValue, argsValue, contextValue);

  if (typeof field.type.serialize === 'function') {
    return field.type.serialize(resolvedValue);
  } else if (typeof field.type.ofType?.serialize === 'function') {
    coerceInputValue(resolvedValue, field.type);
    return field.type.ofType.serialize(resolvedValue);
  }
  return resolvedValue;
}

function getResolvedValue(field, testValue, argsValue, contextValue): mixed {
  const resolver = typeof field.resolve === 'function' ? field.resolve : defaultFieldResolver;
  const info: any = {
    fieldName: field.name,
    path: { key: 'mocked' },
  };

  return resolver(testValue, argsValue ?? {}, contextValue, info);
}
