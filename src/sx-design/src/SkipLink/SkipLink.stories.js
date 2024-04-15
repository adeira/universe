// @flow

import React, { type ElementConfig, type Node } from 'react';
import fbt from 'fbt';

import SkipLink from './SkipLink';
import { initFbt } from '../test-utils';

export default {
  component: SkipLink,
  title: 'Components/SkipLink',
  tags: ['autodocs'],
};

const Template = (args: ElementConfig<typeof SkipLink>) => (
  <div
    style={{
      position: 'relative',
      margin: '40px',
      padding: '40px',
      border: '1px red solid',
    }}
  >
    <SkipLink {...args} />
  </div>
);

initFbt();

export const Basic = {
  render: (): Node => (
    <Template
      text={
        <fbt desc="skip link title" doNotExtract={true}>
          Skip to main
        </fbt>
      }
    />
  ),
};
