/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';
import { rangeMap } from '@adeira/js';

import Skeleton from './Skeleton';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Skeleton',
  component: Skeleton,
};

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <div className={styles('productsGrid')}>
    {rangeMap(12, (i) => (
      <Skeleton key={i} {...args} />
    ))}
  </div>
);

// 👇 Each story then reuses that template
export const DefaultSkeleton: StoryTemplate<typeof Skeleton> = Template.bind({});
DefaultSkeleton.storyName = 'Default';

export const SquaredSkeleton: StoryTemplate<typeof Skeleton> = Template.bind({});
SquaredSkeleton.storyName = 'Squared';
SquaredSkeleton.args = {
  squared: true,
};
