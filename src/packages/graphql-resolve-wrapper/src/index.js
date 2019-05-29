// @flow

import { GraphQLSchema } from 'graphql';

const SYMBOL_PROCESSED = Symbol('processed');

type GraphQLFieldResolveFn = (
  source?: any,
  args?: { [argName: string]: any, ... },
  context?: any,
  info?: Object,
) => any;

type WrapperFunction = (
  resolverFunction: GraphQLFieldResolveFn,
  field: Object,
) => () => mixed;

function defaultWrapper(resolveFn) {
  return (...args) => resolveFn(...args);
}

export function wrapResolvers(
  schema: GraphQLSchema,
  wrapper: WrapperFunction = defaultWrapper,
) {
  visitSchema(schema, wrapper);
}

function visitSchema(schema, wrapper) {
  const types = schema.getTypeMap();
  for (const typeName in types) {
    if (!Object.hasOwnProperty.call(types, typeName)) {
      continue;
    }

    visitType(types[typeName], wrapper);
  }
}

function visitType(type: any, wrapper) {
  if (
    type[SYMBOL_PROCESSED] ||
    !type.getFields ||
    isSystemType(type.toString())
  ) {
    return;
  }

  const fields = type.getFields();
  for (const fieldName in fields) {
    if (!Object.hasOwnProperty.call(fields, fieldName)) {
      continue;
    }

    wrapField(fields[fieldName], wrapper);
  }
}

function wrapField(field: Object, wrapper) {
  const resolveFn = field.resolve;

  if (field[SYMBOL_PROCESSED] || !resolveFn) {
    return;
  }

  field[SYMBOL_PROCESSED] = true;
  field.resolve = wrapper(resolveFn, field);
}

export function isSystemType(fieldName: string) {
  // __TypeKind, __InputValue, ...
  return /^__/.test(fieldName);
}
