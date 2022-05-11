// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import type { Node } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import useSxDesignContext from '../useSxDesignContext';

type Props = {
  +value: number | string | Date,
  +formatOptions?: Intl$DateTimeFormatOptions,
};

/**
 * Note: the output format is always in UTC.
 * Note: we currently expect the input value to be in UTC.
 */
export default function DateTime(props: Props): Node {
  const sxDesign = useSxDesignContext();

  const date = new Date(props.value);
  const options: Intl$DateTimeFormatOptions = {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...props.formatOptions,
  };

  try {
    return (
      <span className={styles('dateTimeFormat')}>
        {new Intl.DateTimeFormat(sxDesign.locale, options).format(date)}
      </span>
    );
  } catch {
    return (
      <Tooltip
        title={
          <fbt desc="tooltip description when invalid date/time value is passed to the DateTime component">
            Invalid date/time value
          </fbt>
        }
      />
    );
  }
}

const styles = sx.create({
  dateTimeFormat: {
    color: 'rgba(var(--sx-foreground))',
  },
});
