// @flow

import type { SheetDefinitions } from '../../create';
import keyframes from '../../keyframes';

const animation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export default ({
  aaa: {
    animationName: animation,
  },
}: SheetDefinitions);
