// @flow

import { type Node } from 'react';

import { Kbd } from '../index';

export const testCode = (): Node => {
  return <Kbd code="CTRL" />;
};

export const testInvalidCode = (): Node => {
  // $FlowExpectedError[prop-missing]: Control is not one of the allowed values
  return <Kbd code="Control" />;
};

export const testInvalidChildren = (): Node => {
  // $FlowExpectedError[prop-missing]: `children` is not a valid property
  return <Kbd code="CTRL">⌘</Kbd>;
};
