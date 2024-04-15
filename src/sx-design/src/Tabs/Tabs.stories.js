// @flow

import fbt from 'fbt';
import React, { useState, type Node } from 'react';

import LayoutBlock from '../Layout/LayoutBlock';
import Placeholder from '../Placeholder/Placeholder';
import Tabs from './Tabs';
import { initFbt } from '../test-utils';

export default {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
};

initFbt();

const TabsExample = () => {
  const [selected, setSelected] = useState<string | number | null>('apple');

  return (
    <LayoutBlock>
      <Tabs
        tabs={[
          {
            title: (
              <fbt desc="apple" doNotExtract={true}>
                Apple
              </fbt>
            ),
            value: 'apple',
          },
          {
            title: (
              <fbt desc="orange" doNotExtract={true}>
                Orange
              </fbt>
            ),
            value: 'orange',
          },
          {
            title: (
              <fbt desc="mango" doNotExtract={true}>
                Mango
              </fbt>
            ),
            value: 'mango',
          },
          {
            title: (
              <fbt desc="banana" doNotExtract={true}>
                Banana
              </fbt>
            ),
            value: 'banana',
          },
        ]}
        selected={selected}
        setSelected={setSelected}
      />
      <Placeholder
        label={
          <fbt desc="selected juice label" doNotExtract={true}>
            <fbt:param name="selectedOption">{selected}</fbt:param> juice
          </fbt>
        }
        width="100%"
        height={200}
      />
    </LayoutBlock>
  );
};

export const Default = {
  render: (): Node => <TabsExample />,
};
