// @flow

/**
 * Return datapoints matching a schema id.
 *
 * @param content - the annotation content tree (see https://elis.rossum.ai/api/docs/#annotation-data)
 * @param schemaId - the field's ID as defined in the extraction schema (see https://elis.rossum.ai/api/docs/#document-schema)
 */
export default function findBySchemaId(
  content: $ReadOnlyArray<$FlowFixMe>, // TODO
  schemaId: string,
): $ReadOnlyArray<$FlowFixMe> {
  return content.reduce<$ReadOnlyArray<$FlowFixMe>>(
    (results, dp) => mergeResults(results, dp, schemaId),
    [],
  );
}

function mergeResults(
  results: $ReadOnlyArray<$FlowFixMe>,
  dp: $FlowFixMe,
  schemaId: string,
): $ReadOnlyArray<$FlowFixMe> {
  if (dp.schema_id === schemaId) {
    return [...results, dp];
  }

  if (dp.children) {
    return [...results, ...findBySchemaId(dp.children, schemaId)];
  }

  return results;
}
