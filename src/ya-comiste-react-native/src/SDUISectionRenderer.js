// @flow

import React from 'react';
import { ScrollView } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { warning } from '@adeira/js';

import type { FragmentContainerType } from './relay/relayTypes';
import type { SDUISectionRendererFragment } from './__generated__/SDUISectionRendererFragment.graphql';

type Props = {|
  +sections: ?SDUISectionRendererFragment,
  +componentId: string,
|};

function SDUISectionRenderer(props) {
  // TODO: `RefreshControl`

  if (props.sections == null) {
    return null; // TODO
  }

  return (
    <ScrollView>
      {props.sections.map(({ id, component }) => {
        // TODO: `@match` & `@module` 3D rendering (?) - switch to `import` + React.Suspense
        if (component.__typename === 'SDUICardComponent') {
          const SDUICard = require('./blocks/SDUICard').default;
          return <SDUICard key={id} data={component} componentId={props.componentId} />;
        } else if (component.__typename === 'SDUIDescriptionComponent') {
          const SDUIDescription = require('./blocks/SDUIDescription').default;
          return <SDUIDescription key={id} data={component} />;
        } else if (component.__typename === 'SDUIJumbotronComponent') {
          const SDUIJumbotron = require('./blocks/SDUIJumbotron').default;
          return <SDUIJumbotron key={id} data={component} />;
        } else if (component.__typename === 'SDUIScrollViewHorizontalComponent') {
          const SDUIScrollViewHorizontal = require('./blocks/SDUIScrollViewHorizontal').default;
          return (
            <SDUIScrollViewHorizontal
              key={id}
              componentId={props.componentId} // TODO: better
              row={component}
            />
          );
        }
        warning(false, 'Unable to render SDUI component: %s', component.__typename);
        return null;
      })}
    </ScrollView>
  );
}

export default (createFragmentContainer(SDUISectionRenderer, {
  sections: graphql`
    fragment SDUISectionRendererFragment on SDUISection @relay(plural: true) {
      id
      component(
        supported: [
          "SDUICardComponent"
          "SDUIDescriptionComponent"
          "SDUIJumbotronComponent"
          "SDUIScrollViewHorizontalComponent"
        ]
      ) {
        ... on SDUICardComponent {
          __typename
          ...SDUICardFragment
        }
        ... on SDUIDescriptionComponent {
          __typename
          ...SDUIDescriptionFragment
        }
        ... on SDUIJumbotronComponent {
          __typename
          ...SDUIJumbotronFragment
        }
        ... on SDUIScrollViewHorizontalComponent {
          __typename
          ...SDUIScrollViewHorizontalFragment
        }
      }
    }
  `,
}): FragmentContainerType<Props>);
