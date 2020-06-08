// @flow strict

import {
  buildSchema,
  findDangerousChanges,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  lexicographicSortSchema,
  printSchema,
} from 'graphql';

const input = new GraphQLInputObjectType({
  name: 'Input',
  description: 'An input type',
  fields: {
    bbb: { type: GraphQLString },
    aaa: { type: GraphQLString },
  },
});

const originalSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    description: 'An Object type',
    name: 'RootQueryType',
    fields: {
      xxx: {
        type: GraphQLString,
        args: {
          yyy: {
            type: GraphQLNonNull(input),
            defaultValue: {
              bbb: 'bbb',
              aaa: 'aaa', // not sorted lexicographically
            },
          },
        },
      },
    },
  }),
});

const printedSchema = printSchema(lexicographicSortSchema(originalSchema));
const deserializedSchema = buildSchema(printedSchema);

it('should not return any dangerous changes', () => {
  // Please note: this is was previously broken so I am keeping the test here to make sure it still works correctly.
  // See: https://github.com/graphql/graphql-js/issues/2150

  expect(findDangerousChanges(deserializedSchema, originalSchema)).toEqual([]);

  expect(printedSchema).toMatchInlineSnapshot(`
    "schema {
      query: RootQueryType
    }

    \\"\\"\\"An input type\\"\\"\\"
    input Input {
      aaa: String
      bbb: String
    }

    \\"\\"\\"An Object type\\"\\"\\"
    type RootQueryType {
      xxx(yyy: Input! = {aaa: \\"aaa\\", bbb: \\"bbb\\"}): String
    }
    "
  `);
});

it('should return dangerous changes', () => {
  const changedSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      description: 'A root type',
      fields: {
        xxx: {
          type: GraphQLString,
          args: {
            yyy: {
              type: GraphQLNonNull(input),
              defaultValue: {
                aaa: 'bbb', // default value changed here
              },
            },
          },
        },
      },
    }),
  });

  expect(findDangerousChanges(originalSchema, changedSchema)).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "RootQueryType.xxx arg yyy has changed defaultValue from {aaa: \\"aaa\\", bbb: \\"bbb\\"} to {aaa: \\"bbb\\"}.",
        "type": "ARG_DEFAULT_VALUE_CHANGE",
      },
    ]
  `);
});
