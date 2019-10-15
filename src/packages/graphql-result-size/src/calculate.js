// @flow strict

import {
  Kind,
  isExecutableDefinitionNode,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  type GraphQLSchema,
  type DocumentNode,
} from 'graphql';

const THRESHOLD = 500_000;

const UNKNOWN_ARG_VALUE_PENALTY = 1_000;
const UNLIMITED_LIST_PENALTY = 10_000;
const UNKNOWN_KIND_PENALTY = 100_000;

/**
 * Please note: we actually don't do any kind of optimizations yet as described in the paper.
 * It's because the priority is to make it work well first. Moreover, these optimizations made
 * the referential implementation horribly slow which is paradoxical.
 */
export default function calculate(schema: GraphQLSchema, query: DocumentNode) {
  let score = 0;
  let lastLimit = null;
  const operationVariables = new Map(); // [name, defaultValue]

  function getLastLimit() {
    // We collect the limits on any field even though it's usually being used directly. It's because
    // patterns like Relay connection set limit on a higher field in the hierarchy and we have to
    // remember it. This limit is being reset once we use it.
    const limit = lastLimit ?? UNLIMITED_LIST_PENALTY;
    lastLimit = null;
    return limit;
  }

  function analyzeField(definition, parentObjectType) {
    if (isObjectType(parentObjectType) || isInterfaceType(parentObjectType)) {
      const fields = parentObjectType.getFields();

      const maybeLimit = getNumberOfEdgesNew(operationVariables, definition);
      if (maybeLimit !== null) {
        lastLimit = maybeLimit;
      }

      const fieldType = fields[definition.name.value].type;
      const currentType = isListType(fieldType) ? fieldType.ofType : fieldType;
      if (definition.selectionSet === undefined) {
        // scalar, list of scalars
        if (isListType(fieldType)) {
          score += 4; // aaa: [ 1, 2 ]
          const numberOfEdges = getLastLimit();
          for (let i = 0; i < numberOfEdges; i++) {
            score += 1; // add +1 per each scalar iteration
          }
        } else {
          score += 3; // aaa: xxx
        }
      } else if (isListType(fieldType)) {
        // list of objects
        score += 4; // aaa: [ { ... } ]
        const numberOfEdges = getLastLimit();
        for (let i = 0; i < numberOfEdges; i++) {
          score += 2; // add +1 per each object iteration for the braces
          analyzeSubquery(definition.selectionSet, currentType);
        }
      } else {
        // simple objects with selections
        score += 4; // field with other subselections
        analyzeSubquery(definition.selectionSet, currentType);
      }
    } else if (isNonNullType(parentObjectType)) {
      // This is a special case of a field which doesn't have any fields itself but must be further
      // decomposed (typical example is `PageInfo!` type).
      analyzeSubquery(definition, parentObjectType.ofType);
    } else {
      // we know it's a field but the parent type is unsupported yet
      score += UNKNOWN_KIND_PENALTY;
    }
  }

  function analyzeSubquery(definition, parentObjectType) {
    if (definition == null || parentObjectType == null) {
      return;
    }
    if (score > THRESHOLD) {
      throw new Error(`Threshold of ${THRESHOLD} reached.`);
    }

    if (definition.kind === Kind.FIELD) {
      if (isIntrospectionField(definition.name.value)) {
        return;
      }
      analyzeField(definition, parentObjectType);
    } else if (definition.kind === Kind.SELECTION_SET) {
      definition.selections.forEach(selection => {
        analyzeSubquery(selection, parentObjectType);
      });
    } else if (definition.kind === Kind.OPERATION_DEFINITION) {
      const variableDefinitions = definition.variableDefinitions ?? [];
      variableDefinitions.forEach(variableDefinition => {
        const variableName = variableDefinition.variable.name.value;
        const defaultValue = variableDefinition.defaultValue;
        if (defaultValue !== undefined && defaultValue.kind === Kind.INT) {
          operationVariables.set(variableName, Number(defaultValue.value));
        } else {
          operationVariables.set(variableName, UNKNOWN_ARG_VALUE_PENALTY);
        }
      });
      analyzeSubquery(definition.selectionSet, parentObjectType);
    } else if (definition.kind === Kind.INLINE_FRAGMENT) {
      let objectType = parentObjectType;
      if (definition.typeCondition !== undefined) {
        // inline fragment doesn't have to have a restrict on the type
        const onType = definition.typeCondition.name.value;
        objectType = schema.getType(onType);
      }
      analyzeSubquery(definition.selectionSet, objectType);
    } else if (definition.kind === Kind.FRAGMENT_DEFINITION) {
      const onType = definition.typeCondition.name.value;
      analyzeSubquery(definition.selectionSet, schema.getType(onType));
    } else if (definition.kind === Kind.FRAGMENT_SPREAD) {
      // no score change
    } else {
      // we do not support this definition kind yet
      score += UNKNOWN_KIND_PENALTY;
    }
  }

  query.definitions.map(definition => {
    if (isExecutableDefinitionNode(definition)) {
      if (definition.kind === Kind.FRAGMENT_DEFINITION) {
        return analyzeSubquery(definition, schema.getQueryType()); // FragmentDefinition
      }
      switch (definition.operation) {
        case 'query':
          return analyzeSubquery(definition, schema.getQueryType());
        case 'mutation':
          return analyzeSubquery(definition, schema.getMutationType());
        case 'subscription':
          return analyzeSubquery(definition, schema.getSubscriptionType());
        default:
          (definition.operation: empty);
      }
    }
    return undefined;
  });

  return score;
}

function getNumberOfEdgesNew(operationVariables, definition): number | null {
  let first = null;
  if (definition.arguments != null && definition.arguments.length > 0) {
    const argumentNode = definition.arguments.find(argument => {
      return argument.name.value === 'first' || argument.name.value === 'last';
    });
    if (argumentNode !== undefined) {
      const argNodeValue = argumentNode.value;
      if (argNodeValue.kind === Kind.VARIABLE) {
        // we found limit argument but it's a variable so we resolve it
        first = operationVariables.get(argNodeValue.name.value) ?? null;
      } else if (argNodeValue.kind === Kind.INT) {
        first = Number(argNodeValue.value);
      }
    }
  }
  return first;
}

function isIntrospectionField(name: string): boolean {
  // This copies GraphQL implementation:
  // https://github.com/graphql/graphql-js/blob/48ea2d3e8df5e4fbbdb5e0ce67c0a3c219b024f8/src/utilities/assertValidName.js#L29
  return name.length > 1 && name[0] === '_' && name[1] === '_';
}
