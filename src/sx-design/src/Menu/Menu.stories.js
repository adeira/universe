/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Menu from './Menu';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Menu',
  component: Menu,
};

// 👇 We create a "template" of how args map to rendering
const Template = () => (
  <Menu>
    <Menu.Item onClick={() => {}}>One</Menu.Item>
    <Menu.Item onClick={() => {}}>Two</Menu.Item>
    <Menu.Item tint="default" onClick={() => {}}>
      Three
    </Menu.Item>
    <Menu.ItemDivider />
    <Menu.Item tint="error" onClick={() => {}}>
      Delete
    </Menu.Item>
  </Menu>
);

// 👇 Each story then reuses that template
export const DefaultLoader: StoryTemplate<typeof Menu> = Template.bind({});
DefaultLoader.storyName = 'Default';
