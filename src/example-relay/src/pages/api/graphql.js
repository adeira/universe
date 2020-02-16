// @flow

import { ApolloServer } from 'apollo-server-micro';
import { Schema } from '@adeira/example-relay-graphql';

const apolloServer = new ApolloServer({ schema: Schema, introspection: true, playground: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
