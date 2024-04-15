// @flow

import sx from '@adeira/sx';
import fbt from 'fbt';

import ButtonLink from './ButtonLink';
import { initFbt } from '../test-utils';

// 👇 This default export determines where your story goes in the story list
export default {
  component: ButtonLink,
  title: 'Components/ButtonLink',
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
    // eslint-disable-next-line no-alert
    onClick: (): void => alert('Yay!'),
    children: (
      <fbt desc="button link title" doNotExtract={true}>
        Click me, I am a button but I look like a link!
      </fbt>
    ),
  },
};

export const CustomStyle = {
  args: {
    xstyle: styles.custom,
    // eslint-disable-next-line no-alert
    onClick: (): void => alert('Yay!'),
    children: (
      <fbt desc="button link title" doNotExtract={true}>
        Click me, I am a button but I look like a link! (with custom styles)
      </fbt>
    ),
  },
};
