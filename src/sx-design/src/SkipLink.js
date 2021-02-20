// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {|
  +text: FbtWithoutString,
|};

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
    'background': 'var(--sx-color-dark, #1c1e21)',
    'color': 'var(--sx-color-light, white)',
    'padding': 8,
    'zIndex': 100,
    ':focus': {
      top: 0,
    },
  },
});
