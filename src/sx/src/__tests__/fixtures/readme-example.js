// @flow

import type { SheetDefinitions } from '../../create';

// This way we make sure that we are not describing there some nonsense.
export default ({
  example: {
    fontSize: 32, // converted to PX units
    textDecoration: 'none',
    backgroundColor: 'var(--main-bg-color)', // CSS variables are supported as well
  },
}: SheetDefinitions);
