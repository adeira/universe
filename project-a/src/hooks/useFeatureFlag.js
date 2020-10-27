// @flow strict

const FEATURES = {
  'page-adoption-enabled': false,
};

export default function useFeatureFlag(featureName: $Keys<typeof FEATURES>): boolean {
  return FEATURES[featureName];
}
