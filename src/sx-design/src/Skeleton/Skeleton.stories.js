/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';
import { rangeMap } from '@adeira/js';
import fbt from 'fbt';

import Button from '../Button/Button';
import { initFbt } from '../test-utils';
import Skeleton from './Skeleton';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    'children': { table: { disable: true } },
    'data-testid': { table: { disable: true } },
  },
};

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
  },
});

initFbt();

// 👇 We create a "template" of how args map to rendering
const StandaloneTemplate = (args) => <Skeleton {...args} />;
const GridTemplate = (args) => (
  <div className={styles('productsGrid')}>
    {rangeMap(16, (i) => (
      <Skeleton key={i} {...args} />
    ))}
  </div>
);

// 👇 Each story then reuses that template
export const StandaloneSkeleton: StoryTemplate<typeof Skeleton> = StandaloneTemplate.bind({});
StandaloneSkeleton.storyName = 'Standalone';

export const InGridSkeleton: StoryTemplate<typeof Skeleton> = GridTemplate.bind({});
InGridSkeleton.storyName = 'In a CSS grid';

export const WithChildrenSkeleton: StoryTemplate<typeof Skeleton> = StandaloneTemplate.bind({});
WithChildrenSkeleton.storyName = 'With children';
WithChildrenSkeleton.args = {
  children: (
    <Button onClick={() => {}}>
      <fbt desc="button title" doNotExtract={true}>
        test button
      </fbt>
    </Button>
  ),
};
