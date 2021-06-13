// @flow

import * as React from 'react';
import { invariant } from '@adeira/js';

import { ViewerContext, type ViewerContextType } from '../ViewerContextProvider';

/**
 * @deprecated use `SxDesignProvider` instead (?)
 */
export default function useViewerContext(): ViewerContextType {
  const context = React.useContext(ViewerContext);

  invariant(
    context != null,
    'useViewerContext: expected to have found a Viewer Context provided by a `ViewerContextProvider` component',
  );

  return context;
}
