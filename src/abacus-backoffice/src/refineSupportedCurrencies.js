// @flow

type SupportedCurrencies = 'MXN';

/**
 * This function refines ANY input value to one of supported currencies. It automatically fallbacks
 * to MXN when there is no good match.
 *
 * This is typically being used to convert from GraphQL values to the supported subset of values.
 * It's a common practice that Relay generates the following enum of values to make sure that future
 * changes in the server won't break the frontend code:
 *
 * ```js
 * export type SupportedCurrency = "MXN" | "USD" | "%future added value";
 * ```
 *
 * The purpose of this function is to refine this value (which can be anything really) into subset
 * of supported values by our frontend application.
 */
export default function refineSupportedCurrencies(
  input: string,
  fallback: SupportedCurrencies = 'MXN',
): SupportedCurrencies {
  // We currently support only 'MXN' so this is simple… 😬
  return fallback;
}
