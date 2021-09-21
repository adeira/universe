// @flow

import React, { type Element } from 'react';
import fbt from 'fbt';

import { FilterChip, FilterChips } from '../index';
import Chip from '../src/Chips/Chip';

export function validUseCase(): Element<typeof FilterChips> {
  return (
    <FilterChips>
      <FilterChip title="STRING" value="string" />
      <FilterChip
        value="fbt_title"
        title={
          <fbt desc="fbt" doNotExtract={true}>
            FBT
          </fbt>
        }
      />
      <FilterChip
        value="fbt_description"
        title="required"
        description={
          <fbt desc="fbt" doNotExtract={true}>
            FBT
          </fbt>
        }
      />
    </FilterChips>
  );
}

export function validWithCallback(): Element<typeof FilterChips> {
  return (
    <FilterChips onFiltersChange={() => {}}>
      <FilterChip title="STRING" value="string" />
    </FilterChips>
  );
}

export function invalidChipChildren(): Element<typeof FilterChips> {
  return (
    <FilterChips>
      {/* $FlowExpectedError[incompatible-type]: use `FilterChip` instead of `Chip` */}
      <Chip title="STRING" value="string" />
    </FilterChips>
  );
}
