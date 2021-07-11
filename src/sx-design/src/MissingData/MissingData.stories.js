/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import MissingData from './MissingData';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/MissingData',
  component: MissingData,
};

// 👇 We create a "template" of how args map to rendering
const Template = () => <MissingData />;

// 👇 Each story then reuses that template
export const DefaultMissingData: StoryTemplate<typeof MissingData> = Template.bind({});
DefaultMissingData.storyName = 'Default';
