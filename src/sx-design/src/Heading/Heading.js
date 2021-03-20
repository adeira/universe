// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import HeadingLevel from '../HeadingLevel';

type Props = {|
  +children: React.Node,
  +xstyle?: AllCSSProperties,
|};

/**
 * Heading component automatically renders the right `h[1-6]` HTML element based on the location in
 * the React tree. To advance the heading level you should nest it inside `<Section />` component.
 *
 * For more info please visit:
 *
 * - https://web.dev/headings-and-landmarks/
 * - https://github.com/jonathantneal/h-element-spec/issues/1
 */
export default function Heading(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => {
        const Heading = `h${Math.min(level, 6)}`;
        return <Heading className={sx(styles.heading, props.xstyle)}>{props.children}</Heading>;
      }}
    </HeadingLevel.Consumer>
  );
}

const styles = sx.create({
  heading: {
    color: 'rgba(var(--sx-text-color))',
  },
});
