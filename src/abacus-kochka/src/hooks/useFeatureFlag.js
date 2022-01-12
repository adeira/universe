// @flow strict

const FEATURES = {
  // Enables or disables "Shop" without ability to order the products online.
  'page-shop-enabled': true, // TODO: delete this feature flag

  // Enables the ability to order shop products online.
  'page-shop-orders-enabled': false,
};

export default function useFeatureFlag(featureName: $Keys<typeof FEATURES>): boolean {
  return FEATURES[featureName];
}
