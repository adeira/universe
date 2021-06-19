// @flow strict

import { disallowWarnings, expectWarningWillFire, expectToWarn } from '../index';

disallowWarnings();

// eslint-disable-next-line jest/prefer-todo
it('should pass when there are no warnings', () => {
  // no warnings here
});

it('should pass when all warnings are expected (`expectWarningWillFire`)', () => {
  expectWarningWillFire('yadada 1');
  expectWarningWillFire('yadada 2');

  console.warn('yadada 1'); // eslint-disable-line no-console
  console.warn('yadada 2'); // eslint-disable-line no-console
});

it('should pass when all warnings are expected (`expectToWarn`)', () => {
  expectToWarn('yadada', () => {
    console.warn('yadada'); // eslint-disable-line no-console
  });
});
