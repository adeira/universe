// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Instagram from './design/svg/__generated__/Instagram';
import Facebook from './design/svg/__generated__/Facebook';
import GitHub from './design/svg/GitHub';
import socialLinks from './socialLinks';

type Props = {
  +vertical?: boolean,
  +color?: string,
  +size?: number,
};

export default function SocialMediaIcons(props: Props): React.Node {
  return (
    <div className={styles('icons', props.vertical && 'iconsVertical')}>
      <div className={styles(props.vertical ? 'iconVertical' : 'icon')}>
        <a
          href={socialLinks.instagramURL}
          aria-label={
            <fbt desc="aria label of our Instagram link">link to KOCHKA Café Instagram page</fbt>
          }
          target="_blank"
          rel="noreferrer"
        >
          <Instagram color={props.color} size={props.size} />
        </a>
      </div>

      <div className={styles(props.vertical ? 'iconVertical' : 'icon')}>
        <a
          href={socialLinks.facebookURL}
          aria-label={
            <fbt desc="aria label of our Facebook link">link to KOCHKA Café facebook page</fbt>
          }
          target="_blank"
          rel="noreferrer"
        >
          <Facebook color={props.color} size={props.size} />
        </a>
      </div>

      <div className={styles(props.vertical ? 'iconVertical' : 'icon')}>
        <a
          href={socialLinks.gitHubURL}
          aria-label={<fbt desc="aria label of our GitHub link">link to GitHub repository</fbt>}
          target="_blank"
          rel="noreferrer"
        >
          <GitHub color={props.color} size={props.size} />
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
  iconsVertical: {
    flexDirection: 'column',
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
  iconVertical: {
    'paddingBottom': 15,
    'paddingTop': 15,
    ':first-child': {
      paddingTop: 0,
    },
    ':last-child': {
      paddingBottom: 0,
    },
  },
});
