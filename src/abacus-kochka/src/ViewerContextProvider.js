// @flow

import * as React from 'react';

import type { LanguageTagType } from './LanguageTag';

type Props = $ReadOnly<{
  +children: React.Node,
  +languageTag: LanguageTagType,
}>;

/**
 * @deprecated use `SxDesignProvider` instead (?)
 */
export type ViewerContextType = { +languageTag: LanguageTagType };

/**
 * @deprecated use `SxDesignProvider` instead (?)
 */
export const ViewerContext: React.Context<ViewerContextType | null> = React.createContext(null);

/**
 * Use hook `useViewerContext` if you need to access the context consumer.
 *
 * @deprecated use `SxDesignProvider` instead (?)
 */
export default function ViewerContextProvider(props: Props): React.Node {
  const { languageTag } = props;
  const context = React.useMemo(() => ({ languageTag }), [languageTag]);
  return <ViewerContext.Provider value={context}>{props.children}</ViewerContext.Provider>;
}
