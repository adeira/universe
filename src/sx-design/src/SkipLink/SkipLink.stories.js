/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import SkipLink from './SkipLink';

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
export const Basic: $FlowFixMe = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  text: 'Skip to main',
};
