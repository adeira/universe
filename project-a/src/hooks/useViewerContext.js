// @flow strict

import * as React from 'react';
import { invariant } from '@adeira/js';

import { ViewerContext, type ViewerContextType } from '../ViewerContextProvider';

export default function useViewerContext(): ViewerContextType {
  const context = React.useContext(ViewerContext);

  invariant(
    context != null,
    'useViewerContext: expected to have found a Viewer Context provided by a `ViewerContextProvider` component',
  );

  return context;
}
