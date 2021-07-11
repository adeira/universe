/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Badge from './Badge';
import LayoutInline from '../Layout/LayoutInline';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Badge',
  component: Badge,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Badge {...args} />;

const ShowcaseTemplate = (args) => (
  <LayoutInline>
    <Badge {...args} tint="default" />
    <Badge {...args} tint="error" />
    <Badge {...args} tint="success" />
    <Badge {...args} tint="warning" />
  </LayoutInline>
);

initFbt();

// 👇 Each story then reuses that template
export const BadgeDefault: StoryTemplate<typeof Badge> = BasicTemplate.bind({});
BadgeDefault.storyName = 'Default';
BadgeDefault.args = {
  children: (
    <fbt desc="badge title" doNotExtract={true}>
      Badge - modify me
    </fbt>
  ),
  tint: 'default',
};

export const BadgeShowcase: StoryTemplate<typeof Badge> = ShowcaseTemplate.bind({});
BadgeShowcase.storyName = 'Showcase';
BadgeShowcase.argTypes = {
  children: { table: { disable: true } },
  tint: { table: { disable: true } },
};
BadgeShowcase.args = {
  children: (
    <fbt desc="badge title" doNotExtract={true}>
      Badge
    </fbt>
  ),
};
