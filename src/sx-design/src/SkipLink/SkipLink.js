// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +text: FbtWithoutString,
};

// https://web.dev/headings-and-landmarks/#bypass-repetitive-content-with-skip-links
export default function SkipLink(props: Props): React.Node {
  return (
    <a className={styles('skipLink')} href="#main">
      {props.text}
    </a>
  );
}

const styles = sx.create({
  skipLink: {
    'position': 'absolute',
    'top': -40,
    'left': 0,
    // the colors are flipped on purpose so it's visible in light/dark mode
    'background': 'rgba(var(--sx-foreground))',
    'color': 'rgba(var(--sx-background))',
    'padding': 8,
    'zIndex': 100,
    ':focus': {
      top: 0,
    },
  },
});
