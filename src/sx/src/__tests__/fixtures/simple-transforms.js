// @flow

import type { SheetDefinitions } from '../../create';

/**
 * Purpose of this test is to verify that it generates single CSS class like so:
 *
 * ```
 * .c0 { color: #f00; } ✅
 * ```
 *
 * It should not generate one class for each color version like so (or any other pseudo-duplicated version):
 *
 * ```
 * .c0 { color: #f00; } ✅
 * .c1 { color: #f00; } ❌
 * .c2 { color: #f00; } ❌
 * ```
 *
 * That would be incorrect!
 */
export default ({
  red_one: {
    color: 'red',
  },
  red_two: {
    color: '#f00',
  },
  red_three: {
    color: '#FF0000',
  },
}: SheetDefinitions);
