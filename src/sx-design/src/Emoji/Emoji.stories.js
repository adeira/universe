/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Emoji from './Emoji';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Emoji',
  component: Emoji,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Emoji {...args} />;

// 👇 Each story then reuses that template
export const EmojiBasic: $FlowFixMe = Template.bind({});
EmojiBasic.storyName = 'Basic';
EmojiBasic.args = {
  symbol: '🥺',
  label: 'pleading face',
};
