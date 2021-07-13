// @flow strict

import { expectToWarn, expectWarningWillFire } from '../index';

it('throws an error when `expectToWarn` are nested', () => {
  expect(() => {
    expectToWarn('aaa', () => {
      expectToWarn('bbb', () => {});
    });
  }).toThrowErrorMatchingInlineSnapshot(`"Cannot nest \`expectToWarn()\` calls."`);
});

it('throws an error when `expectWarningWillFire` is called without `disallowWarnings`', () => {
  expect(() => {
    expectWarningWillFire('aaa');
  }).toThrowErrorMatchingInlineSnapshot(
    `"\`disallowWarnings\` needs to be called before \`expectWarningWillFire\`"`,
  );
});
