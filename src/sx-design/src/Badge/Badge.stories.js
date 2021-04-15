/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Badge from './Badge';

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
export const BadgeDefault: $FlowFixMe = BasicTemplate.bind({});
BadgeDefault.storyName = 'Default';
BadgeDefault.args = {
  children: 'Badge - modify me',
  tint: 'default',
};

export const BadgeShowcase: $FlowFixMe = ShowcaseTemplate.bind({});
BadgeShowcase.storyName = 'Showcase';
BadgeShowcase.argTypes = {
  children: { table: { disable: true } },
  tint: { table: { disable: true } },
};
BadgeShowcase.args = {
  children: 'Badge',
};
