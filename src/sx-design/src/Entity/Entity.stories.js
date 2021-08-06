/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Entity from './Entity';
import EntityField from './EntityField';
import LayoutBlock from '../Layout/LayoutBlock';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Entity',
  component: Entity,
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
  <LayoutBlock>
    <Entity {...args} />
    <Entity {...args} />
    <Entity {...args} />
    <Entity {...args} />
    <Entity {...args} />
  </LayoutBlock>
);

// 👇 Each story then reuses that template
export const EntityWithFields: StoryTemplate<typeof Entity> = Template.bind({});
EntityWithFields.storyName = 'With fields';
EntityWithFields.args = {
  children: [
    <EntityField key={1} title="GitHub" description="John Doe" />,
    <EntityField key={2} title="Title only" />,
    <EntityField key={3} description="Description only" />,
    <EntityField key={4} title="Label" description={<i>Encrypted</i>} />,
  ],
};
