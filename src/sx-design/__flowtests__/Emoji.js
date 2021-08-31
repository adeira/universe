// @flow

import fbt from 'fbt';
import { type Node } from 'react';

import { Emoji } from '../index';

export const testValid = (): Node => {
  return (
    <Emoji
      symbol="🤪"
      label={
        <fbt desc="goofy face" doNotExtract={true}>
          goofy face
        </fbt>
      }
    />
  );
};

export const testMissingLabel = (): Node => {
  // $FlowExpectedError[prop-missing]: `label` property is missing
  return <Emoji symbol="🤪" />;
};

export const testInvalidLabelType = (): Node => {
  // $FlowExpectedError[incompatible-type]: `label` should be translated
  return <Emoji symbol="🤪" label="goofy face" />;
};
