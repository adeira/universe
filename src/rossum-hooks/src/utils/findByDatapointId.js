// @flow

type DatapointID = string | number;

export default function findByDatapointId(
  content: $ReadOnlyArray<$FlowFixMe>, // TODO
  datapointId: DatapointID,
): $ReadOnlyArray<$FlowFixMe> {
  return content.reduce<$ReadOnlyArray<$FlowFixMe>>(
    (results, dp) => mergeResults(results, dp, datapointId),
    [],
  );
}

function mergeResults(
  results: $ReadOnlyArray<$FlowFixMe>,
  dp: $FlowFixMe,
  datapointId: DatapointID,
): $ReadOnlyArray<$FlowFixMe> {
  if (dp.id === datapointId) {
    return [...results, dp];
  }

  if (dp.children) {
    return [...results, ...findByDatapointId(dp.children, datapointId)];
  }

  return results;
}
