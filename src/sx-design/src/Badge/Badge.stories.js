// @flow

import fbt from 'fbt';

import Badge from '../Badge/Badge';
import { initFbt } from '../test-utils';

initFbt();

export default {
  component: Badge,
  title: 'Components/Badge',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    tint: 'default',
    children: (
      <fbt desc="badge title" doNotExtract={true}>
        Badge - modify me
      </fbt>
    ),
  },
};
