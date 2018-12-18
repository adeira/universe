// @flow

import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { evaluateGraphQLResolver } from '@kiwicom/test-utils';

import { wrapResolvers, isSystemType } from '../index';

let fields, schema;
beforeEach(() => {
  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      description: 'Root Query',
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
          type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLInt))),
          deprecationReason: 'for testing',
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
  const rootQueryType: GraphQLObjectType = schema.getQueryType();
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
    expect(evaluateGraphQLResolver(fields[field], {})).toBe(expectedValue);
  });

  it('resolves promise', async () => {
    await expect(
      evaluateGraphQLResolver(fields.resolvePromise, {}),
    ).resolves.toBe('bbb');
  });

  it('throws an error', () => {
    expect(() => evaluateGraphQLResolver(fields.throwError, {})).toThrowError(
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
    await expect(evaluateGraphQLResolver(fields[field], {})).resolves.toBe(
      expectedValue,
    );
  });

  it('throws an error', async () => {
    await expect(
      evaluateGraphQLResolver(fields.throwError, {}),
    ).rejects.toThrowError('secret error ccc');
  });

  it('should not affect system fields', async () => {
    // this should not return query name `ROOTQUERYTYPE` with desc `ROOT QUERY`
    await expect(
      graphql(
        schema,
        `
          {
            __schema {
              queryType {
                name
                description
              }
            }
          }
        `,
      ),
    ).resolves.toMatchInlineSnapshot(`
Object {
  "data": Object {
    "__schema": Object {
      "queryType": Object {
        "description": "Root Query",
        "name": "RootQueryType",
      },
    },
  },
}
`);
  });
});

describe('isSystemType', () => {
  test.each(['__Type', '__Schema'])('matches system field: %p', typeName => {
    expect(isSystemType(typeName)).toBe(true);
  });

  test.each(['RootMutation', '_singleUnderscore'])(
    'does not match any other field: %p',
    typeName => {
      expect(isSystemType(typeName)).toBe(false);
    },
  );
});

describe('fields info', () => {
  const filteredFields = [];

  beforeEach(() => {
    wrapResolvers(schema, (resolveFn, field) =>
      // $FlowExpectedError: we are not returning resolve function here
      filteredFields.push({
        name: field.name,
        type: field.type,
        isDeprecated: field.isDeprecated,
        deprecationReason: field.deprecationReason,
      }),
    );
  });

  it('is available', () => {
    expect(filteredFields).toMatchInlineSnapshot(`
Array [
  Object {
    "deprecationReason": undefined,
    "isDeprecated": false,
    "name": "resolveValueString",
    "type": "String",
  },
  Object {
    "deprecationReason": "for testing",
    "isDeprecated": true,
    "name": "resolveValueNumber",
    "type": "[Int!]!",
  },
  Object {
    "deprecationReason": undefined,
    "isDeprecated": false,
    "name": "resolvePromise",
    "type": "String",
  },
  Object {
    "deprecationReason": undefined,
    "isDeprecated": false,
    "name": "throwError",
    "type": "String",
  },
]
`);
  });
});
