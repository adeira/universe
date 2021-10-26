// @flow

import LanguageTag from '../LanguageTag';

it('returns default language as expected', () => {
  expect(LanguageTag.getDefaultLanguageTag()).toMatchInlineSnapshot(`
    Object {
      "bcp47": "es-MX",
      "graphql": "es_MX",
      "url": "es-mx",
    }
  `);
});

test.each`
  languageTag | expectedBCP47 | expectedURL | expectedGraphQL
  ${'en-US'}  | ${'en-US'}    | ${'en-us'}  | ${'en_US'}
  ${'en-us'}  | ${'en-US'}    | ${'en-us'}  | ${'en_US'}
  ${'en_us'}  | ${'en-US'}    | ${'en-us'}  | ${'en_US'}
  ${'EN_us'}  | ${'en-US'}    | ${'en-us'}  | ${'en_US'}
  ${'xx-us'}  | ${'es-US'}    | ${'es-us'}  | ${'es_US'}
  ${'en-xx'}  | ${'en-MX'}    | ${'en-mx'}  | ${'en_MX'}
  ${'abc'}    | ${'es-MX'}    | ${'es-mx'}  | ${'es_MX'}
`(
  'detects language correctly for: $languageTag',
  ({ languageTag, expectedBCP47, expectedURL, expectedGraphQL }) => {
    expect(LanguageTag.detectLanguageTag(languageTag).bcp47).toBe(expectedBCP47);
    expect(LanguageTag.detectLanguageTag(languageTag).url).toBe(expectedURL);
    expect(LanguageTag.detectLanguageTag(languageTag).graphql).toBe(expectedGraphQL);
  },
);

test.each`
  languageTag | expected
  ${'en-US'}  | ${false}
  ${'abc'}    | ${true}
  ${'es-mx'}  | ${true}
  ${'es_mx'}  | ${true}
  ${'es_MX'}  | ${true}
`('detects default language tag correctly for: $languageTag', ({ languageTag, expected }) => {
  expect(LanguageTag.isDefaultLanguageTag(languageTag)).toBe(expected);
});
