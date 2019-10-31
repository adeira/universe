// @flow

import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

function createGraphQLSchema(fields: { [key: string]: any, ... }) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQuery',
      fields,
    }),
  });
}

function createGraphQLObject(name: string = 'Test') {
  return {
    type: new GraphQLObjectType({
      name,
      fields: {
        id: {
          type: GraphQLString,
        },
      },
    }),
  };
}

module.exports = {
  validSchema: (createGraphQLSchema({
    test: createGraphQLObject(),
  }): GraphQLSchema),
  compatibleSchema: (createGraphQLSchema({
    test: createGraphQLObject(),
    test2: createGraphQLObject('Test2'), // just adding a new field (backward compatible)
  }): GraphQLSchema),
  breakingSchema: (createGraphQLSchema({
    thisFieldIsDifferent: createGraphQLObject(),
  }): GraphQLSchema),
};
