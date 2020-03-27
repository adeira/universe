import { GraphQLFieldConfig, GraphQLResolveInfo } from 'graphql';

export function fromGlobalId(opaqueID: string): string;

export function toGlobalId(type: string, id: string | number): string;

export function __isTypeOf(type: string, opaqueID: unknown): boolean;

// TODO: evaluateGlobalIdField (?)

type FetchFnType = (object: any, context: any, info: GraphQLResolveInfo) => string | number;

export default function globalIdField(
  idFetcher: FetchFnType,
  unmaskedIdFetcher?: FetchFnType,
): GraphQLFieldConfig<any, any>;
