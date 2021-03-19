// @flow strict

const FEATURES = {
  'page-adoption-enabled': false,
  'page-shop-enabled': true,
};

export default function useFeatureFlag(featureName: $Keys<typeof FEATURES>): boolean {
  return FEATURES[featureName];
}
