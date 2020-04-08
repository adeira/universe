// @flow

/* eslint-disable adeira/graphql-require-object-description */

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import evaluateGraphQLResolver from '../evaluateGraphQLResolver';

function createType(type: any): GraphQLObjectType {
  return new GraphQLObjectType({
    name: 'SomeType',
    fields: {
      value: {
        type,
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

  it('just returns the input on complex type', () => {
    const { value } = createType('ComplexType').getFields();
    const input = { foo: 'bar' };

    expect(evaluateGraphQLResolver(value, { value: input })).toStrictEqual(input);
  });
});
