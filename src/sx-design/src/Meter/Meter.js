// @flow

import { invariant } from '@adeira/js';
import type { Node } from 'react';

type Props = {
  // The current numeric value. This must be between the minimum and maximum values (`min` attribute
  // and `max` attribute) if they are specified. If unspecified or malformed, the value is `0`.
  // If specified, but not within the range given by the `min` attribute and `max` attribute,
  // the value is equal to the nearest end of the range.
  +value?: number,

  // The lower numeric bound of the measured range. This must be less than the maximum value
  // (`max` attribute), if specified. If unspecified, the minimum value is 0.
  +min?: number,

  // The upper numeric bound of the measured range. This must be greater than the minimum value
  // (`min` attribute), if specified. If unspecified, the maximum value is 1.
  +max?: number,

  // TKTK
  +low?: number,

  // TKTK
  +high?: number,

  // TKTK
  +optimum?: number,
};

export default function Meter(props: Props): Node {
  const min = props.min ?? 0;
  const max = props.max ?? 1;

  // TODO: validate the value ranges (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)

  invariant(min < max, 'Minimum value must be less than maximum value.');

  return (
    <meter
      min={min}
      max={max}
      value={props.value}
      low={props.low}
      high={props.high}
      optimum={props.optimum}
    />
  );
}
