/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import ReactConfBrasil from './ReactConfBrasil';
import type { StoryTemplate } from '../types';

export default {
  title: 'Components/ReactConfBrasil',
  component: ReactConfBrasil,
};

const TemplateDefault = () => <ReactConfBrasil />;

export const Default: StoryTemplate<typeof ReactConfBrasil> = TemplateDefault.bind({});
Default.storyName = 'Default';
