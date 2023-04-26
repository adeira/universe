// @flow

import createMessage from '../utils/createMessage';
import createReplaceOperation from '../utils/createReplaceOperation';
import findBySchemaId from '../utils/findBySchemaId';
import processTransformation from './processTransformation';
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
