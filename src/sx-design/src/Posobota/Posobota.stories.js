/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Posobota from './Posobota';
import type { StoryTemplate } from '../types';

export default {
  title: 'Components/Posobota',
  component: Posobota,
};

const TemplateDefault = () => <Posobota />;

export const Default: StoryTemplate<typeof Posobota> = TemplateDefault.bind({});
Default.storyName = 'Default';
