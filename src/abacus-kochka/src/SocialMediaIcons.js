// @flow

import { Tooltip } from '@adeira/sx-design';
import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Instagram from './design/svg/generated/Instagram';
import Facebook from './design/svg/generated/Facebook';
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
        <Tooltip
          title={
            <fbt desc="instagram" doNotExtract={true}>
              Instagram
            </fbt>
          }
        >
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
        </Tooltip>
      </div>

      <div className={styles(props.vertical ? 'iconVertical' : 'icon')}>
        <Tooltip
          title={
            <fbt desc="facebook" doNotExtract={true}>
              Facebook
            </fbt>
          }
        >
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
        </Tooltip>
      </div>

      <div className={styles(props.vertical ? 'iconVertical' : 'icon')}>
        <Tooltip
          title={
            <fbt desc="github" doNotExtract={true}>
              GitHub
            </fbt>
          }
        >
          <a
            href={socialLinks.gitHubURL}
            aria-label={<fbt desc="aria label of our GitHub link">link to GitHub repository</fbt>}
            target="_blank"
            rel="noreferrer"
          >
            <GitHub color={props.color} size={props.size} />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}

const styles = sx.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginBlock: 20,
  },
  iconsVertical: {
    flexDirection: 'column',
  },
  icon: {
    'paddingInline': 20,
    ':first-child': {
      paddingInlineStart: 0,
    },
    ':last-child': {
      paddingInlineEnd: 0,
    },
  },
  iconVertical: {
    'paddingBlock': 15,
    ':first-child': {
      paddingBlockStart: 0,
    },
    ':last-child': {
      paddingBlockEnd: 0,
    },
  },
});
