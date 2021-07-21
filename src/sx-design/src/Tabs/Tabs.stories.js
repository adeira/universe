/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { useState } from 'react';
import fbt from 'fbt';

import Tabs from './Tabs';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Tabs',
  component: Tabs,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => {
  const [selected, setSelected] = useState('apple');
  return (
    <>
      <Tabs {...args} selected={selected} setSelected={setSelected} />
      <div>{selected} juice</div>
    </>
  );
};

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Tabs> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  tabs: [
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
  ],
};
