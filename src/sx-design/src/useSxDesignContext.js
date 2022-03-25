// @flow strict

import { invariant } from '@adeira/js';
import { useContext } from 'react';

import SxDesignContext, { type SxDesignContextValue } from './SxDesignContext';

export default function useSxDesignContext(): SxDesignContextValue {
  const context = useContext(SxDesignContext);
  invariant(
    context != null,
    'useSxDesignContext: Expected to have found a SX Design environment provided by ' +
      'a `SxDesignProvider` component. This usually means that `useSxDesignContext` was used ' +
      'in a component that is not a descendant of a `SxDesignProvider`. Please make sure ' +
      'a `SxDesignProvider` has been rendered somewhere as a parent or ancestor of your component.',
  );
  return context;
}
