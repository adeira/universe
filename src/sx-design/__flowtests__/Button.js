// @flow

import Icon from '@adeira/icons';
import { type Node } from 'react';
import fbt from 'fbt';

import { Button } from '../index';

export const testString = (): Node => {
  // We allow strings as children to be compatible with applications not using FBT.
  return <Button onClick={() => {}}>test string</Button>;
};

export const testFbt = (): Node => {
  return (
    <Button onClick={() => {}}>
      <fbt desc="test" doNotExtract={true}>
        test fbt <fbt:param name="parameter">parameter</fbt:param>
      </fbt>
    </Button>
  );
};

export const testIcon = (): Node => {
  return (
    <Button onClick={() => {}}>
      <Icon name="timeline" data-testid="timeline_icon" />
    </Button>
  );
};

export const testInvalidTypes = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: null is not valid */}
      <Button onClick={() => {}}>{null}</Button>
      {/* $FlowExpectedError[incompatible-type]: boolean is not valid */}
      <Button onClick={() => {}}>{true}</Button>
      {/* $FlowExpectedError[incompatible-type]: number is not valid */}
      <Button onClick={() => {}}>{-1}</Button>
    </>
  );
};

export const testMissingOnClickCallback = (): Node => {
  // $FlowExpectedError[prop-missing]: property onClick is missing
  return <Button>missing onClick</Button>;
};
