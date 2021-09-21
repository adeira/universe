/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import FilterChip from './FilterChip';
import FilterChips from './FilterChips';
import LayoutBlock from '../Layout/LayoutBlock';
import Text from '../Text/Text';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/FilterChips',
  component: FilterChips,
};

// 👇 We create a "template" of how args map to rendering
const Template = () => {
  const chips = new Map([
    ['elevator', 'Elevator'],
    ['fireplace', 'Fireplace'],
    ['fridge', 'Fridge'],
    ['no_smoking', 'No smoking'],
    ['oven', 'Oven'],
    ['pets_friendly', 'Pets friendly'],
    ['washer_dryer', 'Washer / Dryer'],
    ['wheelchair_access', 'Wheelchair access'],
    ['wi-fi', 'Wi-Fi'],
  ]);

  return (
    <LayoutBlock spacing="large">
      <Text as="h1">Without descriptions</Text>
      <FilterChips>
        {Array.from(chips, ([chipKey, chipName]) => (
          <FilterChip title={chipName} key={chipKey} value={chipKey} />
        ))}
      </FilterChips>

      <Text as="h1">With descriptions</Text>
      <FilterChips>
        {Array.from(chips, ([chipKey, chipName]) => (
          <FilterChip title={chipName} key={chipKey} value={chipKey} description="popular" />
        ))}
      </FilterChips>
    </LayoutBlock>
  );
};

// 👇 Each story then reuses that template
export const EntityWithFields: StoryTemplate<typeof FilterChips> = Template.bind({});
EntityWithFields.storyName = 'With filter chips';
