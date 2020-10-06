// @flow strict

import LanguageTag from '../LanguageTag';

it('returns default language as expected', () => {
  expect(LanguageTag.getDefaultLanguageTag()).toMatchInlineSnapshot(`
    Object {
      "bcp47": "es-MX",
      "fbt": "es_MX",
      "url": "es-mx",
    }
  `);
});

test.each`
  languageTag | expectedBCP47
  ${'en-US'}  | ${'en-US'}
  ${'en-us'}  | ${'en-US'}
  ${'en_us'}  | ${'en-US'}
  ${'EN_us'}  | ${'en-US'}
  ${'xx-us'}  | ${'es-US'}
  ${'en-xx'}  | ${'en-MX'}
  ${'abc'}    | ${'es-MX'}
`('detects language correctly for: $languageTag', ({ languageTag, expectedBCP47 }) => {
  expect(LanguageTag.detectLanguageTag(languageTag).bcp47).toBe(expectedBCP47);
});

test.each`
  languageTag | expected
  ${'en-US'}  | ${false}
  ${'abc'}    | ${true}
  ${'es-mx'}  | ${true}
  ${'es_mx'}  | ${true}
`('detects default language tag correctly for: $languageTag', ({ languageTag, expected }) => {
  expect(LanguageTag.isDefaultLanguageTag(languageTag)).toBe(expected);
});
