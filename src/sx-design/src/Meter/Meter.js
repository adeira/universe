// @flow

import type { Node } from 'react';

type Props = {
  +min?: number,
  +max?: number,
  +value?: number,
  +low?: number,
  +high?: number,
  +optimum?: number,
};

export default function Meter(props: Props): Node {
  // TODO: validate the value ranges (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)

  return (
    <meter
      min={props.min}
      max={props.max}
      value={props.value}
      low={props.low}
      high={props.high}
      optimum={props.optimum}
    />
  );
}
