// @flow

import * as React from 'react';
import { Text } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { warning } from '@adeira/js';

import type { FragmentContainerType } from './relay/relayTypes';
import type { BlockRendererFragment } from './__generated__/BlockRendererFragment.graphql';

type Props = {|
  +block: BlockRendererFragment,
  +componentId: string,
|};

function BlockRenderer(props) {
  const block = props.block.block;
  let Component = null;

  // TODO: `@match` & `@module` 3D rendering (?)
  if (block.__typename === 'CardBlock') {
    const Card = React.lazy(() => import('./blocks/Card'));
    Component = <Card data={block} componentId={props.componentId} />;
  } else if (block.__typename === 'DescriptionBlock') {
    const Description = React.lazy(() => import('./blocks/Description'));
    Component = <Description data={block} />;
  } else if (block.__typename === 'JumbotronBlock') {
    const Jumbotron = React.lazy(() => import('./blocks/Jumbotron'));
    Component = <Jumbotron data={block} />;
  } else if (block.__typename === 'ScrollViewHorizontalBlock') {
    const ScrollViewHorizontal = React.lazy(() => import('./blocks/ScrollViewHorizontal'));
    Component = (
      <ScrollViewHorizontal
        componentId={props.componentId} // TODO: better
        row={block}
      />
    );
  } else {
    warning(false, 'Unable to render block: %s', block.__typename);
    return null;
  }

  return (
    <React.Suspense
      fallback={
        <Text>TODO</Text> // TODO
      }
    >
      {Component}
    </React.Suspense>
  );
}

export default (createFragmentContainer(BlockRenderer, {
  block: graphql`
    fragment BlockRendererFragment on EntrypointBlock
    @argumentDefinitions(allowRecursion: { type: "Boolean", defaultValue: true }) {
      block(supported: ["Card", "Description", "Jumbotron", "ScrollViewHorizontal"]) {
        ... on CardBlock {
          __typename
          ...CardFragment
        }
        ... on DescriptionBlock {
          __typename
          ...DescriptionFragment
        }
        ... on JumbotronBlock {
          __typename
          ...JumbotronFragment
        }
        ... on ScrollViewHorizontalBlock {
          __typename
          ... @include(if: $allowRecursion) {
            ...ScrollViewHorizontalFragment
          }
        }
      }
    }
  `,
}): FragmentContainerType<Props>);
