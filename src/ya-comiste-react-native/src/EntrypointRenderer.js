// @flow

import React from 'react';
import { ScrollView } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import BlockRenderer from './BlockRenderer';
import type { FragmentContainerType } from './relay/relayTypes';
import type { EntrypointRendererFragment } from './__generated__/EntrypointRendererFragment.graphql';

type Props = {|
  +entrypoint: ?EntrypointRendererFragment,
  +componentId: string,
|};

function EntrypointRenderer(props) {
  // TODO: `RefreshControl`

  if (props.entrypoint == null) {
    return null; // TODO
  }

  return (
    <ScrollView>
      {props.entrypoint.blocks.map((block) => {
        return (
          <BlockRenderer
            componentId={props.componentId} // TODO: better
            key={block.id}
            block={block}
          />
        );
      })}
    </ScrollView>
  );
}

export default (createFragmentContainer(EntrypointRenderer, {
  entrypoint: graphql`
    fragment EntrypointRendererFragment on Entrypoint {
      blocks {
        id
        ...BlockRendererFragment
      }
    }
  `,
}): FragmentContainerType<Props>);
