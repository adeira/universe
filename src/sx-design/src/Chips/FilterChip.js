// @flow

import Icon from '@adeira/icons';
import React, { type Element } from 'react';

import Chip from './Chip';

type ChipValueType = string;

type Props = {
  +title: Fbt,
  +value: ChipValueType,
  +description?: Fbt,
};

/**
 * `FilterChip` should be used as a children of `FilterChips` component (instead of using) the
 * `Chip` component directly.
 */
export default function FilterChip(props: Props): Element<typeof Chip> {
  return (
    <Chip
      title={props.title}
      description={props.description}
      value={props.value}
      prefix={<Icon name="check" />}
      /*
      $FlowExpectedError[prop-missing]: we are purposefully hiding this prop from the public
      interface because we don't want anyone to use it directly. It's being used by the parent
      component wrapper `FilterChips`.
      */
      onChipClick={props.onChipClick}
    />
  );
}
