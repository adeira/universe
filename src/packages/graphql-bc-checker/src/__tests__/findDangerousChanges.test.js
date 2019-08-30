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
  fields: {
    bbb: { type: GraphQLString },
    aaa: { type: GraphQLString },
  },
});

const originalSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
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
  // Please note: this is currently broken and added here only so we can report it and later
  // verify it's fixed correctly.

  expect(findDangerousChanges(deserializedSchema, originalSchema)).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "RootQueryType.xxx arg yyy has changed defaultValue from {aaa: \\"aaa\\", bbb: \\"bbb\\"} to {bbb: \\"bbb\\", aaa: \\"aaa\\"}.",
        "type": "ARG_DEFAULT_VALUE_CHANGE",
      },
    ]
  `);

  expect(printedSchema).toMatchInlineSnapshot(`
    "schema {
      query: RootQueryType
    }

    input Input {
      aaa: String
      bbb: String
    }

    type RootQueryType {
      xxx(yyy: Input! = {aaa: \\"aaa\\", bbb: \\"bbb\\"}): String
    }
    "
  `);
});
