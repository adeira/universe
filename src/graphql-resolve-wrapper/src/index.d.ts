import { GraphQLSchema, GraphQLFieldResolver } from 'graphql';

export function wrapResolvers<TContext>(
  schema: GraphQLSchema,
  resolveFn: (
    resolveFn: GraphQLFieldResolver<unknown, TContext>,
  ) => (
    ...args: Parameters<GraphQLFieldResolver<unknown, TContext>>
  ) => Promise<GraphQLFieldResolver<unknown, TContext>>,
): void;
