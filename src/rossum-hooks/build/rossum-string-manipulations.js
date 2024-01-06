'use strict';

// 


/**
 * Replace the value of the datapoint with a new value.
 *
 * @param datapoint - the content of the datapoint
 * @param newValue - the new value of the datapoint
 * @param hidden - whether the datapoint should be hidden or not
 *
 * Returns the JSON replace operation definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
 */
function createReplaceOperation(
  datapoint,
  newValue,
  hidden,
) {
  const value = {};

  if (newValue != null) {
    value.content = {
      value: newValue,
    };
  }

  if (hidden != null) {
    value.hidden = hidden;
  }

  return {
    op: 'replace',
    id: datapoint.id,
    value,
  };
}

// 

/**
 * Return datapoints matching a schema id.
 *
 * @param content - the annotation content tree (see https://elis.rossum.ai/api/docs/#annotation-data)
 * @param schemaId - the field's ID as defined in the extraction schema (see https://elis.rossum.ai/api/docs/#document-schema)
 */
function findBySchemaId(
  content, // TODO
  schemaId,
) {
  return content.reduce(
    (results, dp) => mergeResults(results, dp, schemaId),
    [],
  );
}

function mergeResults(
  results,
  dp,
  schemaId,
) {
  if (dp.schema_id === schemaId) {
    return [...results, dp];
  }

  if (dp.children) {
    return [...results, ...findBySchemaId(dp.children, schemaId)];
  }

  return results;
}

//  strict

const transformationFunctions = {
  // alphabetically:
  CONCATENATE: (values, separator) => values.join(separator),
  REGEX_REPLACE: (value, regex, replacement) => {
    return value.replace(new RegExp(regex, 'g'), replacement);
  },
  REGEX_SEARCH: (value, regex) => {
    const match = value.match(new RegExp(regex));
    return match ? match[0] : '';
  },
  REMOVE_SPECIAL_CHARACTERS: (value) => value.replace(/[^a-zA-Z0-9\s]/g, ''),
  REMOVE_WHITESPACE: (value) => value.replace(/\s+/g, ''),
  REVERSE: (value) => value.split('').reverse().join(''),
  SPLIT: (value, separator) => value.split(separator),
  SQUISH: (value) => value.replace(/\s+/g, ' ').trim(),
  TRANSFORM: (value, operation) => {
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
  TRIM: (value) => value.trim(),
};

function processTransformation(
  transformation,
  values,
) {
  // Handling CONCATENATE transformation
  const separatorMatch = transformation.match(/^CONCATENATE(?:\((.+)\))?$/);
  if (separatorMatch) {
    return [transformationFunctions.CONCATENATE(values, separatorMatch[1] ?? '')];
  }

  // Handling REGEX_REPLACE transformation
  const regexReplaceMatch = transformation.match(/^REGEX_REPLACE\((.+),(.+)\)$/);
  if (regexReplaceMatch) {
    const regex = regexReplaceMatch[1];
    const replacement = regexReplaceMatch[2];
    return values.map((value) => transformationFunctions.REGEX_REPLACE(value, regex, replacement));
  }

  // Handling REGEX_SEARCH transformation
  const regexSearchMatch = transformation.match(/^REGEX_SEARCH\((.+)\)$/);
  if (regexSearchMatch) {
    const regex = regexSearchMatch[1];
    return values.map((value) => transformationFunctions.REGEX_SEARCH(value, regex));
  }

  // Handling SPLIT transformation
  const splitMatch = transformation.match(/^SPLIT\((.+)\)$/);
  if (splitMatch) {
    const separator = splitMatch[1];
    return values.flatMap((value) => transformationFunctions.SPLIT(value, separator));
  }

  // Handling TRANSFORM operation
  const transformMatch = transformation.match(/^TRANSFORM\((.+)\)$/);
  if (transformMatch) {
    const operation = transformMatch[1];
    return values.map((value) => transformationFunctions.TRANSFORM(value, operation));
  }

  // Handling other transformations
  if (transformationFunctions[transformation]) {
    return values.map((value) => transformationFunctions[transformation](value));
  }

  throw new Error(`Invalid transformation: ${transformation}`);
}

// 


/**
 * The `rossum_hook_request_handler` is an obligatory main function that accepts input and produces
 * output of the rossum serverless function hook. Currently, the only available Node.js version is 18.
 *
 * See: https://elis.rossum.ai/api/docs/#annotation-content-event-data-format
 *
 * Return the messages and operations that update the annotation content.
 */
function rossum_hook_request_handler({
  settings,
  annotation: { content },
}) {
  const { mappings } = settings;

  const messages = [];
  const operations = [];

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
}

exports.rossum_hook_request_handler = rossum_hook_request_handler;
