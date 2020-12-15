// @flow

import * as React from 'react';
import { graphql } from 'react-relay';

import QueryRenderer from './QueryRenderer';
import SDUISectionRenderer from '../SDUISectionRenderer';

type Props = {|
  +componentId: string,
  +entrypointKey: string,
  +render?: (React.Node) => React.Node,
|};

export default function EntrypointQueryRenderer(props: Props): React.Node {
  return (
    <QueryRenderer
      query={graphql`
        query EntrypointQueryRendererQuery($entrypointKey: String!) {
          mobileEntrypointSections(key: $entrypointKey) {
            ...SDUISectionRendererFragment
          }
        }
      `}
      variables={{
        entrypointKey: props.entrypointKey,
      }}
      render={(relayProps) => {
        const sduiSectionRenderer = (
          <SDUISectionRenderer
            componentId={props.componentId} // TODO: do it better
            sections={relayProps.mobileEntrypointSections}
          />
        );
        if (props.render) {
          return props.render(sduiSectionRenderer);
        }
        return sduiSectionRenderer;
      }}
    />
  );
}
