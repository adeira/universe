/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import SkipLink from './SkipLink';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/SkipLink',
  component: SkipLink,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
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

// 👇 Each story then reuses that template
export const Basic: StoryTemplate<typeof SkipLink> = Template.bind({});
Basic.storyName = 'Basic';
// $FlowExpectedError[incompatible-type]: text should be FBT, not a string
Basic.args = {
  text: 'Skip to main',
};
