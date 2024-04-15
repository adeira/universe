// @flow

import React, { type Node } from 'react';

import FilterChip from './FilterChip';
import FilterChips from './FilterChips';
import LayoutBlock from '../Layout/LayoutBlock';
import Text from '../Text/Text';

export default {
  component: FilterChips,
  title: 'Components/FilterChips',
  tags: ['autodocs'],
};

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

export const WithFilterChips = {
  render: (): Node => <Template />,
};
