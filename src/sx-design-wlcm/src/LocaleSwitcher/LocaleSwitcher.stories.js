/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import NextLink from 'next/link';

import LocaleSwitcher from './LocaleSwitcher';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/LocaleSwitcher',
  component: LocaleSwitcher,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <LocaleSwitcher nextLinkComponent={NextLink} {...args} />;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof LocaleSwitcher> = Template.bind({});
Default.storyName = 'Default';
Default.args = {};
Default.parameters = {
  nextRouter: {
    locale: 'en-us', // active locale
    locales: [
      // TODO: expand as needed
      'en-us',
      'es-mx',
      'uk-ua',
    ],
  },
};
