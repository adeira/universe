// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import HeadingLevel from '../HeadingLevel';

type Props = {
  +children: React.Node,
  +xstyle?: AllCSSProperties,
};

/**
 * Section component is used to automatically advance Heading component level.
 */
export default function Section(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => (
        <HeadingLevel.Provider value={level + 1}>
          {/* eslint-disable-next-line react/forbid-elements */}
          <section className={sx(styles.section, props.xstyle)}>{props.children}</section>
        </HeadingLevel.Provider>
      )}
    </HeadingLevel.Consumer>
  );
}

const styles = sx.create({
  section: {
    color: 'rgba(var(--sx-text-color))',
  },
});
