/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Badge from './Badge';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Badge',
  component: Badge,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Badge {...args} />;

const ShowcaseTemplate = (args) => (
  <>
    <Badge {...args} tint="default" />
    <Badge {...args} tint="error" />
    <Badge {...args} tint="success" />
    <Badge {...args} tint="warning" />
  </>
);

// 👇 Each story then reuses that template
export const BadgeDefault: StoryTemplate<typeof Badge> = BasicTemplate.bind({});
BadgeDefault.storyName = 'Default';
// $FlowExpectedError[incompatible-type]: children should be FBT, not a string
BadgeDefault.args = {
  children: 'Badge - modify me',
  tint: 'default',
};

export const BadgeShowcase: StoryTemplate<typeof Badge> = ShowcaseTemplate.bind({});
BadgeShowcase.storyName = 'Showcase';
BadgeShowcase.argTypes = {
  children: { table: { disable: true } },
  tint: { table: { disable: true } },
};
// $FlowExpectedError[incompatible-type]: children should be FBT, not a string
BadgeShowcase.args = {
  children: 'Badge',
};
