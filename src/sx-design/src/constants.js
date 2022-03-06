// @flow strict

// Please note that values here do not have to match supported locales even though it makes a lot of
// sense to match them. Expand as needed. See: https://www.iso.org/iso-4217-currency-codes.html
//
// Note: always verify that `CcyMnrUnts` equals "2" (https://www.currency-iso.org/dam/downloads/lists/list_one.xml), for example:
//
// ```
// <CcyNtry>
//   <CtryNm>SVALBARD AND JAN MAYEN</CtryNm>
//   <CcyNm>Norwegian Krone</CcyNm>
//   <Ccy>NOK</Ccy>
//   <CcyNbr>578</CcyNbr>
//   <CcyMnrUnts>2</CcyMnrUnts>       <<<
// </CcyNtry>
// ```
//
// Other currencies might need a special attention.
export enum SupportedCurrencies of string {
  AED, // UAE Dirham
  CZK, // Czech Koruna
  USD, // US Dollar
  MXN, // Mexican Peso
  NOK, // Norwegian Krone
  RUB, // Russian Ruble
  UAH, // Hryvnia
}

// Please note that values here do not have to match supported currencies even though it makes
// a lot of sense to match them. Expand as needed.
//
// Supported locale must follow BCP 47 formatting (https://tools.ietf.org/html/bcp47)
export type SupportedLocales =
  | 'ar-AR' // Arabic
  | 'ar-AR-u-nu-arab' // Arabic with "Arabic-Indic digits"
  | 'cs-CZ' // Czech
  | 'en-US' // English - USA
  | 'es-MX' // Spanish - Mexico
  | 'no-NO' // Norwegian
  | 'ru-RU' // Russian
  | 'uk-UA'; // Ukrainian

// LTR languages display content from left to right
// RTL languages display content from right to left
//
// See: https://rtlstyling.com/
// See: https://material.io/design/usability/bidirectionality.html
export enum SupportedDirections of string {
  LTR = 'ltr',
  RTL = 'rtl',
}

export const MOBILE_WIDTH_BOUNDARY = 600;
