// @flow

import { type Element, type Node } from 'react';

import { Badge } from '../index';

export const testValidChildrenString = (): Element<typeof Badge> => {
  return <Badge>this is valid</Badge>;
};

export const testValidChildrenStringNumber = (): Element<typeof Badge> => {
  return <Badge>0</Badge>;
};

export const testValidChildrenFbt = (): Element<typeof Badge> => {
  return (
    <Badge>
      <fbt desc="valid example" doNotExtract={true}>
        this is valid
      </fbt>
    </Badge>
  );
};

export const testValidProperties = (): Node => {
  return (
    <>
      <Badge tint="default">default</Badge>
      <Badge tint="error">error</Badge>
      <Badge tint="success">success</Badge>
      <Badge tint="warning">warning</Badge>
    </>
  );
};

export const testInvalidProperties = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: number children is currently not allowed */}
      <Badge>{0}</Badge>
      {/* $FlowExpectedError[incompatible-type]: incorrect tint value */}
      <Badge tint="UNKNOWN__tint">invalid</Badge>
      {/* $FlowExpectedError[prop-missing]: unknown property */}
      <Badge unknown="unknown">unknown</Badge>
    </>
  );
};
