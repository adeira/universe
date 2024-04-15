// @flow

import sx from '@adeira/sx';
import fbt from 'fbt';

import Link from './Link';
import { initFbt } from '../test-utils';

export default {
  component: Link,
  title: 'Components/Link',
  tags: ['autodocs'],
};

/* eslint-disable sx/no-unused-stylesheet */
const styles: $FlowFixMe = sx.create({
  custom: {
    'color': 'rgba(var(--sx-error))',
    'textDecoration': 'underline',
    ':hover': {
      textDecoration: 'none',
    },
  },
});
/* eslint-enable sx/no-unused-stylesheet */

initFbt();

export const Default = {
  args: {
    children: (
      <fbt desc="link title" doNotExtract={true}>
        Click me, I am a link!
      </fbt>
    ),
    href: 'https://github.com/adeira/universe/stargazers',
  },
};

export const CustomStyle = {
  args: {
    children: (
      <fbt desc="link title" doNotExtract={true}>
        Click me, I am a link! (with custom styles)
      </fbt>
    ),
    href: 'https://github.com/adeira/universe/stargazers',
    xstyle: styles.custom,
  },
};
