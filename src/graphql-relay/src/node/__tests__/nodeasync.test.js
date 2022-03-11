/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-disable adeira/only-nullable-fields */

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';

import { nodeDefinitions } from '../node';

// prettier-ignore
const userData = {
  '1': {
    id: 1,
    name: 'John Doe',
  },
  '2': {
    id: 2,
    name: 'Jane Smith',
  },
};

const { nodeField, nodeInterface } = nodeDefinitions(
  (id) => {
    return userData[id];
  },
  () => {
    return userType.name;
  },
);

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'test',
  interfaces: [nodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'test',
  fields: () => ({
    node: nodeField,
  }),
});

const schema = new GraphQLSchema({
  query: queryType,
  types: [userType],
});

describe('Node interface and fields with async object fetcher', () => {
  it('gets the correct ID for users', async () => {
    const query = `{
      node(id: "1") {
        id
      }
    }`;

    await expect(graphql({ schema, source: query })).resolves.toEqual({
      data: {
        node: {
          id: '1',
        },
      },
    });
  });

  it('gets the correct name for users', async () => {
    const query = `{
      node(id: "1") {
        id
        ... on User {
          name
        }
      }
    }`;

    await expect(graphql({ schema, source: query })).resolves.toEqual({
      data: {
        node: {
          id: '1',
          name: 'John Doe',
        },
      },
    });
  });
});
