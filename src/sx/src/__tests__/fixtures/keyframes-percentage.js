// @flow

import type { SheetDefinitions } from '../../create';
import keyframes from '../../keyframes';

const animation = keyframes({
  '0%': {
    opacity: 0,
  },
  '25%': {
    opacity: 0.7,
  },
  '100%': {
    opacity: 1,
  },
});

export default ({
  aaa: {
    animationName: animation,
  },
}: SheetDefinitions);
