// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Instagram from '../design/svg/__generated__/Instagram';
import Facebook from '../design/svg/__generated__/Facebook';

export default function SocialMediaIcons(): React.Node {
  return (
    <div className={styles('icons')}>
      <div className={styles('icon')}>
        {/* TODO */}
        <a href="#TODO">
          <Instagram />
        </a>
      </div>
      <div className={styles('icon')}>
        {/* TODO */}
        <a href="#TODO">
          <Facebook />
        </a>
      </div>
    </div>
  );
}

const styles = sx.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    'paddingLeft': 20,
    'paddingRight': 20,
    ':first-child': {
      paddingLeft: 0,
    },
    ':last-child': {
      paddingRight: 0,
    },
  },
});
