/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { GraphQLObjectType, GraphQLSchema, GraphQLString, graphql } from 'graphql';

import { pluralIdentifyingRootField } from '../plural';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'test',
  fields: () => ({
    username: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'test',
  fields: () => ({
    usernames: pluralIdentifyingRootField({
      argName: 'usernames',
      description: 'Map from a username to the user',
      inputType: GraphQLString,
      outputType: userType,
      resolveSingleInput: (username, { lang }) => ({
        username,
        url: `www.facebook.com/${username}?lang=${lang}`,
      }),
    }),
  }),
});

const schema = new GraphQLSchema({
  query: queryType,
});

const context = { lang: 'en' };

describe('pluralIdentifyingRootField()', () => {
  it('allows fetching', async () => {
    const query = `{
      usernames(usernames:[ "dschafer", "leebyron", "schrockn" ]) {
        username
        url
      }
    }`;

    await expect(graphql(schema, query, null, context)).resolves.toEqual({
      data: {
        usernames: [
          {
            username: 'dschafer',
            url: 'www.facebook.com/dschafer?lang=en',
          },
          {
            username: 'leebyron',
            url: 'www.facebook.com/leebyron?lang=en',
          },
          {
            username: 'schrockn',
            url: 'www.facebook.com/schrockn?lang=en',
          },
        ],
      },
    });
  });

  it('correctly introspects', async () => {
    const query = `{
      __schema {
        queryType {
          fields {
            name
            args {
              name
              type {
                kind
                ofType {
                  kind
                  ofType {
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                }
              }
            }
            type {
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }`;

    await expect(graphql(schema, query)).resolves.toEqual({
      data: {
        __schema: {
          queryType: {
            fields: [
              {
                name: 'usernames',
                args: [
                  {
                    name: 'usernames',
                    type: {
                      kind: 'NON_NULL',
                      ofType: {
                        kind: 'LIST',
                        ofType: {
                          kind: 'NON_NULL',
                          ofType: {
                            name: 'String',
                            kind: 'SCALAR',
                          },
                        },
                      },
                    },
                  },
                ],
                type: {
                  kind: 'LIST',
                  ofType: {
                    name: 'User',
                    kind: 'OBJECT',
                  },
                },
              },
            ],
          },
        },
      },
    });
  });
});
