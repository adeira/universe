/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import NextLink from 'next/link';

import Breadcrumb from './Breadcrumb';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = () => (
  <Breadcrumb>
    <Breadcrumb.Item nextLinkComponent={NextLink} href="#">
      Home
    </Breadcrumb.Item>
    <Breadcrumb.Item nextLinkComponent={NextLink} href="#">
      Environment
    </Breadcrumb.Item>
    <Breadcrumb.Item nextLinkComponent={NextLink} href="#">
      Rural and countryside
    </Breadcrumb.Item>
    <Breadcrumb.Item nextLinkComponent={NextLink} href="#">
      Rural development and land management
    </Breadcrumb.Item>
    <Breadcrumb.Item nextLinkComponent={NextLink} href="#">
      Economic growth in rural areas
    </Breadcrumb.Item>
  </Breadcrumb>
);

// 👇 Each story then reuses that template
export const BadgeDefault: StoryTemplate<typeof Breadcrumb> = BasicTemplate.bind({});
BadgeDefault.storyName = 'Default';
