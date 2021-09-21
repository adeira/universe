// @flow

import React, { useState, type Node } from 'react';

import FilterChip from './FilterChip';
import LayoutInline from '../Layout/LayoutInline';

type Props = {
  +children:
    | RestrictedElement<typeof FilterChip>
    | $ReadOnlyArray<RestrictedElement<typeof FilterChip>>,
  +onFiltersChange?: ($ReadOnlyArray<string>) => void,
};

/**
 * Filter chips represent filters for a collection. You can select and unselect one or many filters.
 * They are a good alternative to toggle buttons or checkboxes.
 *
 * @see: https://material.io/components/chips#filter-chips
 */
export default function FilterChips(props: Props): Node {
  const [, setSelectedFilters] = useState(new Set());

  const handleChipClick = (value) => {
    const onFiltersChangeFn = props.onFiltersChange;
    if (onFiltersChangeFn == null) {
      return;
    }

    setSelectedFilters((prevState) => {
      const selectedFiltersCopy = new Set(prevState);
      if (selectedFiltersCopy.has(value)) {
        selectedFiltersCopy.delete(value);
      } else {
        selectedFiltersCopy.add(value);
      }
      onFiltersChangeFn(Array.from(selectedFiltersCopy));
      return selectedFiltersCopy;
    });
  };

  return (
    <LayoutInline spacing="small">
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          onChipClick: handleChipClick,
        });
      })}
    </LayoutInline>
  );
}
