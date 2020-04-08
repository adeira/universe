// @flow

/* eslint-disable adeira/graphql-require-object-description */
/* eslint-disable adeira/only-nullable-fields */

import { GraphQLObjectType, GraphQLFloat, GraphQLNonNull, GraphQLInt } from 'graphql';

import evaluateGraphQLResolver from '../evaluateGraphQLResolver';

function createType(type: any, resolveFn?: () => any): GraphQLObjectType {
  return new GraphQLObjectType({
    name: 'SomeType',
    fields: {
      value: {
        type,
        resolve: resolveFn ?? undefined,
      },
    },
  });
}

describe('evaluateGraphQLResolver', () => {
  it('works with default graphql scalar', () => {
    const { value } = createType(GraphQLFloat).getFields();

    expect(evaluateGraphQLResolver(value, { value: 3.14 })).toBe(3.14);
    expect(evaluateGraphQLResolver(value, { value: '3.14' })).toBe(3.14);
    expect(() => evaluateGraphQLResolver(value, { value: 'abc' })).toThrowError(
      'Float cannot represent non numeric value: "abc"',
    );
  });

  it('works with not null graphql scalar', () => {
    const { value } = createType(new GraphQLNonNull(GraphQLInt)).getFields();

    expect(evaluateGraphQLResolver(value, { value: 42 })).toBe(42);
    expect(() => evaluateGraphQLResolver(value, { value: null })).toThrowError(
      'Invalid value null: Expected non-nullable type Int! not to be null',
    );
    expect(() => evaluateGraphQLResolver(value, { value: 9999999999 })).toThrowError(
      'Int cannot represent non 32-bit signed integer value: 9999999999',
    );
  });

  it('just returns the input on complex type', () => {
    const { value } = createType('ComplexType').getFields();
    const input = { foo: 'bar' };

    expect(evaluateGraphQLResolver(value, { value: input })).toStrictEqual(input);
  });

  it('works with resolve function', () => {
    const { value } = createType(GraphQLInt, (_source, { param }: any) => {
      return param;
    }).getFields();

    expect(evaluateGraphQLResolver(value, {}, { param: 42 })).toBe(42);
    expect(() => evaluateGraphQLResolver(value, {}, { param: 3.14 })).toThrowError(
      'Int cannot represent non-integer value: 3.14',
    );
  });
});
