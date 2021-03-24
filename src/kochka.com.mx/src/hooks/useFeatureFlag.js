// @flow strict

const FEATURES = {
  'page-adoption-enabled': false,
  'page-shop-enabled': __DEV__,
};

export default function useFeatureFlag(featureName: $Keys<typeof FEATURES>): boolean {
  return FEATURES[featureName];
}
