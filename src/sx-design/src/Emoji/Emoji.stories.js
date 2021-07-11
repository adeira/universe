/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Emoji from './Emoji';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Emoji',
  component: Emoji,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Emoji {...args} />;

initFbt();

// 👇 Each story then reuses that template
export const EmojiBasic: StoryTemplate<typeof Emoji> = Template.bind({});
EmojiBasic.storyName = 'Basic';
EmojiBasic.args = {
  symbol: '🥺',
  label: (
    <fbt desc="emoji title" doNotExtract={true}>
      pleading face
    </fbt>
  ),
};
