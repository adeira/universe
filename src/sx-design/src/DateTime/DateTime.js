// @flow

import useSxDesignContext from '../useSxDesignContext';

type Props = {
  +value: number | string | Date,
  +formatOptions?: Intl$DateTimeFormatOptions,
};

/**
 * Note: the output format is always in UTC.
 * Note: we currently expect the input value to be in UTC.
 */
export default function DateTime(props: Props): string {
  const sxDesign = useSxDesignContext();

  const date = new Date(props.value);
  const options: Intl$DateTimeFormatOptions = {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...props.formatOptions,
  };

  return new Intl.DateTimeFormat(sxDesign.locale, options).format(date);
}
