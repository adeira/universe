/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Loader from './Loader';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Loader',
  component: Loader,
};

// 👇 We create a "template" of how args map to rendering
const Template = () => <Loader />;

// 👇 Each story then reuses that template
export const DefaultLoader: StoryTemplate<typeof Loader> = Template.bind({});
DefaultLoader.storyName = 'Default';
