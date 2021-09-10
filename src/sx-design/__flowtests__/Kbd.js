// @flow

import { type Element } from 'react';

import { Kbd } from '../index';

export const testCode = (): Element<typeof Kbd> => {
  return <Kbd code="CTRL" />;
};

export const testInvalidCode = (): Element<typeof Kbd> => {
  // $FlowExpectedError[prop-missing]: Control is not one of the allowed values
  return <Kbd code="Control" />;
};

export const testInvalidChildren = (): Element<typeof Kbd> => {
  // $FlowExpectedError[prop-missing]: `children` is not a valid property
  return <Kbd code="CTRL">⌘</Kbd>;
};
