// @flow

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { wrapResolvers } from '../index';
import { evaluateResolver } from '../../../common/services/TestingTools';

let fields, schema;
beforeEach(() => {
  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        noResolveFunction: {
          type: GraphQLString,
        },

        resolveValueString: {
          type: GraphQLString,
          resolve: () => {
            return 'aaa';
          },
        },

        resolveValueNumber: {
          type: GraphQLInt,
          resolve: () => {
            return 111;
          },
        },

        resolvePromise: {
          type: GraphQLString,
          // keep it `async` please
          resolve: async () => {
            return 'bbb';
          },
        },

        throwError: {
          type: GraphQLString,
          resolve: () => {
            throw new Error('secret error ccc');
          },
        },
      },
    }),
  });

  // $FlowExpectedError: `getTypeMap` may return anything but I know it's object type in this case
  const rootQueryType: GraphQLObjectType = schema.getTypeMap().RootQueryType;
  fields = rootQueryType.getFields();
});

describe('default wrapper', () => {
  beforeEach(() => {
    wrapResolvers(schema);
  });

  test.each([
    ['noResolveFunction', undefined],
    ['resolveValueString', 'aaa'],
    ['resolveValueNumber', 111],
  ])('should resolve field %p with value %p', (field, expectedValue) => {
    expect(evaluateResolver(fields[field], {})).toBe(expectedValue);
  });

  it('resolves promise', async () => {
    await expect(evaluateResolver(fields.resolvePromise, {})).resolves.toBe(
      'bbb',
    );
  });

  it('throws an error', () => {
    expect(() => evaluateResolver(fields.throwError, {})).toThrowError(
      'secret error ccc',
    );
  });
});

describe('custom wrapper', () => {
  beforeEach(() => {
    wrapResolvers(schema, resolveFn => async (...args) => {
      // please note: this effectively turns every resolver into promise
      const value = await resolveFn(...args);
      return typeof value === 'string' ? value.toUpperCase() : value;
    });
  });

  test.each([
    ['resolveValueString', 'AAA'],
    ['resolveValueNumber', 111],
    ['resolvePromise', 'BBB'],
  ])('should resolve field %p with value %p', async (field, expectedValue) => {
    await expect(evaluateResolver(fields[field], {})).resolves.toBe(
      expectedValue,
    );
  });

  it('throws an error', async () => {
    await expect(evaluateResolver(fields.throwError, {})).rejects.toThrowError(
      'secret error ccc',
    );
  });
});
