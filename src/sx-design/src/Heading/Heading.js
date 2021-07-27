// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import HeadingLevel from '../HeadingLevel';

type Props = {
  +children: React.Node,
  +xstyle?: AllCSSProperties,
};

/**
 * Heading component automatically renders the right `h[1-6]` HTML element based on the location in
 * the React tree. To advance the heading level you should nest it inside `<Section />` component.
 *
 * For more info please visit:
 *
 * - https://web.dev/headings-and-landmarks/
 * - https://github.com/jonathantneal/h-element-spec/issues/1
 *
 * @deprecated Use <Text as="h1"/> instead. It makes the code more predictable instead of relying
 * on the position in the React tree (in relation to <Section/>).
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
    color: 'rgba(var(--sx-foreground))',
  },
});
