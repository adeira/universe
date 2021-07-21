// @flow strict

import isUnitlessNumber from '../isUnitlessNumber';

it('returns all unitless properties', () => {
  expect(isUnitlessNumber).toMatchSnapshot();
});
