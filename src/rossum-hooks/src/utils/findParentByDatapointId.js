// @flow

export default function findParentByDatapointId(
  content: $ReadOnlyArray<$FlowFixMe>, // TODO
  datapointId: number,
  parent: $FlowFixMe = null,
): $ReadOnlyArray<$FlowFixMe> {
  return content.reduce<$ReadOnlyArray<$FlowFixMe>>(
    (results, dp) => mergeResults(results, dp, datapointId, parent),
    [],
  );
}

function mergeResults(
  results: $ReadOnlyArray<$FlowFixMe>,
  dp: $FlowFixMe,
  datapointId: number,
  parent: $FlowFixMe,
): $ReadOnlyArray<$FlowFixMe> {
  if (dp.id === datapointId) {
    return [...results, parent];
  }

  if (dp.children) {
    return [...results, ...findParentByDatapointId(dp.children, datapointId, dp)];
  }

  return results;
}
