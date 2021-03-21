// @flow

import type { SheetDefinitions } from '../../create';

// https://developer.mozilla.org/en-US/docs/Web/CSS/--*
// https://developer.mozilla.org/en-US/docs/Web/CSS/var()#Examples
export default ({
  ':root': {
    '--main-bg-color': 'pink',
    '--someCOMPLEXvalue': '3px 6px rgb(20, 32, 54)', // variables are case sensitive
  },
  'body': {
    backgroundColor: 'var(--main-bg-color)',
  },
  'bodyWithFallback': {
    backgroundColor: 'var(--someCOMPLEXvalue, blue)',
  },
}: SheetDefinitions);
