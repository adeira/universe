// @flow strict

const FEATURES = {
  // Enables the ability to order shop products online.
  'page-shop-orders-enabled': false,
};

export default function useFeatureFlag(featureName: $Keys<typeof FEATURES>): boolean {
  return FEATURES[featureName];
}
