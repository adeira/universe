// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Instagram from '../design/svg/__generated__/Instagram';
import Facebook from '../design/svg/__generated__/Facebook';
import socialLinks from '../socialLinks';

export default function SocialMediaIcons(): React.Node {
  return (
    <div className={styles('icons')}>
      <div className={styles('icon')}>
        <a
          href={socialLinks.instagramURL}
          aria-label={
            <fbt desc="aria label of our Instagram link">link to KOCHKA Café Instagram page</fbt>
          }
          target="_blank"
        >
          <Instagram />
        </a>
      </div>
      <div className={styles('icon')}>
        <a
          href={socialLinks.facebookURL}
          aria-label={
            <fbt desc="aria label of our Facebook link">link to KOCHKA Café facebook page</fbt>
          }
          target="_blank"
        >
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
