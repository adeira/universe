// @flow

import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

function createGraphQLSchema(fields: { [key: string]: any, ... }) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      description: 'The query root of the schema',
      name: 'RootQuery',
      fields,
    }),
  });
}

function createGraphQLObject(name: string = 'Test') {
  return {
    type: new GraphQLObjectType({
      name,
      description: 'A test object type',
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
    /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
     * GraphQL to version 16.x. To see the error delete this comment and run
     * Flow. */
  }): GraphQLSchema),
  compatibleSchema: (createGraphQLSchema({
    test: createGraphQLObject(),
    test2: createGraphQLObject('Test2'), // just adding a new field (backward compatible)
    /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
     * GraphQL to version 16.x. To see the error delete this comment and run
     * Flow. */
  }): GraphQLSchema),
  breakingSchema: (createGraphQLSchema({
    thisFieldIsDifferent: createGraphQLObject(),
    /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
     * GraphQL to version 16.x. To see the error delete this comment and run
     * Flow. */
  }): GraphQLSchema),
};
