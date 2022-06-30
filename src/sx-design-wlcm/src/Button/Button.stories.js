/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Button from './Button';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { table: { disable: true } },
  },
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <>
    <Button {...args} variant="primary">
      Primary button
    </Button>
    <Button {...args} variant="secondary">
      Secondary button
    </Button>
  </>
);

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
