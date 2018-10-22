// @flow

import { GraphQLSchema } from 'graphql';

const Processed = Symbol();

type ResolverFunction = Function;
type WrapperFunction = ResolverFunction => () => mixed;

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

function visitType(type, wrapper) {
  // $FlowExpectedError: processed symbol is not part of the original types
  if (type[Processed] || !type.getFields || isSystemType(type.toString())) {
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

  if (field[Processed] || !resolveFn) {
    return;
  }

  field[Processed] = true;
  field.resolve = wrapper(resolveFn);
}

function isSystemType(field) {
  return /^\[?__/.test(field);
}
