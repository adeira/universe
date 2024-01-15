// @flow

import { RossumDatapoint } from '@adeira/rossum-flow-types';

/**
 * Return datapoints matching a schema id.
 *
 * @param content - the annotation content tree (see https://elis.rossum.ai/api/docs/#annotation-data)
 * @param schemaId - the field's ID as defined in the extraction schema (see https://elis.rossum.ai/api/docs/#document-schema)
 */
export default function findBySchemaId(
  content: $ReadOnlyArray<$FlowFixMe>, // TODO
  schemaId: string,
): $ReadOnlyArray<RossumDatapoint> {
  return content.reduce<$ReadOnlyArray<$FlowFixMe>>(
    (results, dp) => mergeResults(results, dp, schemaId),
    [],
  );
}

function mergeResults(
  results: $ReadOnlyArray<$FlowFixMe>,
  dp: RossumDatapoint,
  schemaId: string,
): $ReadOnlyArray<RossumDatapoint> {
  if (dp.schema_id === schemaId) {
    return [...results, dp];
  }

  if (dp.children) {
    return [...results, ...findBySchemaId(dp.children, schemaId)];
  }

  return results;
}
