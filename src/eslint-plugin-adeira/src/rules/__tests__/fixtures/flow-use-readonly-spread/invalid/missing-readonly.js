/**
 * @eslintExpectedError (10:27;13:3) Flow type with spread property and all readonly properties should be wrapped in '$ReadOnly<…>' to prevent accidental loss of readonly-ness.
 * @eslintExpectedError (16:27;20:3) Flow type with spread property and all readonly properties should be wrapped in '$ReadOnly<…>' to prevent accidental loss of readonly-ness.
 * @flow strict
 */

type INode = {||};

// should be wrapped in $ReadOnly<…>
export type Identifier1 = {|
  ...INode,
  +aaa: string,
|};

// should be wrapped in $ReadOnly<…>
export type Identifier2 = {|
  ...INode,
  +aaa: string,
  +bbb: string,
|};
