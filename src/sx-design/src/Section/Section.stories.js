/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';

import Section from './Section';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Section',
  component: Section,
  argTypes: {
    // hide children property from the Storybook
    children: {
      table: {
        disable: true,
      },
    },
  },
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <Section {...args}>
    Not much to see here (check the <strong>Docs</strong>{' '}
    <span role="img" aria-label="index finger pointing up">
      ☝️
    </span>
    )
  </Section>
);

/* eslint-disable sx/no-unused-stylesheet */
const styles = sx.create({
  default: {
    color: 'blue',
  },
});
/* eslint-enable sx/no-unused-stylesheet */

// 👇 Each story then reuses that template
export const BasicSection: StoryTemplate<typeof Section> = Template.bind({});
BasicSection.storyName = 'Basic';

export const CustomSection: StoryTemplate<typeof Section> = Template.bind({});
CustomSection.storyName = 'Custom style';
CustomSection.args = {
  xstyle: styles.default,
};
