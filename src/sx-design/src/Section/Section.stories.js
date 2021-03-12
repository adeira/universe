/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Section from './Section';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Section',
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
const Template = () => (
  <Section>
    Not much to see here (check the docs{' '}
    <span role="img" aria-label="index finger pointing up">
      ☝️
    </span>
    )
  </Section>
);

// 👇 Each story then reuses that template
export const BasicSection: $FlowFixMe = Template.bind({});
BasicSection.storyName = 'Basic';
