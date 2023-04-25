// @flow

import createMessage from '../utils/createMessage';
import createReplaceOperation from '../utils/createReplaceOperation';
import findBySchemaId from '../utils/findBySchemaId';
import type { WebhookResponse } from '../types';

/**
 * The `rossum_hook_request_handler` is an obligatory main function that accepts input and produces
 * output of the rossum serverless function hook. Currently, the only available Node.js version is 18.
 *
 * See: https://elis.rossum.ai/api/docs/#annotation-content-event-data-format
 *
 * Return the messages and operations that update the annotation content.
 */
export function rossum_hook_request_handler({
  settings,
  annotation: { content },
}: {
  +settings: {
    +mappings: $ReadOnlyArray<{
      +sources: $ReadOnlyArray<string>,
      +target: string,
      +transformations: $ReadOnlyArray<string>,
    }>,
  },
  +annotation: {
    +content: $ReadOnlyArray<$FlowFixMe>,
    ...
  },
  ...
}): WebhookResponse {
  try {
    const { mappings } = settings;

    const messages: WebhookResponse['messages'] = [];
    const operations: WebhookResponse['operations'] = [];

    for (const mapping of mappings) {
      const { sources, target, transformations } = mapping;

      const targetDatapoints = findBySchemaId(content, target);

      for (let i = 0; i < targetDatapoints.length; i++) {
        let values = [];

        // Support for single source (string) or multiple sources (array of strings)
        const sourceArray = Array.isArray(sources) ? sources : [sources];

        // Collect values from all source fields
        sourceArray.forEach((source) => {
          const sourceDatapoint = findBySchemaId(content, source)[i];
          values.push(sourceDatapoint?.content?.value ?? '');
        });

        // Apply transformations
        transformations.forEach((transformation) => {
          values = processTransformation(transformation, values);
        });

        operations?.push(createReplaceOperation(targetDatapoints[i], values.join('')));
      }
    }

    return {
      messages,
      operations,
    };
  } catch (error) {
    // In case of exception, create and return error message. This may be useful for debugging.
    const messages = [createMessage('error', `Serverless Function: ${error.message}`)];
    return {
      messages,
    };
  }
}

const transformationFunctions = {
  TRANSFORM: (value: string, operation: string) => {
    switch (operation) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      case 'capitalize':
        return value.replace(/\b\w/g, (ch) => ch.toUpperCase());
      default:
        throw new Error(`Invalid transform operation: ${operation}`);
    }
  },
  REVERSE: (value: string) => value.split('').reverse().join(''),
  SQUISH: (value: string) => value.replace(/\s+/g, ' ').trim(),
  SORT: (value: string) => value.split('').sort().join(''),
  REMOVE_SPECIAL_CHARACTERS: (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, ''),
  REMOVE_WHITESPACE: (value: string) => value.replace(/\s+/g, ''),
  TRIM: (value: string) => value.trim(),
  // TODO: split
  CONCATENATE: (values: $ReadOnlyArray<string>, separator: string) => values.join(separator),
  REGEX_REPLACE: (value: string, regex: string, replacement: string) =>
    value.replace(new RegExp(regex, 'g'), replacement),
  MATH_OPERATION: (values: $ReadOnlyArray<string>, operation: string) => {
    const numericValues = values.map((value) => parseFloat(value));
    return numericValues.reduce((accumulator, currentValue) => {
      switch (operation) {
        case 'add':
          return accumulator + currentValue;
        case 'subtract':
          return accumulator - currentValue;
        case 'multiply':
          return accumulator * currentValue;
        case 'divide':
          return accumulator / currentValue;
        default:
          throw new Error(`Invalid math operation: ${operation}`);
      }
    });
  },
};

function processTransformation(transformation: string, values: $ReadOnlyArray<string>) {
  // Handling TRANSFORM operation
  const transformMatch = transformation.match(/^TRANSFORM\((.+)\)$/);
  if (transformMatch) {
    const operation = transformMatch[1];
    return values.map((value) => transformationFunctions.TRANSFORM(value, operation));
  }

  // Handling CONCATENATE transformation
  const separatorMatch = transformation.match(/^CONCATENATE\((.+)\)$/);
  if (separatorMatch) {
    return [transformationFunctions.CONCATENATE(values, separatorMatch[1])];
  }

  // Handling REGEX_REPLACE transformation
  const regexReplaceMatch = transformation.match(/^REGEX_REPLACE\((.+),(.+)\)$/);
  if (regexReplaceMatch) {
    const regex = regexReplaceMatch[1];
    const replacement = regexReplaceMatch[2];
    return values.map((value) => transformationFunctions.REGEX_REPLACE(value, regex, replacement));
  }

  // Handling MATH_OPERATION transformation
  const mathOperationMatch = transformation.match(/^MATH_OPERATION\((.+)\)$/);
  if (mathOperationMatch) {
    const operation = mathOperationMatch[1];
    return [transformationFunctions.MATH_OPERATION(values, operation)];
  }

  // Handling other transformations
  if (transformationFunctions[transformation]) {
    return values.map((value) => transformationFunctions[transformation](value));
  }

  throw new Error(`Invalid transformation: ${transformation}`);
}
