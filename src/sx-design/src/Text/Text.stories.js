/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Text from './Text';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Text',
  component: Text,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <div style={{ maxWidth: '50%' }}>
    <Text {...args} />
  </div>
);

initFbt();

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.`;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Text> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  children: text,
};

export const Truncated: StoryTemplate<typeof Text> = Template.bind({});
Truncated.storyName = 'Truncated';
Truncated.args = {
  truncate: true,
  children: text,
};

export const Transformed: StoryTemplate<typeof Text> = Template.bind({});
Transformed.storyName = 'Transform (uppercase)';
Transformed.args = {
  transform: 'uppercase',
  children: text,
};
