// @flow

import { type Element } from 'react';
import fbt from 'fbt';

import { Tooltip } from '../index';

export const testStringTitle = (): Element<typeof Tooltip> => {
  return <Tooltip title="test string" />;
};

export const testFbtTitle = (): Element<typeof Tooltip> => {
  return (
    <Tooltip
      title={
        <fbt desc="test string" doNotExtract={true}>
          test string
        </fbt>
      }
    />
  );
};
